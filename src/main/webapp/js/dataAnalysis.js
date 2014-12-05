
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
