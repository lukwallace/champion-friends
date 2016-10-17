var greeting = 'Hello, World!';
var $greeting = $('<h1>' + greeting + '</h1>');
$(document).ready(function () {
  $('body').append($greeting);
});

