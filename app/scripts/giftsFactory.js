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