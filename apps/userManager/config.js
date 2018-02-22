let u = require('partUtilities'),
  packageJson = u.getPackageJson(__dirname),
  errorInfo = u.errorInfoGen(packageJson.moduleType, packageJson.name, packageJson.version),
  PartRedisInterface = require('partRedisInterface'),
  RedisInterface = new PartRedisInterface({
      loggerConfig: {
          global: {
              mongoInterfaceConfig: {
                  host: '127.0.0.1',
                  port: 27017,
                  dbName: 'test',
                  dbUser: 'user',
                  dbPass: 'pass',
                  strictMode: true
              }
          },
          instance: {}
      }
  }),
  redisDb1 = new RedisInterface({
      host: '127.0.0.1',
      port: 6379,
      db: 1,
      log: {
          view: true,
          save: false
      }
  }),
  redisDb7 = new RedisInterface({
      host: '127.0.0.1',
      port: 6379,
      db: 7,
      log: {
          view: true,
          save: false
      }
  }),
  partLoggerConfig = {
      global: {
          mongoInterfaceConfig: {
              global: {},
              instance: {
                  host: '127.0.0.1',
                  port: 27017,
                  dbName: 'test',
                  dbUser: 'user',
                  dbPass: 'pass',
                  strictMode: false
              }
          }
      },
      instance: {
          sourceTypeWidth: 8,
          sourceNameWidth: 20,
          levelConfig: {
              event: {
                  view: true,
                  save: false,
                  color: 'green',
                  viewPath: false
              },
              warning: {
                  view: true,
                  save: false,
                  color: 'yellowBg',
                  viewPath: true
              },
              error: {
                  view: true,
                  save: false,
                  color: 'redBg',
                  viewPath: true
              }
          }
      }
  },
  PartLogger = require('partLogger'),
  Logger = new PartLogger(partLoggerConfig.global),
  log = new Logger(partLoggerConfig.instance);

//------------------------------------------ your config ------------------------------------------------
let combination = [
      {
          uniqueFields: ['username'],
          extraFields: ['password']
      },
      {
          uniqueFields: ['mobile'],
          extraFields: ['password']
      }
  ],
  partAuthenticationInterfaceConfig = {
      global: {
          protocol: 'http',
          host: 'authentication.partdp.ir',
          port: 80,
          headers: {
              user: 'rasam',
              pass: '123456'
          }
      },
      instance: {}
  },
  partProfileInterfaceConfig = {
      global: {},
      instance: {
          protocol: 'http',
          host: 'profile.partdp.ir',
          port: 80,
          headers: {
              user: 'rasam',
              pass: '123456'
          }
      }
  },
  partSamadInterfaceConfig = {
      global: {
          protocol: 'http',
          host: 'samad.partdp.ir',
          port: 80,
          headers: {
              user: 'rasam3',
              pass: 'rasam3'
          }
      },
      instance: {
          org: 'rasam3'
      }
  },
  partDocumentConfig = {
      global: {
          protocol: 'http',
          host: 'documentservice.partdp.ir',
          port: 80
      },
      instance: {}
  },
  partAuthorizeConfig = {
      global: {
          protocol: 'http',
          host: 'authorize.partdp.ir',
          port: 80,
          headers: {
              user: 'admin',
              pass: '123456'
          }
      },
      instance: {system: 'rasam'}
  },
  partUserManagerConfig = {
      org: 'rasam',
      combination: combination
  },
  PartUserManager,
  PartUserManagerInstance,
  appNamePersian = 'تصدیق اصالت',
  blockTimePersian = '15 دقیقه',
  DI = new (require('partDocumentInterface'))(partDocumentConfig.global);
