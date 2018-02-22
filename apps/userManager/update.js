let fs = require('fs'),
  q = require('q'),
  glob = require("glob"),
  coreNodeModules = ['assert', 'buffer', 'child_process', 'cluster', 'console', 'constants', 'crypto', 'dgram', 'dns',
    'domain', 'events', 'fs', 'http', 'https', 'module', 'net', 'os', 'path', 'process', 'punycode', 'querystring',
    'readline', 'repl', 'stream', 'string_decoder', 'timers', 'tls', 'tty', 'url', 'util', 'v8', 'vm', 'zlib'];
start()
  .then(function (res) {
    console.log('res---------->', res);
  })
  .fail(function (error) {
    console.log('error----------------->', error);
  });

function start() {
  let thisDir = __dirname.replace(/\\/g, '/'),
    promises = [],
    defer = q.defer(),
    repeat = [];
  glob(thisDir + "/**/*package.json", function (er, files) {
    if (er) {
      throw er;
    }
    files.forEach(function (file) {
      if (file.replace(thisDir, '').indexOf('node_modules') === -1 && repeat.indexOf(file) === -1) {
        file = file.substr(0, file.lastIndexOf('/'));
        promises.push(getAllFileJsAndDependencies(file));
        repeat.push(file);
      }
    });
    q.all(promises)
      .then(function (res) {
        let error = {};
        res.forEach(function (item) {
          let packageJsonPath = item.packageJsonPath + '/package.json',
            dependencies = item.dependencies;
          item = JSON.stringify(item);
          if (item.indexOf(':""') > -1) {
            if (!error['some dependencies not found in Address']) {
              error['some dependencies not found in Address'] = [];
            }
            if (error['some dependencies not found in Address'].indexOf(packageJsonPath) === -1) {
              error['some dependencies not found in Address'].push(packageJsonPath);
            }
          }
          fs.readFile(packageJsonPath, function (e, r) {
            r = JSON.parse(r.toString());
            r.dependencies = Object.keys(dependencies).length ? dependencies : r.dependencies;
            fs.writeFile(packageJsonPath, JSON.stringify(r), function (e) {
              if (e) {
                throw e;
              }
              defer.resolve(Object.keys(error) ? error : 'package.json updated ...');
            })
          });
        });
      })
      .fail(function (err) {
        defer.reject(err);
      });
  });
  return defer.promise;
}

function getAllFileJsAndDependencies(path) {
  let defer = q.defer();
  glob(path + "/*.js", function (er, files) {
    if (er) {
      throw er;
    }
    glob("*/*.js", function (er, files2) {
      files2.forEach(function (item) {
        item = __dirname.replace(/\\/g, '/') + '/' + item;
        files.push(item);
      });
      console.log('files--->', files);
      getDependenciesRequired(files, path)
        .then(function (res) {
          defer.resolve(res);
        })
        .fail(function (err) {
          defer.reject(err);
        });
    });
  });
  return defer.promise;
}

function getDependenciesRequired(filesPath, packageJsonPath) {
  let promises = [],
    maxLength = 0,
    endPath,
    thisDir = __dirname.replace(/\\/g, '/');
  filesPath.forEach(function (item) {
    if (item.replace(thisDir, '').indexOf('node_modules') === -1) {
      if (maxLength < item.split('/').length) {
        endPath = item;
      }
      promises.push(getRequired(item))
    }
  });
  return q.all(promises)
    .then(function (res) {
      res = '[' + JSON.stringify(res).replace(/,\[]/g, '').replace(/\[|]/g, '') + ']';
      res = JSON.parse(res);
      promises = [];
      let thisPath = __dirname.replace(/\\/g, '/');
      res.forEach(function (item) {
        if (coreNodeModules.indexOf(item) === -1 && thisPath.substr(thisPath.lastIndexOf('/')+1) !== item) {
          promises.push(getNodeModulesVersion(item, endPath))
        }
      });
      return q.all(promises)
        .then(function (res) {
          let dependencies = {};
          res.forEach(function (item) {
            dependencies = Object.assign(dependencies, item);
          });
          return {dependencies: dependencies, packageJsonPath: packageJsonPath};
        })
    });

  function getRequired(filePath) {
    let defer = q.defer();
    fs.readFile(filePath, function (e, r) {
      if (e) {
        throw e;
      }
      let regex = /require\('([^'"]+)'\)/g,
        required = [],
        match,
        str = r.toString();
      while (match = regex.exec(str)) {
        if (match[1].indexOf('./') === -1) {
          required.push(match[1]);
        }
      }
      defer.resolve(required);
    });
    return defer.promise;
  }

}

function getNodeModulesVersion(nodeModuleName, endPath, defer) {
  defer = defer || q.defer();
  let tempEndPath = endPath.split('/');
  tempEndPath.pop();
  endPath = tempEndPath.join('/');
  if (tempEndPath.length && tempEndPath[tempEndPath.length - 1] !== 'node_modules') {
    tempEndPath.push('node_modules');
  }
  tempEndPath = tempEndPath.join('/');
  fs.readdir(tempEndPath, function (e, r) {
    if (r) {
      if (r.indexOf(nodeModuleName) > -1) {
        getVersion(tempEndPath + '/' + nodeModuleName, nodeModuleName)
          .then(function (res) {
            defer.resolve(res);
          })
      }
      else {
        if (endPath.indexOf('/') > -1) {
          getNodeModulesVersion(nodeModuleName, endPath, defer);
        }
        else {
          defer.resolve({[nodeModuleName]: ''})
        }
      }
    }
    else {
      getNodeModulesVersion(nodeModuleName, endPath, defer);
    }
  });
  return defer.promise;
}

function getVersion(path, name) {
  let defer = q.defer();
  glob(path + "/*.json", function (er, files) {
    if (er) {
      throw er;
    }
    fs.readFile(files[0], function (e, r) {
      if (e) {
        throw e;
      }
      defer.resolve({[name]: JSON.parse(r.toString()).version});
    })
  });
  return defer.promise;
}