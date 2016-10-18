
var app = {};

app.display = function(data) {
  var width = 960;
  var height = 500;

  var svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height);

  var force = d3.layout.force()
      .gravity(.05)
      .distance(100)
      .charge(-100)
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
      .attr('r', '5');

  node.append('text')
      .attr('dx', 12)
      .attr('dy', '.35em')
      .text(function(d) { return d.id; });

  force.on('tick', function() {
    link.attr('x1', function(d) { return d.source.x; })
        .attr('y1', function(d) { return d.source.y; })
        .attr('x2', function(d) { return d.target.x; })
        .attr('y2', function(d) { return d.target.y; });

    node.attr('transform', function(d) { return 'translate(' + d.x + ',' + d.y + ')'; });
  });
};

app.parseData = function(data) {
  console.log('ding!');

  var nodes = [];
  var championSet = {};
  data.forEach(function(masterySet) {
    masterySet.forEach(function(mastery) {
      championSet[mastery.championId] = true;
    });
  });
  var set = Object.keys(championSet);
  set.forEach(function(id) {
    nodes.push({id: id});
  });

  //Beware of duplicate links
  var links = [];
  data.forEach(function(masterySet) {
    for (var i = 0; i < masterySet.length; i++) {
      var source = masterySet[i].championId;
      var sourceIndex = set.indexOf('' + source);
      for (var j = i + 1; j < masterySet.length; j++) {
        var target = masterySet[j].championId;
        var targetIndex = set.indexOf('' + target);
        links.push({
          source: sourceIndex,
          target: targetIndex
        });
      }
    }
  });

  console.log(nodes);
  console.log(links);
  return {nodes: nodes, links: links};
};

app.init = function() {
  $.ajax({
    url: 'http://127.0.0.1:8000/masteries',
    type: 'GET',
    dataType: 'json',
    success: function(data) {
      console.log('Success!');
      console.log(data);
      var sanitized = app.parseData(data);
      app.display(sanitized);
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