exports.failLoginCount = 30;
exports.failTime = 15 * 60 * 1000; // زمان بین اولین خطا تا رسیدن به حد نصاب
exports.blockTime = 15 * 60 * 1000; // زمان بعد از رسیدن به حد نصاب
exports.nextLink = 'Your link';// example: '185.23.129.52/#!/reset/';
exports.funcState = {
    signUp: [
        ['checkCaptcha', 'makePassword', 'makeUniqueKey', 'doCheckProfile', 'doCheckAuthenticatePack', 'doSignUp']
    ],
    signUpSMS: [
        ['checkCaptcha', /* 'doCheckProfile', 'doCheckUser',*/ 'doSignUp', 'addProfileDocument', 'sendSMSandEmail']
    ],
    login: [
        ['checkFailLogin', 'checkCaptcha', 'doLogin', 'setSession']
    ],
    loginSMS: [
        ['checkFailLogin', 'checkCaptcha', 'doLogin', 'setSession']
    ],
    logout: [
        ['doLogout']
    ],
    forgetPassword: [
        ['checkCaptcha', 'doneForgetPassword', 'sendEmail']
    ],
    setAuthenticatePack: [
        ['checkCaptcha', 'doSetAuthenticatePack']
    ],
    checkAuthenticatePack: [
        ['checkCaptcha', 'doCheckAuthenticatePack']
    ],
    checkProfile: [
        ['checkCaptcha', 'doCheckProfile']
    ],
    getProfile: [
        ['getSession', 'doGetProfile']
    ],
    editProfile: [
        ['getSession', 'doEditProfile']
    ],
    addProfile: [
        ['getSession', 'doAddProfile']
    ],
    getCaptcha: [
        ['doGetCaptcha']
    ],
    changeAuthenticatePack: [
        ['checkCaptcha', 'doChangeAuthenticatePack']
    ],
    deleteUser: [
        ['getSession', 'doDeleteUser']
    ]
};
exports.defaultRole = 'visitor';
exports.channels = [1, 2];
exports.messageText = 'رمز عبور شما';
exports.afterLoginList = ['idNumber', 'email', 'type', 'nationalId', 'status'];
exports.sessionExpireTime = 1000 * 60 * 60 * 24 * 7 * 2;// دو هفته لاگین خواهد بود
//-------------------------------------------------------------------------------------------------------

