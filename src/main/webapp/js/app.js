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
    
    ctx.strokeStyle="#666";
    ctx.beginPath();
    ctx.setLineDash([5,5]);
    ctx.moveTo(350,10);
    ctx.lineTo(301,10);
    ctx.stroke();
}

function SvgQuarterWeak(ctx){
	

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

    Svgbase();
}

function SvgQuarterEpisodic(ctx){
	
   
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

    Svgbase();

}

function SvgQuaterSustained(ctx){
    
   
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
    
    Svgbase();
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
      .links(json.links.filter(function(d){return d.type == "sustained"}))
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
	.attr("class", "linkSustain") 
	.on("mouseover", mOver)
  	.on("mouseout", mOut) 
  	.attr("marker-end", "url(#end)")
  	.attr("id",function(d,i) { return "linkId_" + i; }); // assign id for each link/path
  	   
  
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


    var linktext = svg.append("svg:g").selectAll("g.linklabelholder").data(force.links());
    
function mOver(d){
	//d3.selectAll($("#" + d.id)).style("stroke", "red");
	d3.select(this)
	.style("stroke-width", "5px")
		.style("stroke", "green");
			
linktext.enter().append("g").attr("class", "linklabelholder").append("text")
	   .attr("class", "linklabel")
		 .style("font-size", "15px")
		 .style("font-weight", "bold")
	   .attr("x", "200")
		 .attr("y", "-10")
	   .attr("text-anchor", "middle")
		   .style("fill","#FF0000")
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
	//alert(d.Q1);
}
    
function mOut(d){
	d3.select(this)
	    .style("stroke-width","1.5px")
		.style("stroke","#0066FF");
	
	svg.selectAll("g.linklabelholder").remove();
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

         path.style("stroke", "#0066FF");

         path.style("stroke-dasharray",0); 
         
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
      .links(json.links.filter(function(d){return d.type == "episodic"}))
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
	.attr("class", "linkEpisodic") 
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

         path.style("stroke", "#FF0000");
 
         path.style("stroke-dasharray",0); 
         
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
      .links(json.links.filter(function(d){return d.type == "weak"}))
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
	.attr("class", "linkWeak") 
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

         path.style("stroke", "#33CC33");
        
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

function data_set(quart,json) {
	switch (quart) {
	case 0:
		break;
    case 1:
    	for(var i = json.links.length-1; i--;){
    		if(json.links[i].Q1==0)json.links.splice(i,1);
    	}
        break;
    case 2:
    	for(var i = json.links.length-1; i--;){
    		if(json.links[i].Q2==0)json.links.splice(i,1);
    	}
        break;
    case 3:
    	for(var i = json.links.length-1; i--;){
    		if(json.links[i].Q3==0)json.links.splice(i,1);
    	}
        break;
    case 4:
    	for(var i = json.links.length-1; i--;){
    		if(json.links[i].Q4==0)json.links.splice(i,1);
    	}
        break;
	}
	//alert(json.links.length);
	return json.links;
}

function OriginalNetworkGraph(nodes,file,svg1,width,height,quart){
	
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
	//alert("links"+json.links.length);
    return function(d) {
    	node.style("stroke-opacity", function(o) {
            thisOpacity = isConnected(d, o) ? 1 : opacity;
            this.setAttribute('fill-opacity', thisOpacity);
            return thisOpacity;
        });
    	
        path.style("stroke-opacity", function(o) {
            return o.source === d || o.target === d ? 1 : opacity;                
        });
        //path.style("marker-end","url(#end););

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
        
       //arrow_head.style("opacity",0);
       
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
         
         path.attr("marker-end","url(#)");
         
         
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

function QuarterGraph(nodes,file,svg1,width,height,quart){
	
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
	//.attr("id",function(d,i){ return "linkID "+i;});
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
	/*alert("json length"+json.links.length);
	alert("force links"+force.links.length);*/
	
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
         
         path.style("stroke-dasharray",0); 
         
         path.attr("marker-end","url(#)");
         
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
	    
	    
	    ctx.strokeStyle ="#33CC33";
	    ctx.beginPath();
	 	ctx.moveTo(550,10);
	    ctx.lineTo(500,10);
	    ctx.stroke();
	    
	    
	 	ctx.strokeStyle ="#0066FF";
	    ctx.beginPath();
	 	ctx.moveTo(550,35);
	    ctx.lineTo(500,35);
	    ctx.stroke();
	    
	    
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
	    Svgbase();
}

function Longchain(nodes,file,svg1,width,height){
	
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

  	var linksForSelectedNode = [];
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
    var connectedEdges = [];
    var triadCompletingEdges = [];
    var depthEdges = [];
   
    return function(d) {

    	json.links.forEach(function(o) {
    		 if (o.source === d) {    
                 if(connectedEdges.indexOf(o.target.index) == -1){
                     connectedEdges.push(o.target.index);
                 }
             };
    		});

    	//alert("the length of connected edges " +connectedEdges.length);
        for(var i=0;i< connectedEdges.length;i++){
        	
            json.links.forEach(function(f) {
            	// && !isSecondLayerEdge(f.target.index) second leyar removed
                if (isConnectedIndex(connectedEdges[i], f.target.index ) && f.target != d && f.target.index != connectedEdges[i]) { 
                    if(triadCompletingEdges.indexOf(f.target.index) == -1){                    	
                        triadCompletingEdges.push(f.target.index);                        
                        //alert("connectededge "+connectedEdges[i]+"pushed " + f.target.index);                        
                        
                        for(var j=0; j < triadCompletingEdges.length ; j++){
                        	
                        	json.links.forEach(function(n){ // iterate all the links for finding children edge
                        		if(isConnectedIndex(triadCompletingEdges[j], n.target.index) && n.target != d && n.target != f.target && n.target.index != triadCompletingEdges[j]){
                        			//alert("connectededge "+connectedEdges[i]+" triadCompletingEdges[j] " + triadCompletingEdges[j] + " "+ n.target.index);
                        			
                        			if(depthEdges.indexOf(n.target.index) == -1){
                        				/*add the leaf level node*/ 
                        				depthEdges.push(n.target.index);                        				
                        			}
                        			if(linksForSelectedNode.indexOf(triadCompletingEdges[j]+ "," + n.target.index) == -1){
                        				linksForSelectedNode[triadCompletingEdges[j]+ "," + n.target.index] = 3;
                        				
                        				if(linksForSelectedNode.indexOf(d.index + "," + connectedEdges[i]) == -1){
                                            linksForSelectedNode[d.index + "," + connectedEdges[i]] = 1;
                                            //alert("level 1 d.index "+d.index+" "+" connectedEdges[i] "+connectedEdges[i]);
                                        }
                            			
                            			if(linksForSelectedNode.indexOf(connectedEdges[i] + "," + triadCompletingEdges[j]) == -1){// add the parent edge 
                                    		linksForSelectedNode[connectedEdges[i] + "," + triadCompletingEdges[j]] = 2;
                                    		//alert(" level 2 "+" connectedEdges[i] "+connectedEdges[i]+" " + " triadCompletingEdges[j] "+triadCompletingEdges[j]);
                                    	}
                        			} 
                        			                        			
                        		}
                        	});

                        }  
                        /*clear the array*/
                        triadCompletingEdges = [];                                               
                    }                    
 
                }
            	});

        }

        path.style("stroke-opacity", function(o) {
            var value= getConnectedNodes(o.source, o.target);
            return (value>=1) ? 1 : opacity; 
        });
	
        path.style("stroke",function(o){
            if (getConnectedNodes(o.source, o.target)==1||getConnectedNodes(o.source, o.target)==2||getConnectedNodes(o.source, o.target)==3 || getConnectedNodes(o.source, o.target)==3) { 
                return "blue";
            }
        });

        connectedEdges=[];
        //triadCompletingEdges = [];
        depthEdges = [];
        
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

         path.style("stroke-opacity",1);

         path.style("stroke","#666");
         
         arrow_head.style("opacity",function(o){
             thisOpacity = isConnected(d, o) ? opacity : 1;
             this.setAttribute('fill-opacity', thisOpacity);
             return thisOpacity;
         });
         
         linksForSelectedNode = [];
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

});
}

/*data retrieve from the server*/

function LongerChainInQuarterData(nodes,links,svg1,width,height){

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
        var depthEdges = [];
        
        return function(d) {

        	links.forEach(function(o) {
        		 if (o.source === d) {    
                     if(connectedEdges.indexOf(o.target.index) == -1){
                         connectedEdges.push(o.target.index);
                     }

                 };
        		});

        	//alert("the length of connected edges " +connectedEdges.length);
            for(var i=0;i< connectedEdges.length;i++){
            	
                links.forEach(function(f) {
                	
                    if (isConnectedIndex(connectedEdges[i], f.target.index ) && f.target != d && f.target.index != connectedEdges[i]) { 
                        if(triadCompletingEdges.indexOf(f.target.index) == -1){                    	
                            triadCompletingEdges.push(f.target.index);                        
                            //alert("connectededge "+connectedEdges[i]+"pushed " + f.target.index);                        
                            
                            for(var j=0; j < triadCompletingEdges.length ; j++){
                            	
                            	links.forEach(function(n){ // iterate all the links for finding children edge
                            		if(isConnectedIndex(triadCompletingEdges[j], n.target.index) && n.target != d && n.target != f.target && n.target.index != triadCompletingEdges[j]){
                            			//alert("connectededge "+connectedEdges[i]+" triadCompletingEdges[j] " + triadCompletingEdges[j] + " "+ n.target.index);
                            			
                            			if(depthEdges.indexOf(n.target.index) == -1){
                            				depthEdges.push(n.target.index);                        				
                            			}
                            			if(linksForSelectedNode.indexOf(triadCompletingEdges[j]+ "," + n.target.index) == -1){
                            				linksForSelectedNode[triadCompletingEdges[j]+ "," + n.target.index] = 3;
                            				
                            				if(linksForSelectedNode.indexOf(d.index + "," + connectedEdges[i]) == -1){
                                                linksForSelectedNode[d.index + "," + connectedEdges[i]] = 1;
                                                //alert("level 1 d.index "+d.index+" "+" connectedEdges[i] "+connectedEdges[i]);
                                            }
                                			
                                			if(linksForSelectedNode.indexOf(connectedEdges[i] + "," + triadCompletingEdges[j]) == -1){// add the parent edge 
                                        		linksForSelectedNode[connectedEdges[i] + "," + triadCompletingEdges[j]] = 2;
                                        		//alert(" level 2 "+" connectedEdges[i] "+connectedEdges[i]+" " + " triadCompletingEdges[j] "+triadCompletingEdges[j]);
                                        	}
                            			} 
                            			                        			
                            		}
                            	});

                            }  
                            triadCompletingEdges = [];
                                                    
                        }                    
     
                    }
                	});

            }

            path.style("stroke-opacity", function(o) {
                var value= getConnectedNodes(o.source, o.target);
                return (value>=1) ? 1 : opacity; 
            });
    	
            path.style("stroke",function(o){
                if (getConnectedNodes(o.source, o.target)==1||getConnectedNodes(o.source, o.target)==2||getConnectedNodes(o.source, o.target)==3 || getConnectedNodes(o.source, o.target)==3) { 
                    return "blue";
                }
            });

            connectedEdges=[];
            //triadCompletingEdges = [];
            depthEdges = [];
            
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