function SvgLoad(ctx){
	//bondI
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
    
    ctx.fillStyle = "#2ca02c";
    ctx.beginPath();
    ctx.arc(200,60,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#ff7f0d";
    ctx.beginPath();
    ctx.fillText("Bond-InvGrade", 214,40); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.fillText("Bond-HighYield", 214,14); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#2ca02c";
    ctx.beginPath();
    ctx.fillText("Equity", 214,66); 
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
    
    ctx.fillStyle = "#2ca02c";
    ctx.beginPath();
    ctx.arc(200,60,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#ff7f0d";
    ctx.beginPath();
    ctx.fillText("Bond-InvGrade", 214,40); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.fillText("Bond-HighYield", 214,14); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#2ca02c";
    ctx.beginPath();
    ctx.fillText("Equity", 214,66); 
    ctx.closePath();
    ctx.fill();

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
    
    ctx.fillStyle = "#2ca02c";
    ctx.beginPath();
    ctx.arc(200,60,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#ff7f0d";
    ctx.beginPath();
    ctx.fillText("Bond-InvGrade", 214,40); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.fillText("Bond-HighYield", 214,14); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#2ca02c";
    ctx.beginPath();
    ctx.fillText("Equity", 214,66); 
    ctx.closePath();
    ctx.fill();
    
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
    
    ctx.fillStyle = "#2ca02c";
    ctx.beginPath();
    ctx.arc(200,60,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#ff7f0d";
    ctx.beginPath();
    ctx.fillText("Bond-InvGrade", 214,40); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.fillText("Bond-HighYield", 214,14); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#2ca02c";
    ctx.beginPath();
    ctx.fillText("Equity", 214,66); 
    ctx.closePath();
    ctx.fill();
        
    ctx.strokeStyle="#0000FF";
    ctx.beginPath();
    ctx.moveTo(350,35);
    ctx.lineTo(301,35);
    ctx.stroke();    
        
    ctx.strokeStyle="green";
    ctx.beginPath();
    ctx.moveTo(350,60);
    ctx.lineTo(301,60);
    ctx.stroke();
    
    ctx.strokeStyle="#FF0000";
    ctx.beginPath();
    ctx.setLineDash([20,10,5,5,5,10]);
    ctx.moveTo(350,10);
    ctx.lineTo(301,10);
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
    
    ctx.fillStyle = "#1f77b4";
    ctx.beginPath();
    ctx.arc(300,60,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#0000FF";
    ctx.beginPath();
    ctx.fillText("A to B OR B to C edge", 360,40); 
    ctx.closePath();
    ctx.fill();    

    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.fillText("Triad Completing edge", 360,14); 
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "green";
    ctx.beginPath();
    ctx.fillText("Incoming edge", 360,60); 
    ctx.closePath();
    ctx.fill();
    
    
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
    
    ctx.fillStyle = "#2ca02c";
    ctx.beginPath();
    ctx.arc(200,60,8,0,2*Math.PI);
    ctx.closePath();
    ctx.fill();
    
    ctx.fillStyle = "#2ca02c";
    ctx.beginPath();
    ctx.fillText("Equity", 214,66); 
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


