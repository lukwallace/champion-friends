//Add express here later
var settings = require('./config.js');
//var rp = require('request-promise');
var request = require('request');


console.log('Testing this request module!');
request('https://' + settings.REGION + '.api.pvp.net/championmastery/location/NA1/player/'
            + 30370360 + '/topchampions?api_key='
        + settings.RIOT_API_KEY, function(error, res, body) {
  console.log('Here is what I got back:', error, body);
});
// request('https://' + settings.REGION + '.api.pvp.net/observer-mode/rest/featured?api_key='
//         + settings.RIOT_API_KEY, function(error, res, body) {
//   console.log('Here is what I got back:', error, body);
// });
