function allData_histogram(pos,file,axistxt) {
	var margin = {
			top : 20,
			right : 20,
			bottom : 30,
			left : 40
		}, width = 960 - margin.left - margin.right, height = 400 - margin.top
				- margin.bottom;

		var x0 = d3.scale.ordinal().rangeRoundBands([ 0, width - 60 ], .1);

		var x1 = d3.scale.ordinal();

		var y = d3.scale.linear().range([ height, 0 ]);

		var color = d3.scale.ordinal().range(
				[ "#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56" ]);

		var xAxis = d3.svg.axis().scale(x0).orient("bottom");

		var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format("1"));

		var svg = d3.select(pos).append("svg").attr("width",
				width + margin.left + margin.right).attr("height",
				height + margin.top + margin.bottom).append("g").attr("transform",
				"translate(" + margin.left + "," + margin.top + ")");

		d3.csv(file, function(error, data) {
			var ageNames = d3.keys(data[0]).filter(function(key) {
				return key !== "year";
			});

			data.forEach(function(d) {
				d.ages = ageNames.map(function(name) {
					return {
						name : name,
						value : +d[name]
					};
				});
			});

			x0.domain(data.map(function(d) {
				return d.State;
			}));
			x1.domain(ageNames).rangeRoundBands([ 0, x0.rangeBand() ]);
			y.domain([ 0, d3.max(data, function(d) {
				return d3.max(d.ages, function(d) {
					return d.value;
				});
			}) ]);

			svg.append("g").attr("class", "x axis").attr("transform",
					"translate(0," + height + ")").call(xAxis);

			svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr(
					"transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style(
					"text-anchor", "end").text(axistxt);

			var state = svg.selectAll(".state").data(data).enter().append("g").attr(
					"class", "g").attr("transform", function(d) {
				return "translate(" + x0(d.State) + ",0)";
			});

			state.selectAll("rect").data(function(d) {
				return d.ages;
			}).enter().append("rect").attr("width", x1.rangeBand()).attr("x",
					function(d) {
						return x1(d.name);
					}).attr("y", function(d) {
				return y(d.value);
			}).attr("height", function(d) {
				return height - y(d.value);
			}).style("fill", function(d) {
				return color(d.name);
			});

			ageNames.shift();
			var legend = svg.selectAll(".legend").data(ageNames.slice().reverse())
					.enter().append("g").attr("class", "legend").attr("transform",
							function(d, i) {
								return "translate(0," + i * 20 + ")";
							});

			legend.append("rect").attr("x", width - 18).attr("width", 18).attr(
					"height", 18).style("fill", color);

			legend.append("text").attr("x", width - 24).attr("y", 9)
					.attr("dy", ".35em").style("text-anchor", "end").text(function(d) {
						return d;
					});

		});
}

