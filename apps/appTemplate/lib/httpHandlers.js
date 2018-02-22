var u = require('partUtilities'),
  config = require('../config.js'),
  schema = require('../schema.js');

exports.httpHandlers = {
  f1: {
    POST: {
      function: f1Post,
      headerSchema: function (headers, data, session, callback) {
        callback(null, schema.f1PostHeader);
      },
      dataSchema: function (headers, data, session, callback) {
        callback(null, schema.f1PostData);
      }
    },
    GET: {
      function: f1Get,
      headerSchema: function (headers, data, session, callback) {
        callback(null, schema.f1GetHeader);
      },
      dataSchema: function (headers, data, session, callback) {
        callback(null, schema.f1GetData);
      }
    }
  },
  f2: {
    POST: {
      function: f2
    },
    GET: {
      function: f2
    }
  }
};

function f1Post(request, response) {
  console.log("===============f1Post");
  console.log('request.params', request.params);
  console.log('request.queryString', request.queryString);
  console.log('request.data', request.data);
  
  var myObject = {
    myKey1: 123,
    myKey2: 456
  };
  
  request.session.set(myObject, function(error, result){
    if(error){
      config.log.error(config.e.sessionError, error);
      response.sendFail(config.e.sessionError, {}, 500);
    }
    else{
      config.log.event(config.moduleType, config.moduleName, 'data saved in session.');
      response.sendOk({msg: 'data saved in session.'});
    }
  });

}

function f1Get(request, response) {
  console.log("===============f1Get");
  console.log('request.params', request.params);
  console.log('request.queryString', request.queryString);
  console.log('request.data', request.data);

  request.session.get(['myKey1', 'myKey2'], function(error, result){
    if(error){
      config.log.error(config.e.sessionError, error);
      response.sendFail(config.e.sessionError, {}, 500);
    }
    else{
      config.log.event(config.moduleType, config.moduleName, 'data retrieved from session.');
      response.sendOk({myKey: result});
    }
  });
}

function f2(request, response) {
  console.log("===============f2");
  console.log('request.params', request.params);
  console.log('request.queryString', request.queryString);
  console.log('request.data', request.data);

  response.sendOk({message: 'hello world!'});
}