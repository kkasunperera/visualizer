var out_all,c=2005;
function overall_anlys(all_obj,source,target){
	
	
	//alert(all_obj[0].p_value_2005);
	
	//alert(nodes[source].group);
	
	
	var node_name_source,node_name_target;
	if (nodes[source].group ==1)node_name_source = "bond.";
	if (nodes[source].group ==2)node_name_source = "equity.";
	node_name_source = node_name_source + nodes[source].nodeId ;
	
	if (nodes[target].group ==1)node_name_target = "bond.";
	if (nodes[target].group ==2)node_name_target = "equity.";
	node_name_target = node_name_target + nodes[target].nodeId ;
	var dataset=[], tempSet= [],dataset1=[], tempSet1= [],blk_nameTemp =[],blk_nameTemp1 =[],blk_name =[],i;
	for ( var i in all_obj) {
		if(all_obj[i].causal_industry == node_name_source & all_obj[i].caused_industry == node_name_target){
			out_all = "Q1:"+all_obj[i].p_value_2005_Q1+" Q2:"+all_obj[i].p_value_2005_Q2+" Q3:"+ all_obj[i].p_value_2005_Q3+" Q4:"+ all_obj[i].p_value_2005_Q4;
			
			//d3.select('#analyse_bar').append('p').text(out_all);
			
			
			tempSet.push(all_obj[i].p_value_2005);
			tempSet.push(all_obj[i].p_value_2006);
			tempSet.push(all_obj[i].p_value_2007);
			tempSet.push(all_obj[i].p_value_2008);
			tempSet.push(all_obj[i].p_value_2009);
			tempSet.push(all_obj[i].p_value_2010);
			tempSet.push(all_obj[i].p_value_2011);
			tempSet.push(all_obj[i].p_value_2012);
			
			tempSet1.push(all_obj[i].p_value_2005_Q1);
			tempSet1.push(all_obj[i].p_value_2005_Q2);
			tempSet1.push(all_obj[i].p_value_2005_Q3);
			tempSet1.push(all_obj[i].p_value_2005_Q4);
			tempSet1.push(all_obj[i].p_value_2006_Q1);
			tempSet1.push(all_obj[i].p_value_2006_Q2);
			tempSet1.push(all_obj[i].p_value_2006_Q3);
			tempSet1.push(all_obj[i].p_value_2006_Q4);
			tempSet1.push(all_obj[i].p_value_2007_Q1);
			tempSet1.push(all_obj[i].p_value_2007_Q2);
			tempSet1.push(all_obj[i].p_value_2007_Q3);
			tempSet1.push(all_obj[i].p_value_2007_Q4);
			tempSet1.push(all_obj[i].p_value_2008_Q1);
			tempSet1.push(all_obj[i].p_value_2008_Q2);
			tempSet1.push(all_obj[i].p_value_2008_Q3);
			tempSet1.push(all_obj[i].p_value_2008_Q4);
			tempSet1.push(all_obj[i].p_value_2009_Q1);
			tempSet1.push(all_obj[i].p_value_2009_Q2);
			tempSet1.push(all_obj[i].p_value_2009_Q3);
			tempSet1.push(all_obj[i].p_value_2009_Q4);
			tempSet1.push(all_obj[i].p_value_2010_Q1);
			tempSet1.push(all_obj[i].p_value_2010_Q2);
			tempSet1.push(all_obj[i].p_value_2010_Q3);
			tempSet1.push(all_obj[i].p_value_2010_Q4);
			tempSet1.push(all_obj[i].p_value_2011_Q1);
			tempSet1.push(all_obj[i].p_value_2011_Q2);
			tempSet1.push(all_obj[i].p_value_2011_Q3);
			tempSet1.push(all_obj[i].p_value_2011_Q4);
			tempSet1.push(all_obj[i].p_value_2012_Q1);
			tempSet1.push(all_obj[i].p_value_2012_Q2);
			tempSet1.push(all_obj[i].p_value_2012_Q3);
			tempSet1.push(all_obj[i].p_value_2012_Q4);
			
			
			dataset.push(tempSet);
			dataset1.push(tempSet1);
			
			d3.select('table').remove();
			d3.select('p').remove();
			
			d3.select("#analyse_bar")
			.append('p')
			.style("position","fixed")
			.html('<b> Egde Analysis <b>'+
				  '<b> Source :</b> '+all_obj[i].causal_industry+' [ '+all_obj[i].causal_industry_description+' ]<br />'+
				  '<b> Target :</b> '+all_obj[i].caused_industry+' [ '+all_obj[i].caused_industry_description+' ]<br />'+
				  'Annual behavior :')
		    .append("table")
		    
		    .style("border-collapse", "collapse")
		    .style("border", "2px black solid")
		    .style("position","fixed")
		    
		    .selectAll("tr")
		    .data(dataset)
		    .enter().append("tr")
		    
		    .selectAll("td")
		    .data(function(d){return d;})
		    .enter().append("td")
		    .style("width","48px")		    
		    .style("border", "1px black solid")
		    .style("padding", "11px")
		    .style("background-color",function(d){
		    							if(d == 'TRUE')color_blk ="blue";
		    							else color_blk ="white"; return color_blk;})
		    .text(function(d){
		    		return c++;})
		    .style("font-size", "11px")
		    .append("table")
		    .style("border-collapse", "collapse")
		    .style("border", "2px black solid")
		    .style("position","fixed");
						
		}
	}
c = 2005;
var c1 = 1;
			d3.select("#analyse_bar1")
			.append('p')
			.style("position","fixed")
			.html('<br /><br />')
			.append("table")
			.style("border-collapse", "collapse")
			.style("border", "2.5px black solid")
			.style("position","fixed")
			
			.selectAll("tr")
			.data(dataset1)
			.enter().append("tr")
			
			.selectAll("td")
			.data(function(d){return d;})
			.enter().append("td")
			
			.style("width","12px")		    
			.style("border", "1.1px black solid")
			.style("padding", "2px")
			.style("background-color",function(d){
										if(d == 'TRUE')color_blk ="blue";
										else color_blk ="white"; return color_blk;})
			.text(function(d){
				var k = (c1++)%5 ;
				if(k==0)return (c1++)%5;
				else return k ;})
			.style("font-size", "10.4px");
				
	
		
}

