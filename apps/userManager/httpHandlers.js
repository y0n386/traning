// create by Mohammad Rahmati 1396/08/05
/**
 * @namespace userManager\http
 */
let u = require('partUtilities'),
  config = require('./config.js'),
  db = require('./db'),
  schema = require('./schema'),
  log = config.log,
  email = require('emailjs'),
  crypto = require('crypto'),
  q = require('q'),
  functions = {
    doSignUp: doSignUp,
    doLogin: doLogin,
    checkFailLogin: checkFailLogin,
    doneForgetPassword: doneForgetPassword,
    checkCaptcha: checkCaptcha,
    doCheckProfile: doCheckProfile,
    doCheckAuthenticatePack: doCheckAuthenticatePack,
    doSetAuthenticatePack: doSetAuthenticatePack,
    doGetCaptcha: doGetCaptcha,
    doChangeAuthenticatePack: doChangeAuthenticatePack,
    setSession: setSession,
    sendEmail: sendEmail,
    doLogout: doLogout,
    doGetProfile: doGetProfile,
    getSession: getSession,
    doAddProfile: doAddProfile,
    doEditProfile: doEditProfile,
    doDeleteUser: doDeleteUser,
    sendSMSandEmail: sendSMSandEmail,
    makeUniqueKey: makeUniqueKey,
    makePassword: makePassword
  },
  sessionExpireTime;

exports.httpHandlers = {
  login: {
    POST: {
      name: 'ورود',
      description: 'ورود به سیستم',
      function: login,
      dataSchema: function (headers, data, session, callback) {
        callback(null, schema.loginData(headers, data))
      },
      csrfToken: false
    },
    HEAD: {
      function: u.metaHandlerGen(config.version, "Mohammad Rahmati")
    }
  },
  signUp: {
    PUT: {
      name: 'signUp',
      description: 'ثبتنام',
      function: signUp,
      dataSchema: function (headers, data, session, callback) {
        callback(null, schema.signUp(headers, data));
      },
      csrfToken: false
    },
    HEAD: {
      function: u.metaHandlerGen("1.0.0", "Mohammad Rahmati")
    }
  },
  forgetPassword: {
    POST: {
      function: forgetPassword,
      dataSchema: function (headers, data, session, callback) {
        callback(null, schema.forgetPassword(headers, data));
      },
      csrfToken: false
    },
    HEAD: {
      function: u.metaHandlerGen(config.version, "Mohammad Rahmati")
    }
  },
  setAuthenticatePack: {
    POST: {
      function: setAuthenticatePack,
      dataSchema: function (headers, data, session, callback) {
        callback(null, schema.setAuthenticatePack(headers, data));
      }
    },
    HEAD: {
      function: u.metaHandlerGen(config.version, "Mohammad Rahmati")
    }
  },
  checkAuthenticatePack: {
    GET: {
      name: '',
      description: '',
      function: checkAuthenticatePack,
      dataSchema: function (headers, data, session, callback) {
        callback(null, schema.checkAuthenticatePack(headers, data));
      },
      csrfToken: false
    },
    HEAD: {
      function: u.metaHandlerGen("1.0.0", "Mohammad Rahmati")
    }
  },
  checkProfile: {
    GET: {
      name: '',
      description: '',
      function: checkProfile,
      dataSchema: function (headers, data, session, callback) {
        callback(null, schema.checkProfile(headers, data));
      },
      csrfToken: false
    },
    HEAD: {
      function: u.metaHandlerGen("1.0.0", "Mohammad Rahmati")
    }
  },
  changeAuthenticatePack: {
    POST: {
      name: '',
      description: '',
      function: changeAuthenticatePack,
      dataSchema: function (headers, data, session, callback) {
        callback(null, schema.changeAuthenticatePack(headers, data));
      },
      csrfToken: false
    },
    HEAD: {
      function: u.metaHandlerGen("1.0.0", "Mohammad Rahmati")
    }
  },
  deleteUser: {
    GET: {
      name: '',
      description: '',
      function: deleteUser,
      csrfToken: false
    },
    HEAD: {
      function: u.metaHandlerGen("1.0.0", "Mohammad Rahmati")
    }
  },
  getCaptcha: {
    GET: {
      name: 'دریافت کپچا',
      description: 'تصویر کپچا را اگر فعال باشد به کاربر ارسال می کند.',
      function: getCaptcha,
      csrfToken: false
    },
    HEAD: {
      function: u.metaHandlerGen(config.version, "Mohammad Rahmati")
    }
  },
  profile: {
    GET: {
      name: '',
      description: '',
      function: getProfile,
      csrfToken: false
    },
    PUT: {
      name: '',
      description: '',
      function: addProfile,
      dataSchema: function (headers, data, session, callback) {
        callback(null, schema.addProfile(headers, data));
      },
      csrfToken: false
    },
    POST: {
      name: '',
      description: '',
      function: editProfile,
      dataSchema: function (headers, data, session, callback) {
        callback(null, schema.editProfile(headers, data));
      },
      csrfToken: false
    },
    HEAD: {
      function: u.metaHandlerGen("1.0.0", "Mohammad Rahmati")
    }
  },
  logout: {
    GET: {
      name: 'خروج',
      description: 'خروج از سیستم',
      function: logout,
      csrfToken: false
    },
    HEAD: {
      function: u.metaHandlerGen("1.0.0", "Mohammad Rahmati")
    }
  }
};

