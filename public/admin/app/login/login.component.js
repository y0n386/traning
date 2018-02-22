angular.module('app.account')
  .component('login', {
      templateUrl: '/public/admin/app/login/login.html',
      controller: LoginController,
      controllerAs: 'vm'
  });

function LoginController ($http, $window, toastr) {
    var vm = this;
    vm.information = {username: '', password: '', captcha: {token: '', value: ''}};
    vm.login = function () {

        vm.information = {
            username: vm.information.username,
            password: vm.information.password,
            captcha: {token: vm.token, value: vm.information.captcha.value}
        };
        $http.post('./app/userManager/login', vm.information)
          .then(function (response) {
              if (response.data.status == 'success' && response.data.data.roles.indexOf('sysAdmin') != -1) {
                  $window.location.reload();
              } else {
                  toastr.error('شما به این قسمت دسترسی ندارید');
              }

// ya doroste o login mishe taraf o mire safe upload
              // ya user ya passesh qalate ke besh alert midim
          })
          .catch(function (err) {
              if (err.data.error.code == 'wrongPassword' || err.data.error.code == 'validationError'|| err.data.error.code == "invalidUsernameOrPassword" ) {
                  toastr.error('نام کاربری یا پسورد اشتباه است');
                  vm.getCaptcha();
              }
              else if (err.data.error.code == 'invalidCaptcha') {
                  toastr.error('کد امنیتی وارد شده صحیح نمیباشد');
                  vm.getCaptcha();
              }
          });
    };

    vm.captcha = '';
    vm.getCaptcha = function () {

        request = {
            method: 'GET',
            url: './app/userManager/getCaptcha'
        };

        $http(request)
          .then(function (result) {
              vm.captcha = result.data.data.img;
              vm.token = result.data.data.token;
          })
          .catch(function (error) {
              console.log('Error', error);
          });
    };
    vm.getCaptcha();
}
