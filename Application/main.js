angular.module('KRRclass', [ 'chart.js']).controller('MainCtrl', ['$scope','$http', mainCtrl]);


function mainCtrl($scope, $http){


	$scope.startMyAwesomeApp = function(){

		$scope.myDisplayMessage = "Welcome to Web Application \"" + $scope.myInputAppName + "\"";
		$scope.mySparqlEndpoint = $scope.myInputEndPoint ;
		$scope.mySparqlQuery = encodeURI($scope.myInputQuery).replace(/#/g, '%23');
		$scope.options = {
			legend: {
			  display: true,
			  position: 'top'
			}
		  };

		$http( {
			method: "GET",
			url : $scope.mySparqlEndpoint + "?query=" + $scope.mySparqlQuery,
			headers : {'Accept':'application/sparql-results+json', 'Content-Type':'application/sparql-results+json'}
		} )
		.success(function(data, status ) {
			
			$scope.myDynamicLabels = [];
			$scope.myDynamicData = [];
			$scope.myDynamicSeries = ['Global ratio', 'Last 30days ratio'];


			var dim1 = [];
			var dim2 = [];

			// now iterate on the results
			angular.forEach(data.results.bindings, function(val) {
				$scope.myDynamicLabels.push(val.youtuberName.value + ' - ' + val.language.value);
				dim1.push(val.ratioGlobal.value);
				dim2.push(val.ratio.value);
			});

			$scope.myDynamicData.push(dim1);
			$scope.myDynamicData.push(dim2);

		})
		.error(function(error ){
			console.log('Error running the input query!'+error);
		});

	};

}
