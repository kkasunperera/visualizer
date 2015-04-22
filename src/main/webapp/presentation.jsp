<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Karsha-Visualizer</title>
<link rel="stylesheet" type="text/css" href="css/jquery.gridster.css">
<link rel="stylesheet" type="text/css" href="css/presentation.css">
<link href="css/c3.css">
<link href="font-awesome-4.1.0/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
<link href="css/jquery-ui.css" rel="stylesheet">
<script src="js/d3.min.js"></script>
<script src="js/c3.js"></script>
<script src="js/N_dataAnalysis.js"></script>
<script src="js/jquery.1.9.1.min.js"></script>
<script src="js/jquery-ui.js"></script>
<style type="text/css">
[data-col="16"] {
	left: 1655px;
}

[data-col="15"] {
	left: 1545px;
}

[data-col="14"] {
	left: 1435px;
}

[data-col="13"] {
	left: 1325px;
}

[data-col="12"] {
	left: 1215px;
}

[data-col="11"] {
	left: 1105px;
}

[data-col="10"] {
	left: 995px;
}

[data-col="9"] {
	left: 885px;
}

[data-col="8"] {
	left: 775px;
}

[data-col="7"] {
	left: 665px;
}

[data-col="6"] {
	left: 555px;
}

[data-col="5"] {
	left: 445px;
}

[data-col="4"] {
	left: 335px;
}

[data-col="3"] {
	left: 225px;
}

[data-col="2"] {
	left: 115px;
}

[data-col="1"] {
	left: 5px;
}

[data-row="21"] {
	top: 1305px;
}

[data-row="20"] {
	top: 1240px;
}

[data-row="19"] {
	top: 1175px;
}

[data-row="18"] {
	top: 1110px;
}

[data-row="17"] {
	top: 1045px;
}

[data-row="16"] {
	top: 980px;
}

[data-row="15"] {
	top: 915px;
}

[data-row="14"] {
	top: 850px;
}

[data-row="13"] {
	top: 785px;
}

[data-row="12"] {
	top: 720px;
}

[data-row="11"] {
	top: 655px;
}

[data-row="10"] {
	top: 590px;
}

[data-row="9"] {
	top: 525px;
}

[data-row="8"] {
	top: 460px;
}

[data-row="7"] {
	top: 395px;
}

[data-row="6"] {
	top: 330px;
}

[data-row="5"] {
	top: 265px;
}

[data-row="4"] {
	top: 200px;
}

[data-row="3"] {
	top: 135px;
}

[data-row="2"] {
	top: 70px;
}

[data-row="1"] {
	top: 5px;
}

[data-sizey="1"] {
	height: 55px;
}

[data-sizey="2"] {
	height: 120px;
}

[data-sizey="3"] {
	height: 185px;
}

[data-sizey="4"] {
	height: 250px;
}

[data-sizey="5"] {
	height: 315px;
}

[data-sizey="6"] {
	height: 380px;
}

[data-sizey="7"] {
	height: 445px;
}

[data-sizey="8"] {
	height: 510px;
}

[data-sizey="9"] {
	height: 575px;
}

[data-sizey="10"] {
	height: 640px;
}

[data-sizey="11"] {
	height: 705px;
}

[data-sizey="12"] {
	height: 770px;
}

[data-sizey="13"] {
	height: 835px;
}

[data-sizey="14"] {
	height: 900px;
}

[data-sizey="15"] {
	height: 965px;
}

[data-sizey="16"] {
	height: 1030px;
}

[data-sizey="17"] {
	height: 1095px;
}

[data-sizey="18"] {
	height: 1160px;
}

[data-sizey="19"] {
	height: 1225px;
}

[data-sizey="20"] {
	height: 1290px;
}

[data-sizex="1"] {
	width: 100px;
}

[data-sizex="2"] {
	width: 210px;
}

[data-sizex="3"] {
	width: 320px;
}

[data-sizex="4"] {
	width: 430px;
}

[data-sizex="5"] {
	width: 540px;
}

[data-sizex="6"] {
	width: 650px;
}

[data-sizex="7"] {
	width: 760px;
}

[data-sizex="8"] {
	width: 870px;
}