function year_edge_histogrm(pos,file){
	var margin = {
			top : 10,
			right : 10,
			bottom : 25,
			left : 35
		}, width = 480 - margin.left - margin.right, height = 200 - margin.top
				- margin.bottom;

	var x0 = d3.scale.ordinal().rangeRoundBands([ 0, width - 60 ], .1);

	var x1 = d3.scale.ordinal();

	var y = d3.scale.linear().range([ height, 0 ]);

	var color = d3.scale.ordinal().range(
			[ "#ffffff", "#8a89a6", "#7b6888", "#6b486b", "#a05d56" ]);

	var xAxis = d3.svg.axis().scale(x0).orient("bottom");

	var yAxis = d3.svg.axis().scale(y).orient("left").tickFormat(d3.format("1"));

	var svg = d3.select(pos).append("svg").attr("width",
			width + margin.left + margin.right).attr("height",
			height + margin.top + margin.bottom).append("g").attr("transform",
			"translate(" + margin.left + "," + margin.top + ")");

	d3.csv(file, function(error, data) {
		var ageNames = d3.keys(data[0]).filter(function(key) {
			return key !== "year";
		});

		data.forEach(function(d) {
			d.ages = ageNames.map(function(name) {
				return {
					name : name,
					value : +d[name]
				};
			});
		});

		x0.domain(data.map(function(d) {
			return d.State;
		}));
		x1.domain(ageNames).rangeRoundBands([ 0, x0.rangeBand() ]);
		y.domain([ 0, d3.max(data, function(d) {
			return d3.max(d.ages, function(d) {
				return d.value;
			});
		}) ]);

		svg.append("g").attr("class", "x axis").attr("transform",
				"translate(0," + height + ")").call(xAxis);

		svg.append("g").attr("class", "y axis").call(yAxis).append("text").attr(
				"transform", "rotate(-90)").attr("y", 6).attr("dy", ".71em").style(
				"text-anchor", "end").text("Number of Edges");

		var state = svg.selectAll(".state").data(data).enter().append("g").attr(
				"class", "g").attr("transform", function(d) {
			return "translate(" + x0(d.State) + ",0)";
		});

		state.selectAll("rect").data(function(d) {
			return d.ages;
		}).enter().append("rect").attr("width", x1.rangeBand()).attr("x",
				function(d) {
					return x1(d.name);
				}).attr("y", function(d) {
			return y(d.value);
		}).attr("height", function(d) {
			return height - y(d.value);
		}).style("fill", function(d) {
			return color(d.name);
		});

		ageNames.shift();
		var legend = svg.selectAll(".legend").data(ageNames.slice().reverse())
				.enter().append("g").attr("class", "legend").attr("transform",
						function(d, i) {
							return "translate(0," + i * 20 + ")";
						});

		legend.append("rect").attr("x", width - 18).attr("width", 18).attr(
				"height", 18).style("fill", color);

		legend.append("text").attr("x", width - 24).attr("y", 9)
				.attr("dy", ".35em").style("text-anchor", "end").text(function(d) {
					return d;
				});

	});
}

function repeatCmpTriad(position,file){
	
	var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
	

	var xValue = function(d) { return d.year;}, 
	    xScale = d3.scale.linear().range([0, width]), 
	    xMap = function(d) { return xScale(xValue(d));}, 
	    xAxis = d3.svg.axis().scale(xScale).orient("bottom");
	    
    var yValue = function(d) { return d["triad"];},
	    yScale = d3.scale.linear().range([height, 0]), 
	    yMap = function(d) { return yScale(yValue(d));}, 
	    yAxis = d3.svg.axis().scale(yScale).orient("left");	

	 // color according to triad
	    var cValue = function(d) { return d.triad;},
	        color = d3.scale.category10();
	    
	 // add the graph canvas to the position
	    var svg = d3.select(position).append("svg")
	        .attr("width", width + margin.left + margin.right)
	        .attr("height", height + margin.top + margin.bottom)
	      .append("g")
	        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

	 // add the tooltip
	    var tooltip = d3.select("body").append("div")
	        .attr("class", "tooltip")
	        .style("opacity", 0);
	    
	 // load data
	    d3.csv(file, function(error, data) {
	      
	      data.forEach(function(d) {
	        d.year = +d.year;
	        d["triad"] = +d["triad"];      
	      });

	      console.log(data);
	      
	      // avoid overlapping
	      xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
	      yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

	      // x-axis
	      svg.append("g")
	          .attr("class", "x axis")
	          .attr("transform", "translate(0," + height + ")")
	          .call(xAxis)
	        .append("text")
	          .attr("class", "label")
	          .attr("x", width)
	          .attr("y", -6)
	          .style("text-anchor", "end")
	          .text("year");

	      // y-axis
	      svg.append("g")
	          .attr("class", "y axis")
	          .call(yAxis)
	        .append("text")
	          .attr("class", "label")
	          .attr("transform", "rotate(-90)")
	          .attr("y", 6)
	          .attr("dy", ".71em")
	          .style("text-anchor", "end")
	          .text("triad");

	      // draw dots
	      svg.selectAll(".dot")
	          .data(data)
	        .enter().append("circle")
	          .attr("class", "dot")
	          .attr("r", 4)
	          .attr("cx", xMap)
	          .attr("cy", yMap)
	          .style("fill", function(d) { return color(cValue(d));}) 
	          .on("mouseover", function(d) {
	              tooltip.transition()
	                   .duration(200)
	                   .style("opacity", .9);
	              tooltip.html(d["name"])
	                   .style("left", (d3.event.pageX + 5) + "px")
	                   .style("top", (d3.event.pageY - 28) + "px");
	          })
	          .on("mouseout", function(d) {
	              tooltip.transition()
	                   .duration(500)
	                   .style("opacity", 0);
	          });

	      // draw legend
	      var legend = svg.selectAll(".legend")
	          .data(color.domain())
	        .enter().append("g")
	          .attr("class", "legend")
	          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

	      // draw legend colored rectangles
	      legend.append("rect")
	          .attr("x", width - 18)
	          .attr("width", 18)
	          .attr("height", 18)
	          .style("fill", color);

	      // draw legend text
	      legend.append("text")
	          .attr("x", width - 24)
	          .attr("y", 9)
	          .attr("dy", ".35em")
	          .style("text-anchor", "end")
	          .text(function(m) { 
	        	  for(var i=0;i < data.length; i++){
	        		  if(data[i].triad == m){
	        			  //console the triad
	        			  console.log(data[i].name);
	        			  return data[i].name;
	        		  }
	        	  }
	          	 
	          })
	    });        	
}

