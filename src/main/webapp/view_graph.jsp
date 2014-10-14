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
<script src="js/jquery.1.9.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/function.js"></script>
<script src="js/node.js"></script>
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
                <a class="navbar-brand" href="index.jsp">Visualizer - Karsha
                    project</a>
            </div>
           <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav side-nav">
                    <li class="active"><a href="index.jsp"><i
                            class="fa fa-fw fa-dashboard"></i> Visualizer</a></li>
                    <li><a href="javascript:;" data-toggle="collapse"
                        data-target="#demo"><i class="fa fa-fw fa-arrows-v"></i>
                            GC-Analysis <i class="fa fa-fw fa-caret-down"></i></a>
                        
                        <ul id="demo" name="demo" class="collapse">
                            <% for(int i = 2005;i < 2014;i++) {%>
                            <li><a  href="?filename=data<%=i%>.json&year=<%=i%>"><%=i%></a></li>                            
                            <%}%>
                        </ul></li>
                    <!-- <li><a href="Overall.html"><i
                            class="fa fa-fw fa-bar-chart-o"></i> Overall</a></li>
                    <li><a href="RowData.html"><i class="fa fa-fw fa-table"></i>
                            Row Data</a></li>
                    <li><a href="blank-page.html"><i class="fa fa-fw fa-file"></i>
                            More About</a></li> -->
                            
<!--                    <li><a href="#"><i
                            class="fa fa-fw fa-bar-chart-o"></i> Overall</a></li>
                    <li><a href="#"><i class="fa fa-fw fa-table"></i>
                            Row Data</a></li>-->
                    <li><a href="#"><i class="fa fa-fw fa-file"></i>
                            More About</a></li>
                            
                </ul>
           </div>
        </nav>
                        
	<% 
		String year = request.getParameter("year");
		if(year==null)year="";
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

.node circle {
 
  stroke: #fff;
  stroke-width: 1.5px;
}