/**
 * ورود به سیستم  بعد از مراحل مربوط به اعتبار سنجی داده دریافتی در سشن ذخیره میگردد.
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {!object} آبجکت استاندارد ورودی سرور
 * @param request.data.username {string=} نام کاربری
 * @param request.data.password {!string} رمز عبور
 * @param request.data.captcha {?object} ابجکت کپچا
 * @param request.data.captcha.token {?string} توکن
 * @param request.data.captcha.value {?string} مقدار وارد شده توسط کاربر برای کپچا
 * @example {
    "data": {
        "roles": [
            ""
        ],
        "status": "",
        "type": "",
        "idNumber": "",
        "email": "",
        "username": "",
        "token": ""
    },
    "status": "success"
}
 * @return {success|actionError}

 */
function login(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'login')
    .then(function (res) {
      setCookie(res[0]);
    })
    .fail(function (error) {
      error=error.code==='invalidCaptcha'?error:config.e.invalidUsernameOrPassword;
      response.sendFail(error, u.metaGen(config.version, "Mohammad Rahmati"));
    })
}

/**
 * ثبتنام    بعد از بررسی تکراری نبودن پروفایل و نام کاربری مراحل ثبتنام انجام میگردد.
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {!object} آبجکت استاندارد ورودی سرور
 * @param request.data {!object} ابجکت استاندارد ورودی سرور
 * @param request.data.type {!number} نوع ثبتنام
 * @param request.data.firstName {!string} نام
 * @param request.data.lastName {!string} نام خانوادگی
 * @param request.data.gender {!string|!number} جنسیت
 * @param request.data.fatherName {!string} نام پدر
 * @param request.data.identityNumber {!string} شماره شناسنامه
 * @param request.data.identitySerialNumber {!string} سریال شناسنامه
 * @param request.data.idNumber {!string} کد ملی
 * @param request.data.birthday {!string} تارخ تولد
 * @param request.data.education {?string} تحصیلات
 * @param request.data.email {!string} رایانامه
 * @param request.data.cellphoneNumbers {!object[]} مشخصات تلفن
 * @param request.data.cellphoneNumbers[].value {!string} مقدار تلفن
 * @param request.data.addresses {!object[]} مشخصات آدرس
 * @param request.data.addresses[].province{?String}  استان
 * @param request.data.addresses[].city{?String}  شهر
 * @param request.data.addresses[].street{?String}  خیابان
 * @param request.data.addresses[].alley{?String}  کوچه
 * @param request.data.addresses[].number{?Number}  پلاک
 * @param request.data.addresses[].address{?String}  نشانی منزل
 * @param request.data.addresses[].postalCode{?Number} [10 digits]  کد پستی
 * @param request.data.addresses[].tels{?object[]} مشخصات تلفن
 * @param request.data.addresses[].tels[].value {!string} مقدار تلفن
 * @param request.data.tradingCode {?string} کد بورسی
 * @param request.data.hasTrading {?string} سابقه خرید و فروش قبلی  0 / 1
 * @param request.data.jobs {?object[]}  مشخصات شغل
 * @param request.data.jobs[].job {!string} شغل
 * @param request.data.jobs[].post {?string} سمت
 * @param request.data.jobs[].averageSalary {?string} متوسط درآمد ماهیانه
 * @param request.data.jobs[].companyName {?string}   نام سازمان / شرکت / محل کار
 * @param request.data.jobs[].companyActivity {?string} ماهیت فعالیت شرکت
 * @param request.data.jobs[].postalCode {?string} کد پستی محل کار
 * @param request.data.jobs[].tels {?object[]} تلفن محل کار
 * @param request.data.jobs[].tels[].value {!string} مقدار
 * @param request.data.jobs[].faxes {?object[]} فکس محل کار
 * @param request.data.jobs[].faxes[].value {!string} مقدار
 * @param request.data.idCards {!string} تصویر کارت ملی
 * @param request.data.identityCards {!string} تصویر شناسنامه
 * @param request.data.companyName {!string} نام شرکت
 * @param request.data.website {?string} وبسایت شرکت
 * @param request.data.activityField {!string} زمینه فعالیت
 * @param request.data.registrationNumber {!string} شماره ثبت
 * @param request.data.registrationDate {!string} تاریخ ثبت
 * @param request.data.nationalId {!string} شناسه ملی شرکت
 * @param request.data.establishmentAnnouncements {!object[]} فایل اسکن شده از آگهی تاسیس شرکت
 * @param request.data.establishmentAnnouncements.data {!string}
 * @param request.data.latestChanges {!string} آخرین تغییرات
 * @return {success | duplicateUser | actionError}
 * @example{
          data:{password:""}
          status:"success"
          }
 */
