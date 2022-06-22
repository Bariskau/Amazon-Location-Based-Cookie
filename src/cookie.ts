import { AmazonCookie } from './types';

export class Cookie {

  /**
   * @param {AmazonCookie} _cookies
   */
  constructor(private _cookies: AmazonCookie = {}) {
  }

  /**
   * Set Cookie
   * @param {string[]} cookies
   */
  set cookies(cookies: string[]) {
    // Parse the cookies
    cookies.forEach(cookie => {
      const setCookie = cookie.split(';')[0].split(/=(.*)/s);

      // Only certain cookie values are required
      if (['session-id', 'session-id-time', 'session-token'].includes(setCookie[0])) {
        this._cookies[setCookie[0]] = setCookie[1];
      }
    });
  }

  /**
   * Returns the cookie information that occurs after all requests
   * @return {string}
   */
  serializedCookie(): string {
    return Object.entries(this._cookies).map(entry => entry.join('=')).join('; ');
  }
}

