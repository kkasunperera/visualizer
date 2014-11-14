function DataLoadModule(dataset){
    $.ajax({
        type: 'GET',
        url: "DataRetrieve",
        dataType: 'json',
        success: function(data,status) {
            //alert("links length is "+data.Links.length);//this will return the Links array
            //alert("node length is "+data.nodes.length);
            dataset.push.apply(dataset, data.nodes);
        },
        error: function(data,error){
            alert(error);
        },
        async: false
    }); 
    return dataset;
}

function SvgLoad(ctx){
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
    
    ctx.strokeStyle="#FF0000";
    ctx.beginPath();
    ctx.moveTo(350,10);
    ctx.lineTo(301,10);
    ctx.stroke();
    
    ctx.strokeStyle="#0000FF";
    ctx.beginPath();
    ctx.moveTo(350,35);
    ctx.lineTo(301,35);
    ctx.stroke();
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.arc(300,10,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
  
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.arc(300,35,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#0000FF";
    ctx.beginPath();
    ctx.fillText("Output Edge from the Node", 360,40); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.fillText("Input Edge to the Node", 360,14); 
    ctx.closePath();
    ctx.fill();
}

function SvgLoadIncTriad(ctx){
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
    
    /*
    ctx.strokeStyle="#FF0000";
    ctx.beginPath();
    ctx.moveTo(350,10);
    ctx.lineTo(301,10);
    ctx.stroke();
    */
    ctx.strokeStyle="#0000FF";
    ctx.beginPath();
    ctx.moveTo(350,35);
    ctx.lineTo(301,35);
    ctx.stroke();
    /*
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.arc(300,10,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
  
    */
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.arc(300,35,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#0000FF";
    ctx.beginPath();
    ctx.fillText("Triad Edge", 360,40); 
    ctx.closePath();
    ctx.fill();
    
/*
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.fillText("B to C edge", 360,14); 
    ctx.closePath();
    ctx.fill();
    */
}

function SvgLoadCompTriad(ctx){
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
    
    //ctx.strokeStyle="#0000FF";
    //ctx.beginPath();
    //ctx.dashedLine(350,10, 301, 10,[4, 4])
    // ctx.stroke();
    /*
    ctx.strokeStyle="#FF0000";
    ctx.beginPath();
    ctx.moveTo(350,10);
    ctx.lineTo(301,10);
    ctx.stroke();
    */
    ctx.strokeStyle="#0000FF";
    ctx.beginPath();
    ctx.moveTo(360,35);
    ctx.lineTo(311,35);
    ctx.stroke();
    
    ctx.strokeStyle="#0000FF";
    ctx.beginPath();
    ctx.setLineDash([20,10,5,5,5,10]);
    ctx.moveTo(360,10);
    ctx.lineTo(311,10);
    ctx.stroke();

    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.arc(300,10,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
  
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.arc(300,35,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#0000FF";
    ctx.beginPath();
    ctx.fillText("A to B OR B to C edge", 370,40); 
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = "#0000FF";
    ctx.beginPath();
    ctx.fillText("A to C edge", 370,14); 
    ctx.closePath();
    ctx.fill();
    
}



function SvgLoadDegree(ctx){
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
/*
    ctx.strokeStyle="#FF0000";
    ctx.beginPath();
    ctx.moveTo(350,10);
    ctx.lineTo(301,10);
    ctx.stroke();
    
    ctx.strokeStyle="#0000FF";
    ctx.beginPath();
    ctx.moveTo(350,35);
    ctx.lineTo(301,35);
    ctx.stroke();
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.arc(300,10,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
  
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.arc(300,35,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#0000FF";
    ctx.beginPath();
    ctx.fillText("A to B OR A to C  edge", 360,40); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.fillText("B to C edge", 360,14); 
    ctx.closePath();
    ctx.fill();
    */
}

function SvgLoadImmCycle(ctx){
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
    
    ctx.strokeStyle="#FF0000";
    ctx.beginPath();
    ctx.moveTo(350,10);
    ctx.lineTo(301,10);
    ctx.stroke();
    
    ctx.strokeStyle="#0000FF";
    ctx.beginPath();
    ctx.moveTo(350,35);
    ctx.lineTo(301,35);
    ctx.stroke();
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.arc(300,10,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
  
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.arc(300,35,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#0000FF";
    ctx.beginPath();
    ctx.fillText("A to B edge", 360,40); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.fillText("B to A edge", 360,14); 
    ctx.closePath();
    ctx.fill();
}

function DrawGraph(nodes,links,svg1,width,height){


    d3.select("svg")
    .remove();
    var color = d3.scale.category10();
	 
    var svg = d3.select(svg1).append("svg").attr("width", width).attr("height", height);
    var force = d3.layout.force()
    .nodes(nodes)
    .gravity(.15)
    .distance(350)
    .links(links)
    .size([width, height])
    .linkDistance(400)
    .charge(-350)
    .on("tick", tick)
    .start();


	 	
	 	
    // build the arrow.
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

    // add the links and the arrows
    var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
    .enter().append("svg:path")
    .attr("class", function(d) {
        return "link " + d.type;
    })
    .attr("class", "link")
    //.attr("marker-end", "url(#end)");


    var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .style("fill", function(d) {
        return color(d.group);
    })
    .on("mouseover", mouseOver(.001))
    .on("mouseout", mouseOut(1))
    .call(force.drag);

    node.append("circle")
    .attr("r", 8);

    node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .style("fill", "black")
    .text(function(d) {
        return d.name;
    });

    var linkedByIndex = {};
    links.forEach(function(d) {
        //alert(d.source.index + "," + d.target.index);
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

    // add the curvy lines
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

        node.attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")";
        });
    }


    function mouseOver(opacity) {
        return function(d) {
            /*
		    	node.style("stroke-opacity", function(o) {
		            thisOpacity = isConnected(d, o) ? 1 : opacity;
		            this.setAttribute('fill-opacity', thisOpacity);
		            return thisOpacity;
		        });*/
		
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
		
            path.attr("marker-end",function(o){
            	if (o.source === d || o.target === d ) {
    				return "url(#end)";
    			}else{
    				return "url(#)";
    			}
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
            .style("fill", function(d) {
                return color(d.group);
            });
		        
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
            path.attr("marker-end","url(#)");    
            
		         
            d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", 8)
            .style("fill", function(d) {
                return color(d.group);
            });
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
        //return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
        //return outgong
        //alert(a.index + "," + b.index);
        return linkedByIndex[a.index + "," + b.index];
    }
}

function DrawDegree(nodes,links,svg1,width,height){


    d3.select("svg")
    .remove();
    var color = d3.scale.category10();
	 
    var svg = d3.select(svg1).append("svg").attr("width", width).attr("height", height);
    var force = d3.layout.force()
    .nodes(nodes)
    .gravity(.15)
    .distance(350)
    .links(links)
    .size([width, height])
    .linkDistance(400)
    .charge(-350)
    .on("tick", tick)
    .start();


	 	
	 	
    // build the arrow.
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

    // add the links and the arrows
    var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
    .enter().append("svg:path")
    .attr("class", function(d) {
        return "link " + d.type;
    })
    .attr("class", "link")
    .attr("marker-end", "url(#end)");


    var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .style("fill", function(d) {
        return color(d.group);
    })
    .on("mouseover", mouseOver(.001))
    .on("mouseout", mouseOut(1))
    .call(force.drag);

    node.append("circle")
    .attr("r", 8);

    node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .style("fill", "black")
    .text(function(d) {
        return d.name;
    });

    var linkedByIndex = {};
    links.forEach(function(d) {
        //alert(d.source.index + "," + d.target.index);
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

    // add the curvy lines
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

        node.attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")";
        });
    }


    function mouseOver(opacity) {
        return function(d) {
            /*
		    	node.style("stroke-opacity", function(o) {
		            thisOpacity = isConnected(d, o) ? 1 : opacity;
		            this.setAttribute('fill-opacity', thisOpacity);
		            return thisOpacity;
		        });*/
		
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
		
            path.attr("marker-end",function(o){
            	if (o.source === d || o.target === d ) {
    				return "url(#end)";
    			}else{
    				return "url(#)";
    			}
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
            .style("fill", function(d) {
                return color(d.group);
            });
		        
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
            path.attr("marker-end","url(#end)");    
            arrow_head.style("opacity",function(o){
                thisOpacity = isConnected(d, o) ? opacity : 1;
                this.setAttribute('fill-opacity', thisOpacity);
                return thisOpacity;
            });
		         
            d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", 8)
            .style("fill", function(d) {
                return color(d.group);
            });
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
        //return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
        //return outgong
        //alert(a.index + "," + b.index);
        return linkedByIndex[a.index + "," + b.index];
    }
}

function DrawTrangleGraph(nodes,links,svg1,width,height){


    d3.select("svg")
    .remove();
    var color = d3.scale.category10();
	 
    var svg = d3.select(svg1).append("svg").attr("width", width).attr("height", height);
    var force = d3.layout.force()
    .nodes(nodes)
    .gravity(.15)
    .distance(350)
    .links(links)
    .size([width, height])
    .linkDistance(400)
    .charge(-350)
    .on("tick", tick)
    .start();


	 	
	 	
    // build the arrow.
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

    // add the links and the arrows
    var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
    .enter().append("svg:path")
    .attr("class", function(d) {
        return "link " + d.type;
    })
    .attr("class", "link")
   // .attr("marker-end", "url(#end)");


    var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .style("fill", function(d) {
        return color(d.group);
    })
    .on("mouseover", mouseOver(.001))
    .on("mouseout", mouseOut(1))
    .call(force.drag);

    node.append("circle")
    .attr("r", 8);

    node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .style("fill", "black")
    .text(function(d) {
        return d.name;
    });

    var linkedByIndex = {};
    var linksForSelectedNode = {};
    links.forEach(function(d) {
        //alert(d.source.index + "," + d.target.index);
        linkedByIndex[d.source.index + "," + d.target.index] = 1;
    });

    // add the curvy lines
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

        node.attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")";
        });
    }


    function mouseOver(opacity) {
        var connectedEdges = [];
        var triadCompletingEdges = [];
        return function(d) {
            /*
		    	node.style("stroke-opacity", function(o) {
		            thisOpacity = isConnected(d, o) ? 1 : opacity;
		            this.setAttribute('fill-opacity', thisOpacity);
		            return thisOpacity;
		        });*/
            /*
               links.forEach(function(b) {
                   getConnectedNodes(d, b.target);
                  // connectedEdges.push();
               });
        */
        

                
            links.forEach(function(o){
                // if (isConnected(d, o.target)) {
                if (o.source === d) {    
                    if(connectedEdges.indexOf(o.target.index) == -1){
                        connectedEdges.push(o.target.index);
                    }
 
                };
 
            });
                
            for(var i=0;i< connectedEdges.length;i++)
            {
                var status = false;
                // links.push({source: connectedEdges[i], target: connectedEdges[i+1]});
                // force.start();
                // linksForSelectedNode[d.index + "," + connectedEdges[i]] = 1;
                for(var j=0; j<connectedEdges.length; j++){
                     
                    if(i!=j && isConnectedIndex(connectedEdges[i], connectedEdges[j])){
                     
                 
                        linksForSelectedNode[connectedEdges[i] + "," + connectedEdges[j]] = 2;
                        //identify tried completing edges
                        if(triadCompletingEdges.indexOf(connectedEdges[j]) == -1){
                            triadCompletingEdges.push(connectedEdges[j]);
                        }
                    }
                 
                    //fixing bug for false trid detection
                    // if(i!=j && (isConnectedIndex(connectedEdges[i], connectedEdges[j]))){
                   
                    if(i!=j && (isConnectedIndex(connectedEdges[i], connectedEdges[j])||isConnectedIndex(connectedEdges[j], connectedEdges[i]))){
                        status= true;
                    }
                 
                }
                if(status){
                    linksForSelectedNode[d.index + "," + connectedEdges[i]] = 1; 
                }
            //alert(connectedEdges[i]);
            }
              
            //Overwite triad completing edges
            for(var kk=0; kk<triadCompletingEdges.length; kk++){
                linksForSelectedNode[d.index + "," + triadCompletingEdges[kk]] = 3;
            }
                    
            path.style("stroke-opacity", function(o) {
                // return o.source === d || o.target === d ? 1 : opacity; 
                // return o.source === d ? 1 : opacity;
                var value= getConnectedNodes(o.source, o.target);
                return (value>=1) ? 1 : opacity; 
            });
		
            path.style("stroke",function(o){
                // if (isConnected(d, o.target)) {
                   
                //if (o.source === d) {
                if (getConnectedNodes(o.source, o.target)==1 || getConnectedNodes(o.source, o.target)==2 || getConnectedNodes(o.source, o.target)==3) { 
    
                    // alert(connectedEdges.length);
                    return "blue";
                }
            /*
                if (getConnectedNodes(o.source, o.target)==1) { 
    
                    // alert(connectedEdges.length);
                    return "blue";
                }
                else if (getConnectedNodes(o.source, o.target)==2 ) {
		                return "red";
		            };
            
                   if (o.source === d) {
		                return "blue";
		            }else if (o.target === d ) {
		                return "red";
		            };
                    */
            });
            
            path.style("stroke-dasharray",function(o){
                if (getConnectedNodes(o.source, o.target)==3) { 
    
                    // alert(connectedEdges.length);
                    return "20,10,5,5,5,10";
                }
 
       
            });
                

            connectedEdges=[];
            triadCompletingEdges = [];
		
            path.attr("marker-end",function(o){
            	if (getConnectedNodes(o.source, o.target)==1 || getConnectedNodes(o.source, o.target)==2 || getConnectedNodes(o.source, o.target)==3 ) {
    				return "url(#end)";
    			}else{
    				return "url(#)";
    			}
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
            .style("fill", function(d) {
                return color(d.group);
            });
		        
        };
    }
		
    function mouseOut(opacity) {
        return function(d) {
            
            linksForSelectedNode = [];
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
		         
            path.attr("marker-end","url(#)");
		         
            d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", 8)
            .style("fill", function(d) {
                return color(d.group);
            });
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
        //return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
        //return outgong
        //alert(a.index + "," + b.index);
        return linkedByIndex[a.index + "," + b.index];
    }
    //send the index direcly
    function isConnectedIndex(a,b){
        return linkedByIndex[a + "," + b];
    }
        
    function getConnectedNodes(a, b) {
        //return incoming and outgoing
        //return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
        //return outgong
        //alert(a.index + "," + b.index);
        //if(linkedByIndex[a.index + "," + b.index]==1){
        //  connectedEdges.push(b.index);
        //	return true ;
        return linksForSelectedNode[a.index + "," + b.index];
    // }
    }

}

function DrawIncompleteTriad(nodes,links,svg1,width,height){

    d3.select("svg")
    .remove();
    var color = d3.scale.category10();
	 
    var svg = d3.select(svg1).append("svg").attr("width", width).attr("height", height);
    var force = d3.layout.force()
    .nodes(nodes)
    .gravity(.15)
    .distance(350)
    .links(links)
    .size([width, height])
    .linkDistance(400)
    .charge(-350)
    .on("tick", tick)
    .start();


	 	
	 	
    // build the arrow.
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

    // add the links and the arrows
    var path = svg.append("svg:g").selectAll("path")
    .data(force.links())
    .enter().append("svg:path")
    .attr("class", function(d) {
        return "link " + d.type;
    })
    .attr("class", "link")
   // .attr("marker-end", "url(#end)");


    var node = svg.selectAll(".node")
    .data(force.nodes())
    .enter().append("g")
    .attr("class", "node")
    .style("fill", function(d) {
        return color(d.group);
    })
    .on("mouseover", mouseOver(.001))
    .on("mouseout", mouseOut(1))
    .call(force.drag);

    node.append("circle")
    .attr("r", 8);

    node.append("text")
    .attr("dx", 12)
    .attr("dy", ".35em")
    .style("fill", "black")
    .text(function(d) {
        return d.name;
    });

    var linkedByIndex = [];
    var linksForSelectedNode = [];
    links.forEach(function(d) {
        //alert(d.source.index + "," + d.target.index);
    	if(d.status == true ){
    		linkedByIndex[d.source.index + "," + d.target.index] = 2;
    	}else{
    		linkedByIndex[d.source.index + "," + d.target.index] = 1;
    	}
        
    });

    // add the curvy lines
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

        node.attr("transform", function(d) { 
            return "translate(" + d.x + "," + d.y + ")";
        });
    }

    var incompleteEdge = [];
    
    function mouseOver(opacity) {
        var connectedEdges = [];
        var triadCompletingEdges = [];        
       
        return function(d) {      
            links.forEach(function(o){
                // if (isConnected(d, o.target)) {
                if (o.source === d && isConnected(d, o.target) == 1) {    
                    if(connectedEdges.indexOf(o.target.index) == -1){
                        connectedEdges.push(o.target.index);
                        	//alert(o.target.index);
                    }
 
                };
 
            });
                  //alert(links.length);
            for(var i=0;i< connectedEdges.length;i++)
            {
                
                links.forEach(function(f){
                    if (isConnectedIndex(connectedEdges[i], f.target.index ) == 1 && f.target != d) {
                    	//alert(f.target.index);
                    	                       	
                    		if(linksForSelectedNode.indexOf(d.index + "," + f.target.index) == -1){
                    			if(isConnected(d, f.target) == 2){
                    				linksForSelectedNode[d.index + "," + f.target.index] = 3;
                    				
                    				if(linksForSelectedNode.indexOf(connectedEdges[i]+ "," + f.target.index) == -1){
                                        linksForSelectedNode[connectedEdges[i]+ "," + f.target.index] = 2;
                                    } 
                                                                                     
                                    if(linksForSelectedNode.indexOf(d.index + "," + connectedEdges[i]) == -1){
                                    	linksForSelectedNode[d.index + "," + connectedEdges[i]] = 1;
                                    }
                    			}
                                
                            }
                        	
                            
                    	                    	                        
                    }; 
                });

            }
                        
            path.style("stroke-opacity", function(o) {
                var value= getConnectedNodes(o.source, o.target);
                return (value>=1) ? 1 : opacity; 
            });
		
            path.style("stroke",function(o){
                if (getConnectedNodes(o.source, o.target)==1||getConnectedNodes(o.source, o.target)==2 || getConnectedNodes(o.source, o.target)==3) { 
                    return "blue";
                }
            });
            path.style("stroke-dasharray",function(o){
                if (getConnectedNodes(o.source, o.target)==3) { 
                    return "20,10,5,5,5,10";
                }       
            });     
 

            connectedEdges=[];
            triadCompletingEdges = [];
		
            path.attr("marker-end",function(o){
            	if (getConnectedNodes(o.source, o.target)==1||getConnectedNodes(o.source, o.target)==2||getConnectedNodes(o.source, o.target)==3 ) {
    				return "url(#end)";
    			}else{
    				return "url(#)";
    			}
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
            .style("fill", function(d) {
                return color(d.group);
            });
		        
        };
    }
		
    function mouseOut(opacity) {
        return function(d) {
            
            linksForSelectedNode = [];
            
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
		         
            path.attr("marker-end","url(#)");
		         
            d3.select(this).select("circle").transition()
            .duration(750)
            .attr("r", 8)
            .style("fill", function(d) {
                return color(d.group);
            });
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
        //return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
        //return outgong
        //alert(a.index + "," + b.index);
        return linkedByIndex[a.index + "," + b.index];
    }
    function isConnectedIndex(a,b){
        return linkedByIndex[a + "," + b];
    }
        
    function getConnectedNodes(a, b) {
        //return incoming and outgoing
        //return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
        //return outgong
        //alert(a.index + "," + b.index);
        //if(linkedByIndex[a.index + "," + b.index]==1){
        //  connectedEdges.push(b.index);
        //	return true ;
        //  alert( "lenght of list "+linksForSelectedNode.length) 
        return linksForSelectedNode[a.index + "," + b.index];
    // }
    }
    
    
}

function clustering_cof(tag,cc) {
	$(tag).html(cc);
}
