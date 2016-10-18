
var app = {};

//Riot has some featured matches that you can just query for
app.getFeaturedMatches = function(callback) {
  $.ajax({
    url: 'https://' + window.REGION + '.api.pvp.net/observer-mode/rest/featured',
    type: 'GET',
    data: {api_key: window.RIOT_API_KEY},
    dataType: 'json',
    success: function (matches) {
      callback(matches);
    },
    error: function (matches) {
      if(matches) {
        console.error(matches);
      }
      console.error('ERROR getting featured matches!');
    }
  });
};

//Function intended for handling Ritos' match list object
app.getParticipantIDs = function (matches, callback) {
  var nameList = matches.gameList[0].participants.map(function(participant){
    return participant.summonerName;
  }).join(',');

  $.ajax({
    url: 'https://' + window.REGION + '.api.pvp.net/api/lol/na/v1.4/summoner/by-name/' + nameList,
    type: 'GET',
    data: {api_key: window.RIOT_API_KEY},
    dataType: 'json',
    success: function (data) {
      var IDs = [];
      for(var name in data) {
        IDs.push(data[name].id);
      }
      callback(IDs);
    },
    error: function (data) {
      if(data) {
        console.error(data);
      }
      console.error('ERROR getting participant IDs!');
    }
  });
};

//Grabs champion masteries for a particular set of summoner ids
app.getMastery = function(IDs, callback) {
  var counter = 0;
  var masteries = [];
  IDs.forEach(function(ID) {
    $.ajax({
      url: 'https://' + window.REGION + '.api.pvp.net/championmastery/location/NA1/player/'
            + ID + '/topchampions',
      type: 'GET',
      data: {api_key: window.RIOT_API_KEY},
      dataType: 'json',
      success: function (data) {
        counter++;
        masteries.push(data);
        if(counter === IDs.length){
          callback(masteries);
        }
      },
      error: function (data) {
        if(data) {
          console.error(data);
        }
        console.error('ERROR getting masteries!');
      }
    });
  });
}

app.init = function() {
  app.getFeaturedMatches(function(matches) {
    app.getParticipantIDs(matches, function(IDs) {
      console.log(IDs);
      //app.getMastery(IDs);
    });
  });
}


app.init();