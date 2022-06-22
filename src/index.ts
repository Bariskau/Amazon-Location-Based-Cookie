import { Amazon } from './amazon';
import { CookieOutput, Country } from './types';
import AxiosClient from './utils/clientInstance';

/**
 * Get cookie for specific Amazon marketplace
 * @param country
 * @param timeout
 */
async function fetchCookie(country, timeout: number | null = null): Promise<CookieOutput> {
  const cookieService = new Amazon(country as Country, timeout);
  return await cookieService.generateCookie();
}

export {
  fetchCookie,
  AxiosClient,
};

