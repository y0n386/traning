angular.module('app.file')
  .component('uploadFiles', {
      templateUrl: '/public/admin/app/uploader/upload.html',
      controller: UploadController,
      controllerAs: 'vm'
  });

function UploadController (UploaderService, $scope, $http, toastr, $cookies, $window) {

    // $scope.TimedRefresh = function (t) {
    //     console.log(t + 'Minute');
    //     setTimeout('location.reload(true);', t * 1000 * 60);
    // };
    // $scope.TimedRefresh(20);

    let vm = this;
    $scope.dataAvailable = false;
    vm.$onInit = function () {

        UploaderService.getAllFund().then(function (fundList) {
            var json = fundList.data.rows;
            var fields = fundList.data.fields;
            let shenaseMelliIndex = 0;
            let fundNameIndex = 0;
            for (var j in fields) {
                if (fields[j]['name'] === 'shenaseMelli') {
                    shenaseMelliIndex = j;
                }
                if (fields[j]['name'] === 'fundName') {
                    fundNameIndex = j;
                }
            }

            var selectHeader = ['date'];
            var excelHeadersObj = {};

            var shenaseMelliArray = [];
            var shenaseMelliObj = {};

            for (var i in json) {
                if (json[i][shenaseMelliIndex] != null) {
                    excelHeadersObj[json[i][fundNameIndex]] = json[i][fundNameIndex];

                    selectHeader.push(json[i][shenaseMelliIndex]);

                    shenaseMelliObj[json[i][fundNameIndex]] = json[i][shenaseMelliIndex];
                } else {
                    console.log(json[i][fundNameIndex]);
                }

            }
            shenaseMelliArray.push(shenaseMelliObj);
            $scope.dataList = shenaseMelliArray;
            $scope.headerExcel = excelHeadersObj;
            $scope.selectHeader = selectHeader;
            $scope.dataAvailable = true;
        });
    };

    vm.sendFundInfoAccess = sendFundInfoAccess;
    let formdata = new FormData();
    vm.real_legal_invesror_json = [];
    vm.fundtion_json = [];
    vm.uploadDate = '';
    vm.sendRealLegalInvestorsExcel = sendRealLegalInvestorsExcel;
    vm.sendFundInfoExcel = sendFundInfoExcel;
    vm.logOut = logOut;

    $scope.$watch('myFile', function (newFileObj) {
        if (newFileObj) {
            vm.fileName = newFileObj[0].name;
        }
    });

    $scope.read1 = function (workbook) {
        console.log('===========', workbook);

        for (var sheetName in workbook.Sheets) {
            var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
                raw: true,
                header: ['sandoghName', 'shenaseMelli', 'realInvestors', 'realInvestorsPercent', 'legalInvestors', 'legalInvestorsPercent'],
                range: 1
            });
            let exceldata = validateData(jsonData);
            if (!exceldata) {
                toastr.error('اکسل معتبر انتخاب کنید.');
            } else {
                vm.real_legal_invesror_json = exceldata;
                console.log(vm.real_legal_invesror_json);
            }

        }
    };

    $scope.error1 = function (e) {
        console.log(e);
    };

    $scope.read2 = function (workbook) {
        for (var sheetName in workbook.Sheets) {
            var jsonData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName], {
                raw: true,
                header: $scope.selectHeader,
                range: 2
            });
        }
        vm.fundtion_json = fundInfoData(jsonData, $scope.selectHeader);
        console.log(vm.fundtion_json);
    };

    $scope.error2 = function (e) {
        console.log(e);
    };

    function sendRealLegalInvestorsExcel () {

        var dateArray = vm.uploadDate.split('/');
        if (dateArray.length != 3 || dateArray[0].length != 4 || dateArray[1].length != 2 || dateArray[2].length != 2) {
            toastr.error('تاریخ صحیح وارد کنید');
        } else {
            for (var i in vm.real_legal_invesror_json) {
                var nObj = vm.real_legal_invesror_json[i];

                nObj.date = dateArray[0] + dateArray[1] + '15';
            }
            UploaderService.sendRealLegalInvestorsExcel(vm.real_legal_invesror_json);
        }
    }

    function sendFundInfoExcel () {

        if (vm.fundtion_json.length === 0 || vm.fundtion_json.length === null) {
            alert('فایل اکسل را انتخاب کنید');
        } else {
            UploaderService.sendFundInfoExcel(vm.fundtion_json);
        }
    }

    function sendFundInfoAccess () {
        $scope.error2 = function (e) {
            /* DO SOMETHING WHEN ERROR IS THROWN */
            console.log(e);
        };

        if ($scope.myFile == undefined || $scope.myFile == null) {
            return vm.formInvalid = true;
        }
        vm.formInvalid = false;
        vm.loading = true;
        if ($scope.myFile) {
            angular.forEach($scope.myFile, function (value, key) {
                formdata.append(key, value);
            });
            UploaderService.setFileInFactory(formdata);
            UploaderService.uploadFiles()
              .then(function (result) {
                  vm.loading = false;
                  if (result.data.hasOwnProperty('error')) {
                      console.log(result.data.error.message.fa);
                      toastr.error('خطا هنگام بارگذاری فایل');
                  } else {
                      toastr.success('فایل با موفقیت بارگذاری شد');
                      console.log(result.data);
                  }
              })
              .catch(function (error) {
                  toastr.error('خطایی رخ داده است');
              });
        }
    }

    function logOut () {
        $cookies.remove('token');
        $window.location.reload();
    }
}

function validateData (jsonData) {
    let excelOk = true;
    var arrdata = [];
    for (var i in jsonData) {
        var nObj = jsonData[i];
        if (nObj.shenaseMelli == undefined && isNumber(nObj.shenaseMelli) || nObj.legalInvestors == undefined || nObj.legalInvestorsPercent == undefined || nObj.realInvestors == undefined || nObj.realInvestorsPercent == undefined) {
            excelOk = false;
            break;
        } else {
            delete nObj.sandoghName;
            arrdata.push(nObj);
        }
    }
    if (excelOk) {
        return arrdata;
    } else {
        return false;
    }

}

function fundInfoData (jsonData, jsonValidation) {
    var excelValidation = true;

    if (excelValidation) {
        var arrdata = [];

        for (var i in jsonData) {
            var dateArray = jsonData[i].date.split('/');
            var date = dateArray[0] + dateArray[1] + dateArray[2];
            jsonData[i].date = date;
            var nObj = jsonData[i];
            arrdata.push(nObj);
        }
        return arrdata;
    } else {
        return null;
    }
}