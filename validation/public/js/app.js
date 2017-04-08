var app = angular.module('myApp', ['ui-notification','ngRoute' , 'smart-table']);
app.config(function($routeProvider,$locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "/templates/loginsignup.hjs",
        controller: 'loginCtrl'
    })
    .when("/home", {
        templateUrl : "/templates/home.hjs",
		controller : 'homeCtrl'

    })
		.when("/approver", {
            templateUrl: "/templates/approver.hjs",
            controller: 'homeCtrl'
        })


	.when("/new_request", {
        templateUrl : "/templates/newrequest.hjs",
		controller : 'reqCtrl'

    })

    $locationProvider.html5Mode({
	  enabled: true,
	  requireBase: false
	});
});
app.controller('loginCtrl', function($scope, Notification, $http, $window) {
	$scope.view = "signup";
	$scope.signupvalid = true;
	$scope.submitForm = function(isValid) {
		$scope.submitted = true;
		if ($scope.signup.password == $scope.signup.confirm && isValid && $scope.showemailerr  == false) {
			console.log(JSON.stringify($scope.signup));
			$http.post('signup/',{
				data: {
					user:$scope.signup
				}
			}).then(function(data){
				console.log(data);
			})
            Notification.success('Successfully Signed Up');
		} else {
            Notification.error('Error Sign Up');
		}
	};

	$scope.loginForm = function(isValid) {
		//$window.location.href = '/home';
		$scope.submitted = true;
        if(isValid){
	     	$http.post('login/',{
				data: {
					user:$scope.login
				}
			}).then(function(data){
				$window.location.href = data.data.redirect;
			})
		} else {
            Notification.error('Error Login');
		}
	};

	$scope.resetforms = function (view) {

		$scope.view = view;
		$scope.submitted = false;
		$scope.signup = {
			email : ''
		};
		$scope.showemailerr  = false;
		$scope.login = {};
	}
	$scope.resetforms("signup");
	
	$scope.checkemail = function () {
		if($scope.signupform.email.$invalid == false) {
			$http.get('emailcheck/',{
				params: {
					email:$scope.signup.email
				}
			}).then(function(data){
				if(data.data == false)
					$scope.showemailerr  = true;
				else 
					$scope.showemailerr  = false;
			})
		}
		
	}
});


app.controller ('homeCtrl',function($scope,$http,$window) {
    //default true
    $scope.IsHidden = true;
    $scope.ShowHide = function () {
        //If DIV is hidden it will be visible and vice versa.
        $scope.IsHidden = $scope.IsHidden ? false : true
    }



    $scope.allrows = function () { //need to enable this
        $http.get('table_rows/').then(function (data) {
            console.log("data")
            // console.log(data)
            $scope.rowcollection = data.data;
        })

    };
    // $scope.allrows();


    $scope.dopython = function ($event) {
    	$event.preventDefault();
       $event.stopPropogation();
        $http.get('python/').then(function () {
            console.log("data")
        })
    }
    // $scope.dopython();


    // $scope.backtoreq = function(){
    //    $window.location.href = '/new_request';
    //    	$http.get('new_req/').then (function(){
    //    		console.log("data")
    // 		})
    // }

    // };
    // $scope.dopython();
});
    app.controller('reqCtrl', function ($scope, $http, $window) {
        $scope.reqForm = function (requestFormData) {
            console.log("Request FOrm is"+JSON.stringify(requestFormData));
            console.log("Name form ::"+JSON.stringify($scope.reqform.platform));
            $scope.submitted = true;
            if (requestFormData.isValid) {
                $http.post('new_request/', {
                    data: {
                        user: requestFormData
                    }
                }).then(function (data) {
              //      $window.location.href = data.data.redirect;
                })
            } else {
              //  Notification.error('Error submission');
            }
          //  $window.location.href = '/home';
        };
        $scope.support = false;
        $scope.sup_builds = function () {
            $scope.support = true;
        }
        $scope.dev_builds = function () {
            $scope.support = false;
        }

        $scope.ifix_content = false;
        $scope.tfix_content = false;

        $scope.ifix_contents = function () {
            $scope.ifix_content = true;
            $scope.tfix_content = false;
        }
        $scope.tfix_contents = function () {
            $scope.tfix_content = true;
            $scope.ifix_content = false;
        }

		var requestExample = {
        	version
		}
    });










