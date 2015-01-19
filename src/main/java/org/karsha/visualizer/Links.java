package org.karsha.visualizer;

import org.codehaus.jackson.map.annotate.JsonDeserialize;

/*
 * getter and setters
 * This is POJO object which models the edge between two node
 * source is source node index 
 * target is target node index
 * type is edge appeared time interval such "sustain","episodic","weak"
 * YEAR indicates this edge appeared in year or available in relevant year
 * status is which contains edge faked edge or true edge fake edges for incomplete triad edge
 * inedge indicates this edge is incoming edge for incomplete triad nodes
 * */
public class Links{
	
	int source;
	int target;
	String type;
	@JsonDeserialize(contentAs=String.class)
	String Q1;
	@JsonDeserialize(contentAs=String.class)
	String Q2;
	@JsonDeserialize(contentAs=String.class)
	String Q3;
	@JsonDeserialize(contentAs=String.class)
	String Q4;
	@JsonDeserialize(contentAs=String.class)
	String YEAR;
	boolean status;
	boolean inedge;
		
	public int getSource() {
		return source;
	}
	public void setSource(int source) {
		this.source = source;
	}
	public int getTarget() {
		return target;
	}
	public void setTarget(int target) {
		this.target = target;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getQ1() {
		return Q1;
	}
	public void setQ1(String q1) {
		Q1 = q1;
	}
	public String getQ2() {
		return Q2;
	}
	public void setQ2(String q2) {
		Q2 = q2;
	}
	public String getQ3() {
		return Q3;
	}
	public void setQ3(String q3) {
		Q3 = q3;
	}
	public String getQ4() {
		return Q4;
	}
	public void setQ4(String q4) {
		Q4 = q4;
	}
	public String getYEAR() {
		return YEAR;
	}
	public void setYEAR(String year) {
		YEAR = year;
	}
	
}
