var u = require('partUtilities'),
  config = require('../config.js'),
  schema = require('../schema.js'),
  fs = require('fs'),
  java = require('java');
var requ = require('request');
var java = require('java');
var fs = require('fs');
var exec = require('child_process').exec;
let path = require('path');
// java.classpath.push('./apps/access.jar');
var ToShamsi = require('partUtilities').toShamsi;

exports.httpHandlers = {
    a2Json: {
        POST: {
            function: a2Json
        }
    },
    realLegalInvestorsExcel: {
        POST: {
            function: realLegalInvestorsExcel
        }
    },
    fundInfoExcel: {
        POST: {
            function: fundInfoExcel
        }
    },
    getAllFund: {
        GET: {
            function: getAllFund
        }
    }
};

function a2Json (request, response) {
    console.log('>>>>>>>>>>a2json calllllled');

    function oracleDateConverter () {
        var date = new Date(),
          month, day, temp, hour, minute, second, milliSecond;
        month = date.getMonth() + 1;
        day = date.getDate();
        temp = ToShamsi(date.getFullYear(), date.getMonth() + 1, date.getDate())
          .split('/');
        temp[0] = temp[0].trim();
        temp[1] = temp[1].trim();
        temp[2] = temp[2].trim();
        if (1 <= temp[1] && temp[1] <= 9) {
            month = '0' + temp[1];
        }
        else {
            month = temp[1];
        }
        if (1 <= temp[2] && temp[2] <= 9) {
            day = '0' + temp[2];
        }
        else {
            day = temp[2];
        }
        hour = date.getHours();
        if (hour == '0') {
            hour = '00';
        }
        if (1 <= hour && hour <= 9) {
            hour = '0' + hour;
        }
        minute = date.getMinutes();
        if (minute == '0') {
            minute = '00';
        }
        if (1 <= minute && minute <= 9) {
            minute = '0' + minute;
        }
        second = date.getSeconds();
        if (1 <= second && second <= 9) {
            second = '0' + second;
        }
        if (second == '0') {
            second = '00';
        }
        milliSecond = date.getMilliseconds();
        if (milliSecond == '0') {
            milliSecond = '000';
        }
        if (1 <= milliSecond && milliSecond <= 9) {
            milliSecond = '00' + milliSecond;
        }
        else if (10 <= milliSecond && milliSecond <= 99) {
            milliSecond = '0' + milliSecond;
        }
        var rand = Math.floor((Math.random() * 100) + 1);
        return +temp[0] + month + day;
        //+ hour + minute +
        //second + milliSecond;
    }

    // var rightNow = new Date();
    // var rightNowToString = rightNow.toISOString().slice(0, 10).replace(/-/g, "");

    // var rightNow =jalaali.toJalaali(new Date());
    //  var rightNowToString = rightNow.toString().slice(0,10).replace(/-/g,"");

// var date=new Date("yyyymmdd");
//     console.log('tariikhe emroz',date.getDate() );
    // var getArray = [];
    // requ({
    //         method: 'GET'
    //         , url: 'http://192.168.1.124:8080/service/dataWarehouseApi/fundInfo?all=true',
    //     },
    //     function (error, resp, body) {
    //
    //         if (error === null) {
    //              // console.log("get response", resp.body);
    //             getArray = JSON.parse(resp.body);
    //             // console.log("getArray response", getArray);
    //             //
    //             // response.writeHead(200, 'Content-Type', 'application/json');
    //             // response.end(getArray);
    //         } else {
    //             console.log('>>>>>>>>>>get err', error);
    //             // response.writeHead(404, 'Content-Type', 'application/json');
    //             // response.end(error);
    //         }
    //     }

    // console.log('>>>>>>>>>>uploaded file   ', (process.cwd() + path.sep + request.uploadedFilePath).replace("\\","\\\\"));
    // console.log('>>>>>>>>>>java file       ', __dirname + path.sep + 'access_data_rasam_FINAL.jar');
    // console.log('>>>>>>>>>>text file       ', __dirname + path.sep + (request.uploadedFilePath.split(path.sep)[1]).replace('accdb', 'txt'));
    //console.log('>>>>>>>>>>alan', moment.now());
    var accessFile = process.cwd() + '\\' + request.uploadedFilePath;
    accessFile = accessFile.replace(/\\/g, '\\\\');
    var javaFile = __dirname + path.sep + 'access_data_rasam_FINAL.jar';
    javaFile = javaFile.replace(/\\/g, '\\\\');
    var textJsonFile = __dirname + path.sep + (request.uploadedFilePath.split(path.sep)[1]).replace('accdb', 'txt');
    textJsonFile = textJsonFile.replace(/\\/g, '\\\\');
    // console.log('my address      ', 'java -jar ' + javaFile + ' \\"jdbc:ucanaccess://' + accessFile + '\\" ' + textJsonFile);

    // var child = exec('java -jar C:\\Users\\iman\\Desktop\\access_data_rasam_FINAL.jar \"jdbc:ucanaccess://C:\\Users\\iman\\Desktop\\mutualfunds.accdb\" C:\\Users\\iman\\Desktop\\temp222.txt',
    var child = exec('java -jar ' + javaFile + ' "jdbc:ucanaccess://' + accessFile + '" ' + textJsonFile,
      function (error, stdout, stderr) {
          if (error) {
              return console.log('Error -> ' + error);
          }
          fs.readFile(textJsonFile, function (err, data) {
              if (error) {
                  return console.log('Error -> ' + error);
              }
              var array1 = [];
              try {
                  array1 = JSON.parse(data);

                  //     //tempp
                  //
                  //     var tempp = JSON.parse(data);
                  //     response.writeHead(200, {'Content-Type': 'text/html'});
                  //     response.write(JSON.stringify(tempp));
                  //     response.end();
                  //     //tempp
              }
              catch (error) {
                  console.log('Error -> ' + error);
              }

              var newArray = {};
              var finalArray = [];

              for (var i = 0; i < array1.length; i++) {
                  for (var j = 0; j < array1[i].length; j++) {
                      array1[i][j]['شماره ثبت نزد سازمان'] = parseInt(array1[i][j]['شماره ثبت نزد سازمان']);
                      if (typeof newArray[array1[i][j]['شماره ثبت نزد سازمان']] === 'undefined')
                          newArray[array1[i][j]['شماره ثبت نزد سازمان']] = {};

                      var modirSarmaye = [];

                      var obj = Object.keys(array1[i][j]);
                      for (var k = 0; k < obj.length; k++) {

                          switch (obj[k]) {

                              case 'شماره ثبت نزد سازمان':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['sabtSazman'] = '' + array1[i][j][obj[k]] + '';
                                  break;

                              case 'متولی':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['motevalli'] = array1[i][j][obj[k]];
                                  break;

                              case 'نام صندوق سرمایه گذاری ':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundName'] = array1[i][j][obj[k]];
                                  break;

                              case 'ضامن نقدشوندگی / بازارگردان':
                              case 'ضامن نقدشوندگی _ بازارگردان':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['zamenNaghd'] = array1[i][j][obj[k]];
                                  break;

                              case 'ضامن سود آوری':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['zamenSood'] = array1[i][j][obj[k]];
                                  break;

                              case 'حسابرس_ موسسه حسابرسی ':
                              case 'حسابرس':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['hesabras'] = array1[i][j][obj[k]];
                                  break;

                              case 'مدیر ثبت':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['modirSabt'] = array1[i][j][obj[k]];
                                  break;

                              case 'مدیر اجرا':
                                  // if (array1[i][j][obj[k]] == "null" || array1[i][j][obj[k]] == null) {
                                  //     newArray[array1[i][j]['شماره ثبت نزد سازمان']]["modirEjra"] = null;
                                  // }
                                  // else {
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['modirEjra'] = array1[i][j][obj[k]];
                                  // }
                                  break;

                              case 'مدیر صندوق':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['modir'] = array1[i][j][obj[k]];
                                  break;

                              case 'تلفن':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['tel'] = array1[i][j][obj[k]];
                                  break;

                              case 'پایگاه الکترونیکی':


                                  // var site;
                                  //   var string1 = "" + array1[i][j][obj[k]] + "";

                                  if (array1[i][j][obj[k]] == '' || array1[i][j][obj[k]] == 'null' || array1[i][j][obj[k]] == null) {
                                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['site'] = '';
                                  }

                                  else {

                                      // problem
                                      // if (array1[i][j][obj[k]].indexOf("http://") == -1) {
                                      var hasHttp = array1[i][j][obj[k]].search('http');
                                      var hasHttpU = array1[i][j][obj[k]].search('HTTP');
                                      if (hasHttp == -1 && hasHttpU == -1) {
                                          //problem
                                          // console.log('has no http   ', array1[i][j][obj[k]]);
                                          var address = 'http://' + array1[i][j][obj[k]];
// AZ # BE BAD HAZF SHE
                                          var sharpLocation1 = address.search('#');
                                          address = address.slice(0, sharpLocation1);
                                          var validSite1 = address.replace(/index.do/g, '');
                                          newArray[array1[i][j]['شماره ثبت نزد سازمان']]['site'] = validSite1;
                                      }
                                      else {

                                          // AZ # BE QABL HAZF SHE

                                          var firstSharpLocation = array1[i][j][obj[k]].search('#');

                                          var deletedDuplicate = array1[i][j][obj[k]].substr(firstSharpLocation);
                                          var validSite2 = deletedDuplicate.replace(/index.do/g, '');
                                          // var validSite = validSite1.substr(1).slice(0, -1);
                                          var validSite = validSite2.replace(/#/g, '');
                                          newArray[array1[i][j]['شماره ثبت نزد سازمان']]['site'] = validSite;

                                      }

                                  }
                                  //  console.log('site   ', validSite);
                                  //   else {
                                  //     if (string1.indexOf("http://") != -1) {
                                  //        var validSiteAddress = string1.slice(8);
                                  //         site = url.parse(validSiteAddress, true);
                                  //         newArray[array1[i][j]['شماره ثبت نزد سازمان']]["site"] = site.pathname;
                                  //
                                  //     //  if (array1[i][j][obj[k]] != null && array1[i][j][obj[k]] != "null") {
                                  //     //  var site = array1[i][j][obj[k]].split("/");
                                  //
                                  //
                                  //     // newArray[array1[i][j]['شماره ثبت نزد سازمان']]["site"] =site[0]+site[1]+site[2];
                                  //
                                  //     /// }
                                  //     //else {
                                  //     newArray[array1[i][j]['شماره ثبت نزد سازمان']]["site"] = site.pathname;
                                  //     console.log('site  ', site.pathname);
                                  // }

                                  //     else {
                                  //         site = url.parse(string1, true);
                                  //         newArray[array1[i][j]['شماره ثبت نزد سازمان']]["site"] = site.pathname;
                                  //         console.log('site  ', site.pathname);
                                  //
                                  //     }
                                  // }
                                  break;

                              case 'دارندگان واحدهای ممتاز / مدیریتی':
                              case 'دارندگان واحدهای ممتاز _ مدیریتی':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['darandegan'] = array1[i][j][obj[k]];
                                  break;

                              case 'مدیر سرمایه گذاری1':
                              case 'مدیر سرمایه گذاری2':
                              case 'مدیر سرمایه گذاری3':
                                  modirSarmaye.push(array1[i][j][obj[k]]);
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['modirSarmaye'] = modirSarmaye.join(',');
                                  break;
                              case 'تاریخ شروع فعالیت':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['tarikhShoro'] = array1[i][j][obj[k]];
                                  break;

                              case 'تاریخ پایان فعالیت':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['tarikhPayan'] = array1[i][j][obj[k]];
                                  break;

                              case 'سقف واحدها':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['remaining'] = array1[i][j][obj[k]];
                                  break;

                              case 'شناسه ملی':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['shenaseMelli'] = parseFloat(array1[i][j][obj[k]]).toFixed(0);
                                  break;

                              case 'صندوق سرمایه گذاری اختصاصی بازارگردانی':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['bazargardan'] = array1[i][j][obj[k]];
                                  break;

                              case 'قابلیت معامله':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['moamele'] = array1[i][j][obj[k]];
                                  break;

                              case 'تضمین سود':
                                  if (array1[i][j][obj[k]] == true || array1[i][j][obj[k]] == 'true' || array1[i][j][obj[k]] == 'TRUE') {
                                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['soodTazmin'] = '1.0';
                                  }
                                  else if (array1[i][j][obj[k]] == false || array1[i][j][obj[k]] == 'false' || array1[i][j][obj[k]] == 'FALSE') {
                                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['soodTazmin'] = '0.0';

                                  } else {
                                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['soodTazmin'] = array1[i][j][obj[k]];
                                  }
                                  break;

                              case 'نماد صندوق':
                                  // if (array1[i][j][obj[k]] == "null" || array1[i][j][obj[k]] == null) {
                                  //     newArray[array1[i][j]['شماره ثبت نزد سازمان']]["symbol"] = null;
                                  // }
                                  // else {
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['symbol'] = array1[i][j][obj[k]];
                                  // }
                                  break;

                              case 'پرداخت سود':
                                  if (array1[i][j][obj[k]] == true || array1[i][j][obj[k]] == 'true' || array1[i][j][obj[k]] == 'TRUE') {
                                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['soodGhabl'] = '1.0';
                                  }
                                  else if (array1[i][j][obj[k]] == false || array1[i][j][obj[k]] == 'false' || array1[i][j][obj[k]] == 'FALSE') {
                                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['soodGhabl'] = '0.0';

                                  } else {
                                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['soodGhabl'] = array1[i][j][obj[k]];
                                  }
                                  break;

                              case 'نرخ سود':
                                  newArray[array1[i][j]['شماره ثبت نزد سازمان']]['soodPishbini'] = array1[i][j][obj[k]];
                                  break;

                              case 'نوع صندوق':

                                  switch (array1[i][j][obj[k]]) {

                                      case 'در اوراق بهادار با درآمد ثابت':
                                      case 'تنها در اوراق بهادار با درآمد ثابت':
                                          if (newArray[array1[i][j]['شماره ثبت نزد سازمان']]['moamele'] == 1)
                                              newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundTypeId'] = 43;
                                          else if (newArray[array1[i][j]['شماره ثبت نزد سازمان']]['bazargardan'] == 1)
                                              newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundTypeId'] = 60;
                                          else if (newArray[array1[i][j]['شماره ثبت نزد سازمان']]['bazargardan'] == 0 && newArray[array1[i][j]['شماره ثبت نزد سازمان']]['moamele'] == 0)
                                              newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundTypeId'] = 30;

                                          break;

                                      case 'در سهام':
                                          if (newArray[array1[i][j]['شماره ثبت نزد سازمان']]['moamele'] == 1)
                                              newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundTypeId'] = 41;
                                          else if (newArray[array1[i][j]['شماره ثبت نزد سازمان']]['bazargardan'] == 1)
                                              newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundTypeId'] = 60;
                                          else if (newArray[array1[i][j]['شماره ثبت نزد سازمان']]['bazargardan'] == 0 && newArray[array1[i][j]['شماره ثبت نزد سازمان']]['moamele'] == 0)
                                              newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundTypeId'] = 10;

                                          break;

                                      case 'مختلط':
                                          if (newArray[array1[i][j]['شماره ثبت نزد سازمان']]['moamele'] == 1)
                                              newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundTypeId'] = 42;
                                          else if (newArray[array1[i][j]['شماره ثبت نزد سازمان']]['bazargardan'] == 1)
                                              newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundTypeId'] = 60;
                                          else if (newArray[array1[i][j]['شماره ثبت نزد سازمان']]['bazargardan'] == 0 && newArray[array1[i][j]['شماره ثبت نزد سازمان']]['moamele'] == 0)
                                              newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundTypeId'] = 20;

                                          break;

                                      case 'در اوراق بهادار مبتنی بر سکه طلا':
                                          newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundTypeId'] = null;
                                          break;

                                  }

                          }

                      }

                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['fundType'] = null;
                      // newArray[array1[i][j]['شماره ثبت نزد سازمان']]["fundName"] = null;
                      // newArray[array1[i][j]['شماره ثبت نزد سازمان']]["fundEngName"] = null;
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['zamenSoodKhesarat'] = null;
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['siteType'] = null;
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['tahod'] = null;
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['tarikhEnhelal'] = null;
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['sabtSherkat'] = null;
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['darandeganReal'] = null;
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['darandeganLegal'] = null;
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['soodDore'] = null;
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['soodTarikhPardakht'] = null;
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['date'] = oracleDateConverter();
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['zamenKhesarat'] = null;
                      newArray[array1[i][j]['شماره ثبت نزد سازمان']]['abilityToDeal'] = null;

                  }

              }

              var keys = Object.keys(newArray);
              for (var m = 0; m < keys.length; m++) {
                  finalArray.push(newArray[keys[m]]);
              }
              console.log('loops finished');

              console.log('finaaal  ', finalArray);
              response.writeHead(200, {'Content-Type': 'text/html'});
              response.write(JSON.stringify(finalArray));
              response.end();

              requ({
                  method: 'PUT',
                  url: 'http://192.168.1.126/service/dataWarehouseApi/fundInfo',
                  json: finalArray

                  // json: [
                  //
                  //     {
                  //         sabtSazman: '10581',
                  //         modirSabt: '-',
                  //         modir: 'کارگزاری بانک کارآفرین',
                  //         motevalli: 'موسسه حسابرسی و خدمات مالی فاطر',
                  //         zamenNaghd: 'بانک کارآفرین',
                  //         zamenSood: 'بانک اقتصاد نوین',
                  //         hesabras: 'فریوران ',
                  //         modirEjra: null,
                  //         fundType: null,
                  //         fundName: null,
                  //         fundEngName: null,
                  //         zamenSoodKhesarat: null,
                  //         siteType: null,
                  //         tahod: null,
                  //         tarikhEnhelal: null,
                  //         sabtSherkat: null,
                  //         darandeganReal: null,
                  //         darandeganLegal: null,
                  //         soodDore: null,
                  //         soodTarikhPardakht: null,
                  //         date: '13961026',
                  //         zamenKhesarat: null,
                  //         abilityToDeal: null,
                  //         darandegan: 'بانك كارآفرين (0.95) كارگزاري بانك كارآفرين (0.05)',
                  //         bazargardan: '0.0',
                  //         symbol: null,
                  //         soodGhabl: '0.0',
                  //         moamele: '0.0',
                  //         soodPishbini: '19',
                  //         soodTazmin: '0.0',
                  //         site: 'http://karafarinfunds.com/',
                  //         tel: '22655911',
                  //         modirSarmaye: 'مهدی علی بیگی,محمد باقر کریمی آخورمه,عصمت طاهری طیبی',
                  //         fundTypeId: '30',
                  //         shenaseMelli: '10320677144',
                  //         remaining: '20000000',
                  //         tarikhShoro: null
                  //     }]
              }, function (error, response, body) {

                  // if response==200 alert bd movafaq masaln
                  console.log('===========putError', error);
                  // console.log('===========putResponse', response);
                  console.log('===========putBodyResponse', body);
              });

          });
      }
    );

    module.exports = child;
}

function realLegalInvestorsExcel (request, response) {

    requ({
          method: 'PUT',
          url: 'http://192.168.1.126/service/dataWarehouseApi/realLegalInvestors',
          json: request.data
      },
      function (error, res, body) {
          console.log('Response >>>>>>>>>>>>', res.body);
          if (res.body === 200) {
              response.writeHead(200, {'Content-Type': 'text/plain'});
              response.end();
          } else {
              response.writeHead(404, {'Content-Type': 'text/plain'});
              response.end(error);
          }
      });

}

function fundInfoExcel (request, response, input) {
    var fundArray = [];
    var excelArray = request.data;

    for (var i  in excelArray) {
        var excelObj = excelArray[i];

        var date = '';
        for (var keyObj in excelObj) {

            var fundObj = {};

            if (keyObj == 'date') {
                date = excelObj[keyObj];
            } else {
                fundObj ['date'] = parseInt(date);
                fundObj ['shenaseMelli'] = parseInt(keyObj);
                fundObj ['value'] = parseInt(excelObj[keyObj]);
                fundArray.push(fundObj);
            }
        }
    }
    console.log('data >>>>>>>>>>>>>>>>', fundArray);
    requ({
          method: 'PUT',
          url: 'http://192.168.1.126/service/dataWarehouseApi/fundCashProfits',
          json: fundArray
      },
      function (error, res, body) {
          console.log('Response >>>>>>>>>>>>', res.body);
          if (res.body === 200) {
              response.writeHead(200, {'Content-Type': 'text/plain'});
              response.end();
          } else {
              response.writeHead(404, {'Content-Type': 'text/plain'});
              response.end(error);
          }
      });
}

function getAllFund (request, response) {

    requ({
          method: 'GET'
          , url: 'http://192.168.1.126/service/dataWarehouseApi/fundInfo?type=json&all=true',
      },
      function (error, resp, body) {

          if (error === null) {
              response.writeHead(200, 'Content-Type', 'application/json');
              response.end(resp.body);
          } else {
              response.writeHead(404, 'Content-Type', 'application/json');
              response.end(error);
          }
      }
    );
}
