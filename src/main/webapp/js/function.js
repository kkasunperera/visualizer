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


function DrawGraph(){
	
}
