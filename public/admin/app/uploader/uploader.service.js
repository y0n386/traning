appFile
  .factory('UploaderService', uploaderService);

function uploaderService ($q, $http, toastr) {
    var file = new FormData();
    return {
        sendRealLegalInvestorsExcel: sendRealLegalInvestorsExcel,
        sendFundInfoExcel: sendFundInfoExcel,
        uploadFiles: uploadFiles,
        setFileInFactory: setFileInFactory,
        getAllFund: getAllFund,
    };

    function setFileInFactory (inpFile) {
        file = inpFile;
    }

    function uploadFiles () {
        console.log('Service');
        var defer = $q.defer(),
          request = {
              method: 'POST',
              url: 'app/upload/a2Json',
              data: file,
              transformRequest: angular.identity,
              headers: {
                  // 'Content-Type': 'multipart/form-data'
                  'Content-Type': undefined
              }
          };

        $http(request)
          .then(function (result) {
              defer.resolve(result);
          })
          .catch(function (error) {
              defer.reject(error);
          });
        return defer.promise;
    }

    function sendRealLegalInvestorsExcel (json) {

        console.log('omad');
        console.log('omad', json);

        var defer = $q.defer(),
          request = {
              method: 'POST',
              url: 'app/upload/realLegalInvestorsExcel',
              data: JSON.stringify(json),
              transformRequest: angular.identity,
              headers: {
                  'Content-Type': undefined
              }
          };

        $http(request)
          .then(function (result) {
              toastr.success('اکسل با موفقیت ذخیره شد');
              defer.resolve(result);
          })
          .catch(function (error) {
              toastr.error('خطا در ذخیره سازی اکسل');
              defer.reject(error);
          });
        return defer.promise;
    }

    function sendFundInfoExcel (json) {
        console.log('ServiceJson :', json);
        var defer = $q.defer(),
          request = {
              method: 'POST',
              url: 'app/upload/fundInfoExcel',
              data: JSON.stringify(json),
              transformRequest: angular.identity,
              headers: {
                  'Content-Type': undefined
              }
          };

        $http(request)
          .then(function (result) {
              toastr.success('اکسل با موفقیت ذخیره شد');
              defer.resolve(result);
          })
          .catch(function (error) {
              toastr.error('خطا در ذخیره سازی اکسل');
              defer.reject(error);
          });
        return defer.promise;
    }

    function getAllFund () {
        console.log('service');
        var defer = $q.defer(),
          request = {
              method: 'GET',
              url: 'app/upload/getAllFund'
          };

        $http(request)
          .then(function (result) {
              defer.resolve(result);
              console.log('success');

              // callback(result);
          })
          .catch(function (error) {
              console.log('Error', error);
              defer.reject(error);
              // callback(error);
          });
        return defer.promise;
    }
}