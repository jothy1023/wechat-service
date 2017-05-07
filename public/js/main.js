angular.module('myApp', [])
  .factory('Result', function () {
    return {
      status: 0,
      choice: 0
    }
  })
  .controller('SignUpController', ['$scope', '$http', 'Result', function ($scope, $http, Result) {
    $scope.Result = Result
    $scope.user = {}

    $scope.submitSignUpForm = function () {
      var openid = document.getElementById('openid') ? document.getElementById('openid').innerText : ''
      $scope.user.openid = openid

      var btnIcon = document.querySelector('.signUpForm .weui-btn-area i') || {}
      var btnIconClass = btnIcon.classList
      btnIconClass.add('weui-loading')

      console.log(JSON.stringify($scope.user))
      $http.post('/proxy/api/signup', $scope.user, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: function (obj) {
          var str = [];
          for (var s in obj) {
            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]))
          }
          return str.join("&")
        }
      }).success(function (res) {
        btnIconClass.remove('weui-loading')
        $scope.Result.status = 1
        console.log(JSON.stringify(res))
      }).error(function (err) {
        btnIconClass.remove('weui-loading')
        $scope.Result.status = 2
        console.error(JSON.stringify(err))
      })
    }
  }])
  .controller('SignInController', ['$scope', '$http', 'Result', function ($scope, $http, Result) {
    $scope.Result = Result
    $scope.user = {}

    $scope.submitSignInForm = function () {
      var openid = document.getElementById('openid') ? document.getElementById('openid').innerText : ''
      $scope.user.openid = openid

      var btnIcon = document.querySelector('.signInForm .weui-btn-area i') || {}
      var btnIconClass = btnIcon.classList
      btnIconClass.add('weui-loading')

      console.log(JSON.stringify($scope.user))
      $http.post('/proxy/api/saveopenid', $scope.user, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'},
        transformRequest: function (obj) {
          var str = [];
          for (var s in obj) {
            str.push(encodeURIComponent(s) + "=" + encodeURIComponent(obj[s]))
          }
          return str.join("&")
        }
      }).success(function (res) {
        $scope.Result.status = 1
        console.log(JSON.stringify(res))
      }).error(function (err) {
        $scope.Result.status = 2
        console.error(JSON.stringify(err))
      })
    }
  }])
  .controller('ResultController', ['$scope', 'Result', function ($scope, Result) {
    $scope.Result = Result
  }])
  .directive('compare', function () {
    var o = {}
    o.strict = 'AE'
    o.scope = {
      orgText: '=compare'
    }
    o.require = 'ngModel'
    o.link = function (sco, ele, att, con) {
      con.$validators.compare = function (v) {
        return v === sco.orgText
      }

      sco.$watch('orgText', function () {
        con.$validate()
      })
    }
    return o
  })