$('.postings-btn').click(recordApplication);
console.log('ran content script');
function recordApplication() {
  var sendObj = { "post": {
    "title": "Testing background",
    "excerpt": "its in...",
    "content": "its in the background",
    "active": true
  } }
  $.ajax({
    url: "http://localhost:3000/api/post",
    method: "POST",
    data: sendObj,
    success: function(data){
      console.log('data===',data);
    }
  })
}
