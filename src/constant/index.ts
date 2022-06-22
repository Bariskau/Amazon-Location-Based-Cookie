import { CountryDomain } from '../types';

// Address change operation endpoint
const CHANGE_ADDRESS_PATH = '/gp/delivery/ajax/address-change.html';

// Waiting time between http requests
const REQUEST_TIMEOUT = 1000;

// Domains for Amazon marketplaces
const COUNTRY_DOMAINS: CountryDomain = {
  us: 'com',
  tr: 'com.tr',
  de: 'de',
  gb: 'co.uk',
  fr: 'fr',
  ca: 'ca',
  it: 'it',
  es: 'es',
  pl: 'pl',
  mx: 'com.mx',
  jp: 'co.jp',
  sg: 'sg',
  br: 'com.br',
  au: 'com.au',
  in: 'in',
  nl: 'nl',
  sa: 'sa',
  se: 'se',
  ae: 'ae',
  eg: 'eg',
};

export {
  CHANGE_ADDRESS_PATH,
  REQUEST_TIMEOUT,
  COUNTRY_DOMAINS,
};
