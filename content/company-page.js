function recordApplication(companyName) {
  var sendObj = {companyName: companyName}
  $.ajax({
    url: "http://localhost:3000/api/post",
    method: "POST",
    data: sendObj,
    success: function(data){
      console.log('data===',data);
    }
  })
}
$(document).ready(function(){
  if (document.URL.match(/job|career/)){
    var submitButton = $("button")
    .filter(function() {
      return this.innerHTML.match(/submit|apply/) > -1;
    });
    // if (submitButton) submitButton.click(() => createToast());
  createToast();//for testing
  }
});

function createToast(){
  var applicationToast = document.createElement("div");
  $(applicationToast).css({
    "color" : "#fff",
    "background" : "#68c368",
    "z-index" : "2147483647px",//TODO find out why the z-index isn't working
    "position" : "absolute",
    "top" : "60px",
    "right" : "0px",
    "padding" : "15px 30px",
    "border-radius" : "15px",
    "cursor" : "default",
    "font-size" : "20px",
  });
  $(applicationToast).html("You've applied to ");
  $("body").append(applicationToast);
  var xMark = document.createElement("div");
  var checkMark = document.createElement("div");
  var companyInput = document.createElement("input");
  // companyInput.type = "text";
  $(checkMark).html("&#10004;");
  $(checkMark).css({
    "display" : "inline",
    "margin-left" : "10px",
  });
  $(xMark).html("&#x2717;");
  $(xMark).css({
    "display" : "inline",
    "margin-left" : "10px",
  });
  $(companyInput).css({
    "display" : "inline",
    "margin-left" : "10px",
  });
  var Url = document.URL;
  var Url = Url.replace("https://","");
  var Url = Url.replace("http://","");
  var Url = Url.replace("www.","");
  var Url = Url.replace("jobs","");
  var Url = Url.replace("job","");
  var Url = Url.replace("careers","");
  if (Url.indexOf("lever") > -1) Url = Url.split("/")[1];
  $(companyInput).attr("value", Url.split(".")[0]);
  $(applicationToast).append(companyInput);
  $(applicationToast).append(checkMark);
  $(applicationToast).append(xMark);
  $(xMark).click(() => $(applicationToast).remove());
  $(checkMark).click(function(){
    recordApplication($(companyInput).val());
    $(applicationToast).remove();
  });
}
