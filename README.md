app-module-path
=====================

This simple module enables you to add additional directories to the Node.js module search for top-level app modules only. This allows application-level modules to be required as if they were installed into the `node_modules` directory.

## Installation

`npm install app-module-path --save`

## Usage

Given the following example directory structure:

- **src/** - Source code and application modules directory
    - **foo/** - A module directory
        - index.js 
    - **bar/** - Another module directory
        - index.js
- **node_modules/** - Installed modules
    - **baz/** - An installed module
        - index.js
- index.js - Main script

The additional application module paths should be added before any modules are loaded (i.e. at the very beginning of your main script) using code similar to the following:

_Example `index.js`:_
```javascript
var path = require('path');

// Add the "src" directory to the app module search path:
require('app-module-path').addPath(path.join(__dirname, 'src'));

var foo = require('foo'); // Works
var bar = require('bar'); // Works
var baz = require('baz'); // Works
```

In addition, application level modules can be required from any other application level modules using a top-level module path. For example:

_Example `src/foo/index.js`:_
```javascript
var bar = require('bar'); // Works
var baz = require('baz'); // Works
```

Lastly, by design, installed modules (i.e. modules installed into `node_modules`) will not be able to require application-level modules so the following will _not_ work:

_Example `node_modules/baz/index.js`:_
```javascript
var bar = require('foo'); // Will *not* work!
var baz = require('bar'); // Will *not* work!
```

## Contribute
Pull requests, bug reports and feature requests welcome.

## License

BSD-2-Clause
