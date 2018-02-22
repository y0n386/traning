var u = require('partUtilities'),
  PartLogger = require('partLogger'),
  Logger = new PartLogger({
    mongoInterfaceConfig: {
      global:{},
      instance:{
        host: '127.0.0.1',
        port: 27017,
        dbName: 'test',
        dbUser: 'user',
        dbPass: 'pass',
        strictMode: true
      }
    }
  }),
  log = new Logger({
    sourceTypeWidth: 8,
    sourceNameWidth: 20,
    levelConfig: {
      event: {
        view: true,
        save: true,
        color: 'green',
        viewPath: true
      },
      warning: {
        view: true,
        save: true,
        color: 'yellowBg',
        viewPath: true
      },
      error: {
        view: true,
        save: true,
        color: 'redBg',
        viewPath: true
      }
    }
  }),
  packageJson = u.getPackageJson(__dirname),
  errorInfo = u.errorInfoGen(packageJson.moduleType, packageJson.name, packageJson.version);

exports.moduleName = packageJson.name;
exports.moduleType = packageJson.moduleType;
exports.moduleVersion = packageJson.version;
exports.log = log;
exports.e = {
  dbError: {
    info: errorInfo('dbError'),
    message:{
      en: 'Database Error',
      fa: 'خطای دیتابیس'
    }
  },
  sessionError: {
    info: errorInfo('sessionError'),
    message:{
      en: 'Session Error',
      fa: 'خطای سشن'
    }
  }
};