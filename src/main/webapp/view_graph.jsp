<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>GCVisualizer - Karsha project</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/sb-admin.css" rel="stylesheet">
<link href="css/plugins/morris.css" rel="stylesheet">
<link href="font-awesome-4.1.0/css/font-awesome.min.css"
    rel="stylesheet" type="text/css">
<link href="css/jquery-ui.css" rel="stylesheet">
<script src="js/jquery.1.9.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/function.js"></script>
<script src="js/overall.js"></script>
<script src="js/tracepaths.js"></script>
<script src="js/node.js"></script>
<script src="js/app.js"></script>

<style type="text/css">
		.demoHeaders {
			margin-top: 2em;
		}
		#tooltip {
    position: absolute;
    width: 200px;
    height: auto;
    padding: 10px;
    background-color: white;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    -webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.4);
    -mox-box-shadow: 4px 4px 4px 10px rgba(0, 0, 0, 0.4);
    box-shadow: 4px 4px 10px rbga(0, 0, 0, 0.4) pointer-events: none;
}
#tooltip.hidden {
    opacity: 0;
}
#tooltip p {
    margin: 0;
    font-family: sans-serif;
    font-size: 16px;
    line-height: 20px;
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
	label {
    display: inline-block;
    width: 5em;
  }
  table,td{border:1px solid green;border-collapse: collapse;}
</style>
</head>


