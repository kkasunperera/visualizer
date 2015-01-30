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
<script src="js/dataAnalysis.js"></script>
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

.dot {
  stroke: #000;
}

.tooltip {
  position: absolute;
  width: 200px;
  height: 28px;
  pointer-events: none;
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
				<a class="navbar-brand" href="index.jsp"><font color="white">GC
						Visualizer - Karsha project</font></a>
			</div>
			<div class="collapse navbar-collapse navbar-ex1-collapse">
				<ul class="nav navbar-nav side-nav">
					<li class="active"><a href="index.jsp"><i
							class="fa fa-fw fa-dashboard"></i>GC Visualizer</a></li>
					<li><a><i class="fa fa-fw fa-arrows-v"></i> GC-Analysis </a>
						<ul id="accordion">
							<%
								for (int i = 2005; i < 2013; i++) {
							%>
							<li>
								<h3>
									<a
										href="view_graph.jsp?filename=data<%=i%>.json&year=data<%=i%>.json&year=<%=i%>"><%=i%></a>
								</h3>
								<ul>
									<li><a
										href="view_graph.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=0"><i
											class="fa fa-fw fa-table"></i> Overall </a></li>
									<li><a href="view_graph.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=5"><i 
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
							<%
								}
							%>
						</ul></li>
					<li><a href="DataAnalysis.jsp"><i
							class="fa fa-fw fa-table"></i> Network Summary Statistics</a></li>
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
						<h1 class="page-header">Network Summary Statistics</h1>
						<ol class="breadcrumb">
							<li><i class="fa fa-dashboard"></i> <a href="template.html">Visualizer</a>
							</li>
							<li class="active"><i class="fa fa-table"></i> Network Summary Statistics
							</li>
						</ol>
					</div>
				</div>
				<!-- /.row -->
				<div class="row">
					<div class="col-lg-12">
						<div id="edge_data" style="border: 2px solid;">
							<center>
								<h2>Edge Distribution - Log Volume</h2>
							</center>
							<script type="text/javascript">
								allData_histogram("#edge_data",
										"csv/edges_overall_data.csv",
										"Number of edges");
							</script>
						</div>
					</div>
				</div>
				<br></br>
				<div class="row">
					<div class="col-lg-6" style="border: 2px solid;">
						<div id="year_edge_data">
							<center>
								<h4>GC edges occurrence count annually</h4>
							</center>
							<script type="text/javascript">
								year_edge_histogrm("#year_edge_data",
										"csv/year_edge_analysis.csv");
							</script>
						</div>
					</div>
					<div class="col-rg-6" style="border: 2px solid;">
						<div id="quater_edge_data">
							<center>
								<h4>Single-Edge Quarterly-Repeat Count Distribution</h4>
							</center>
							<script type="text/javascript">
								year_edge_histogrm("#quater_edge_data",
										"csv/quater_edge_analysis.csv");
							</script>
						</div>
					</div>
				</div>
				<br></br>				
				<br></br>
				<div class="row">
					<div class="col-lg-12">

						<div id="cc_data" style="border: 2px solid;">
							<center>
								<h2>Clustering Coefficient Analysis - Log Volume Data</h2>
							</center>
							<script type="text/javascript">
								allData_histogram("#cc_data",
										"csv/cc_overall_data.csv","Clustering Coefficient");
							</script>
						</div>
					</div>
				</div>				
				<div class="row">
					<div class="col-lg-12">
						<div id="com_triad_data" style="border: 2px solid;">
							<center>
								<h2>Complete triad Analysis - Log Volume Data</h2>
							</center>
							<script type="text/javascript">
								allData_histogram("#com_triad_data","csv/comTraid_overall_data.csv","Number of Complete triads");
							</script>
						</div>
					</div>
				</div>
				<br></br>
				<div class="row">
					<div class="col-lg-12">
						<div id="Incom_triad_data" style="border: 2px solid;">
							<center>
								<h2>Incomplete triad Analysis - Log Volume Data</h2>
							</center>
							<script type="text/javascript">
								allData_histogram("#Incom_triad_data","csv/IncomTraid_overall_data.csv","Number of Incomplete triads");
							</script>
						</div>
					</div>
				</div>
				<br></br>
				<div class="row">
					<div class="col-lg-12">
						<div id="repeat_cmp_triad" style="border: 2px solid;">
							<center>
								<h2>Repeated Completed Triad Analysis - Log Volume Data</h2>
							</center>
							<script type="text/javascript">
								repeatCmpTriad("#repeat_cmp_triad", "csv/repeat.csv");
							</script>
						</div>
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
		$("#accordion").accordion();
	</script>
</body>

</html>