function signUp(request, response) {
  request.data.role = config.defaultRole;
  runFunc({
    request: request,
    response: response
  }, 'signUp')
    .then(function (res) {
      if (Array.isArray(res)) {
        res = {password: res[0].password};
      }
      response.sendOk({data: res}, u.metaGen(config.version, "Mohammad Rahmati"));
    })
    .fail(function (error) {
      error = error["samad"] || error["authentication"] || error["profile"] || error["document"] || error;
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    })
}

/**
 * دریافت کپچا
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {!object} آبجکت استاندارد ورودی سرور
 * @return {success|connectCaptchaError}
 * @example {
    "data": {
        "img": "",
        "token": ""
    },
    "status": "success",
    "shamsiDate": 13960807182341344,
   // or
    "data": {
       token: null,
      img: null,
      message: 'Captcha is disabled.
      }
}
 */
function getCaptcha(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'getCaptcha')
    .then(function (res) {
      response.sendOk({
        data: {
          img: res[0].img,
          token: res[0].token
        }
      }, u.metaGen(config.version, "Mohammad Rahmati"));
    })
    .fail(function (error) {
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    })
}

/**
 * فراموشی رمز عبور
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {!object} آبجکت استاندارد ورودی سرور
 * @param request.data.username {string=}  نام کاربری
 * @return {success|actionError}
 */
function forgetPassword(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'forgetPassword')
    .then(function (res) {
      res = res.length === 1 ? res[0] : res;
      response.sendOk({data: res}, u.metaGen(config.version, "Mohammad Rahmati"));
    })
    .fail(function (error) {
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    })
}

/**
 * تنظیم رمز عبور جدید بعد از فراموشی رمز عبور     بعد از دریافت اطلاعات از ردیس با استفاده از توکن دریافتی بررسی میشود که آیا نام کاربری ارسال شده
 * با نام کاربری موجود در ردیس برابر هست یا نه که این کار در صورت اشتباه بودن تا سه مرتبه مجاز است و در صورت درست بودن پسورد جدید برای
 * نام کاربری تنظیم شده از قبل در ردیس ، ست میشود.
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {!object} آبجکت استاندارد ورودی سرور
 * @param request.data.username {string=}  نام کاربری
 * @param request.data.token {!string}  توکن
 * @param request.data.newPassword {!string}  پسورد جدید
 * @return { success | accessDenied| requestExpired | actionError| connectDBError}
 */
function setAuthenticatePack(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'setPass')
    .then(function (res) {
      res = res.length === 1 ? {} : {data: res};
      response.sendOk({data: res}, u.metaGen(config.version, "Mohammad Rahmati"));
    })
    .fail(function (error) {
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    });
}

/**
 * بررسی تکراری بودن یا نبودن نام کاربری
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {!object} آبجکت استاندارد ورودی سرور
 * @param request.data.username {string=}  نام کاربری
 * @return {success|duplicateUser|actionError}
 */
function checkAuthenticatePack(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'checkAuthenticatePack')
    .then(function (res) {
      res = res.length === 1 ? {} : {data: res};
      response.sendOk(res, u.metaGen(config.version, "Mohammad Rahmati"));
    })
    .fail(function (error) {
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    });
}

/**
 * بررسی تکراری بودن یا نبودن پروفایل که این کار از روی کد ملی یا شناسه ملی شرکت
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {!object} آبجکت استاندارد ورودی سرور
 * @param request.data.uniqueKey {!string} کد ملی یا شناسه ملی شرکت
 * @return {success|duplicateUser|actionError}
 */
function checkProfile(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'checkProfile')
    .then(function (res) {
      response.sendOk({}, u.metaGen(config.version, "Mohammad Rahmati"));
    })
    .fail(function (error) {
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    })
}

/**
 * تغییر رمز عبور
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {!object} آبجکت استاندارد ورودی سرور
 * @param request.data.oldPassword {!string} پسورد قبلی
 * @param request.data.newPassword {!string} پسورد جدید
 * @return {success|actionError}
 */
function changeAuthenticatePack(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'changeAuthenticatePack')
    .then(function (res) {
      res = res.length === 1 ? {} : {data: res};
      response.sendOk({data: res}, u.metaGen(config.version, "Mohammad Rahmati"));
    })
    .fail(function (error) {
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    });
}

/**
 * خروج از سیستم
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @return {success}
 */
function logout(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'logout')
    .then(function (res) {
      setCookie(res[0]);
    })
    .fail(function (error) {
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    })
}

