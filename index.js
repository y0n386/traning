/**
 * Created by Nasser on 9/3/2017.
 */

var fs = require('fs'),
  path = require('path'),
  numCPUs = require('os').cpus().length > 4 ? require('os').cpus().length : 4,
  u = require('partUtilities');
PartFramework = require('partFramework');

var partLoggerConfig = {
      global: {
          mongoInterfaceConfig: {
              global: {},
              instance: {
                  host: '127.0.0.1',
                  port: 27017,
                  dbName: 'rasam_new',
                  dbUser: 'rasam_new',
                  dbPass: '123456',
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
  partRedisInterfaceConfig = {
      global: {
          loggerConfig: partLoggerConfig
      },
      activeDbInstance: {
          host: '127.0.0.1',
          port: 6379,
          db: 8
      },
      mapDbInstance: {
          host: '127.0.0.1',
          port: 6379,
          db: 9
      }
  },
  partSessionManagerConfig = {
      global: {
          tokenLength: 25,
          sessionExpireTime: 1200000,
          maxIdleTime: 20000,
          maxFailedLogins: 4,
          loginFailedTimeLimit: 20000,
          multiAccessTime: 5000,
          defaultVisitorObj: {
              username: 'visitor',
              roles: ['visitor']
          },
          partRedisInterfaceConfig: partRedisInterfaceConfig,
          partLoggerConfig: partLoggerConfig
      },
      instance: {}
  },
  partJsonValidatorConfig = {
      global: {
          allErrors: true,
          v5: true
      },
      instance: {}
  },
  partSamadInterfaceConfig = {
      global: {
          host: 'samad.partdp.ir',
          protocol: 'http',
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
  partSecurityConfig = {
      global: {
          host: '127.0.0.1',
          httpPort: 80,
          httpsPort: 443,
          maxBodyLength: 5e10,
          partSamadInterfaceConfig: partSamadInterfaceConfig,
          partLoggerConfig: partLoggerConfig
      },
      instance: {}
  },
  partUrlRewriterConfig = {
      global: {},
      instance: {
          rewriteRules: {
              './index.html': function (headers, data, session, callback) {

                  /*
                   اینجا باید با توجه به نیازمندی پروژه، آدرس فایل ایندکس را تعیین کنید

                  کد زیر تنها یک نمونه است
                  */
                  session.get(['roles'], function (error, result) {
                      if (error) {
                          callback(u.setCatched(config.e.dbError, error));
                      } else {
                          if (result.roles.indexOf('sysAdmin') > -1) {
                              callback(null, './admin/app/uploader/admin.html');
                          } else {
                              // callback(null, './admin/app/uploader/admin.html');
                              callback(null, './admin/app/login/visitor.html');
                          }

                      }
                  });
                  // callback(null, './indexFolder/index.html');
              }
          }
      }
  },
  partServeIndexConfig = {
      global: {},
      instance: {
          // path: __dirname + path.sep + 'public'
          path: __dirname + path.sep + 'public'
      }
  },
  frameworkConfig = {
      clusterSize: numCPUs,
      logDataChunks: false,
      isProxyServer: true,
      processMode: {
          token: {
              required: false,
              field: 'process-token',
              partAuthoriseInterfaceConfig: {
                  global: {
                      protocol: 'http',
                      host: 'authorize.partdp.ir',
                      port: 80,
                      headers: {
                          user: 'apiGatewayAdmin',
                          pass: 'api_gateway'
                      }
                  },
                  instance: {
                      system: 'api_gateway'
                  }
              }
          }
      },
      proxyToken: {
          required: false,
          field: 'gatewayToken',
          partAuthoriseInterfaceConfig: {
              global: {
                  protocol: 'http',
                  host: 'authorize.partdp.ir',
                  port: 80,
                  headers: {
                      user: 'apiGatewayAdmin',
                      pass: 'api_gateway'
                  }
              },
              instance: {
                  system: 'api_gateway'
              }
          }
      }, proxyTable: {
          '127.0.0.1': {
              targetServers: ['192.168.1.76:85', '192.168.1.76:89', '192.168.1.76:84'],
              loadBalancer: function (allServers) {
                  let servers = [];
                  servers.push(allServers[0]);
                  servers.push(allServers[Math.random() > 0.3 ? 1 : 2]);
                  return servers;
              }
          }
      },
      host: '127.0.0.1',
      httpServerConfig: {
          port: 81
      },
      httpsServerConfig: {
          port: 444,
          forceHttps: true,
          certificate: {
              key: fs.readFileSync('./certificate/key.pem'),
              cert: fs.readFileSync('./certificate/key-cert.pem')
          }
      },
      directoryPaths: {
          apps: __dirname + path.sep + 'apps' + path.sep,
          services: __dirname + path.sep + 'services' + path.sep
      },
      publicDirectoryPath: __dirname + path.sep + 'public' + path.sep,
      partSessionManagerConfig: partSessionManagerConfig,
      partJsonValidatorConfig: partJsonValidatorConfig,
      partSecurityConfig: partSecurityConfig,
      partLoggerConfig: partLoggerConfig,
      partUrlRewriterConfig: partUrlRewriterConfig,
      partServeIndexConfig: partServeIndexConfig,
      uploadHandler: function (filePath) {
      }
  };

new PartFramework(frameworkConfig).run();