exports.di = new DI(partDocumentConfig.instance);
exports.documentDB = partUserManagerConfig.org;
exports.documentType = 'userManager';
exports.appName = packageJson.name;
exports.version = packageJson.version;
exports.appNamePersian = appNamePersian;
exports.redisDb1 = redisDb1;
exports.redisDb7 = redisDb7;
exports.redisName = 'activation';
exports.useCaptcha = {
    login: true,
    getCaptcha: true,
    setPass: false,
    forgetPassword: false,
    signUp: false,
    checkUser: false,
    changePass: false,
    changeUser: false,
    checkProfile: false
};
exports.redisTime = 16 * 60 * 60 * 1000;
exports.captchaOptions = {
    host: 'captcha.partdp.ir',
    port: 80,
    path: '/service/serviceCaptcha/',
    headers: {
        'Content-Type': 'application/json'
    }
};
exports.connectConfig = {
    user: 'info@rasamfunds.com',
    password: 'cpKzDnhp8Y',
    host: '91.134.219.213',
    ssl: false,
    port: 587,
    tls: true
};
exports.log = log;
exports.combination = combination;
exports.e = {
    relationError: {
        info: errorInfo('relationError'),
        message: {
            en: 'Database connection error!',
            fa: 'خطا در برقراری ارتباط با پایگاه داده!'
        }
    },
    duplicateUser: {
        info: errorInfo('duplicateUser'),
        message: {
            en: 'user exists!',
            fa: 'کاربر با این مشخصات در سیستم موجود است!'
        }
    },
    userNotFound: {
        info: errorInfo('userNotFound'),
        message: {
            en: 'user not exists!',
            fa: 'اطلاعات کاربر موجود نیست!'
        }
    },
    actionError: {
        info: errorInfo('actionError'),
        message: {
            en: 'action error!',
            fa: 'عملیات با خطا مواجه شد لطفا مجددا سعی نمایید!'
        }
    },
    invalidOldPass: {
        info: errorInfo('invalidOldPass'),
        message: {
            en: 'invalid oldPassword!',
            fa: 'رمز عبور قبلی وارد شده اشتباه است!'
        }
    },
    accessDenied: {
        info: errorInfo('accessDenied'),
        message: {
            en: 'access denied!',
            fa: 'دسترسی غیر مجاز!'
        }
    },
    connectDBError: {
        info: errorInfo('connectDBError'),
        message: {
            en: 'Database connection error!',
            fa: 'خطا در برقراری ارتباط با پایگاه داده!'
        }
    },
    connectCaptchaError: {
        info: errorInfo('connectCaptchaError'),
        message: {
            en: 'Error while connecting to service captcha!',
            fa: 'خطا در برقراری ارتباط با سرویس کپچا!'
        }
    },
    duplicateIdNumber: {
        info: errorInfo('duplicateIdNumber'),
        message: {
            en: 'user exists!',
            fa: 'کد ملی وارد شده، در سامانه تکراری است!'
        }
    },
    duplicateNationalCode: {
        info: errorInfo('duplicateNationalCode'),
        message: {
            en: 'user exists!',
            fa: 'شناسه ملی وارد شده، در سامانه تکراری است!'
        }
    },
    requestExpired: {
        info: errorInfo('requestExpired'),
        message: {
            en: 'token not exists!',
            fa: 'اطلاعات کاربری موجود نیست / درخواست منقضی شده است'
        }
    },
    infoNotFound: {
        info: errorInfo('infoNotFound'),
        message: {
            en: 'info not found!',
            fa: 'اطلاعات مورد نظر موجود نیست!'
        }
    },
    processError: {
        info: errorInfo('processError'),
        message: {
            en: 'Error while processing data!',
            fa: 'خطا در پردازش اطلاعات!'
        }
    },
    serverError: {
        info: errorInfo('serverError'),
        message: {
            en: 'server error!',
            fa: 'خطا سرور!'
        }
    },
    fundNotFound: {
        info: errorInfo('fundNotFound'),
        message: {
            en: 'fund info not found!',
            fa: 'اطلاعات صندوق مورد نظر موجود نیست!'
        }
    },
    justOneRelation: {
        info: errorInfo('justOneRelation'),
        message: {
            en: 'The user is not allowed to have more than one unclaimed relationship',
            fa: 'کاربر مجاز به داشتن بیش از یک رابطه (لغو نشده) نیست'
        }
    },
    duplicateRelation: {
        info: errorInfo('duplicateRelation'),
        message: {
            en: 'There is a relationship with this person in the database',
            fa: 'ارتباطی با این شخص در دیتابیس موجود است'
        }
    },
    relationCanceled: {
        info: errorInfo('relationCanceled'),
        message: {
            en: 'this relation canceled',
            fa: 'این رابطه لغو شده است.'
        }
    },
    fetchInformationError: {
        info: errorInfo('fetchInformationError'),
        message: {
            en: 'error in read data',
            fa: 'خطا در واکشی اطلاعات.'
        }
    },
    invalidRequest: {
        info: errorInfo('invalidRequest'),
        message: {
            en: 'invalid request',
            fa: 'درخواست نامعتبر'
        }
    },
    statusNotDefined: {
        info: errorInfo('statusNotDefined'),
        message: {
            en: 'status undefined',
            fa: 'وضعیت تعریف نشده است'
        }
    },
    requestNotBelongToThisUser: {
        info: errorInfo('requestNotBelongToThisUser'),
        message: {
            en: 'status undefined',
            fa: 'درخواست اشتباه'
        }
    },
    invalidFuncConfig: {
        info: errorInfo('invalidFuncConfig'),
        message: {
            en: 'invalid Func Config',
            fa: 'تنظیماتی برای تابع درخواستی وجود ندارد'
        }
    },
    failLoginCount: {
        info: errorInfo('requestNotBelongToThisUser'),
        message: {
            en: 'access denied!',
            fa: 'دسترسی شما به سامانه برای مدت ' + blockTimePersian + ' امکانپذیر نمیباشد !'
        }
    },
    invalidUsernameOrPassword: {
        info: errorInfo('invalidUsernameOrPassword'),
        message: {
            en: 'invalidUsernameOrPassword!',
            fa: 'نام کاربری یا رمز عبور اشتباه است!'
        }
    }
};
exports.w = {
    accessDenied: {
        info: errorInfo('accessDenied'),
        message: {
            en: 'access Denied',
            fa: 'شما دسترسی ویرایش مشخصات فرد مورد نظر را ندارید!'
        }
    }
};
try {
    PartUserManager = new (require('partUserManager'))({
        authentication: partAuthenticationInterfaceConfig,
        document: partDocumentConfig,
        profile: partProfileInterfaceConfig,
        samad: partSamadInterfaceConfig,
        authorize: partAuthorizeConfig
    });
    PartUserManagerInstance = new PartUserManager(partUserManagerConfig);
    exports.PartUserManagerInstance = PartUserManagerInstance;
}
catch (e) {
    log.error(exports.e.actionError, e);
}

//---------------------------------------------------------typedef----------------------------------------------------
/**
 * @typedef  connectDBError
 */