/**
 * دریافت اطلاعات پروفایل شخص
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {?object} آبجکت استاندارد ورودی سرور
 * @param request.data.filter {?string[]} لیست فیلدهای سفارشی
 * @example {
    "data": {
        "insertDate": 13960807170524402,
        "status": "",
        "type": "",
        "firstName": "",
        "lastName": "",
        "gender": 0,
        "maritalStatus": null,
        "fatherName": " ",
        "identityNumber": 18621,
        "identitySerialNumber": "الف/26 123456",
        "idNumber": "",
        "birthday": "1367/06/12",
        "education": "  ",
        "email": "",
        "cellphoneNumbers": [
            {
                "id": 0,
                "value": ""
            },
            {
                "id": 1,
                "value": ""
            }
        ],
        "addresses": [
            {
                "id": 0,
                "province": "",
                "city": "",
                "street": "",
                "alley": "67",
                "number": 10,
                "address": "،  ",
                "postalCode": 9187153533,
                "tels": [
                    {
                        "id": 0,
                        "value": "36217793"
                    }
                ]
            }
        ],
        "tradingCode": 1,
        "knowledgeLevel": "",
        "hasTrading": 0,
        "jobs": [
            {
                "id": 0,
                "job": "برنامه نویس",
                "post": "سرور",
                "averageSalary": 15000000,
                "companyName": "پارت",
                "companyActivity": "اقتصادی",
                "postalCode": 1234567890,
                "tels": [
                    {
                        "id": 0,
                        "value": "38593380"
                    },
                    {
                        "id": 1,
                        "value": "38593384"
                    }
                ],
                "faxes": [
                    {
                        "id": 0,
                        "value": "38593380"
                    }
                ]
            }
        ],
        "assets": null,
        "accounts": [],
        "profilePicture": [],
        "identityCards": [
            {
                "id": 0,
                "name": "file name1",
                "description": "file description1",
                "data": "file",
                "status": ""
            },
            {
                "id": 1,
                "name": "file name2",
                "description": "file description2",
                "data": "file",
                "status": ""
            }
        ],
        "idCards": [
            {
                "id": 0,
                "name": "file name3",
                "description": "file description3",
                "data": "file",
                "status": ""
            }
        ],
        "accountStatements": []
    },
    "status": "success",
    "shamsiDate": 13960807185559984
}
 */
function getProfile(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'getProfile')
    .then(function (res) {
      response.sendOk(res[0].result, u.metaGen(config.version, "Mohammad Rahmati"));
    })
    .fail(function (error) {
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    })
}

/**
 * دریافت اطلاعات پروفایل شخص
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {?object} آبجکت استاندارد ورودی سرور
 * @param request.data.filter {?string[]} لیست فیلدهای سفارشی
 * @example {
    "data": {
        request.data.type {?string}
        request.data.firstName {?string}
        request.data.lastName {?string}
        request.data.gender {?string}
        request.data.maritalStatus {?string}
        request.data.fatherName {?string}
        request.data.identityNumber {?string}
        request.data.identitySerialNumber {?string}
        request.data.idNumber {?string}
        request.data.birthday {?string}
        request.data.education {?string}
        request.data.email {?string}
        request.data.cellphoneNumbers {?object[]}
       request.data.cellphoneNumbers.id {!number}
       request.data.cellphoneNumbers.value {?string}
        request.data.addresses {?object[]}
            {
                "id": 0,
                "province": "",
                "city": "",
                "street": "",
                "alley": "67",
                "number": 10,
                "address": "،  ",
                "postalCode": 9187153533,
                "tels": [
                    {
                        "id": 0,
                        "value": "36217793"
                    }
                ]
            }
        ],
        "tradingCode": 1,
        "knowledgeLevel": "",
        "hasTrading": 0,
        "jobs": [
            {
                "id": 0,
                "job": "برنامه نویس",
                "post": "سرور",
                "averageSalary": 15000000,
                "companyName": "پارت",
                "companyActivity": "اقتصادی",
                "postalCode": 1234567890,
                "tels": [
                    {
                        "id": 0,
                        "value": "38593380"
                    },
                    {
                        "id": 1,
                        "value": "38593384"
                    }
                ],
                "faxes": [
                    {
                        "id": 0,
                        "value": "38593380"
                    }
                ]
            }
        ],
        "assets": null,
        "accounts": [],
        "profilePicture": [],
        "identityCards": [
            {
                "id": 0,
                "name": "file name1",
                "description": "file description1",
                "data": "file",
                "status": ""
            },
            {
                "id": 1,
                "name": "file name2",
                "description": "file description2",
                "data": "file",
                "status": ""
            }
        ],
        "idCards": [
            {
                "id": 0,
                "name": "file name3",
                "description": "file description3",
                "data": "file",
                "status": ""
            }
        ],
        "accountStatements": []
    },
 "status": "success",
 "shamsiDate": 13960807185559984
 }
 */
function addProfile(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'editProfile')
    .then(function () {
      response.sendOk({}, u.metaGen(config.version, "Mohammad Rahmati"));
    })
    .fail(function (error) {
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    })
}

