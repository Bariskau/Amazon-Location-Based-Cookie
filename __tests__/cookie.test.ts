import { Country } from '../src/types';
import { COUNTRY_DOMAINS, CHANGE_ADDRESS_PATH } from '../src/constant';
import { fetchCookie } from '../src';
import AxiosClient from '../src/utils/clientInstance';
import MockAdapter from 'axios-mock-adapter';
import { performance } from 'perf_hooks';
import {
  addressChangeResponse,
  csrfTokenResponse,
  csrfVerifyUrl,
  mainRequestResponse,
  serviceOutput,
} from './helper';


let mock;
function setMockAdapter(baseUrl) {
  mock.onGet(`${baseUrl}/`).reply(200, mainRequestResponse.data, mainRequestResponse.headers);
  mock.onGet(`${baseUrl}${csrfVerifyUrl}`).reply(200, csrfTokenResponse.data, csrfTokenResponse.headers);
  mock.onPost(`${baseUrl}${CHANGE_ADDRESS_PATH}`).reply(200, addressChangeResponse.data, addressChangeResponse.data);
}

describe('amazon location based cookie', () => {
  beforeAll(() => {
    mock = new MockAdapter(AxiosClient);
  });

  afterEach(() => {
    mock.reset();
  });

  it('can get valid cookie from amazon with successful requests', async () => {
    const countryCode = 'us';
    const baseUrl = `https://www.amazon.${COUNTRY_DOMAINS[countryCode]}`;
    const country: Country = {
      code: countryCode,
      zipCode: '1',
    };
    setMockAdapter(baseUrl);
    const amazonCookie = await fetchCookie(country, 0);
    expect(amazonCookie).toEqual(serviceOutput);
  });

  it('can receive cookies with 3 different data types', async () => {
    const countries: Country[] = [
      {
        code: 'nl',
        zipCode: '1',
      },
      {
        code: 'sa',
        city: 'Jeddah',
        cityName: 'Jeddah',
      },
      {
        code: 'au',
        zipCode: '2046',
        city: 'ABBOTSFORD',
      },
    ];

    for (const country of countries) {
      const baseUrl = `https://www.amazon.${COUNTRY_DOMAINS[country.code]}`;
      setMockAdapter(baseUrl);

      const amazonCookie = await fetchCookie(country, 0);

      expect(amazonCookie).toEqual(serviceOutput);
    }
  });

  it('may get an error with an invalid data type', async () => {
    const country = {
      code: 'de',
      random: 'random',
    };

    const baseUrl = `https://www.amazon.${COUNTRY_DOMAINS[country.code]}`;
    setMockAdapter(baseUrl);

    let error:string;
    try {
      await fetchCookie(country, 0);
    } catch (e) {
      error = e.message
    }
    expect(error).toBe('Zip code required for specified country!');
  })

  it('can take a wait time between requests', async () => {
    const country = {
      code: 'de',
      zipCode: '1',
    };

    // start time
    const start = performance.now()

    const baseUrl = `https://www.amazon.${COUNTRY_DOMAINS[country.code]}`;
    setMockAdapter(baseUrl);

    await fetchCookie(country, 1000); // we have to wait min 2 seconds

    // end time
    const end = performance.now()

    expect(end - start).toBeGreaterThanOrEqual(2000);
  })
});
