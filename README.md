# Amazon-Location-Based-Cookie

[![Sponsor][sponsor-badge]][sponsor]
[![TypeScript version][ts-badge]][typescript-4-7]
[![Node.js version][nodejs-badge]][nodejs]
[![MIT][license-badge]][license]
[![Build Status - GitHub Actions][gha-badge]][gha-ci]

👩🏻‍💻 You can easily access location-based data with Amazon-Location-Based-Cookie

## Get Started

Use the package manager npm to install amazon-location-based-cookie

```bash
npm install amazon-location-based-cookie
```

## Country Types

The payload of the address change request varies according to the countries. Please select the appropriate type
according to the country code.

```typescript
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
```

## Usage

```typescript
import {fetchCookie} from 'amazon-location-based-cookie';

/**
 * fetchCookie takes 2 parameters.
 * The first parameter contains the country information
 * the second indicates the timeout between requests
 * by default 1000ms, I recommend not change.
 */

const country = {
    code: 'us',
    zipCode: '10001'
}

fetchCookie(country, 0).then(res => {
    /**
     * {
     *    cookie: 'session-id=139-*******-*******; session-id-time=2082787201l',
     *    addressChanged: true
     * }
     *
     * If the addressChanged value is true, the cookie has address information,
     * otherwise, cookie has no address information.
     */

    if (res.addressChanged) {
        // You can access the prices with cookie in the location you want 
        axios.get('https://www.amazon.com/dp/B09XGXRVXC', {
            headers: {
                cookie: res.cookie
            }
        })
    }
});
```

## Testing

```bash
npm run jest
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://raw.githubusercontent.com/Bariskau/Amazon-Location-Based-Cookie/main/LICENSE)

[ts-badge]: https://img.shields.io/badge/TypeScript-4.7-blue.svg
[nodejs-badge]: https://img.shields.io/badge/Node.js->=%2016.13-blue.svg
[nodejs]: https://nodejs.org/dist/latest-v14.x/docs/api/
[gha-badge]: https://github.com/Bariskau/Amazon-Location-Based-Cookie/actions/workflows/nodejs.yml/badge.svg
[gha-ci]: https://github.com/Bariskau/Amazon-Location-Based-Cookie/actions/workflows/nodejs.yml
[typescript]: https://www.typescriptlang.org/
[typescript-4-7]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: https://github.com/Bariskau/Amazon-Location-Based-Cookie/blob/main/LICENSE
[sponsor-badge]: https://img.shields.io/badge/♥-Sponsor-fc0fb5.svg
[sponsor]: https://github.com/sponsors/Bariskau
[jest]: https://facebook.github.io/jest/
[eslint]: https://github.com/eslint/eslint
[wiki-js-tests]: https://github.com/Bariskau/Amazon-Location-Based-Cookie/wiki/Unit-tests-in-plain-JavaScript
[prettier]: https://prettier.io
[volta]: https://volta.sh
[volta-getting-started]: https://docs.volta.sh/guide/getting-started
[volta-tomdale]: https://twitter.com/tomdale/status/1162017336699838467?s=20
[gh-actions]: https://github.com/features/actions
[repo-template-action]: https://github.com/Bariskau/Amazon-Location-Based-Cookie/generate
[esm]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules
[sindresorhus-esm]: https://gist.github.com/sindresorhus/a39789f98801d908bbc7ff3ecc99d99c
[nodejs-esm]: https://nodejs.org/docs/latest-v16.x/api/esm.html
[ts47-esm]: https://devblogs.microsoft.com/typescript/announcing-typescript-4-7/#esm-nodejs
