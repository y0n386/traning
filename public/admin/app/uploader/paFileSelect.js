(function () {
    'use strict';

    angular.module('app.file')
        .directive('paFileSelect', paFileSelect);

    /** @ngInject */
    function paFileSelect($q) {
        return {
            restrict: 'EA',
            scope: {
                inputModel: '=inputModel'
            },
            // template_old: '<div><button class="btn" ng-click="showFileSelect()">{{btnTitle || "انتخاب"}}</button><span class="file_name"><i>{{info.name}}</i></span><span id="file_input_reset" ng-show="inputModel" ng-click="reset()">&times;</span><input id="input-{{id}}" accept="{{accept}}" type="file"/></div>',
            // template: '<div class="pa-file-select"><input type="file" id="input-{{id}}" accept="{{accept}}"> <span class="file_name">{{info.name}}<svg class="icon clickable" ng-show="inputModel" ng-click="reset()"> <use xlink:href="spa/assets/icons/icons.svg#close"> </svg> </span> <a class="thumbnail"> <img ng-src="{{inputModel.data}}" alt=""> </a> <button type="button" class="btn btn_green" ng-click="showFileSelect()">{{btnTitle || "انتخاب"}}</button><div>',
            // replace: true,
            link: function (scope, element, attrs) {
                var updateModel = function () {
                    var file = element.get(0).files[0];
                    scope.inputModel = file;
                    // readAsDataURL(file)
                    //     .then(function (result) {
                    //         scope.inputModel = {
                    //             info: angular.element('#input-' + attrs['id']).get(0).files[0],
                    //             data: result
                    //         };
                    //         scope.onChange({file: scope.inputModel});
                    //     });

                };

                element.bind('change', updateModel);

                function readAsDataURL(file) {
                    var deferred = $q.defer();

                    var reader = new FileReader();
                    reader.onload = function (e) {
                        deferred.resolve(e.target.result);
                    };
                    reader.onerror = function (e) {
                        deferred.reject(e);
                    };
                    reader.readAsDataURL(file);

                    return deferred.promise;
                }
            }
        };
    }
})();