function HighestInDegree(){
		$.ajax({
			  type: 'GET',
			  url: 'Indegree',                          			
			  async: false
		}); 
	}

function HighestOutDegree() {
	$.ajax({
		type : 'GET',
		url : 'Outdegree',
		async : false
	});
}

function completeTriad() {
	//DataLoadModule();
}

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
		  error: function(data,error){alert(error);},
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


function DrawGraph(nodes,links,svg){
	 var color = d3.scale.category10();

	 var force = d3.layout.force()
	     .nodes(nodes)
	     //.nodes(d3.values(nodes))
	     .links(links)
	     .size([width, height])
	     .linkDistance(600)
	     .charge(-600)
	     .on("tick", tick)
	     .start();


	 	
	 	
	 // build the arrow.
	 svg.append("svg:defs").selectAll("marker")
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
	 	.attr("class", function(d) { return "link " + d.type; })
	 	.attr("class", "link")
	 	.attr("marker-end", "url(#end)");


	 var node = svg.selectAll(".node")
	     .data(force.nodes())
	   .enter().append("g")
	     .attr("class", "node")
	 	.style("fill", function(d) { return color(d.group); })
	 	.on("mouseover", fade(.1))
	     .on("mouseout", fade(1))
	     .call(force.drag);

	 node.append("circle")
	     .attr("r", 8);

	 node.append("text")
	     .attr("x", 12)
	     .attr("dy", ".65em")
	 	.style("fill", "black")
	     .text(function(d) { return d.name; });

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
	   	    return "translate(" + d.x + "," + d.y + ")"; });
	 }


	     function fade(opacity) {
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
