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
    
    var rootFreeNode;
    var freezeNodes= [];
    var freezePaths= [];
    
function click(opacity){
	return function(d) {
		rootFreeNode = d.index;
		
		//push incoming and outgoing nodes index
		json.links.forEach(function(f){
			if(f.source === d){
				freezeNodes.push(f.target.index);
				freezePaths[f.source.index + "," + d.index] = 1;
			}else if(f.target === d){
				freezeNodes.push(f.source.index);
				freezePaths[f.target.index + "," + d.index] = 2;
			}
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

function dbclick(opacity){
	return function(d){
		
	freezeNodes = [];
	rootFreeNode = -1;

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
function mouseOver(opacity) {
    return function(d) {
    	 if(d.index != rootFreeNode ){
    		 
    		 for(var i in freezeNodes){
    			 if( d.index == freezeNodes[i]){
    				 
    				 path.style("stroke-opacity",function(o){
    					 if(o.source === d || o.target === d ){
    						 return 1;
    					 }else {
    						 return opacity;
    					 }
    					 
        			 //return o.source === d || o.target === d ? 1 : opacity;
        		 });
        		 
        		 path.style("stroke",function(o){
                     if (o.source === d ) {
                         return "blue";
                     }else if (o.target === d ) {
                         return "red";
                     }                
                 });
     		
                 /*path.attr("marker-end",function(o){
                 	if (o.source === d || o.target === d ) {
         				return "url(#end)";
         			}else{
         				return "url(#)";
         			}
                 });*/
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
    			 }
    		 }    		
    	 }
    };
}

function mouseOut(opacity) {
    return function(d) {    	

        if(d.index != rootFreeNode){
        	 path.style("stroke-opacity",1);
     		
              path.style("stroke","#666");
              //path.attr("marker-end","url(#end)");    
                     
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
              
              path.style("stroke-opacity",function(o){            	  
            	  if(pathIndex(o.source, o.target) > 0){
            		  return 1;
            	  }else {
            		  return 0;
            	  }
              });
              
              
        }
        
    };
}

function neighboring(a, b) {
  return linkedByIndex[a.index + "," + b.index];
}

function pathIndex(a,b){
	return freezePaths[a.index + "," + b.index ] || freezePaths[b.index + "," + a.index];
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