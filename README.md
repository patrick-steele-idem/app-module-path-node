app-module-path
=====================

This simple module enables you to add additional directories to the Node.js module search for top-level app modules only. This allows application-level modules to be required as if they were installed into the `node_modules` directory.

## Installation

`npm install app-module-path --save`

## Usage
```javascript
var path = require('path');

// ***IMPORTANT**: The following line should be added to the very
//                 beginning of your main script!
require('app-module-path').addPath(baseDir);
```

__IMPORTANT:__
The search path should be modified before any modules are loaded!

__Example:__

In your `index.js` (or `server.js`) file:
```javascript
// Add the "src" directory to the app module search path:
var path = require('path');
require('app-module-path').addPath(path.join(__dirname, 'src'));
```

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

The following will work for any modules under the `src` directory:
```javascript
// All of the following lines will work in "src/foo/index.js" and "src/bar/index.js":
var foo = require('foo'); // Works
var bar = require('bar'); // Works
var baz = require('baz'); // Works
```

Lastly, by design, installed modules (i.e. modules under the `node_modules` directory) will not be able to require application-level modules so the following will _not_ work:

```javascript
// All of the following lines will work *not* work in "node_modules/baz/index.js"!
var bar = require('foo'); // Fails
var baz = require('bar'); // Fails
```

## Contribute
Pull requests, bug reports and feature requests welcome.

## License

BSD-2-Clause
