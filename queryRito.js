var settings = require('./config.js');
var _ = require('underscore');
var Promise = require('bluebird');
var rp = require('request-promise');

var base = {
  qs: {
    api_key: settings.RIOT_API_KEY
  },
  json: true
};

var getData = function () {
  var data = {
    masteryData: null,
    championIndex: null
  };

  var url = {};
  url.uri = 'https://' + settings.REGION + '.api.pvp.net/observer-mode/rest/featured';
  return rp(_.extend(url, base))
  .then(function(matches) {
    console.log('Got matches');
    var nameList = matches.gameList[0].participants.map(function(participant) {
      return participant.summonerName;
    }).join(',');

    url.uri = 'https://' + settings.REGION + '.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + nameList;
    return rp(_.extend(url, base));
  })
  .then(function(participants) {
    console.log('Got participants');
    var IDs = [];
    for (var name in participants) {
      IDs.push(participants[name].id);
    }
    var promisedMasteries = [];
    IDs.forEach(function(id, index) {
      url.uri = 'https://' + settings.REGION + '.api.pvp.net/championmastery/location/NA1/player/' + id + '/topchampions';
      url.qs.count = settings.COUNT;
      //We're only getting every three b/c Rito has restrictions
      if (index % 2 === 0) { 
        promisedMasteries.push(rp(_.extend(url, base))); 
      }
    });
    return Promise.all(promisedMasteries);
  })
  .spread(function() {
    var masteries = Array.prototype.slice.call(arguments);
    console.log('Got masteries');
    data.masteryData = masteries;
    url.uri = 'https://global.api.pvp.net/api/lol/static-data/na/v1.2/champion';
    url.qs.dataById = true;
    url.qs.champData = 'image';
    return rp(_.extend(url, base));
  })
  .then(function(response) {
    console.log('Got champion data');
    data.championIndex = response.data;
    return data;
  })
  .catch(function(err) {
    console.error('Error', err.message);
  });
};

var getOne = function(name) {
  url = {};
  url.uri = 'https://' + settings.REGION + '.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + name;
  return rp(_.extend(url, base))
  .then(function(response) {
    var id = response[name].id;
    url.uri = 'https://' + settings.REGION + '.api.pvp.net/championmastery/location/NA1/player/' + id + '/topchampions';
    url.qs.count = settings.COUNT;
    return rp(_.extend(url, base));
  })
  .catch(function(err) {
    console.error('Error', err.message);
  });
};

module.exports.getData = getData;
module.exports.getOne = getOne;