<body style="background-color: white">
    <div id="wrapper">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span> <span
                        class="icon-bar"></span> <span class="icon-bar"></span> 
                        <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.jsp">GC Visualizer - Karsha
                    project</a>
            </div>
           <div class="collapse navbar-collapse navbar-ex1-collapse">
               <ul class="nav navbar-nav side-nav">
					<li class="active"><a href="index.jsp"><i
							class="fa fa-fw fa-dashboard"></i> GC Visualizer</a></li>
					<li><a ><i class="fa fa-fw fa-arrows-v"></i>
							GC-Analysis </a>
						<ul id="accordion">
						<% for(int i = 2005;i < 2013;i++) {%>
							<li>
								<h3><a href="?filename=data<%=i%>.json&year=data<%=i%>.json&year=<%=i%>"><%=i%></a></h3>
								<ul>
									<li><a href="view_graph.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=0"><i class="fa fa-fw fa-table"></i> Overall </a></li>
									<li><a href="view_graph.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=5"><i class="fa fa-fw fa-table"></i> Annual </a></li>
									<li><a href="Quater_view.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=1"><i class="fa fa-fw fa-table"></i> Quarter 1</a></li>
									<li><a href="Quater_view.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=2"><i class="fa fa-fw fa-table"></i> Quarter 2</a></li>
									<li><a href="Quater_view.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=3"><i class="fa fa-fw fa-table"></i> Quarter 3</a></li>
									<li><a href="Quater_view.jsp?filename=data<%=i%>.json&year=<%=i%>&Q=4"><i class="fa fa-fw fa-table"></i> Quarter 4</a></li>
								</ul>
							</li>
							<%} %>
						</ul>               
                
                       </li>
                       <li><a href="DataAnalysis.jsp"><i class="fa fa-fw fa-table"></i>
                            Data-Analysis</a></li>
                       <li><a href="#"><i class="fa fa-fw fa-file"></i>
                            More About</a></li>
                            
               		   </ul>
           </div>
        </nav>
                        
	<% 
		String year = request.getParameter("year");		
	%>
    
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
    
  <div id="page-wrapper">

            <div class="container-fluid">
                <div class="row">
                    <div class="col-lg-12">
                    <h2><center> Granger causality Log Volume Data Analysis <%= year%></center> </h2>
       
                            <ul id="myTab" class="nav nav-tabs">
							   <li class="active"><a href="#home" onclick="window.location.reload(true);" data-toggle="tab">
							      Network</a></li>

							   	<li><a id="In"  href="#indegree" data-toggle="tab" >Indegree</a></li>
							    <li><a id="Out" href="#outdegree" data-toggle="tab" >Outdegree</a></li>
							    <li><a id="Cmp" href="#completeTriad" data-toggle="tab">CompleteTriad</a></li>
							    <li><a id="Incmp" href="#IncompleteTriad" data-toggle="tab">IncompleteTriad</a></li>
							    <li><a id="Imcycles" href="#ImmediateCycle" data-toggle="tab">ImmediateCycles</a></li>
							    <li><a id="Quarters" href="#QuarterlyTemporalPatterns" data-toggle="tab">QuarterlyTemporalPatterns</a></li>
							    <li><a id="Chain"  href="#longerchain" data-toggle="tab" >Chain</a></li>
							    <li><a id="traces"  href="#tracepath" data-toggle="tab" >Trace Path</a></li>			
							</ul>
                            
                            <div id="myTabContent" class="tab-content">
							   <div class="tab-pane fade in active" id="home">
							      <script src="js/d3.min.js"></script>
									
									
									 <div id="gc_network" style="border:2px solid;">
									 <br />
									  <div class="row">
									 	<div class="col-lg-6" id="analyse_bar" width="500" height="50" "></div>
                                        <canvas class="col-rg-6" id="graph_note" width="500" height="50" "></canvas>
                                      </div>
                                      <div class="row">
                                      <div class="col-lg-6" id="analyse_bar1" width="500" height="50" "></div>
                                      </div>
                            				<!-- load the svg using javascript function -->
				                            <script>				
					                            	
					                     		var ctx = document.getElementById("graph_note").getContext("2d");
					                            SvgLoad(ctx);
					                           
					                           
				                            </script>
				                        
									 </div>             
							   </div>
								   <div class="tab-pane fade" id="indegree">								   								   
									   <div id="borderIn" style="border:2px solid;">
									   
									   <br />
									   <canvas id="graph_note1" width="500" height="50" style="float: right">                                
                                        </canvas>
                                        &nbsp; Max Indegree:<l id="max_indegree"></l>
									   		<script type="text/javascript">
									   		var ctx = document.getElementById("graph_note1").getContext("2d");					                            
				                            SvgLoadDegree(ctx);
											$("#In").click(function(){							   												   					
							   					$.ajax({
							   					  type: 'GET',
							   					  url: "Indegree?Quater=<%=Integer.parseInt(request.getParameter("Q"))%>",
							   					  dataType: 'json',
							   					  success: function(data,status) {//data.Links,data.nodes	
							   						
							   					  	document.getElementById("max_indegree").innerHTML = data.links.length;
							   						var width = 1000,height = 900;							   						
							   						DrawDegree(data.nodes, data.links,"#borderIn",width,height);	
							   						
							   						
							   					  },
							   					  error: function(data,error){
							   						  //alert(error);
							   						  },
							   					  async: false
							   					}); 							   					
							   				});
											
									   		</script>
									   </div>
								   </div>

							   <div class="tab-pane fade" id="outdegree">							  
							      <div id="borderOut" style="border:2px solid;">
							      	<br />
									   <canvas id="graph_note2" width="500" height="50" style="float: right">                                
                                        </canvas>
                                        &nbsp; Max Outdegree:<l id="max_outdegree"></l>
									   		<script type="text/javascript">
									   		var ctx1 = document.getElementById("graph_note2").getContext("2d");					                            
				                            SvgLoadDegree(ctx1);
				                            
											$("#Out").click(function(){							   												   					
							   					$.ajax({
							   					  type: 'GET',
							   					  url: "Outdegree?Quater=<%=Integer.parseInt(request.getParameter("Q"))%>",
							   					  dataType: 'json',
							   					  success: function(data,status) {//data.Links,data.nodes							   													   					 							   						    							   												   													   					
							   						var width = 1000,height = 900;							   						
							   						DrawDegree(data.nodes, data.links,"#borderOut",width,height);
							   						document.getElementById("max_outdegree").innerHTML = data.links.length;							   						
							   					  },
							   					  error: function(data,error){alert(error);},
							   					  async: false
							   					}); 							   					
							   				});
											
									   		</script>

									</div>

							   </div>
							   
							   <div class="tab-pane fade" id="completeTriad">
							   		<div id="borderCmp" style="border:2px solid;">	
							   			<br>
							   			<canvas id="graph_note3" width="500" height="50" style="float: right">                                
                                        </canvas>
							   			<script type="text/javascript">
							   			var ctx2 = document.getElementById("graph_note3").getContext("2d");					                            
			                            SvgLoadCompTriad(ctx2);
			                            		
			                            $("#Cmp").click(function(){							   												   					
						   					$.ajax({
						   					  type: 'GET',
						   					  url: "CompleteTriad?Quater=<%=Integer.parseInt(request.getParameter("Q"))%>&year=<%=year%>",
						   					  dataType: 'json',
						   					  success: function(data,status) {//data.Links,data.nodes							   													   					 							   						    							   												   													   					
						   						var width = 1000,height = 900;							   						
						   						//DrawGraph(data.nodes, data.Links,"#borderCmp",width,height);							   						
						   				DrawTrangleGraph(data.nodes, data.links,"#borderCmp",width,height);	 
                                         },
						   					  error: function(data,error){
						   						 // alert(error);
						   						  },
						   					  async: false
						   					}); 							   					
						   				});
							   			</script>
									</div>
							   </div>		
							   
							   <div class="tab-pane fade" id="IncompleteTriad">
							   		<div id="borderIncmp" style="border:2px solid;">	
							   			<br>
							   			<canvas id="graph_note4" width="500" height="70" style="float: right">                                
                                        </canvas>
							   			<script type="text/javascript">
							   			var ctx3 = document.getElementById("graph_note4").getContext("2d");					                            
			                            SvgLoadIncTriad(ctx3);
			                            		
			                            $("#Incmp").click(function(){							   												   					
						   					$.ajax({
						   					  type: 'GET',
						   					  url: "IncompleteTriad?Quater=<%=Integer.parseInt(request.getParameter("Q"))%>",
						   					  dataType: 'json',
						   					  success: function(data,status) {//data.Links,data.nodes							   													   					 							   						    							   												   													   					
						   						var width = 1000,height = 900;							   						
						   						
                                                DrawIncompleteTriad(data.nodes, data.links,"#borderIncmp",width,height);
						   					  },
						   					  error: function(data,error){
						   						  alert(error);},
						   					  async: false
						   					}); 							   					
						   				});
							   			</script>
									</div>
							   </div>		
							   
							   <div class="tab-pane fade" id="ImmediateCycle">
							   		<div id="borderImcycle" style="border:2px solid;">	
							   			<br>
							   			<canvas id="graph_note5" width="500" height="50" style="float: right">                                
                                        </canvas>
							   			<script type="text/javascript">
							   			var ctx4 = document.getElementById("graph_note5").getContext("2d");							   			
			                            SvgLoad(ctx4);
			                            		
			                            $("#Imcycles").click(function(){							   												   					
						   					$.ajax({
						   					  type: 'GET',
						   					  url: "ImmediateCycles?Quater=<%=Integer.parseInt(request.getParameter("Q"))%>",
						   					  dataType: 'json',
						   					  success: function(data,status) {//data.Links,data.nodes							   													   					 							   						    							   												   													   					
						   						var width = 1000,height = 900;							   						
						   						DrawGraph(data.nodes, data.links,"#borderImcycle",width,height);							   						
						   					  },
						   					  error: function(data,error){alert(error);},
						   					  async: false
						   					}); 							   					
						   				});
							   			</script>
									</div>
							   </div>

							<%
								/*get the name of the file releven to clicked year ane filename */
								String filename = request.getParameter("filename");
								String name = "\'" + "json/" + filename + "\'";
								System.out.println(filename);
							%>

							<div class="tab-pane fade" id="QuarterlyTemporalPatterns">							   	
							   		<div id="borderQgraph" style="border:2px solid;">
							   			<br>
							   			<canvas id="graph_note6" width="800" height="80" style="float: left"></canvas>
							   			&nbsp; Clustering Coefficient : <l id="cc_show"></l>
							   			<div style="float: right">
							   			<button class="btn btn-default" id="main">Main</button>
							   			<button class="btn btn-primary" id="Sustained">Sustained</button>
							   			<button class="btn btn-danger" id="Episodic">Episodic</button>
							   			<button class="btn btn-success" id="Weak">Weak</button>
							   			</div>
							   				<script type="text/javascript">
							   					
							   					var file=<%= name%>;							   				
							   					var ctx=document.getElementById("graph_note6").getContext("2d");
							   					ctx.clearRect(0, 0, 800, 80);
							   					SvgQuarter(ctx);							   				
							   					 
							   					$("#Quarters").click(function(){
							   						var width = 900, height = 950;
							   						QuarterGraph(nodes, file, "#borderQgraph", width, height);
							   						
							   						$.ajax({
									   					  type: 'GET',
									   					  url: "cc?Quater=<%=Integer.parseInt(request.getParameter("Q"))%>",
									   					  dataType: 'json',
									   					  success: function(data,status) {
									   						document.getElementById("cc_show").innerHTML = data.Clustering_C;
									   					  },
									   					  error: function(data,error){alert(error);},
									   					  async: false

									   					}); 								   													   			
								   				});
							   					
							   					$("#Sustained").click(function(){
							   						//alert("sustained");
							   						var can=document.getElementById("graph_note6");
								   					var ctx = can.getContext("2d");
								   					can.width=800;
							   						SvgQuaterSustained(ctx); 
							   						var width = 900, height = 950;
							   						QuarterGraphSustained(nodes, file, "#borderQgraph", width, height);
							   					});
							   					$("#Episodic").click(function(){
							   						//alert("episodic");
							   						var can=document.getElementById("graph_note6");
								   					var ctx = can.getContext("2d");
								   					can.width=800;							   						
							   						SvgQuarterEpisodic(ctx);
							   						var width = 900, height = 950;
							   						QuaterGraphEpisodic(nodes, file, "#borderQgraph", width, height);
							   					});
							   					$("#Weak").click(function(){
							   						//alert("weak");
							   						var can=document.getElementById("graph_note6");
								   					var ctx = can.getContext("2d");
								   					can.width=800;
							   						SvgQuarterWeak(ctx);
							   						var width = 900, height = 950;
							   						QuatergraphWeak(nodes, file, "#borderQgraph", width, height);
							   					});
							   					$("#main").click(function(){
								   					var can=document.getElementById("graph_note6");
								   					var ctx = can.getContext("2d");
								   					can.width=800;
								   					SvgQuarter(ctx);
							   						var width = 900, height = 950;
							   						QuarterGraph(nodes, file, "#borderQgraph", width, height);
							   					});							   					
							   				</script>
						   						<div id="tooltip" class="hidden">
												    <p><strong>Important Label Heading</strong>
												    </p>
												    <p><span id="value">100</span>%</p>
												</div>
							   		</div>
							   </div>
							   
							   <div class="tab-pane fade" id="longerchain">							   	
							   		<div id="Lchain" style="border:2px solid;">
							   		<div><b>Note:</b>
										longer chain will find path only upto depth 3, due to computational complexity 
									</div>
							   			<script type="text/javascript">							   				
							   			$("#Chain").click(function(){
							   				var width = 1000,height = 900;	
							   				Longchain(nodes, file, "#Lchain", width, height) 
							   			});
							   			</script>							   		
							   		</div>
							   	</div>
							   	
							   	<!-- Trace paths -->
							   	<div class="tab-pane fade" id="tracepath">						   	
							   		<div id="tpath" style="border:2px solid;">
							   		<div><b>Note: </b> Click the initial node and mouseover the realted nodes to see all connected nodes. Click mouseovered node to trace the path. Double click the nodes to remove the trace.
							   		You can see the traced history by clicking previous node. Green edges indicates the traced path. 
							   		</div>
							   			<script>
							   			$("#traces").click(function(){
							   				var width = 900, height = 950;											
											TracePaths(nodes, file, "#tpath", width, height);
							   			});
							   			
							   			</script>						   		
							   		</div>
							   	</div>						   							  							  
						</div>
						<script>							

							//load the nodes and links arrays
							$(document).ready(function(){
								var filename =<%=name%>
								<% String baseUrl="\'"+request.getScheme() + "://" + request.getServerName() + ":" + Integer.toString(request.getServerPort()) + request.getContextPath()+"/"+"\'";%>
								
								var url=<%=baseUrl%>+filename;
								var filename1 = "json/overall.json";
								var all_url = <%=baseUrl%>+filename1;
								
								var obj=new Object();
								var all_obj = new Object();
								obj.nodes=nodes;	
								
								$.ajax({
									type: 'GET',
									url: url,
									dataType: 'json',
									success: function(data) { obj.link = data;},
									error: function(data,error){alert(error);},
									async: false
								}); 
								
								$.ajax({
									type: 'GET',
									url: all_url,
									dataType: 'json',
									success: function(data) {all_obj = data;},
									error: function(data,error){alert(error);},
									async: false
								}); 
							
								//alert(JSON.stringify(obj.link));
										//post the json string to servlet
								$.post("PostDataServ",JSON.stringify(obj)).error(function(){
									//alert("there is error while sending data to server");
								});;  
										//alert(JSON.stringify(obj.link));
								var width = 900, height = 950;
								var quart = <%=Integer.parseInt(request.getParameter("Q"))%>;
								OriginalNetworkGraph(nodes, file, "#gc_network", width, height,quart,all_obj);
								
								
								//overall_anlys(all_obj);
								
								});
								//graphload 
								
								
									
								
								</script>                    
                    </div>
                </div>               
            </div>       
        </div> 
        
        	<!-- <input id="tooltip-1" title="Enter You name"> -->
        

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
		<% int a = Integer.parseInt(year)%2005;%>
	$( "#accordion" ).accordion();
	$( "#accordion" ).accordion({ active: <%=a%>});
	$(function() {
        $("#tooltip-1").tooltip();
        $("#tooltip-2").tooltip();
     });
	</script>
</div> 

</body>

</html>
