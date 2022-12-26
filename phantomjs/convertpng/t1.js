// Example using HTTP POST operation

phantom.outputEncoding="utf-8";

var page = require('webpage').create();
page.open('http://192.168.3.1/html/home.html', function(status){
      console.log(status);
});

page.onLoadFinished = function(status) {
  console.log('Status: ' + status);
  console.log(page.content);
  //phantom.exit();
  showloginDialog();
  console.log(page.content);
  $('#username').value = 'admin';
  $('#password').value = 'admin';
  $('#pop_login').click();

  console.log('Status: ');
};