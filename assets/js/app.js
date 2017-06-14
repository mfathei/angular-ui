'use strict';

var myApp = angular.module('MyApp', ['ngSanitize', 'ui.mask']);

myApp.controller('MainController', function ($scope) {
    $scope.msg = 'Hello Angular UI';
});

myApp.controller('HighlightController', function ($scope) {
    $scope.text = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.';
});

/**
 * Wraps the
 * @param text {string} haystack to search through
 * @param search {string} needle to search for
 * @param [caseSensitive] {boolean} optional boolean to use case-sensitive searching
 */
myApp.filter('highlight', function () {
    return function (text, search, caseSensitive) {
        if (search || angular.isNumber(search)) {
            text = text.toString();
            search = search.toString();
            if (caseSensitive) {
                return text.split(search).join('<span class="ui-match">' + search + '</span>');
            } else {
                return text.replace(new RegExp(search, 'gi'), '<span class="ui-match">$&</span>');
            }
        } else {
            return text;
        }
    };
});


myApp.controller('MaskController', function ($scope) {
    $scope.mask1 = '9999 9999 9999 9999';
    $scope.mask2 = '(999) 999-999';
    $scope.mask3 = 'A9A9***A9A9';
    $scope.timemask = '19:29 PM';

});

myApp.config(['uiMask.ConfigProvider', function (uiMaskConfigProvider) {
    uiMaskConfigProvider.maskDefinitions({'1': /^[0-1]/, '2': /[0-5]/, 'P': /[aA|pP]/, 'M': /[mM]/});
}]);

// ------------------------------

var app = angular.module('app', ['ui.router']);

app.config(function ($stateProvider) {


    var helloState = {
        name: 'hello',
        url: '/hello',
        template: "<h3>Hello World!<h3>"
    };

    var aboutState = {
        name: 'about',
        url: '/about',
        template: "<h3>This is the Angular-UI Hello World app!</h3>"
    };

    var pageState = {
        name: 'page',
        url: '/page/{item}',
        template: "<h3>page number {{ page }}</h3>",
        controller: 'RouteController'
    };

    $stateProvider.state(helloState);
    $stateProvider.state(pageState);
    $stateProvider.state(aboutState);

    // $locationProvider.html5Mode(true);
});

app.controller('RouteController', function ($scope, $transition$) {
    $scope.page = $transition$.params().item;
});

// --------------------------------

var vapp = angular.module('vapp', ['ui.validate']);

vapp.controller('ValidateController', function ($scope) {
    $scope.page;
});

// ---------------------------------

var ideApp = angular.module('ideApp', ['ui.codemirror']);

ideApp.controller('IdeController', function ($scope) {
    $scope.cmOpts = {
        lineNumbers: true,
        indentSize: 4,
        tabSize: 4,
        theme: 'solarized',
        mode: 'javascript'
    };
});
