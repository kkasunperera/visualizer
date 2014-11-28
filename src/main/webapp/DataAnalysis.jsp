<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>Visualizer - Karsha project</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/sb-admin.css" rel="stylesheet">
<link href="css/plugins/morris.css" rel="stylesheet">
<link href="font-awesome-4.1.0/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
<link href="css/jquery-ui.css" rel="stylesheet">
<script src="http://d3js.org/d3.v3.min.js"></script>
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

.demoHeaders {
	margin-top: 2em;
}

#dialog-link {
	padding: .4em 1em .4em 20px;
	text-decoration: none;
	position: relative;
}

#dialog-link span.ui-icon {
	margin: 0 5px 0 0;
	position: absolute;
	left: .2em;
	top: 50%;
	margin-top: -8px;
}

#icons {
	margin: 0;
	padding: 0;
}

#icons li {
	margin: 2px;
	position: relative;
	padding: 4px 0;
	cursor: pointer;
	float: left;
	list-style: none;
}

#icons span.ui-icon {
	float: left;
	margin: 0 4px;
}

.fakewindowcontain .ui-widget-overlay {
	position: absolute;
}

select {
	width: 300px;
}

.axis path,.axis line {
	fill: none;
	stroke: #000;
	shape-rendering: crispEdges;
}

.bar {
	fill: steelblue;
}

.x.axis path {
	
}
</style>
</head>