/**
 * دریافت اطلاعات پروفایل شخص
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {?object} آبجکت استاندارد ورودی سرور
 * @param request.data.filter {?string[]} لیست فیلدهای سفارشی
 * @example {
    "data": {
        request.data.type {?string}
        request.data.firstName {?string}
        request.data.lastName {?string}
        request.data.gender {?string}
        request.data.maritalStatus {?string}
        request.data.fatherName {?string}
        request.data.identityNumber {?string}
        request.data.identitySerialNumber {?string}
        request.data.idNumber {?string}
        request.data.birthday {?string}
        request.data.education {?string}
        request.data.email {?string}
        request.data.cellphoneNumbers {?object[]}
       request.data.cellphoneNumbers.id {!number}
       request.data.cellphoneNumbers.value {?string}
        request.data.addresses {?object[]}
            {
                "id": 0,
                "province": "",
                "city": "",
                "street": "",
                "alley": "67",
                "number": 10,
                "address": "،  ",
                "postalCode": 9187153533,
                "tels": [
                    {
                        "id": 0,
                        "value": "36217793"
                    }
                ]
            }
        ],
        "tradingCode": 1,
        "knowledgeLevel": "",
        "hasTrading": 0,
        "jobs": [
            {
                "id": 0,
                "job": "برنامه نویس",
                "post": "سرور",
                "averageSalary": 15000000,
                "companyName": "پارت",
                "companyActivity": "اقتصادی",
                "postalCode": 1234567890,
                "tels": [
                    {
                        "id": 0,
                        "value": "38593380"
                    },
                    {
                        "id": 1,
                        "value": "38593384"
                    }
                ],
                "faxes": [
                    {
                        "id": 0,
                        "value": "38593380"
                    }
                ]
            }
        ],
        "assets": null,
        "accounts": [],
        "profilePicture": [],
        "identityCards": [
            {
                "id": 0,
                "name": "file name1",
                "description": "file description1",
                "data": "file",
                "status": ""
            },
            {
                "id": 1,
                "name": "file name2",
                "description": "file description2",
                "data": "file",
                "status": ""
            }
        ],
        "idCards": [
            {
                "id": 0,
                "name": "file name3",
                "description": "file description3",
                "data": "file",
                "status": ""
            }
        ],
        "accountStatements": []
    },
 "status": "success",
 "shamsiDate": 13960807185559984
 }
 */
function editProfile(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'editProfile')
    .then(function (res) {
      response.sendOk(res[0].result, u.metaGen(config.version, "Mohammad Rahmati"));
    })
    .fail(function (error) {
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    })
}

/**
 * پاک کردن حساب کاربری
 * @memberOf userManager\http
 * @param request {!object} آبجکت استاندارد نود
 * @param response {!object} آبجکت استاندارد نود
 * @param request.data {!object} آبجکت استاندارد ورودی سرور
 */
function deleteUser(request, response) {
  runFunc({
    request: request,
    response: response
  }, 'deleteUser')
    .then(function () {
      response.sendOk({}, u.metaGen(config.version, "Mohammad Rahmati"));
    })
    .fail(function (error) {
      response.sendFail(error.message ? error : config.e.actionError, u.metaGen(config.version, "Mohammad Rahmati"));
    })
}
//----------------------------------------------------------------------------------------------------------------------
/**
 *  چک کردن اعتبار کپچا
 * @memberOf userManager\http
 * @param obj.request آبجکت استاندارد نود  {!object}
 * @param obj.response آبجکت استاندارد نود  {!object}
 * @param obj آبجکت ورودی {!object}
 * @param obj.token توکن ساخته شده از لاگین {!string}
 * @param obj.expireTime {!string}
 * @param obj.dataSend {!object}  داده لازم برای ارسال به کلاینت
 * @param obj.dataSend.email {!string}   ایمیل
 * @param obj.dataSend.firstName {?string} نام
 * @param obj.dataSend.lastName {?string}  نام خانوادگی
 * @param obj.dataSend.idNumber {?string}  کد ملی
 * @param obj.dataSend.nationalId {?string}  شناسه ملی شرکت
 * @param obj.dataSend.companyName {?string}  نام شرکت
 * @param obj.dataSend.type {!string}  نوع کاربر
 * @param obj.dataSend.status {!string}  وضعیت کاربر
 * @param obj.metaData {!object} آبجکت برای تنظیم هدر
 * @return {undefined}
 */
function setCookie(obj) {
  let request = obj.request,
    response = obj.response,
    token = obj.token,
    expireTime = sessionExpireTime || obj.expireTime,
    data = obj.dataSend,
    metaData = obj.metaData,
    time = new Date(expireTime);
  let hostname = request.headers.host.indexOf(':') > 0 ? request.headers.host.substr(0, request.headers.host.indexOf(':'))
    : request.headers.host;
  console.log('expireTime---->', expireTime);
  for (let key in metaData) {
    if (metaData.hasOwnProperty(key)) {
      response.setHeader(key, metaData[key]);
    }
  }
  response.writeHead(200, {
    'Content-Type': 'application/json',
    'Set-Cookie': 'token=' + token + '; expires=' + time.toUTCString() + '; Path=/' + '; Domain=' + hostname
  });
  response.end(JSON.stringify({data: data, status: 'success'}));
}

