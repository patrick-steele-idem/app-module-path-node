var Module = require('module').Module;
var nodePath = require('path');

var appModulePaths = [];
var old_nodeModulePaths = Module._nodeModulePaths;

Module._nodeModulePaths = function(from) {
    var paths = old_nodeModulePaths.call(this, from);

    // Only include the app module path for top-level modules
    // that were not installed:
    if (from.indexOf('node_modules') === -1) {
        paths = paths.concat(appModulePaths);
    }

    return paths;
};

function addPath(path) {
    function addPathHelper(targetArray) {
        path = nodePath.normalize(path);
        if (targetArray && targetArray.indexOf(path) === -1) {
            targetArray.push(path);
        }
    }

    var parent;
    path = nodePath.normalize(path);

    if (appModulePaths.indexOf(path) === -1) {
        appModulePaths.push(path);
        // Enable the search path for the current top-level module
        if (require.main) addPathHelper(require.main.paths);
        parent = module.parent;

        // Also modify the paths of the module that was used to load the app-module-paths module
        // and all of it's parents
        while(parent && parent !== require.main) {
            addPathHelper(parent.paths);
            parent = parent.parent;
        }
    }
}

function removePath(path) {
    function removePathHelper(targetArray) {
        path = nodePath.normalize(path);
        if (!targetArray) return;
        var index = targetArray.indexOf(path);
        if (index === -1) return;
        targetArray.splice(index, 1);
    }

    var parent;
    path = nodePath.normalize(path);
    var index = appModulePaths.indexOf(path);

    if (index > -1) {
        appModulePaths.splice(index, 1);
        // Enable the search path for the current top-level module
        if (require.main) removePathHelper(require.main.paths);
        parent = module.parent;

        // Also modify the paths of the module that was used to load the app-module-paths module
        // and all of it's parents
        while(parent && parent !== require.main) {
            removePathHelper(parent.paths);
            parent = parent.parent;
        }
    }
}

exports.addPath = addPath;
exports.removePath = removePath;