text {
  font: 10px sans-serif;
  pointer-events: none;
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
			
							</ul>
                            
                            <div id="myTabContent" class="tab-content">
							   <div class="tab-pane fade in active" id="home">
							      <script src="js/d3.min.js"></script>
									
									 <div id="gc_network" style="border:2px solid;">
									 <br />
                                        <canvas id="graph_note" width="500" height="50" style="float: right">                                
                                        </canvas>
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
									   		<script type="text/javascript">
									   		var ctx = document.getElementById("graph_note1").getContext("2d");					                            
				                            SvgLoadDegree(ctx);
											$("#In").click(function(){							   					
							   					
							   					$.ajax({
							   					  type: 'GET',
							   					  url: "Indegree",
							   					  dataType: 'json',
							   					  success: function(data,status) {//data.Links,data.nodes							   													   					 							   						    							   												   													   					
							   						var width = 1000,height = 900;							   						
							   						DrawGraph(data.nodes, data.Links,"#borderIn",width,height);							   						
							   					  },
							   					  error: function(data,error){alert(error);},
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
									   		<script type="text/javascript">
									   		var ctx1 = document.getElementById("graph_note2").getContext("2d");					                            
				                            SvgLoadDegree(ctx1);
				                            
											$("#Out").click(function(){							   												   					
							   					$.ajax({
							   					  type: 'GET',
							   					  url: "Outdegree",
							   					  dataType: 'json',
							   					  success: function(data,status) {//data.Links,data.nodes							   													   					 							   						    							   												   													   					
							   						var width = 1000,height = 900;							   						
							   						DrawGraph(data.nodes, data.Links,"#borderOut",width,height);							   						
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
						   					  url: "CompleteTriad",
						   					  dataType: 'json',
						   					  success: function(data,status) {//data.Links,data.nodes							   													   					 							   						    							   												   													   					
						   						var width = 1000,height = 900;							   						
						   						//DrawGraph(data.nodes, data.Links,"#borderCmp",width,height);							   						
						   				DrawTrangleGraph(data.nodes, data.Links,"#borderCmp",width,height);	 
                                         },
						   					  error: function(data,error){alert(error);},
						   					  async: false
						   					}); 							   					
						   				});
							   			</script>
									</div>
							   </div>		
							   
							   <div class="tab-pane fade" id="IncompleteTriad">
							   		<div id="borderIncmp" style="border:2px solid;">	
							   			<br>
							   			<canvas id="graph_note4" width="500" height="50" style="float: right">                                
                                        </canvas>
							   			<script type="text/javascript">
							   			var ctx3 = document.getElementById("graph_note4").getContext("2d");					                            
			                            SvgLoadIncTriad(ctx3);
			                            		
			                            $("#Incmp").click(function(){							   												   					
						   					$.ajax({
						   					  type: 'GET',
						   					  url: "IncompleteTriad",
						   					  dataType: 'json',
						   					  success: function(data,status) {//data.Links,data.nodes							   													   					 							   						    							   												   													   					
						   						var width = 1000,height = 900;							   						
						   						//DrawGraph(data.nodes, data.Links,"#borderIncmp",width,height);
                                                DrawIncompleteTriad(data.nodes, data.Links,"#borderIncmp",width,height);
						   					  },
						   					  error: function(data,error){alert(error);},
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
						   					  url: "ImmediateCycles",
						   					  dataType: 'json',
						   					  success: function(data,status) {//data.Links,data.nodes							   													   					 							   						    							   												   													   					
						   						var width = 1000,height = 900;							   						
						   						DrawGraph(data.nodes, data.Links,"#borderImcycle",width,height);							   						
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
								String name = "\'" + "NewJson/" + filename + "\'";
								System.out.println(filename);
							%>

							<div class="tab-pane fade" id="QuarterlyTemporalPatterns">							   	
							   		<div id="borderQgraph" style="border:2px solid;">
							   			<br>
							   			<canvas id="graph_note6" width="800" height="80" style="float: left"></canvas>
							   				<script type="text/javascript">
							   					var ctx=document.getElementById("graph_note6").getContext("2d");
							   				 ctx.fillStyle = "#1f77b4";
							   			    ctx.beginPath();
							   			    ctx.arc(200,10,8,0,2*Math.PI);
							   			    ctx.closePath();
							   			    ctx.fill();
							   			    
							   			    
							   			    ctx.fillStyle = "#ff7f0d";
							   			    ctx.beginPath();
							   			    ctx.arc(200,35,8,0,2*Math.PI);
							   			    ctx.closePath();
							   			    ctx.fill();
							   			    
							   			    ctx.fillStyle = "#ff7f0d";
							   			    ctx.beginPath();
							   			    ctx.fillText("Equity", 214,40); 
							   			    ctx.closePath();
							   			    ctx.fill();
							   			    
							   			    ctx.fillStyle = "#1f77b4";
							   			    ctx.beginPath();
							   			    ctx.fillText("Bond", 214,14); 
							   			    ctx.closePath();
							   			    ctx.fill();
							   			    
							   			    //should be dashed
							   			    ctx.fillStyle = "#666";
							   			    ctx.beginPath();
							   			    ctx.fillText("= = = = = = =", 300,14); 
							   			    ctx.closePath();
							   			    ctx.fill();
							   			    
							   			    ctx.strokeStyle="#666";
							   			    ctx.beginPath();
							   			    ctx.moveTo(350,35);
							   			    ctx.lineTo(301,35);
							   			    ctx.stroke();
							   			    
							   			    ctx.fillStyle = "#666";
							   			    ctx.beginPath();
							   			    ctx.arc(300,10,8,0,2*Math.PI);
							   			    ctx.closePath();
							   			    ctx.fill();
							   			  
							   			    
							   			    ctx.fillStyle = "#666";
							   			    ctx.beginPath();
							   			    ctx.arc(300,35,8,0,2*Math.PI);
							   			    ctx.closePath();
							   			    ctx.fill();
							   			    
							   			    ctx.fillStyle = "#666";
							   			    ctx.beginPath();
							   			    ctx.fillText("Input Edge to the Node", 360,40); 
							   			    ctx.closePath();
							   			    ctx.fill();
							   			    
							   			    ctx.fillStyle = "#666";
							   			    ctx.beginPath();
							   			    ctx.fillText("Output Edge from the Node", 360,14); 
							   			    ctx.closePath();
							   			    ctx.fill();
							   			    
							   			    //#0066FF sustain
							   			    ctx.strokeStyle ="#33CC33";
							   			    ctx.beginPath();
							   			 	ctx.moveTo(550,10);
							   			    ctx.lineTo(500,10);
							   			    ctx.stroke();
							   			    
							   			    //#FF0000 episodic 
							   			 	ctx.strokeStyle ="#0066FF";
							   			    ctx.beginPath();
							   			 	ctx.moveTo(550,35);
							   			    ctx.lineTo(500,35);
							   			    ctx.stroke();
							   			    
							   			    //#33CC33 weak
							   			 	ctx.strokeStyle ="#FF0000";
							   			    ctx.beginPath();
							   			 	ctx.moveTo(550,60);
							   			    ctx.lineTo(500,60);
							   			    ctx.stroke();
							   			    
							   			 	ctx.fillStyle = "#33CC33";
							   			    ctx.beginPath();
							   			    ctx.fillText("weak", 580,10); 
							   			    ctx.closePath();
							   			    ctx.fill();
							   			    
							   			 	ctx.fillStyle = "#0066FF";
							   			    ctx.beginPath();
							   			    ctx.fillText("Sustained", 580,38); 
							   			    ctx.closePath();
							   			    ctx.fill();
							   			    
							   			 	ctx.fillStyle = "#FF0000";
							   			    ctx.beginPath();
							   			    ctx.fillText("Episodic", 580,65); 
							   			    ctx.closePath();
							   			    ctx.fill(); 
							   					 
							   					$("#Quarters").click(function(){	
							   						var linkedByIndex = {};
													var color = d3.scale.category10();
													var width = 900, height = 950;		 
													
													d3.select("svg").remove();
													var svg = d3.select("#borderQgraph").append("svg")
												    .attr("width", width)
												    .attr("height", height);
												
												var force = d3.layout.force()
												    .gravity(.15)
												    .distance(350)
												    .charge(-350)
												    .size([width, height]);
												    
												 //input to the file name which is taken previously
												 
												d3.json(<%= name%>, function(error, json) {
												  force
												      .nodes(nodes)
												      .links(json.links)
												      .on("tick", tick)
												      .start();
												 
												  
												  var link = svg.selectAll(".link")
												      .data(json.links)
												    .enter().append("line");
												      //.attr("class", "link");
												      
												 var arrow_head = svg.append("svg:defs").selectAll("marker")
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
													//.attr("class", function(d) { return "link " + d.type; })
													.attr("class", function(d){
														if(d.type == "weak"){
															return "linkWeak";
														}else if(d.type == "sustained"){
															return "linkSustain";
														}else if(d.type == "episodic"){
															return "linkEpisodic";
														}
													}) 
													.attr("marker-end", "url(#end)");
												
												  var node = svg.selectAll(".node")
												      .data(force.nodes())
												    .enter().append("g")
												      .attr("class", "node")
												      .style("fill", function(d) { return color(d.group); })
												      //.on("click",click)
												      //.on("dblclick", dblclick)
												       .on("mouseover", mouseOver(.001))
												      .on("mouseout", mouseOut(1))
												      .call(force.drag);
												
												  node.append("circle")
												      .attr("r",8);
												
												  node.append("text")
												      .attr("dx", 12)
												      .attr("dy", ".35em")
												      .text(function(d) { return d.name;});
												
												json.links.forEach(function(d) {
												//alert(d.source.index + "," + d.target.index);
												  linkedByIndex[d.source.index + "," + d.target.index] = 1;
												});
												 
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
												
												
												 
												    
												function mouseOver(opacity) {
												    return function(d) {
												    	node.style("stroke-opacity", function(o) {
												            thisOpacity = isConnected(d, o) ? 1 : opacity;
												            this.setAttribute('fill-opacity', thisOpacity);
												            return thisOpacity;
												        });
												
												        path.style("stroke-opacity", function(o) {
												            return o.source === d || o.target === d ? 1 : opacity;                
												        });
												
												       path.style("stroke-dasharray",function(o){
												    	   if(o.source === d){
												    		   return "5, 5";
												    	   }
												       });
												
												       arrow_head.style("opacity",function(o){
												            thisOpacity = isConnected(d, o) ? 1 : opacity;
												            this.setAttribute('fill-opacity', thisOpacity);
												            return thisOpacity;
												        });
												       
												       d3.select(this).select("text").transition()
												       .duration(500)
												       .style("fill", "black")
												       .style("stroke", "lightsteelblue")
												       .style("stroke-width", ".5px")
												       .style("font", "20px sans-serif");
												   d3.select(this).select("circle").transition()
												       .duration(750)
												       .attr("r", 25)
												       .style("fill", function(d) { return color(d.group); });										        
												    };
												}
												
												function mouseOut(opacity) {
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
												         
												         path.style();//stroke line 
												
												         path.style("stroke",function(d){
												        		if(d.type == "weak"){
																	return "#33CC33";
																}else if(d.type == "sustained"){
																	return "#0066FF";
																}else if(d.type == "episodic"){
																	return "#FF0000";
																}
												         });
												         
												         arrow_head.style("opacity",function(o){
												             thisOpacity = isConnected(d, o) ? opacity : 1;
												             this.setAttribute('fill-opacity', thisOpacity);
												             return thisOpacity;
												         });
												         
												         d3.select(this).select("circle").transition()
												         .duration(750)
												         .attr("r", 8)
												         .style("fill", function(d) { return color(d.group); });
												     d3.select(this).select("text").transition()
												         .duration(750)
												         .attr("x", 12)
												         .style("stroke", "none")
												         .style("fill", "black")
												         .style("stroke", "none")
												         .style("font", "10px sans-serif");
												        
												    };
												}
												
												function neighboring(a, b) {
												  return linkedByIndex[a.index + "," + b.index];
												}
												
												function isConnected(a, b) {
												//return incoming and outgoing
													return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
												//return outgong
												//alert(a.index + "," + b.index);
													//return linkedByIndex[a.index + "," + b.index];
													}
												});
								   				});
							   				</script>
							   		</div>
							   </div>						   							  							  
						</div>
						<script>
						
							var linkedByIndex = {};
							var color = d3.scale.category10();
							var width = 900, height = 900;

							//load the nodes and links arrays
							$(document).ready(function(){
								var filename =<%=name%>
								<% String baseUrl="\'"+request.getScheme() + "://" + request.getServerName() + ":" + Integer.toString(request.getServerPort()) + request.getContextPath()+"/"+"\'";%>
								var url=<%=baseUrl%>+filename;

								var obj=new Object();
								obj.nodes=nodes;
										
								$.ajax({
									type: 'GET',
									url: url,
									dataType: 'json',
									success: function(data) { obj.link = data;},
									error: function(data,error){alert(error);},
									async: false
								}); 
										
										//post the json string to servlet
								$.post("PostDataServ",JSON.stringify(obj)).error(function(){
										alert("There is data loading error please check data.");
								});
										//alert(JSON.stringify(obj.nodes));
										
								});
								 
								var svg = d3.select("#gc_network").append("svg")
								    .attr("width", width)
								    .attr("height", height);
								
								var force = d3.layout.force()
								    .gravity(.15)
								    .distance(350)
								    .charge(-350)
								    .size([width, height]);
								    
								 //input to the file name which is taken previously
								 
								d3.json(<%= name%>, function(error, json) {
								  force
								      .nodes(nodes)
								      .links(json.links)
								      .on("tick", tick)
								      .start();
								 
								  
								  var link = svg.selectAll(".link")
								      .data(json.links)
								    .enter().append("line")
								      .attr("class", "link");
								      
								 var arrow_head = svg.append("svg:defs").selectAll("marker")
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
								      .data(force.nodes())
								    .enter().append("g")
								      .attr("class", "node")
								      .style("fill", function(d) { return color(d.group); })
								      //.on("click",click)
								      //.on("dblclick", dblclick)
								       .on("mouseover", mouseOver(.001))
								      .on("mouseout", mouseOut(1))
								      .call(force.drag);
								
								  node.append("circle")
								      .attr("r",8);
								
								  node.append("text")
								      .attr("dx", 12)
								      .attr("dy", ".35em")
								      .text(function(d) { return d.name;});
								
								json.links.forEach(function(d) {
								//alert(d.source.index + "," + d.target.index);
								  linkedByIndex[d.source.index + "," + d.target.index] = 1;
								});
								 
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
								
								
								function mouseOver(opacity) {
								    return function(d) {
								    	node.style("stroke-opacity", function(o) {
								            thisOpacity = isConnected(d, o) ? 1 : opacity;
								            this.setAttribute('fill-opacity', thisOpacity);
								            return thisOpacity;
								        });
								
								        path.style("stroke-opacity", function(o) {
								            return o.source === d || o.target === d ? 1 : opacity;                
								        });
								
								        path.style("stroke",function(o){
								            if (o.source === d) {
								                return "blue";
								            }else if (o.target === d ) {
								                return "red";
								            };
								        });
								
								       arrow_head.style("opacity",function(o){
								            thisOpacity = isConnected(d, o) ? 1 : opacity;
								            this.setAttribute('fill-opacity', thisOpacity);
								            return thisOpacity;
								        });
								       
								       d3.select(this).select("text").transition()
								       .duration(500)
								       .style("fill", "black")
								       .style("stroke", "lightsteelblue")
								       .style("stroke-width", ".5px")
								       .style("font", "20px sans-serif");
								   d3.select(this).select("circle").transition()
								       .duration(750)
								       .attr("r", 25)
								       .style("fill", function(d) { return color(d.group); });
								        
								    };
								}
								
								function mouseOut(opacity) {
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
								
								         path.style("stroke","#666");
								         
								         arrow_head.style("opacity",function(o){
								             thisOpacity = isConnected(d, o) ? opacity : 1;
								             this.setAttribute('fill-opacity', thisOpacity);
								             return thisOpacity;
								         });
								         
								         d3.select(this).select("circle").transition()
								         .duration(750)
								         .attr("r", 8)
								         .style("fill", function(d) { return color(d.group); });
								     d3.select(this).select("text").transition()
								         .duration(750)
								         .attr("x", 12)
								         .style("stroke", "none")
								         .style("fill", "black")
								         .style("stroke", "none")
								         .style("font", "10px sans-serif");
								        
								    };
								}
								
								function neighboring(a, b) {
								  return linkedByIndex[a.index + "," + b.index];
								}
								
								function isConnected(a, b) {
								//return incoming and outgoing
									return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
								//return outgong
								//alert(a.index + "," + b.index);
									//return linkedByIndex[a.index + "," + b.index];
									}
								});
								</script>                    
                    </div>
                </div>               
            </div>       
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
</div>    
</body>

</html>
