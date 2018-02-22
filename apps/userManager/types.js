/**
 * Created by Majid on 9/3/2017.
 */

/**
 * توصیف کننده محل روی دادن خطا
 * @typedef {Object} eventInfo
 * @property {!string} code کد رویداد
 * @property {!string} sourceType نوع محل رویداد
 * @property {!string} sourceName نام محل رویداد
 * @property {!string} level سطح رویداد
 */

/**
 * ارائه‌دهنده‌ی پیام خطا
 * @typedef {Object|string[]} eventMessage
 * @property {?string} [fa] متن فارسی خطا
 * @property {!string} [en] متن انگلیسی خطا
 */

/**
 * پارامتر ورودی برای تنظیمات معتبر نمی باشد!
 * @typedef {Object} invalidConfigParam
 * @property {!eventInfo} info
 * @property {!eventMessage} [message]
 */

/**
 * خطا در انجام عملیات
 * @typedef {Object} actionError
 * @property {!eventInfo} info
 * @property {!eventMessage} [message]
 */

/**
 * کاربر تکراری است
 * @typedef {Object} duplicateUser
 * @property {!eventInfo} info
 * @property {!eventMessage} [message]
 */

/**
 * خطا در برقراری با سرویس کپچا
 * @typedef {Object} connectCaptchaError
 * @property {!eventInfo} info
 * @property {!eventMessage} [message]
 */

/**
 * درخواست منقضی شده است
 * @typedef {Object} requestExpired
 * @property {!eventInfo} info
 * @property {!eventMessage} [message]
 */

/**
 * خطا در پردازش اطلاعات!
 * @typedef {Object} processError
 * @property {!string} code کد خطا = "processError"
 * @property {!eventMessage} [message]
 */

/**
 * خطا در برقراری ارتباط با سرویس پروفایل!
 * @typedef {Object} authenticationConnError
 * @property {!string} code کد خطا = "authenticationConnError"
 * @property {!eventMessage} [message]
 */

/**
 * خطا در برقراری ارتباط با پایگاه داده!
 * @typedef {Object} dbConnError
 * @property {!string} code کد خطا = "dbConnError"
 * @property {!eventMessage} [message]
 */

/**
 * خطای اعتبارسنجی داده های ورودی
 * @typedef {Object} validationError
 * @property {!string} code کد خطا = "validationError"
 * @property {!eventMessage} [message]
 */

/**
 * رمز کاربر اشتباه است!
 * @typedef {Object} wrongPassword
 * @property {!string} code کد خطا = "wrongPassword"
 * @property {!eventMessage} [message]
 */

/**
 * نام کاربری/رمز سامانه اشتباه است!
 * @typedef {Object} wrongUserPass
 * @property {!string} code کد خطا = "wrongUserPass"
 * @property {!eventMessage} [message]
 */

/**
 * دسترسی غیر مجاز!
 * @typedef {Object} accessDenied
 * @property {!string} code کد خطا = "accessDenied"
 * @property {!eventMessage} [message]
 */

/**
 * سامانه یافت نشد!
 * @typedef {Object} systemNotFound
 * @property {!string} code کد خطا = "systemNotFound"
 * @property {!eventMessage} [message]
 */

/**
 * کاربر یافت نشد!
 * @typedef {Object} userNotFound
 * @property {!string} code کد خطا = "userNotFound"
 * @property {!eventMessage} [message]
 */

/**
 * عملیات موفق
 * @typedef {Object} success
 * @property {!string} status وضعیت = "success"
 * @property {!number} shamsiDate تاریخ
 */

/**
 * آبجکت نام کاربری و رمز
 * @typedef {Object} usernamePasswordObject
 * @property {!string} username نام کاربری
 * @property {!string} password رمز کاربر جدید: در صورتی که هنگام ایجاد کاربر، رمز توسط سامانه ایجاد شده باشد، مقدار این فیلد برابر با رمز تولید شده و در غیر اینصورت برابر با تعدادی ستاره خواهد بود.
 */

/**
 * درج کاربر
 * @typedef {Object} addUserSuccess
 * @property {!usernamePasswordObject} data نام کاربری و رمز کاربر تازه ایجاد شده
 * @property {!string} status وضعیت = "success"
 * @property {!number} shamsiDate تاریخ
 */

/**
 * تنظیم وضعیت کاربر
 * @typedef {Object} setStatusSuccess
 * @property {!string} status وضعیت = "success"
 * @property {!number} shamsiDate تاریخ
 */

/**
 * حذف کاربر
 * @typedef {Object} removingUser
 * @property {!string} username نام کاربری
 */

/**
 * کاربر
 * @typedef {Object} user
 * @property {!string} username نام کاربری
 * @property {!string} status وضعیت
 */

/**
 * دریافت موفق همه کاربران
 * @typedef {Object} getAllUsersSuccess
 * @property {!user[]} data لیست کاربران
 * @property {!string} status وضعیت = "success"
 * @property {!number} shamsiDate تاریخ
 */
