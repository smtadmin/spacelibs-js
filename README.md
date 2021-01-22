# How to import modules from this library

These are the steps on using modules from the `spacelibs-js` library.

1. Install `spacelibs-js` with [NPM](https://docs.npmjs.com/)
	```
	npm install spacelibs-js
	```

1. Import the module you need as a `named` import

	```js
	import { BaseHTTPService, HTTPMethod } from 'spacelibs-js/core/io'
	```
	or you can import as a `default` import
	```js
	import BaseHTTPService from 'spacelibs-js/core/io/BaseHTTPService'
	```


# Generate JS Docs

```
npm run docs
```

This will generate docs in the `/doc` directory, to view them open the `/doc/index.html` file.

# Run test coverage

```
npm run test
```

This will run `jest` for all of your test cases

##