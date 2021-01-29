## How to import modules from this library

These are the steps on using modules from the `spacelibs-js` library.

1. Install `spacelibs-js` with [NPM](https://docs.npmjs.com/)
	```
	npm install spacelibs-js
	```

1. Import the module you need as a `named` import

	```js
	import { BaseHTTPService, HTTPMethod } from 'spacelibs-js/core/io'
	```
	or as a `default` import
	```js
	import BaseHTTPService from 'spacelibs-js/core/io/BaseHTTPService'
	```

## Generate JS Docs

To generate JSDocs pages for this package, run the following `npm` command

```
npm run docs
```

This will generate docs in the `/doc` directory, to view them open the `/doc/index.html` file.

## Run tests

To run all tests with coverage, run the following `npm` command

```
npm run test
```

