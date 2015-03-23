<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>karsha</title>

<link href="css/bootstrap.min.css" rel="stylesheet">

<!-- MetisMenu CSS -->
<link href="css/metisMenu.min.css" rel="stylesheet">

<!-- Custom CSS -->
<link href="css/sb-admin-2.css" rel="stylesheet">

<!-- Custom Fonts -->
<link href="font-awesome-4.1.0/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
<script src="js/jquery.js"></script>
<script src="js/function.js"></script>
<script src="js/overall.js"></script>
<script src="js/tracepaths.js"></script>
<script src="js/node.js"></script>
<script src="js/app.js"></script>
<script src="js/d3.min.js"></script>

</head>
<style>


.link {
  fill: none;
  stroke: #666;
  stroke-width: 1.5px;
}

.linkSustain {
  fill: none;
  stroke:#0066FF;
  stroke-width:1.5 px;
}

.linkEpisodic{
	fill: none;
	stroke:#FF0000;
	stroke-width:1.5px;
}

.linkWeak{
	fill: none;
	stroke:#33CC33;
	stroke-with:1.5px;
}

.linkWhite{
	fill: none;
	stroke:#FFFFFF;
	stroke-with:-10 px;
}

.node circle {
 
  stroke: #fff;
  stroke-width: 1.5px;
}

text {
  font: 10px sans-serif;
  pointer-events: none;
}

.d3-tip {
    line-height: 1;
    color: black;
}
</style>
<body>
<div id="wrapper">

       <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html">Karsha</a>
            </div>
            <!-- /.navbar-header -->
            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <li class="sidebar-search">
                            <div class="input-group custom-search-form">
                                <input type="text" class="form-control" placeholder="Search...">
                                <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                            </div>
                            <!-- /input-group -->
                        </li>
                        <li>
                            <a class="active" href="index.html"><i class="fa fa-dashboard fa-fw"></i> Dashboard</a>
                        </li>
                        <li>
                            <a href="network.html"><i class="fa fa-table fa-fw"></i> Network</a>
                        </li>
                            <li>
                            <a href="#"><i class="fa fa-wrench fa-fw"></i> Network Operations<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li><a href="#">ADD node<span class="fa arrow"></span></a>
                                     <ul class="nav nav-third-level">
                                     <li>
                                       <div class="panel panel-default">
                                            <div class="panel-body" style="background-color: #6495ed">
                                               Node name  : <input class="form-control" size="8"><br/>
                                               Node group : 
                                               <select>
                                                  <option value="1">1</option>
                                                  <option value="2">2</option>
                                                  <option value="3">3</option>
                                                  <option value="4">4</option>
                                                </select><br /><br />

                                                <button type="submit" class="btn btn-default">Add This Node to Network</button>

                                            </div>
                                        </div>                                         
                                     </li>
                                     </ul>
                                </li>
                                <li>
                                    <a href="#">ADD edge<span class="fa arrow"></span></a>
                                    <ul class="nav nav-third-level">
                                    <li>
                                        <div class="panel panel-default">
                                            <div class="panel-body" style="background-color: #6495ed">
                                             Source  : <input class="form-control" size="8"><br/>
                                             Target  : <input class="form-control" size="8"><br/>
                                               <br />
                                            <button type="submit" class="btn btn-default">Add This Edge to Network</button>

                                            </div>
                                        </div> 
                                    </li>
                                    </ul>
                                </li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                        <li>
                            <a href="#"><i class="fa fa-bar-chart-o fa-fw"></i> Graphical Analysis <span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level">
                                <li>
                                    <a href="hive_plot.html">Hive plot</a>
                                </li>
                                <li>
                                    <a href="grph_analysis.html">Other Graph </a>
                                </li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>
        <div id="page-wrapper">
            <div class="row">
                <div class="col-lg-12">
                    <h1 class="page-header">Network</h1>
                </div>
                <!-- /.col-lg-12 -->
            </div>
            <!-- /.row -->
            <div class="row">
                <div class="col-lg-12">
                    <div class="panel panel-default">
                        <div class="panel-body11" >
                            <div id="network"></div>
                            

                        </div>
                        <script>							

							//load the nodes and links arrays
							$(document).ready(function(){
								var obj=new Object();
								//obj.nodes=nodes;	
								//access json file using ajax and put the json content ito javascript object
								$.ajax({
									type: 'GET',
									url: "dataGet?year=2005",
									dataType: 'json',
									success: function(data) { 
										obj.link = data.links;
										obj.node = data.nodes;},
									error: function(data,error){alert(error);},
									async: false
								}); 
															
								N_OriginalNetworkGraph(nodes,obj.link,"#network",900,500);
								
								});
								//graphload 
								
								
									
								
								</script>    
                        <!-- /.panel-heading -->
                    
                        <!-- /.panel-body -->
                    </div>
                    <!-- /.panel -->
                </div>
                <!-- /.col-lg-12 -->
            </div>
            
        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->

    <!-- jQuery Version 1.11.0 -->
    <script src="js/jquery-1.11.0.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>
    
     <script src="js/jquery.js"></script>
	 <script src="js/jquery-ui.js"></script>

    <!-- Metis Menu Plugin JavaScript -->
    <script src="js/view_js/metisMenu.min.js"></script>
    
    <!-- Custom Theme JavaScript -->
    <script src="js/view_js/sb-admin-2.js"></script>
    
    

</body>
</html>