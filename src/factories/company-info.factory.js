app.factory("companyInfoFactory", function($http){
  var factory = {};

  factory.viewMore = function(){
    chrome.tabs.create({'url': chrome.extension.getURL(
      'src/browser_action/browser_action.html')}, function(tab) {
    });
  }

  factory.markAsApplied = function(){
		var sendObj = { "post": {
      "title": "Testing Extension",
      "excerpt": "its an excerpt...",
      "content": "its an excerpt and some content",
      "active": true
    } }
		$http.post('http://localhost:3000/api/post', sendObj)
		.then(response => {
			console.log('response === ',response.data);
		})
	}

  return factory;
})
