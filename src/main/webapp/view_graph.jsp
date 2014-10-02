<%-- 
    Document   : view_graph
    Created on : Aug 29, 2014, 2:56:48 PM
    Author     : tharindu-lsf
--%>

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
                            <% for(int i = 2004;i < 2014;i++) {%>
                            <li><a href="?filename=data<%=i%>.json&year=<%=i%>"><%=i%></a></li>                            
                            <%}%>
                        </ul></li>
                    <!-- <li><a href="Overall.html"><i
                            class="fa fa-fw fa-bar-chart-o"></i> Overall</a></li>
                    <li><a href="RowData.html"><i class="fa fa-fw fa-table"></i>
                            Row Data</a></li>
                    <li><a href="blank-page.html"><i class="fa fa-fw fa-file"></i>
                            More About</a></li> -->
                            
                    <li><a href="#"><i
                            class="fa fa-fw fa-bar-chart-o"></i> Overall</a></li>
                    <li><a href="#"><i class="fa fa-fw fa-table"></i>
                            Row Data</a></li>
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
                    <h2><center> Granger causality Analysis <%= year%></center> </h2>
       
                            <ul id="myTab" class="nav nav-tabs">
							   <li class="active"><a href="#home" data-toggle="tab">
							      Network</a></li>
							   	<li><a href="#indegree" data-toggle="tab" onclick="HighestInDegree()">Indegree</a></li>
							    <li><a href="#outdegree" data-toggle="tab" onclick="HighestOutDegree()">Outdegree</a></li>
							    <li><a id="completeTriad" href="#completeTriad" data-toggle="tab">CompleteTriad</a></li>
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
									   		Highest InDegree Node data will be loaded here.....
									   </div>
								   </div>
							   <div class="tab-pane fade" id="outdegree">							  
							      <div id="borderOut" style="border:2px solid;">
							      		Highest OutDegree Node data will be loaded here.....
								  </div>
							   </div>
							   
							   <div class="tab-pane fade" id="completeTriad">
							   		<div id="border" style="border:2px solid;">	
							   			<script type="text/javascript">
							   				$("#completeTriad").click(function(){							   					
							   					/* var arr2=[];
							   					DataLoadModule(arr2);
							   					//arr2.push.apply(arr2, DataLoadModule(arr2));
							   					if(arr2.length > 0){
							   						alert(arr2.length);
							   					}else{
							   						alert("no data");
							   					} */
							   				/* 	$.ajax({
							   					  type: 'GET',
							   					  url: "DataRetrieve",
							   					  dataType: 'json',
							   					  success: function(data,status) {
							   						  alert("links length is "+data.Links.length);//this will return the Links array
							   						  alert("node length is "+data.nodes.length);	
							   						  // pass svg function here...
							   					  },
							   					  error: function(data,error){alert(error);},
							   					  async: false
							   					});  */
							   					
							   				});
							   			</script>						   			
							   		</div>
							   </div>
						</div>

						<%
							/*get the name of the file releven to clicked year ane filename */

							String filename = request.getParameter("filename");
							String name = "\'" + "json/" + filename + "\'";
							System.out.println(filename);
						%>
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
								      .text(function(d) { return d.name});
								
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
								       .style("fill", function(d) { return color(d.group); })
								        
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
								         .style("fill", function(d) { return color(d.group); })
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

