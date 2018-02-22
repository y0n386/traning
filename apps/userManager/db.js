//create Mohammad.Rahmati 1396/08/08
/**
 * @namespace userManager\db
 */
let log = require('partLogger'),
  config = require('./config');
/**
 * ذخیره در ردیس
 * @memberOf userManager\db
 * @param data {!object} داده برای ذخیره شدن
 * @return {Promise.<success>|Promise.<connectDBError>}
 */
function saveInfoInRedis(data) {
  return config.redisDb1.setex(data.token, config.redisTime, data)
    .fail(function (error) {
      setTimeout(function () {
        log.error(config.e.connectDBError, error);
        saveInfoInRedis(data)
      }, 0);
    });
}
/**
 * دریافت از ردیس با یک کلید مثل توکن
 * @memberOf userManager\db
 * @param token {!string} توکن
 * @return {Promise.<success>|Promise.<connectDBError>}
 */
function getInfoByToken(token) {
  return config.redisDb1.get(token)
    .then(function (result) {
      return result;
    })
    .fail(function (error) {
      setTimeout(function () {
        log.error(config.e.connectDBError, error);
        getInfoByToken(token)
      }, 0);
    });
}
/**
 * پاک کردن ردیس با یک کلید مثل توکن
 * @memberOf userManager\db
 * @param token {!string} توکن
 * @return {Promise.<success>}
 */
function deleteInfoByToken(token) {
  return config.redisDb1.del(token);
}

exports.getInfoByToken = getInfoByToken;
exports.saveInfoInRedis = saveInfoInRedis;
exports.deleteInfoByToken = deleteInfoByToken;