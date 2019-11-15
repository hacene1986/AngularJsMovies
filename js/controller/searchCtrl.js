(function () {
    var app = angular.module("app")

    app.controller("searchCtrl", searchCtrl)
    function searchCtrl($scope, $http) {
        var API_KEY = "?api_key=f37ed2375801b6d377127efd12d31e9e";
        var URL = "https://api.themoviedb.org/3/";
        var SEARCH = "search/person";
        var PERSON = "person";
        var QUERY = "&query=";
        var MOVIE_CREDIT = "movie_credits";
        $scope.title = 'Remplissez le champ';

        // récupérer acteur rechercher 
        $scope.getActors = function () {
            if (angular.isUndefined($scope.searchActors) || $scope.searchActors == '')
                return;

            var promise = $http.get(URL + SEARCH + API_KEY + QUERY + $scope.searchActors)
            promise.then(success, error)
            function success(results) {
                //console.log("success", results.data.results);
                $scope.actors = results.data.results
            }
            function error() {
                console.log("error", results);
            }
        }

        //récupérer les films connus d'un acteur
        $scope.getMovieById = function (id) {
            var id = "/" + id + "/";
            var promise = $http.get(URL + PERSON + id + MOVIE_CREDIT + API_KEY);
            promise.then(success, error)
            function success(results) {
                //console.log("succes", results);
                $scope.cast = results.data.cast;
                $scope.moviesLoaded = true;
            }

            function error(results) {
                console.log("error", results);
            }
        }
    }
})()