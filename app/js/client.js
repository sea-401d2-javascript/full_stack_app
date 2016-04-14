const angular = require('angular');
const carsApp = angular.module('carsApp', []);

carsApp.controller('carsController', ['$scope', '$http', ($scope, $http) => {
  $scope.greeting = 'Hello';
  $scope.cars = [];

  $http.get('http://localhost:3000/api/cars')
    .then((res) => {
      console.log('Success');
      $scope.cars = res.data;
    }, (err) => {
      console.log(err);
    });

  $scope.createCar = function(car) {
    $http.post('http://localhost:3000/api/cars', car)
      .then((res) => {
        $scope.cars.push(res.data);
        $scope.newCar = null;
      }, (err) => {
        console.log(err);
      })
  }

  $scope.deleteCar = function(car) {
    $http.delete('http://localhost:3000/api/cars/' + car._id)
      .then((res) => {
        $scope.cars = $scope.cars.filter((i) => i !== car);
      }, (err) => {
        console.log(err);
      })
  }

  $scope.updateCar = function(car) {
    $http.put('http://localhost:3000/api/cars/' + car._id, car)
      .then((res) => {
        $scope.cars[$scope.cars.indexOf(car)] = car;
        car.editing = false;
      }, (err) => {
        console.log(err);
        car.editing = false;
      })
  }
}]);
