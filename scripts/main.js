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
(function () {

  angular.module('HolidayList')
    .factory('giftsFactory', ['$rootScope', 'Restangular', function ($rootScope, Restangular) {

      var giftsBase = Restangular.all('holidaylist');

      function getGifts () {
        // return $http.get(url);
        return giftsBase.getList();
      }

      function getGift (id) {
        //return $http.get(url + id);
        return giftsBase.get(id);
      }

      function addGift (gift) {
        // $http.post(url, gift).success( function () {
        //   $rootScope.$broadcast('gift:added');
        // });
        giftsBase.post(gift).then( function () {
          $rootScope.$broadcast('gift:added');
        });
      }

      return {

        getGifts: getGifts,
        getGift: getGift,
        addGift: addGift

      };

    }]);

}());
(function () {

  angular.module('HolidayList')
    .controller('GiftsController', 
      ['giftsFactory', '$scope', '$location', '$rootScope', 
        function (giftsFactory, $scope, $location, $rootScope) {

        giftsFactory.getGifts().then( function (results) {
          $scope.gifts = results;
        });

        $scope.addGift = function (gift) {
          giftsFactory.addGift(gift);

          $rootScope.$on('gift:added', function () {
            $location.path('/');
          });

        }

    }]);
}());