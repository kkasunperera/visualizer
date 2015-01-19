package org.karsha.visualizer;

/*
 * This is POJO object which models the Node. Node has three properties such as group and node id, name
 * tostring method print the node as string format
 * group is bond or equity
 * nodeId contain index
 * name is node given name such as transport,admin,heathsoc...
 * */
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