function doLogin(obj) {
  if (obj.request.data.rememberMe && [true, 'true'].indexOf(obj.request.data.rememberMe) > -1) {
    sessionExpireTime = config.sessionExpireTime;
    delete obj.request.data.rememberMe;
  }
  delete obj.request.data.captcha;
  let filter = config.afterLoginList,
    getUniqueAndExtraRes = getUniqueAndExtra(obj.request.data),
    authenticatePack = Object.assign(getUniqueAndExtraRes.uniqueFields, getUniqueAndExtraRes.extraFields),
    hash = getUniqueAndExtraRes.hash;
  console.log('obj.request.data----->', obj.request.data);
  return config.PartUserManagerInstance.login(obj.request.data, filter)
    .then(function (result) {
      console.log('result---->', result);
      result.authenticatePack = authenticatePack;
      return {
        dataSend: result
      };
    })
    .fail(function (error) {
      log.error(config.e.actionError, error);
      if (error.message) {
        setFailInRedis(JSON.stringify(hash))
          .fail(function (error) {
            log.error(config.e.actionError, error);
          });
        throw error;
      }
      else {
        throw config.e.actionError;
      }
    });

  function setFailInRedis(username) {
    return config.redisDb1.get(username)
      .then(function (res) {
        res = res || 0;
        if (res < config.failLoginCount) {
          res = res + 1;
          return config.redisDb1.setex(username, config.failTime, res);
        }
        return config.redisDb1.setex(username, config.blockTime, res);
      })
  }
}

function checkFailLogin(obj) {
  let hash = getUniqueAndExtra(obj.request.data).hash;
  return config.redisDb1.get(JSON.stringify(hash))
    .then(function (res) {
      if (!res || res < config.failLoginCount) {
        return true;
      }
      throw config.e.failLoginCount;
    })
}

function doSignUp(obj) {
  let password = obj.request.data.password || obj.password;
  obj.request.data.password = password;
  obj.request.data.uniqueKey = obj.uniqueKey;
  return config.PartUserManagerInstance.signUp(u.cloneObject(obj.request.data))
    .then(function () {
      return {password: password};
    });
}

function doCheckProfile(obj) {
  let data = {};
  if (obj.uniqueKey || obj.request.data.uniqueKey) {
    data["uniqueKey"] = obj.uniqueKey;
  }
  else if (obj.request.data.idNumber) {
    data["idNumber"] = obj.request.data.idNumber
  }
  else {
    data["nationalId"] = obj.request.data.nationalId
  }
  return config.PartUserManagerInstance.checkProfile(data);
}

function doCheckAuthenticatePack(obj) {
  if (obj.request.data.oldPassword) {
    obj.request.data.password = obj.request.data.oldPassword;
    delete obj.request.data.oldPassword;
  }
  let getUniqueAndExtraRes = getUniqueAndExtra(obj.request.data),
    data = {authenticatePack: getUniqueAndExtraRes.uniqueFields};
  return config.PartUserManagerInstance.checkAuthenticatePack(data);
}

function doGetCaptcha() {
  let defer = q.defer();
  if (config.useCaptcha.getCaptcha) {
    let options = config.captchaOptions;
    options.method = 'GET';
    return u.sendRequest(options, 'get');
  }
  else {
    defer.resolve({
      data: {
        token: null,
        img: null,
        message: 'Captcha is disabled.'
      }
    });
  }
  return defer.promise;
}

function doneForgetPassword(obj) {
  let getUniqueAndExtraRes = getUniqueAndExtra(obj.request.data);
  return config.PartUserManagerInstance.getProfile(obj.request.data)
    .then(function (result) {
      result = result[0];
      if (!result.email) {
        throw config.e.infoNotFound;
      }
      let data = {
          type: result.type,
          email: result.email
        },
        token = getUniqueAndExtraRes.hash,
        link = config.nextLink + token;

      return {
        options: {
          text: "فراموشی رمز عبور",
          from: "info@rasamfunds.com",
          to: data.email,
          cc: "",
          subject: "ارسال لینک تغییر رمز عبور",
          attachment: [
            {
              data: "<!DOCTYPE html>\
   <html>\
   <head>\
   <meta charset='utf-8'>\
   <meta http-equiv='X-UA-Compatible' content='IE=edge'>\
   <title>لینک تغییر رمز عبور</title>\
   </head>\
   <div style='text-align:center;border-top: 3px solid #00b0ff;width: 100%'>\
   <p>" + link + "</p>\
   </div>\
   </html>",
              alternative: true
            }
          ]
        }
      };
    })
}

