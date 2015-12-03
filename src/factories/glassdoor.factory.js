app.factory("glassdoorFactory", function($http){
  var factory = {};

  factory.lookupCompanyInfo = function(){
    return new Promise (function(resolve,reject){
      chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
      var activeTabUrl = tabs[0].url;
      var replacements = ["www.","https://","http://","com/","com","io","io/","edu"]
  		for (var i = 0; i < replacements.length; i++) {
  		  activeTabUrl = activeTabUrl.replace(replacements[i],"");
  		}
      console.log('activeTabUrl', activeTabUrl);
      chainGlassdoorQuery(null,".",0)
      .then(previous => chainGlassdoorQuery(previous,".",1))
      .then(previous => chainGlassdoorQuery(previous,"/",1))
      .then(previous => chainGlassdoorQuery(previous,"/",2))
      .then(previous => chainGlassdoorQuery(previous,null,null));

      function chainGlassdoorQuery(previous,splitOn,segment){
        console.log('chain: ',previous);
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
    console.log('url is ',glassdoorApiUrl);
		return $http.get(glassdoorApiUrl)
    .then(response => {
      console.log('response was ',response);
      if (!response.data.response ||
				!response.data.response.employers.length ||
				!response.data.response.employers[0].exactMatch){
				return null;
			}
			else {
        console.log(response.data);
        return response.data.response.employers[0];
      }

    })
	}

  return factory;
})
