import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AmazonResponse } from './types';
import { Cookie } from './cookie';
import AxiosClient from './utils/clientInstance';

export abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  protected cookie: Cookie;
  private readonly _userAgent: string;

  /**
   * Create http client instance
   * @param baseURL
   * @protected
   */
  protected constructor(baseURL: string) {
    AxiosClient.defaults.baseURL = baseURL;
    this.instance = AxiosClient;

    this._userAgent = this.randomUserAgent();
    // Handle axios interceptors
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    // CookieJar
    this.cookie = new Cookie();

    this.instance.interceptors.response.use(
      this._handleResponse.bind(this),
      this._handleError,
    );

    this.instance.interceptors.request.use(
      this._handleRequest.bind(this),
    );
  };

  /**
   * Creates a random user agent
   * @returns {string}
   */
  randomUserAgent(): string {
    const os = [
      'Macintosh; Intel Mac OS X 10_15_7',
      'Macintosh; Intel Mac OS X 10_15_5',
      'Macintosh; Intel Mac OS X 10_11_6',
      'Macintosh; Intel Mac OS X 10_6_6',
      'Macintosh; Intel Mac OS X 10_9_5',
      'Macintosh; Intel Mac OS X 10_10_5',
      'Macintosh; Intel Mac OS X 10_7_5',
      'Macintosh; Intel Mac OS X 10_11_3',
      'Macintosh; Intel Mac OS X 10_10_3',
      'Macintosh; Intel Mac OS X 10_6_8',
      'Macintosh; Intel Mac OS X 10_10_2',
      'Macintosh; Intel Mac OS X 10_10_3',
      'Macintosh; Intel Mac OS X 10_11_5',
      'Windows NT 10.0; Win64; x64',
      'Windows NT 10.0; WOW64',
      'Windows NT 10.0',
    ];

    return `Mozilla/5.0 (${os[Math.floor(Math.random() * os.length)]}) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/${
      Math.floor(Math.random() * 3) + 85
    }.0.${Math.floor(Math.random() * 190) + 4100}.${Math.floor(Math.random() * 50) + 140} Safari/537.36`;
  }

  /**
   * Cookie is set to be used in the next request
   * @param data
   * @param headers
   * @private
   */
  private _handleResponse({ data, headers }: AxiosResponse): AmazonResponse {
    if (headers['set-cookie']) {
      this.cookie.cookies = headers['set-cookie'];
    }

    return { data, headers };
  };

  /**
   * Before each request, the cookie from the previous request is set
   * @param req
   * @private
   */
  private _handleRequest(req: AxiosRequestConfig): AxiosRequestConfig {
    const cookie = this.cookie.serializedCookie();

    if (cookie) {
      req.headers.cookie = cookie;
      req.headers['user-agent'] = this._userAgent;
    }

    return req;
  };

  /**
   * Handle axios errors
   * @param error
   */
  protected _handleError = (error: AxiosError) => Promise.reject(error);
}

