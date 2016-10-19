
var app = {};

app.display = function(data, width, height) {
  var svg = d3.select('svg')
      .attr('width', width)
      .attr('height', height);

  var force = d3.layout.force()
      .gravity(.05)
      .distance(200)
      .charge(-500)
      .size([width, height]);

  force
      .nodes(data.nodes)
      .links(data.links)
      .start();

  var link = svg.selectAll('.link')
      .data(data.links)
    .enter().append('line')
      .attr('class', 'link');

  var node = svg.selectAll('.node')
      .data(data.nodes)
    .enter().append('g')
      .attr('class', 'node')
      .call(force.drag);

  node.append('circle')
      .attr('r', '16')
      .attr('stroke', 'black')
      .attr('fill', function(d) { return 'url(#' + d.id + ')'; });

  node.append('text')
      .attr('dx', '-1em')
      .attr('dy', '4ex')
      .text(function(d) { return d.name; });

  force.on('tick', function() {
    link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

    node.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
  });
};

app.loadImages = function(data) {
  var championIndex = data.championIndex;
  var defs = d3.select('body').append('svg').append('defs');
  for (var id in championIndex) {
    console.log(championIndex[id]);
    var filename = championIndex[id].image.full.toLowerCase();
    defs.append('pattern')
          .attr('id', id)
          .attr('x', 0)
          .attr('y', 0)
          .attr('height', 32)
          .attr('width', 32)
        .append('image')
          .attr('x', 0)
          .attr('y', 0)
          .attr('width', 32)
          .attr('height', 32)
          .attr('href', './champions/' + filename);
  }

  // <pattern id="image" x="0" y="0" patternUnits="userSpaceOnUse" height="1" width="1">
  //   <image x="0" y="0" xlink:href="url.png"></image>
  // </pattern>

};

app.parseData = function(data) {
  console.log('ding!');
  var masteries = data.masteryData;
  var championIndex = data.championIndex;

  var nodes = [];
  var championSet = {};
  masteries.forEach(function(masterySet) {
    masterySet.forEach(function(mastery) {
      var elem = championSet[mastery.championId];
      //only overwrite if they've played more
      if (elem && elem.championPoints < mastery.championPoints) {
        championSet[mastery.championId] = mastery;
      }

      if (elem === undefined) {
        championSet[mastery.championId] = mastery;
      }
    });
  });
  var championIDs = Object.keys(championSet);
  championIDs.forEach(function(id) {
    nodes.push({
      id: id,
      name: championIndex[id].name,
      mastery: championSet[id],
      image: championIndex[id].image.full
    });
  });

  //Beware of duplicate links
  var links = [];
  masteries.forEach(function(masterySet) {
    for (var i = 0; i < masterySet.length; i++) {
      var source = masterySet[i].championId;
      var sourceIndex = championIDs.indexOf('' + source);
      for (var j = i + 1; j < masterySet.length; j++) {
        var target = masterySet[j].championId;
        var targetIndex = championIDs.indexOf('' + target);
        links.push({
          source: sourceIndex,
          target: targetIndex
        });
      }
    }
  });

  return {nodes: nodes, links: links};
};

app.init = function(width, height) {
  $.ajax({
    url: 'http://127.0.0.1:8000/masteries',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log('Success!');
      console.log(data);
      app.loadImages(data);
      var sanitized = app.parseData(data);
      app.display(sanitized, width, height);
    },
    error: function(data) {
      if (data) { 
        console.log(data);
      }
      console.error('Error!');
    }
  });
};

app.init(1400, 900);