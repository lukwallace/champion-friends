
var app = {};

app.doTheThing = function() {
  console.log('ding!');
};

app.init = function() {
  $.ajax({
    url: 'http://127.0.0.1:8000/masteries',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log('Success!');
      console.log(data);
      app.doTheThing();
    },
    error: function(data) {
      if (data) { 
        console.log(data);
      }
      console.error('Error!');
    }
  });
};

app.init();