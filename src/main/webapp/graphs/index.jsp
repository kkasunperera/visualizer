<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<meta charset="utf-8">
<style>

.link {
  fill: none;
  stroke: #666;
  stroke-width: 1.5px;
}

.node circle {
 
  stroke: #fff;
  stroke-width: 1.5px;
}

text {
  font: 10px sans-serif;
  pointer-events: none;
}
</style>
<body>
<script src="http://d3js.org/d3.v3.min.js"></script>
<script>
var color = d3.scale.category10();
var width = 1300,
    height = 1300

var svg = d3.select("body").append("svg")
    .attr("width", width)
    .attr("height", height);

var force = d3.layout.force()
    .gravity(.05)
    .distance(600)
    .charge(-600)
    .size([width, height]);

d3.json("graph.json", function(error, json) {
  force
      .nodes(json.nodes)
      .links(json.links)
      .on("tick", tick)
      .start();

  var link = svg.selectAll(".link")
      .data(json.links)
    .enter().append("line")
      .attr("class", "link");
      
  svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // Different link/path types can be defined here
  .enter().append("svg:marker")    // This section adds in the arrows
    .attr("id", String)
    .attr("viewBox", "0 -5 10 10")
    .attr("refX", 15)
    .attr("refY", -1.5)
    .attr("markerWidth", 6)
    .attr("markerHeight", 6)
    .attr("orient", "auto")
  .append("svg:path")
    .attr("d", "M0,-5L10,0L0,5");
      
      
  var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
  .enter().append("svg:path")
	.attr("class", function(d) { return "link " + d.type; })
	.attr("class", "link")
	.attr("marker-end", "url(#end)");

  var node = svg.selectAll(".node")
      .data(json.nodes)
    .enter().append("g")
      .attr("class", "node")
      .style("fill", function(d) { return color(d.group); })
      .on("click",click)
      .on("dblclick", dblclick)
      .on("mouseover", mouseover)
      .on("mouseout", fade(1))
      .call(force.drag);

  node.append("circle")
      .attr("r",8);

  node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .text(function(d) { return d.name});
  
 
    function tick() {
    path.attr("d", function(d) {

	
        var dx = d.target.x - d.source.x,
            dy = d.target.y - d.source.y,
            dr = Math.sqrt(dx * dx + dy * dy);
        return "M" + 
            d.source.x + "," + 
            d.source.y + "A" + 
            dr + "," + dr + " 0 0,1 " + 
            d.target.x + "," + 
            d.target.y;
		
   });

    node
        .attr("transform", function(d) { 
  	    return "translate(" + d.x + "," + d.y + ")"; });
}

});

function click() {
    d3.select(this).select("text").transition()
        .duration(750)
        .style("fill", "black")
        .style("stroke", "lightsteelblue")
        .style("stroke-width", ".5px")
        .style("font", "20px sans-serif");
    d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 25)
        .style("fill", function(d) { return color(d.group); })
}

function dblclick() {
    d3.select(this).select("circle").transition()
        .duration(750)
        .attr("r", 6)
        .style("fill", function(d) { return color(d.group); })
    d3.select(this).select("text").transition()
        .duration(750)
        .attr("x", 12)
        .style("stroke", "none")
        .style("fill", "black")
        .style("stroke", "none")
        .style("font", "10px sans-serif");
}

function mouseover() {
  d3.select(this).select("circle").transition()
      .duration(200)
      .attr("r", 18);
}

 function fade(opacity) {
        return function(d) {
            node.style("stroke-opacity", function(o) {
                thisOpacity = isConnected(d, o) ? 1 : opacity;
                this.setAttribute('fill-opacity', thisOpacity);
                return thisOpacity;
            });

            path.style("stroke-opacity", function(o) {
		//return o.source === d || o.target === d ? 1 : opacity;
                return o.source === d ? 1 : opacity;
            });

        };
    }
    
function neighboring(a, b) {
  return linkedByIndex[a.index + "," + b.index];
}

function isConnected(a, b) {
//return incoming and outgoing
//return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
//return outgong
//alert(a.index + "," + b.index);
	return linkedByIndex[a.index + "," + b.index];
	}

</script>