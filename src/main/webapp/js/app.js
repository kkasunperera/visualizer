function Svgbase(){
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
    
}

function SvgQuarterWeak(ctx){
	
	Svgbase();
	
    //#0066FF sustain
    ctx.strokeStyle ="#33CC33";
    ctx.beginPath();
 	ctx.moveTo(550,10);
    ctx.lineTo(500,10);
    ctx.stroke();
 
 	ctx.fillStyle = "#33CC33";
    ctx.beginPath();
    ctx.fillText("Weak", 580,10); 
    ctx.closePath();
    ctx.fill();

}

function SvgQuarterEpisodic(ctx){
	Svgbase();
	
    //#0066FF sustain
    ctx.strokeStyle ="#FF0000";
    ctx.beginPath();
 	ctx.moveTo(550,10);
    ctx.lineTo(500,10);
    ctx.stroke();
 
 	ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.fillText("Episodic", 580,10); 
    ctx.closePath();
    ctx.fill();



}

function SvgQuaterSustained(ctx){
	Svgbase();
    
    //#0066FF sustain
    ctx.strokeStyle ="#0066FF";
    ctx.beginPath();
 	ctx.moveTo(550,10);
    ctx.lineTo(500,10);
    ctx.stroke();
 
 	ctx.fillStyle = "#0066FF";
    ctx.beginPath();
    ctx.fillText("Sustained", 580,10); 
    ctx.closePath();
    ctx.fill();
}

function QuarterGraphSustained(nodes,file,svg1,width,height){
	
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
      .links(json.links)
      .on("tick", tick)
      .start();
 
  
   svg.selectAll(".link")
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
		if(d.type == "sustained"){
			return "linkSustain";
		}else{
			return "linkWhite";
		}
	}) 
	.attr("stroke-opacity",function(d){
		if(d.type == "sustained"){
			return 1;
		}else{
			return 0.001;
		}
	})
	.attr("marker-end", "url(#end)");
  
  //path.append("text").attr("dx",12).attr("dy",".35em").text("quarters");
  	
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
        		if(d.type == "sustained"){
					return "#0066FF";
				}else{
					return "#FFFFFF";
				}
         });
         
         path.style("stroke-opacity",function(d){
        	 if(d.type == "sustained"){
     			return 1;
     		}else{
     			return 0.001;
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

}

function QuaterGraphEpisodic(nodes,file,svg1,width,height){

	
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
      .links(json.links)
      .on("tick", tick)
      .start();
 
  
   svg.selectAll(".link")
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
		if(d.type == "episodic"){
			return "linkEpisodic";
		}else{
			return "linkWhite";
		}
	}) 
	.attr("stroke-opacity",function(d){
		if(d.type == "episodic"){
			return 1;
		}else{
			return 0.001;
		}
	})
	.attr("marker-end", "url(#end)")
	.attr("id",function(d,i) { return "linkId_" + i; }); // assign id for each link/path
  
  
  var linktext = svg.append("svg:g").selectAll("g.linklabelholder").data(force.links());
	
  linktext.enter().append("g").attr("class", "linklabelholder")
	   .append("text")
	   .attr("class", "linklabel")
		 .style("font-size", "13px")
	   .attr("x", "200")
		 .attr("y", "-10")
	   .attr("text-anchor", "middle")
		   .style("fill","#000")
		 .append("textPath")
	  .attr("xlink:href",function(d,i) { return "#linkId_" + i;})
	   .text(function(d) { 		   		
		   var ar=[];		   
		   		if(d.Q1 == "1"){
		   			ar.push("Q1");
		   		}if(d.Q2 == "1"){
		   			ar.push("Q2");
		   		}if(d.Q3 == "1"){
		   			ar.push("Q3");
		   		}if(d.Q4 == "1"){
		   			ar.push("Q4");
		   		}
		   		
		   		if(ar.length == 1){
		   			return ar[0];
		   		}else if(ar.length == 2){
		   			return ar[0]+","+ar[1];
		   		}		   		
		 });
  

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
       
       linktext.style("opacity",function(o){
    	   return o.source === d || o.target === d ? 1 : opacity;
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
        		if(d.type == "episodic"){
					return "#FF0000";
				}else{
					return "#FFFFFF";
				}
         });
         
         path.style("stroke-opacity",function(d){
        	 if(d.type == "episodic"){
     			return 1;
     		}else{
     			return 0.001;
     		}
         });
         
         linktext.style("opacity",function(o){
      	   return o.source === d || o.target === d ? opacity : 1;
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


}

function QuatergraphWeak(nodes,file,svg1,width,height){

	
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
      .links(json.links)
      .on("tick", tick)
      .start();
 
  
   svg.selectAll(".link")
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
		}else{
			return "linkWhite";
		}
	}) 
	.attr("stroke-opacity",function(d){
		if(d.type == "weak"){
			return 1;
		}else{
			return 0.001;
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
				}else{
					return "#FFFFFF";
				}
         });
         
         path.style("stroke-opacity",function(d){
        	 if(d.type == "weak"){
     			return 1;
     		}else{
     			return 0.001;
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


}

function OriginalNetworkGraph(nodes,file,svg1,width,height){
	
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
      .links(json.links)
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
}

function QuarterGraph(nodes,file,svg1,width,height){
	
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
      .links(json.links)
      .on("tick", tick)
      .start();
 
  
   svg.selectAll(".link")
      .data(json.links)
    .enter().append("line");
      //.attr("class", "link");
      
 var arrow_head = svg.append("svg:defs").selectAll("marker")
    .data(["end"])      // "sustained","episodic","weak" Different link/path types can be defined here
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
	.attr("marker-end","url(#end)");
	//.attr("id",function(d,i) { return "linkId_" + i; }); // assign id for each link/path    
  
  /*var linktext = svg.append("svg:g").selectAll("g.linklabelholder").data(force.links());
	
  linktext.enter().append("g").attr("class", "linklabelholder")
   .append("text")
   .attr("class", "linklabel")
	 .style("font-size", "13px")
   .attr("x", "50")
	 .attr("y", "-20")
   .attr("text-anchor", "start")
	   .style("fill","#000")
	 .append("textPath")
  .attr("xlink:href",function(d,i) { return "#linkId_" + i;})
   .text(function(d) { 
	 return d.type; 
	 });*/

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
}

function SvgQuarter(ctx){
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
}