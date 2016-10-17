//Consider: Turning this file into a server with express -- 
//Maybe use npm request node to interface with RIOT API instead and
//then do maintaining live dataset here. Client side can then
//do a get request to here to get properly maintained dataset
//var request = require('request');


var getMockData = function(callback) {
  $.ajax({
    url: 'https://' + REGION + '.api.pvp.net/observer-mode/rest/featured',
    type: 'GET',
    data: {key: window.RIOT_API_KEY},
    dataType: 'json',
    success: function (matches) {
      console.log(matches);
    },
    error: function (matches, anythingElse) {
      if(matches) {
        console.error(matches);
      }
      console.error('Error!', matches, anythingElse);
    }
  });
}

getMockData();