app.directive('rating', function() {
	return {
		restrict: 'E',
    templateUrl: "/src/browser_action/company-info/company-info.html",
		controller: 'ratingController',
    }
});

app.controller('ratingController',
function ($scope, glassdoorFactory, companyInfoFactory) {

	$scope.companyInfo = {name: "loading . . ."};
	glassdoorFactory.lookupCompanyInfo()
	.then(response => $scope.$apply($scope.companyInfo = response))
	.catch(err => $scope.companyInfo = {name: err});

	$scope.viewMore = function(){
    companyInfoFactory.viewMore();
  }

	$scope.markAsApplied = function(){
		companyInfoFactory.markAsApplied();
	}

});
