console.log('im changing shit');
var sendObj = { "post": {
  "title": "Testing background",
  "excerpt": "its in...",
  "content": "its in the background",
  "active": true
} }
$.ajax({
  url: 'http://localhost:3000/api/post',
  method: 'POST',
  data: sendObj,
}).done(function(response) {
  console.log('done with ajax request - ',response.data);
});
