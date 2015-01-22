/**
 * lsf labs
 */

function TracePaths(nodes,file,svg1,width,height,quart){
	
	var linkedByIndex = {};
	var color = d3.scale.category10();		 	
	d3.select("svg").remove();
	var svg = d3.select(svg1).append("svg").attr("width", width).attr("height", height);
	
	var force = d3.layout.force()
    .gravity(.15)
    .distance(350)
    .charge(-350)
    .size([width, height]);
    
 //input to the file name which is taken previously
 
d3.json(file, function(error, json) {  
	force
      .nodes(nodes)
      .links(data_set(quart, json))
      .on("tick", tick)
      .start();
  
 
 
  
  svg.selectAll(".link")
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
	.attr("class", "link");
	//.attr("marker-end", "url(#end)");

  var node = svg.selectAll(".node")
      .data(force.nodes())
    .enter().append("g")
      .attr("class", "node")
      .style("fill", function(d) { return color(d.group); })
      .on("click",click(.001))
      .on("dblclick", dbclick(1))
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
    

    var freezeNodes= [];
    var freezePaths= [];
    var InitialNode = -1;
    var ClickCount = 0;
    
function click(opacity){	
	return function(d) {		
		ClickCount++;
		/*identify the initial root node for traversing*/
		if(ClickCount == 1){
			InitialNode = d.index;
			//alert(d.index);
		}
		
		/*adding clicked node immediete children*/
		json.links.forEach(function(f){
			if(f.source === d){
				freezeNodes.push(f.target.index);	
				freezePaths[d.index + "," + f.target.index] = 1; /*root not 1 level children connected edges*/
			}
		});
    	
		/*display all the freezed edges*/
        path.style("stroke-opacity", function(o) {
            return o.source === d || getPath(o.source, o.target) == 1? 1 : opacity;                
        });
        
        /*coloring edges as blue in displayed edges*/
        path.style("stroke",function(o){
            if (o.source === d || getPath(o.source, o.target) == 1) {
                return "blue";
            }
        });
        
        /*add the arrow head end of each line freezed*/
        path.attr("marker-end",function(o){
        	if (o.source === d || getPath(o.source, o.target) == 1) {
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

//opacity = 1 
function dbclick(opacity){	
	return function(d){		
		
		/*check whether double clicked node is root node. if so then reset graph*/
		if(d.index == InitialNode){
			freezePaths = [];
			ClickCount = 0;
			InitialNode = -1;
			path.style("stroke-opacity", function(o) {
				//return o.source === d || o.target === d ? 1 : opacity;
				        return o.source === d ? 1 : opacity;
				    });

				    path.style("stroke","#666");
				    
				    path.attr("marker-end","url(#)");
				    
		}else{
			json.links.forEach(function(f){
				if(f.source === d){				
					freezePaths[d.index + "," + f.target.index] = 0; /*root not 1 level children connected edges*/
				}
			});

	    path.style("stroke-opacity", function(o) {
	    	if(o.source === d){
	    		return 0;
	    	}else if (getPath(o.source, o.target) == 1){
	    		return opacity;
	    	}else {
	    		return 0;
	    	}
	    });	    
	    
	    path.attr("marker-end",function(o){
	    	if (getPath(o.source, o.target) == 1) {
				return "url(#end)";
			}else if(o.source === d){
				return "url(#)";
			}else{
				return "url(#)";
			}
	    });
		}		
	    
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
function mouseOver(opacity) {
    return function(d) {
    	 
    	 /*d3.select(this).select("text").transition()
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
	        });  */
    };
}

function mouseOut(opacity) {
    return function(d) {    	

    	//path.style("stroke-opacity",1);
 		
        //path.style("stroke","#666");
        //path.attr("marker-end","url(#end)");    
               
       /* d3.select(this).select("circle").transition()
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
        .style("font", "10px sans-serif");*/
        
    };
}

function neighboring(a, b) {
  return linkedByIndex[a.index + "," + b.index];
}

function getPath(a,b){
	return freezePaths[a.index + "," + b.index ];
}
function isConnected(a, b) {
//return incoming and outgoing
	return linkedByIndex[a.index + "," + b.index] || linkedByIndex[b.index + "," + a.index] || a.index == b.index;
//return outgong
//alert(a.index + "," + b.index);
	//return linkedByIndex[a.index + "," + b.index];
	}
});
	
}
