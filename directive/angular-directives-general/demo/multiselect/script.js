(function () {
    angular.module('myApp1.controllers', []);

    var myApp1 = angular.module('myApp1', [
        'myApp1.controllers',
        'long2know',
        'ngSanitize',
        'ui.bootstrap',
        'ui.router',
        'ui']);

    var state1Ctrl = function () {
        var $scope = this,
        getRandomInt = function(min, max) {
            return Math.floor(Math.random() * (max - min + 1) + min);
        };

        $scope.options1 = [];
        for (var i = 0; i < 10; i++) {
            $scope.options1.push({ key: i + 1, value: 'Prop' + (i + 1).toString() });
        }

        $scope.options2 = [];
        for (var i = 0; i < 100; i++) {
            $scope.options2.push({ key: i + 1, value: 'Prop' + (i + 1).toString() });
        }

        $scope.option6 = 3;
        $scope.option7 = [4, 11, 23];
        
        $scope.clear = function() {
            $scope.option1 = [];
            $scope.option2 = [];
            $scope.option3 = [];
            $scope.option4 = [];
            $scope.option5 = [];
            $scope.option6 = [];
            $scope.option7 = [];
        };
        
        $scope.randomSelect = function() {
            $scope.clear();
            var arrSelected = [ $scope.option1, $scope.option2, $scope.option3, $scope.option4, $scope.option5, $scope.option6, $scope.option7];
            var arrOptions = [ $scope.options1, $scope.options2, $scope.options2, $scope.options1, $scope.options1, $scope.options1, $scope.options2 ];
            var arrIsSingle = [ false, false, false, true, false, false, false  ];
            var arrIsSimple = [ true, true, false, false, true, true, true  ];
            
            for (var i = 0; i < arrSelected.length; i++) {
                var selected = arrSelected[i];
                var options = arrOptions[i];
                var isSingle = arrIsSingle[i];
                var isSimple = arrIsSimple[i];
                var min = 0;
                var max = options.length - 1;
                if (isSingle) {
                    var randIndex = getRandomInt(min, max);
                    if (isSimple) {
                        selected.push(options[randIndex].key); 
                    } else {
                        selected.push(options[randIndex]);
                    }
                }
                else
                {
                    var toSelectIndexes = [];
                    var numItems = getRandomInt(0, options.length) + 1;
                    for (var j = 0; j < getRandomInt(1, numItems); j++)
                    {
                        var randIndex = getRandomInt(min, max);
                        var arrIndex = toSelectIndexes.indexOf(randIndex);
                        if (arrIndex == -1) {
                            toSelectIndexes.push(randIndex);
                            if (isSimple) {
                                selected.push(options[randIndex].key); 
                            } else {
                                selected.push(options[randIndex]);   
                            }
                        }
                    }
                }
            }
        }
    };

    state1Ctrl.$inject = [];
    
    angular.module('myApp1.controllers')
        .controller('state1Ctrl', state1Ctrl);

    myApp1.config(['$locationProvider', '$stateProvider', '$urlRouterProvider',

        function ($locationProvider, $stateProvider, $urlRouterProvider) {

            $locationProvider.html5Mode(false);

            $urlRouterProvider.when('/', '/state1')
                .otherwise("/state1");

            $stateProvider.state('app', {
                abstract: true,
                url: '/',
                views: {
                    'main': {
                        template: '<div ui-view>/div>'
                    }
                }
            })
            .state('app.state1', {
                url: 'state1',
                templateUrl: 'state1.html',
                controller: 'state1Ctrl',
                controllerAs: '$scope',
                reloadOnSearch: false
            })
        }]);

    myApp1.run(['$log', function ($log) {
        $log.log("Start.");
    }]);
})()