function edges_histogram(pos,file,axistxt) {
	var margin = {
			top : 20,
			right : 20,
			bottom : 30,
			left : 40
		}, width = 960 - margin.left - margin.right, height = 400 - margin.top
				- margin.bottom;

var x = d3.scale.ordinal()
    .rangeRoundBands([0, width-60], .1);

var y = d3.scale.linear()
    .rangeRound([height, 0]);

var color = d3.scale.ordinal()
    .range(["#1f77b4", "#ff7f0d", "#2ca02c", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left")
    .tickFormat(d3.format(".2s"));

var svg = d3.select(pos).append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv(file, function(error, data) {
  color.domain(d3.keys(data[0]).filter(function(key) { return key !== "State"; }));

  data.forEach(function(d) {
    var y0 = 0;
    d.ages = color.domain().map(function(name) { return {name: name, y0: y0, y1: y0 += +d[name]}; });
    d.total = d.ages[d.ages.length - 1].y1;
  });

  data.sort(function(a, b) { return b.total - a.total; });

  x.domain(data.map(function(d) { return d.State; }));
  y.domain([0, d3.max(data, function(d) { return d.total; })]);

  svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  svg.append("g")
      .attr("class", "y axis")
      .call(yAxis)
    .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text(axistxt);

  var state = svg.selectAll(".state")
      .data(data)
    .enter().append("g")
      .attr("class", "g")
      .attr("transform", function(d) { return "translate(" + x(d.State) + ",0)"; });

  state.selectAll("rect")
      .data(function(d) { return d.ages; })
    .enter().append("rect")
      .attr("width", x.rangeBand())
      .attr("y", function(d) { return y(d.y1); })
      .attr("height", function(d) { return y(d.y0) - y(d.y1); })
      .style("fill", function(d) { return color(d.name); });

  var legend = svg.selectAll(".legend")
      .data(color.domain().slice().reverse())
    .enter().append("g")
      .attr("class", "legend")
      .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

  legend.append("rect")
      .attr("x", width - 18)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", color);

  legend.append("text")
      .attr("x", width - 24)
      .attr("y", 9)
      .attr("dy", ".35em")
      .style("text-anchor", "end")
      .text(function(d) { return d; });

});
	
}
