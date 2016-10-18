var settings = require('./config.js');
var _ = require('underscore');
var Promise = require('bluebird');
var rp = require('request-promise');

var getData = function () {
  var base = {
    qs: {
      api_key: settings.RIOT_API_KEY
    },
    json:true
  };

  var url = {}
  url.uri = 'https://' + settings.REGION + '.api.pvp.net/observer-mode/rest/featured';
  return rp(_.extend(url, base))
  .then(function(matches) {
    console.log('Got matches');
    var nameList = matches.gameList[0].participants.map(function(participant){
      return participant.summonerName;
    }).join(',');

    url.uri = 'https://' + settings.REGION + '.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + nameList;
    return rp(_.extend(url, base));
  })
  .then(function(participants) {
    console.log('Got participants');
    var IDs = [];
    for(var name in participants) {
      IDs.push(participants[name].id);
    }
    var promisedMasteries = [];
    IDs.forEach(function(id, index) {
      url.uri = 'https://' + settings.REGION + '.api.pvp.net/championmastery/location/NA1/player/' + id + '/topchampions';
      if(index % 3 === 0) { promisedMasteries.push(rp(_.extend(url, base))) };
    });
    return Promise.all(promisedMasteries);
  })
  .spread(function(masteries){
    console.log('Got masteries');
    console.log(masteries);
    return masteries;
  })
  .catch(function(err) {
    console.error('Error', err.message);
  });
}

module.exports.getData = getData;
