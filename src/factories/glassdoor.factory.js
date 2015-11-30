app.factory("glassdoorFactory", function($http){
  var factory = {};

  factory.lookupCompanyInfo = function(){
    return new Promise (function(resolve,reject){
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var activeTabUrl = tabs[0].url;
  		activeTabUrl = activeTabUrl.replace("www.","");
  		activeTabUrl = activeTabUrl.replace("https://","");
  		activeTabUrl = activeTabUrl.replace("http://","");
  		activeTabUrl = activeTabUrl.replace("com/","");

      chainGlassdoorQuery(null,".",0)
      .then(previous => chainGlassdoorQuery(previous,".",1))
      .then(previous => chainGlassdoorQuery(previous,"/",1))
      .then(previous => chainGlassdoorQuery(previous,"/",2))
      .then(previous => chainGlassdoorQuery(previous,null,null));

      function chainGlassdoorQuery(previous,splitOn,segment){
        if (previous) resolve(previous);
        if (!splitOn) reject("Company not found.")
        return queryGlassdoor(activeTabUrl.split(splitOn)[segment]);
      }

      });
    }
  )}

  function queryGlassdoor(companyName){
		var glassdoorApiUrl = "http://api.glassdoor.com/api/api.htm?v=1&format=json&"
    +"t.p=49227&t.k=hH2UIW7yECI&action=employers&q=" + companyName;
		return $http.get(glassdoorApiUrl)
    .then(response => {
      if (!response.data.response ||
				!response.data.response.employers.length ||
				!response.data.response.employers[0].exactMatch){
				return null;
			}
			else
				return response.data.response.employers[0];
    })
	}

  return factory;
})
