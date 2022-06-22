import { AxiosResponseHeaders } from 'axios';

type CountryDomain = {
  [key: string]: string
}

type AmazonResponse = {
  data,
  headers: AxiosResponseHeaders
}

// Amazon cookie type
type AmazonCookie = {
  'session-token'?: string
  'session-id='?: string
  'session-id-time'?: string
}

// Countries where zip code is required
type WithZip = {
  code: 'us' | 'de' | 'fr' | 'ca' | 'it' | 'es' | 'pl' | 'mx' | 'jp' | 'sg' | 'br' | 'nl' | 'tr',
  zipCode: string
}

// Countries where city and city name are required
type WithCity = {
  code: 'sa' | 'ae' | 'eg',
  city: string,
  cityName: string
}

// Countries where city and zip code are required
type WithCityAndZip = {
  code: 'au',
  zipCode: string,
  city: string
}

type Country = WithZip | WithCity | WithCityAndZip

// HTML element used to bypass csrf protection
type LocationWidget = {
  ajaxHeaders: { 'anti-csrftoken-a2z': string },
  url: string
}

// Returned data after scrape
type CookieOutput = {
  cookie: string,
  addressChanged: boolean
}

export {
  AmazonResponse,
  Country,
  AmazonCookie,
  LocationWidget,
  CountryDomain,
  CookieOutput,
};
