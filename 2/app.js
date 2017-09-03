var app = angular.module('plunker', ['ui.multiselect']);

app.controller('MainCtrl', function($scope) {
  $scope.name = 'World';
    $scope.cars = [{id:1, name: 'Audi'}, {id:2, name: 'BMW'}, {id:1, name: 'Honda'}];
    $scope.selectedCar = [];

    $scope.fruits = [{id: 1, name: 'Apple'}, {id: 2, name: 'Orange'},{id: 3, name: 'Banana'}];
    $scope.selectedFruit = null;
});
