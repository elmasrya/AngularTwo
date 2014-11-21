(function () {


  var app = angular.module('HolidayList', ['ngRoute', 'restangular']);

  app.config( function ($routeProvider, RestangularProvider) {

    RestangularProvider.setBaseUrl('http://tiy-atl-fe-server.herokuapp.com/collections/');

    $routeProvider.when('/', {
      templateUrl: 'templates/home.html',
      controller: 'GiftsController'
    });

    $routeProvider.when('/single/:id', {
      templateUrl: 'templates/single.html',
      controller: 'GiftsController'
    });

    $routeProvider.when('/add', {
      templateUrl: 'templates/add.html',
      controller: 'GiftsController'
    })

  });

  app.directive('clickTurkey', function () {
    return {
      link: function ($scope, element, attrs) {
        element.bind('click', function () {
          console.log('my turkey directive was run');
        });
      }
    }
  });

}());