function doSetAuthenticatePack(obj) {
  return db.getInfoByToken(obj.request.data.token || '')
    .then(function (userInfo) {
      if (!userInfo) {
        throw config.e.accessDenied;
      }
      let getUniqueAndExtraRes = getUniqueAndExtra(obj.request.data),
        authenticatePack = getUniqueAndExtraRes.uniqueFields;
      if (check2Obj(authenticatePack, userInfo.authenticatePack)) {
        log.error(config.e.requestNotBelongToThisUser);
        if (userInfo.repeat > 2) {
          db.deleteInfoByToken(obj.request.data.token || '');
          throw config.e.requestExpired;
        }
        else {
          userInfo["repeat"] = +userInfo.repeat + 1;
          db.saveInfoInRedis(u.cloneObject(userInfo));
          throw config.e.requestNotBelongToThisUser;
        }
      }
      return config.PartUserManagerInstance.changeAuthenticatePack(
        {
          authenticatePackOld: userInfo.authenticatePack
        },
        {
          authenticatePackNew: Object.assign(getUniqueAndExtraRes.uniqueFields, getUniqueAndExtraRes.extraFields)
        }
      );
    });

  function check2Obj(o1, o2) {
    let len = Object.keys(o1);
    if (len.length !== Object.keys(o2).length) {
      return false;
    }
    for (let i = 0; i < len.length; i++) {
      if (!o2[len[i]] || o1[len[i]] !== o2[len[i]]) {
        return false;
      }
    }
    return true;
  }
}

/**
 * ارسال ایمیل
 * @memberOf userManager\http
 * @param obj {!object}
 * @param obj.options مشخصات ارسال ایمیل
 * @param obj.options.text  {string} تیتر ایمیل
 * @param obj.options.from  {string} ایمیل ارسال کننده
 * @param obj.options.to  {string} ایمیل دریافت کننده
 * @param obj.options.cc  {string} cc
 * @param obj.options.subject {string} موضوع
 * @param obj.options.attachment {object[]} فایل ضمیمه
 * @param obj.options.attachment[].data {string} محتوای اچ تی ام ال
 * @param obj.options.attachment[].alternative {boolean} true / false
 * @returns {Promise.<success>||Promise.<actionError>}
 */
function sendEmail(obj) {
  let defer = q.defer(),
    options = obj.options,
    server = email.server.connect(config.connectConfig);
  server.send(options, function (e, r) {
    if (e) {
      log.error(config.e.actionError, e);
      throw config.e.actionError;
    }
    defer.resolve(r);
  });
  return defer.promise;
}

function setSession(obj) {
  let defer = q.defer();
  console.log('obj.dataSend---->', obj.dataSend);
  obj.dataSend.sessionExpireTime = sessionExpireTime;
  obj.request.session.start(obj.dataSend.token, obj.dataSend,
    function (err, res) {
      if (err) {
        log.error(config.e.connectDBError, err);
        throw err;
      }
      obj.request.session.set(obj.dataSend, function (err2) {
        if (err2) {
          log.error(config.e.connectDBError, err2);
          throw err2;
        }
        defer.resolve({
          token: res.token,
          expireTime: res.expireTime,
          metaData: u.metaGen(config.version, "Mohammad Rahmati")
        });
      });
    });
  return defer.promise;
}

function runFunc(data, name, func, defer) {
  console.log('name---->', name);
  defer = defer || q.defer();
  func = func || config.funcState[name];
  if (func) {
    let promises = [];
    func.forEach(function (item) {
      promises.push(runSeriesArray(item))
    });
    return q.all(promises);
  }
  else {
    log.error(config.e.invalidFuncConfig);
    defer.reject(config.e.actionError);
  }
  return defer.promise;

  function runSeriesArray(array, index, defer, oldResult) {
    defer = defer || q.defer();
    oldResult = oldResult || {};
    index = index || 0;
    data = Object.assign(data, oldResult);
    functions[array[index]](data, name)
      .then(function (result) {
        console.log('result-------' + index + '------', result);
        if (result.data) {
          if (Array.isArray(result.data)) {
            result.data.forEach(function (row) {
              oldResult = Object.assign(oldResult, row);
            })
          }
          else if (typeof result.data === 'object') {
            oldResult = Object.assign(oldResult, result.data);
          }
        }
        else {
          if (Array.isArray(result)) {
            result.forEach(function (row) {
              oldResult = Object.assign(oldResult, row);
            })
          }
          else if (typeof result === 'object') {
            oldResult = Object.assign(oldResult, result);
          }
        }
        index++;
        if (index < array.length) {
          runSeriesArray(array, index, defer, oldResult);
        }
        else {
          defer.resolve(Object.assign(data, oldResult));
        }
      })
      .fail(function (error) {
        console.log('error in function ' + array[index] + ': ', error);
        log.error(config.e.actionError, error);
        defer.reject(error);
      });
    return defer.promise;
  }
}

/**
 * بررسی صحت متن وارد شده کاربر برای کپچا
 * @memberOf userManager\http
 * @param values {!object} ابجکت محتوای کپچا
 * @param values.token {!string}  توکن
 * @param values.value {!string} مقدار وارد شده کاربر
 * @param name {!string} نام تابعی که کبچا در آن استفاده شده است
 * @return{undefined|connectCaptchaError}
 */
function checkCaptcha(obj, name) {
  let defer = q.defer();
  if (config.useCaptcha[name]) {

    config.captchaOptions.method = 'POST';
    u.sendRequest(config.captchaOptions, 'check', {
      token: obj.request.data.captcha.token,
      value: obj.request.data.captcha.value
    })
      .then(function () {
        defer.resolve('captcha:success');
      })
      .fail(function (error) {
        defer.reject(error);
        log.error(config.e.actionError, error);
      });
  }
  else {
    defer.resolve('captcha:success');
  }
  return defer.promise;
}

