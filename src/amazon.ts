import { HttpClient } from './client';
import { CHANGE_ADDRESS_PATH, COUNTRY_DOMAINS, REQUEST_TIMEOUT } from './constant';
import * as FormData from 'form-data';
import { AxiosResponse } from 'axios';
import cheerio from 'cheerio';
import { CookieOutput, Country, LocationWidget } from './types';
import { setTimeout } from 'timers/promises';
import { validateCountry } from './validator';

export class Amazon extends HttpClient {
  /**
   * Amazon location based cookie constructor
   * @param {Country} _country
   * @param {number | null} timeout => time to wait between requests(ms)
   */
  public constructor(private _country: Country, public timeout: number | null = null) {
    // Validate the data because payload varies by country
    validateCountry(_country);
    // Http client
    super(`https://www.amazon.${COUNTRY_DOMAINS[_country.code]}`);
  }

  /**
   * Process requests sequentially with the Pipeline design pattern
   * @return {Promise<CookieOutput>}
   */
  async generateCookie(): Promise<CookieOutput> {
    // Requests must be consecutive
    const pipeline = [
      'mainRequest',
      'verifyCsrf',
      'changeAddress',
    ];

    let res = null;
    // Requests are completed periodically
    for await (const pipe of pipeline) {
      if (pipe !== 'mainRequest')
        await setTimeout(this.timeout ?? REQUEST_TIMEOUT);
      res = await this[pipe](res);
    }

    // Get processed cookie string
    return {
      cookie: this.cookie.serializedCookie(),
      addressChanged: res.data?.isValidAddress === 1,
    };
  }

  /**
   * Make a request to www.amazon.* with a specific User-Agent
   * @return {Promise<string>}
   */
  mainRequest(): Promise<string> {
    // Make request to the home page for get az2 token
    return this.instance.get('/');
  }

  /**
   * Get csrf token with using az2token in headers
   * @param {AxiosResponse} res
   * @return {Promise<AxiosResponse>}
   */
  verifyCsrf(res: AxiosResponse): Promise<AxiosResponse> {
    // Extract az2token from html
    const az2token = Amazon._extractAZ2Token(res.data);

    return this.instance.get(az2token.url, {
      headers: {
        'anti-csrftoken-a2z': az2token.ajaxHeaders['anti-csrftoken-a2z'],
      },
    });
  }

  /**
   * Make a POST request to the address change endpoint with form data
   * @param {AxiosResponse} res
   * @return {Promise<AxiosResponse>}
   */
  changeAddress(res: AxiosResponse): Promise<AxiosResponse> {
    // Extract CSRF_TOKEN from the previous response
    const csrf = Amazon._extractCsrfToken(res.data);
    const form = new FormData();

    // Payload varies by country, so the correct payload should be set
    switch (this._country.code) {
      case ('sa'):
      case ('ae'):
      case ('eg'):
        form.append('locationType', 'CITY');
        form.append('city', this._country.city);
        form.append('cityName', this._country.cityName);
        break;
      case('au'):
        form.append('locationType', 'POSTAL_CODE_WITH_CITY');
        form.append('zipCode', this._country.zipCode);
        form.append('city', this._country.city);
        break;
      case('nl'):
        form.append('locationType', 'COUNTRY');
        form.append('district', this._country.zipCode);
        form.append('countryCode', this._country.zipCode);
        break;
      default:
        form.append('locationType', 'LOCATION_INPUT');
        form.append('zipCode', this._country.zipCode);
    }

    // Should be set for each country
    form.append('storeContext', 'generic');
    form.append('deviceType', 'web');
    form.append('pageType', 'Gateway');
    form.append('actionSource', 'glow');
    form.append('almBrandId', 'undefined');

    return this.instance.post(CHANGE_ADDRESS_PATH, form, {
      headers: {
        'anti-csrftoken-a2z': csrf,
      },
    });
  }

  /**
   * Parses az2token in html
   * @param {string} data
   * @return {LocationWidget}
   * @private
   */
  private static _extractAZ2Token(data: string): LocationWidget {
    let widgetData;

    try {
      const $ = cheerio.load(data);
      const locationWidget = $('#nav-global-location-data-modal-action');
      widgetData = JSON.parse(locationWidget.attr('data-a-modal'));
    } catch {
      throw new Error('Az2 token not found in html body!');
    }

    return widgetData;
  }

  /**
   * Parses csrf token in html
   * @param {string} data
   * @return {string}
   * @private
   */
  private static _extractCsrfToken(data: string): string {
    let csrf: string;

    try {
      const regex = /CSRF_TOKEN : "(.+?)"/;
      csrf = regex.exec(data)[1];
    } catch {
      throw new Error('Csrf token not found in html body!');
    }

    return csrf;
  }
}
