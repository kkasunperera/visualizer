package org.karsha.visualizer;

public class Node {
	
	String group;
	String nodeId;
	String name;
	
	public String getGroup() {
		return group;
	}
	public void setGroup(String group) {
		this.group = group;
	}
	public String getNodeId() {
		return nodeId;
	}
	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	
	@Override
	public String toString() {
		String node="\""+group+" "+nodeId+" "+name+"\"";
		return node;
	}
}