function doChangeAuthenticatePack(obj) {
  return config.PartUserManagerInstance.authorized(obj.request.data.oldAuthenticatePack)
    .then(function () {
      console.log('after authorize------------------------------------');
      return config.PartUserManagerInstance.changeAuthenticatePack(obj.request.data);
    });
}

function doLogout(obj) {
  let defer = q.defer();
  obj.request.session.remove(function (error, result) {
    if (error) {
      log.error(config.e.actionError, error);
      defer.reject();
    }
    defer.resolve('success');
  });
  return defer.promise;
}

function getSession(obj) {
  let defer = q.defer();
  obj.request.session.get(['authenticatePack', 'type', 'legalType', 'idNumber', 'nationalId'],
    function (error, sessionGetResult) {
      if (error) {
        log.error(config.e.actionError, error);
        throw error;
      }
      defer.resolve({
        authenticatePack: sessionGetResult.authenticatePack,
        type: sessionGetResult.type,
        legalType: sessionGetResult.legalType,
        idNumber: sessionGetResult.idNumber,
        nationalId: sessionGetResult.nationalId
      })
    });
  return defer.promise;
}

function doGetProfile(obj) {
  let filter = obj.request.data && obj.request.data.filter || [];
  let getUserProfile = {authenticatePack: obj.authenticatePack};
  if (filter.length) {
    getUserProfile['filter'] = filter;
  }
  return config.PartUserManagerInstance.getProfile(getUserProfile)
    .then(function (result) {
      console.log('-------------------->', result);
      return {result: result};
    });
}

function doEditProfile(obj) {
  let data = obj.request.data,
    defer = q.defer();
  if (!data) {
    defer.resolve({result: {}});
    return;
  }
  data[obj.type === 'real' ? 'idNumber' : 'nationalId'] = obj.idNumber.toString() ||
    obj.nationalId.toString();
  data.type = obj.type;
  if (obj.type !== 'real') {
    data['legalType'] = obj.legalType;
  }
  config.PartUserManagerInstance.editProfile(data)
    .then(function (result) {
      console.log('result.data[obj.type]---------->', result.data);
      defer.resolve({result: result.data[obj.type][0]});
    })
    .fail(function (error) {
      log.error(config.e.actionError, error);
      defer.reject(error);
    });
  return defer.promise;
}

function doDeleteUser(obj) {
  let deleteUserData = {
    type: obj.type,
    uniqueKey: (obj.uniqueKey || obj.idNumber || obj.nationalId) + ''
  };
  deleteUserData = Object.assign(deleteUserData, obj.authenticatePack);
  console.log('deleteUserData---->', deleteUserData);
  return config.PartUserManagerInstance.deleteUser(deleteUserData);
}

function doAddProfile(obj) {
  let data = obj.request.data;
  return config.PartUserManagerInstance.addProfile(data);
}

function getUniqueAndExtra(obj) {
  let combination = config.combination,
    uniqueFields = {},
    extraFields = {};

  for (let j = 0; j < combination.length; j++) {
    for (let i = 0; i < combination[j].uniqueFields.length; i++) {
      if (obj[combination[j].uniqueFields[i]]) {
        uniqueFields[combination[j].uniqueFields[i]] = obj[combination[j].uniqueFields[i]];
      }
      else {
        uniqueFields = {};
        break;
      }
    }
    for (let i = 0; i < combination[j].extraFields.length; i++) {
      if (obj[combination[j].extraFields[i]]) {
        extraFields[combination[j].extraFields[i]] = obj[combination[j].extraFields[i]];
      }
      else {
        extraFields = {};
        break;
      }
    }
    if (Object.keys(uniqueFields).length) {
      console.log('uniqueFields---->', uniqueFields);
      console.log('extraFields---->', extraFields);
      return {
        hash: crypto.createHash('md5').update(JSON.stringify(uniqueFields)).digest('hex'),
        uniqueFields: uniqueFields,
        extraFields: extraFields
      };
    }
  }
}

function makeUniqueKey(obj) {
  let defer = q.defer();
  defer.resolve({uniqueKey: obj.request.data.cellphoneNumbers[0].value});
  return defer.promise;
}

function makePassword(obj) {
  let defer = q.defer();
  defer.resolve({password: crypto.createHash('md5').update(JSON.stringify(obj.request.data.cellphoneNumbers[0])).digest('hex')});
  return defer.promise;
}

function sendSMSandEmail(obj) {
  return mi.send({
    "user": obj.request.data.username,
    "channels": config.channels,
    "messageText": config.messageText + '\n ' + obj.request.data.password,
    "subject": "سامانه رسام",
    "receivers": [
      {"receiverId": "part_admin", "mobile": obj.request.data.username, "email": obj.request.data.email}
    ]
  })
    .then(function (result) {
      return result;
    });
}