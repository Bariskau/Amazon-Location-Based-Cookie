// Countries with different payloads
const countries = {
  default: ['us', 'de', 'fr', 'ca', 'it', 'es', 'pl', 'mx', 'jp', 'sg', 'br', 'nl', 'tr'],
  needsCity: ['sa', 'ae', 'eg'],
  needsCityAndZip: ['au'],
};

// Checks which model the country code belongs to
function findCountry(countryCode: string, type: 'default' | 'needsCity' | 'needsCityAndZip'): boolean {
  return countries[type].indexOf(countryCode) >= 0;
}

function validateCountry(country) {
  if (!country.code)
    throw new Error('Country code is required to receive cookie!');
  if (findCountry(country.code, 'default')) {
    if (!country.zipCode)
      throw new Error('Zip code required for specified country!');
  } else if (findCountry(country.code, 'needsCity')) {
    if (!country.city || !country.cityName)
      throw new Error('City and city name required for the specified country!');
  } else if (findCountry(country.code, 'needsCityAndZip')) {
    if (!country.zipCode || !country.city)
      throw new Error('City and zip code required for specified country!');
  } else
    throw new Error('No support for specified country!');
}

export {
  validateCountry
}