<body>
	<div id="wrapper">
		<nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<div class="navbar-header">
				<button type="button" class="navbar-toggle" data-toggle="collapse"
					data-target=".navbar-ex1-collapse">
					<span class="sr-only">Toggle navigation</span> <span
						class="icon-bar"></span> <span class="icon-bar"></span> <span
						class="icon-bar"></span>
				</button>
				<a class="navbar-brand" href="index.jsp"><font color="white">GC Visualizer
						- Karsha project</font></a>
			</div>
			<div class="collapse navbar-collapse navbar-ex1-collapse">
				<ul class="nav navbar-nav side-nav">
					<li class="active"><a href="index.jsp"><i
							class="fa fa-fw fa-dashboard"></i>GC Visualizer</a></li>
					<li><a><i class="fa fa-fw fa-arrows-v"></i> GC-Analysis </a>
						<ul id="accordion">
							<% for(int i = 2005;i < 2014;i++) {%>
							<li>
								<h3>
									<a
										href="view_graph.jsp?filename=data<%=i%>.json&year=data<%=i%>.json&year=<%=i%>"><%=i%></a>
								</h3>
								<ul>
									<li><a
										href="view_graph.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=0"><i
											class="fa fa-fw fa-table"></i> Annual </a></li>
									<li><a
										href="Quater_view.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=1"><i
											class="fa fa-fw fa-table"></i> Quarter 1</a></li>
									<li><a
										href="Quater_view.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=2"><i
											class="fa fa-fw fa-table"></i> Quarter 2</a></li>
									<li><a
										href="Quater_view.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=3"><i
											class="fa fa-fw fa-table"></i> Quarter 3</a></li>
									<li><a
										href="Quater_view.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=4"><i
											class="fa fa-fw fa-table"></i> Quarter 4</a></li>
								</ul>
							</li>
							<%} %>
						</ul></li>
					<li><a href="DataAnalysis.jsp"><i class="fa fa-fw fa-table"></i>
							Data-Analysis</a></li>
					<li><a href="#"><i class="fa fa-fw fa-file"></i> More
							About</a></li>

				</ul>
				<%--  <li><a href="javascript:;" data-toggle="collapse"
                        data-target="#demo2"><i class="fa fa-fw fa-arrows-v"></i>
                            GC-Analysis 2 <i class="fa fa-fw fa-caret-down"></i></a>
                        
                        <ul id="demo2" name="demo" class="collapse">
                            <% for(int j = 2004;j < 2014;j++) {%>
                            <li><a href="view_graph.jsp?filename=data<%=j%>.json"><%=j%></a></li>                            
                            <%}%>
                        </ul></li> --%>

				<!--  <li><a href="Overall.html"><i
                            class="fa fa-fw fa-bar-chart-o"></i> Overall</a></li>
                    <li><a href="RowData.html"><i class="fa fa-fw fa-table"></i>
                            Row Data</a></li>
                    <li><a href="blank-page.html"><i class="fa fa-fw fa-file"></i>
                            More About</a></li> -->

			</div>
		</nav>

		<div id="page-wrapper">

			<div class="container-fluid">

				<!-- Page Heading -->
				<div class="row">
					<div class="col-lg-12">
						<h1 class="page-header">Data-Analysis</h1>
						<ol class="breadcrumb">
							<li><i class="fa fa-dashboard"></i> <a href="template.html">Visualizer</a>
							</li>
							<li class="active"><i class="fa fa-table"></i> Data-Analysis
							</li>
						</ol>
					</div>
				</div>
				<!-- /.row -->

				<div class="row">
					<div class="col-lg-12" style="">
						<center><h2>Clustering Coefficient Analysis - Log Volume Data</h2></center>
						<div id="cc_data" style="border: 2px solid;"></div>


						<script>
							var margin = {top: 20, right: 20, bottom: 30, left: 40},
							    width = 960 - margin.left - margin.right,
							    height = 400 - margin.top - margin.bottom;
							
							var x0 = d3.scale.ordinal()
							    .rangeRoundBands([0, width-60], .1);
							
							var x1 = d3.scale.ordinal();
							
							var y = d3.scale.linear()
							    .range([height, 0]);
							
							var color = d3.scale.ordinal()
							    .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56"]);
							
							var xAxis = d3.svg.axis()
							    .scale(x0)
							    .orient("bottom");
							
							var yAxis = d3.svg.axis()
							    .scale(y)
							    .orient("left")
							    .tickFormat(d3.format("1"));
							
							var svg = d3.select("#cc_data").append("svg")
							    .attr("width", width + margin.left + margin.right)
							    .attr("height", height + margin.top + margin.bottom)
							  .append("g")
							    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
							
							d3.csv("csv/data.csv", function(error, data) {
							  var ageNames = d3.keys(data[0]).filter(function(key) { return key !== "year"; });
							
							  data.forEach(function(d) {
							    d.ages = ageNames.map(function(name) { return {name: name, value: +d[name]}; });
							  });
							
							
							
							  x0.domain(data.map(function(d) { return d.State; }));
							  x1.domain(ageNames).rangeRoundBands([0, x0.rangeBand()]);
							  y.domain([0, d3.max(data, function(d) { return d3.max(d.ages, function(d) { return d.value; }); })]);
							
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
							      .text("Clustering Coefficient");
							
							  var state = svg.selectAll(".state")
							      .data(data)
							    .enter().append("g")
							      .attr("class", "g")
							      .attr("transform", function(d) { return "translate(" + x0(d.State) + ",0)"; });
							
							  state.selectAll("rect")
							      .data(function(d) { return d.ages; })
							    .enter().append("rect")
							      .attr("width", x1.rangeBand())
							      .attr("x", function(d) { return x1(d.name); })
							      .attr("y", function(d) { return y(d.value); })
							      .attr("height", function(d) { return height - y(d.value); })
							      .style("fill", function(d) { return color(d.name); });
							
							ageNames.shift();
							  var legend = svg.selectAll(".legend")
							      .data(ageNames.slice().reverse())
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

</script>
					</div>
				</div>
			</div>
			<!-- /.container-fluid -->

		</div>
		<!-- /#page-wrapper -->

	</div>
	<!-- /#wrapper -->

	<!-- jQuery Version 1.11.0 -->
	<script src="js/jquery-1.11.0.js"></script>

	<!-- Bootstrap Core JavaScript -->
	<script src="js/bootstrap.min.js"></script>
	<!-- Morris Charts JavaScript -->
	<script src="js/plugins/morris/raphael.min.js"></script>
	<script src="js/plugins/morris/morris.min.js"></script>
	<script src="js/plugins/morris/morris-data.js"></script>
	<script src="js/jquery.js"></script>
	<script src="js/jquery-ui.js"></script>
	<script>
	$( "#accordion" ).accordion();
	</script>
</body>

</html>