[data-sizex="9"] {
	width: 980px;
}

[data-sizex="10"] {
	width: 1090px;
}

[data-sizex="11"] {
	width: 1200px;
}

[data-sizex="12"] {
	width: 1310px;
}

[data-sizex="13"] {
	width: 1420px;
}

[data-sizex="14"] {
	width: 1530px;
}

[data-sizex="15"] {
	width: 1640px;
}

.c3-tooltip-container {
	z-index: 10;
}

.c3-tooltip {
	border-collapse: collapse;
	border-spacing: 0;
	background-color: #fff;
	empty-cells: show;
	-webkit-box-shadow: 7px 7px 12px -9px #777777;
	-moz-box-shadow: 7px 7px 12px -9px #777777;
	box-shadow: 7px 7px 12px -9px #777777;
	opacity: 0.9;
}

.c3-tooltip tr {
	border: 1px solid #CCC;
}

.c3-tooltip th {
	background-color: #aaa;
	font-size: 14px;
	padding: 2px 5px;
	text-align: left;
	color: #FFF;
}

.c3-tooltip td {
	font-size: 13px;
	padding: 3px 6px;
	background-color: #fff;
	border-left: 1px dotted #999;
}

.c3-tooltip td>span {
	display: inline-block;
	width: 10px;
	height: 10px;
	margin-right: 6px;
}

.c3-tooltip td.value {
	text-align: right;
}
</style>
</head>
<body>
<a href="index.jsp">
<button id="home"><h4>Back to Karsha Visualizer</h4></button>
</a>
<a href="presentation.jsp">
<button id="refresh"><h4>Refresh</h4></button><br>
</a>
 <div class="gridster ready">
    <ul style="height: 5200px; width: 1540px; position: relative;">
      <li data-row="1" data-col="1" data-sizex="6" data-sizey="6">
      <br><h3>Edge distribution</h3>
      	<div id="edge_graph">
			<script type="text/javascript">
				c3_edge('#edge_graph', 1);
			</script>
		</div>
      </li>
      <li data-row="1" data-col="1" data-sizex="4" data-sizey="6" class="gs-w">
      <br><h4>Single-Edge Annually-Repeat Count Distribution</h4>
      	<div id="YrepCount_grp">
			<script type="text/javascript">
			c3_barGrp('#YrepCount_grp', 1);
			</script>
		</div>
      </li>
      <li data-row="2" data-col="1" data-sizex="4" data-sizey="6" class="gs-w">
      <br><h4>Single-Edge Quarterly-Repeat Count Distribution</h4>
      <div id="QrepCount_grp">
		<script type="text/javascript">
			c3_barGrp('#QrepCount_grp', 2);
		</script>
	  </div>
      </li>
      <li data-row="2" data-col="1" data-sizex="6" data-sizey="6" class="gs-w">
      <br><h4>Clustering Coefficient</h4>
      <div id="clusterCof_graph">
	  	<script type="text/javascript">
			c3_edge('#clusterCof_graph', 2);
		</script>
	  </div>
      </li>
      <li data-row="3" data-col="1" data-sizex="5" data-sizey="6" class="gs-w">
      <br><h4>Complete Triad Count</h4>
      <div id="com_graph">
		<script type="text/javascript">
			c3_edge('#com_graph', 3);
		</script>
	  </div>
      </li>
      <li data-row="3" data-col="1" data-sizex="5" data-sizey="6" class="gs-w">
      <br><h4>Incomplete Triad Count</h4>
      <div id="incom_graph">
			<script type="text/javascript">
				c3_edge('#incom_graph', 4);
			</script>
	  </div>
      </li>
     </ul>
  </div>




	<script type="text/javascript"
		src="js/jquery.js"></script>
	<script
		src="js/jquery.gridster.js"
		type="text/javascript" charset="utf-8"></script>

	<script type="text/javascript">
		var gridster;

		$(function() {

			var log = document.getElementById('log');

			gridster = $(".gridster ul").gridster({
				widget_base_dimensions : [ 100, 55 ],
				widget_margins : [ 5, 5 ],
				autogrow_cols : true,
				resize : {
					enabled : false
				}
			}).data('gridster');

		});
	</script>

</body>
</html>