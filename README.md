npm-installable wrapper for [@filiph](https://github.com/filiph)'s [linkcheck](https://github.com/filiph/linkcheck).

A lot of inspiration (and some code) came from @jakejarvis' [hugo-extended](https://github.com/jakejarvis/hugo-extended).

## Installation

```sh
npm install linkcheck-bin --save-dev
# or...
yarn add linkcheck-bin --dev
```

This package's version numbers align with linkcheck's — `linkcheck-bin@2.0.20` installs linkcheck 2.0.20, for example.

## Usage

### CLI / package.json script

```jsonc
// package.json:

{
  // ...
  "scripts": {
    "linkcheck": "linkcheck --external --check-anchors https://tylerbutler.com"
  },
  "devDependencies": {
    "linkcheck-bin": "^2.0.20"
  }
  // ...
}
```

```bash
$ npm run linkcheck

Done crawling.

https://tylerbutler.com
- (233:225) '1' => https://tylerbutler.com#fn:1 (HTTP 200 but missing anchor)

https://tylerbutler.com/
- (233:225) '1' => https://tylerbutler.com/#fn:1 (HTTP 200 but missing anchor)

https://tylerbutler.com/2004/11/tyler-a-novelist/
- (189:55) 'on this ..' => https://tylerbutler.com/tag/nanowrimo (HTTP 404)

...

Errors. Checked 8309 links, 317 destination URLs (483 ignored), 11 have errors, 20 have warnings.

```

### via JS API:

```js
// version.js:

import linkcheck from "linkcheck-bin";
import { execFile } from "child_process";

execFile(linkcheck, ["--version"], (error, stdout) => {
  console.log(stdout);
});
```

```bash
$ node version.js

linkcheck version 2.0.20
```

## License

This project is distributed under the [MIT License](LICENSE.md). linkcheck is also distributed under the [MIT License](https://github.com/filiph/linkcheck/blob/master/LICENSE).
