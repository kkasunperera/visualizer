package org.karsha.visualizer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;


import org.jgrapht.DirectedGraph;
import org.jgrapht.graph.DefaultDirectedGraph;
import org.jgrapht.graph.DefaultEdge;


public class DirectedGraphDemoServ {
	

	
	public static DirectedGraph<Node,DefaultEdge> createHrefGraph(Node[] nodes,Links[] links)
    {
		DirectedGraph<Node, DefaultEdge> g = new DefaultDirectedGraph<Node, DefaultEdge>(DefaultEdge.class);

		for (int i = 0; i < nodes.length; i++) {
			g.addVertex(nodes[i]);
		}
        
		for (int i = 0; i < links.length; i++) {
			g.addEdge(nodes[Integer.parseInt(links[i].getSource())],nodes[Integer.parseInt(links[i].getTarget())]);
		}
		
        return g;
    }
	
	/*find the highest in coming edges from node*/
	public static void findHighInDegree(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		
		int highInDegre=0;
		Set<DefaultEdge> s = null;
		
		for (int i = 0; i < nodes.length; i++) {	
			//find the degree
			int degree=graph.inDegreeOf(nodes[i]);			
			if(degree > highInDegre){
				highInDegre=degree;							
				s=graph.incomingEdgesOf(nodes[i]);/*check incoming edges*/
			}
		}
		
		//assign edges to default edges
		DefaultEdge[] o= s.toArray(new DefaultEdge[highInDegre]);

		//add to link to list
		List<Links> list=new ArrayList<Links>();
		
		for (int i = 0; i < o.length; i++) {	
			Links link=new Links();
			link.setSource(Integer.toString(Arrays.asList(nodes).indexOf(graph.getEdgeSource(o[i]))));
			link.setTarget(Integer.toString(Arrays.asList(nodes).indexOf(graph.getEdgeTarget(o[i]))));
			list.add(link);
						
		}
		
		for (int i = 0; i < o.length; i++) {
			System.out.println(list.get(i).getSource() + " "+list.get(i).getTarget());
		}
		
	}
	
	/*find the highest out going edges from node*/
	public static void findHighOutDegree(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		
		int highOutDegre=0;
		Set<DefaultEdge> s = null;

		for (int i = 0; i < nodes.length; i++) {	
			
			int degree=graph.outDegreeOf(nodes[i]);			
			if(degree > highOutDegre){
				highOutDegre=degree;							
				s=graph.outgoingEdgesOf(nodes[i]);/*check outgoing degree*/
			}
		}		
		
		//add edges to default edge array
		DefaultEdge[] o= s.toArray(new DefaultEdge[highOutDegre]);
		//adding links to list
		List<Links> list=new ArrayList<Links>();
		
		for (int i = 0; i < o.length; i++) {	
			Links link=new Links();
			link.setSource(Integer.toString(Arrays.asList(nodes).indexOf(graph.getEdgeSource(o[i]))));
			link.setTarget(Integer.toString(Arrays.asList(nodes).indexOf(graph.getEdgeTarget(o[i]))));
			list.add(link);					
		}
		
		for (int i = 0; i < o.length; i++) {
			System.out.println(list.get(i).getSource() + " "+list.get(i).getTarget());
		}	
	}	
	
	//input to be a array but for test two node 
	public static void findImmidietCycles(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		// A <--> B cycles 
		//this list contains visited edges
		List<DefaultEdge> listOfImEdges=new ArrayList<DefaultEdge>();
		
		for (int i = 0; i < nodes.length; i++) {
			Set<DefaultEdge> edges=graph.outgoingEdgesOf(nodes[i]);
			DefaultEdge[] edge=edges.toArray(new DefaultEdge[edges.size()]);
			for (int j = 0; j < edge.length; j++) {
				
				if(listOfImEdges.contains(edge[j])){
					//do nothing if already checked edge
				}else{
					if(graph.containsEdge(edge[j]) && graph.containsEdge(graph.getEdgeTarget(edge[j]), graph.getEdgeSource(edge[j]))){
						System.out.println(edge[j].toString());
						listOfImEdges.add(graph.getEdge(graph.getEdgeTarget(edge[j]), graph.getEdgeSource(edge[j])));
					}
				}
					
				}
			}
		System.out.println(listOfImEdges.size());
		}
	
	public static void CompleteTriad(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		// A -> B B->C --> A -> C
		int NumberOfTriad=0;
		Node n=nodes[0];
		Set<DefaultEdge> set=graph.outgoingEdgesOf(n);
		DefaultEdge[] edgeSet=set.toArray(new DefaultEdge[set.size()]);
		
		System.out.println(edgeSet.length);
		
		if(edgeSet.length > 1){
			for (int i = 0; i < edgeSet.length; i++) {
				for (int j = 0; j < edgeSet.length; j++) {
					//System.out.println(edgeSet[i]+" "+edgeSet[j]);
					Node A=graph.getEdgeTarget(edgeSet[i]);
					Node B=graph.getEdgeTarget(edgeSet[j]);
					
					if(graph.containsEdge(A, B)){
						System.out.println("edges is "+edgeSet[i].toString()+" "+edgeSet[j].toString()+" "+graph.getEdge(A, B));
						System.out.println("Triad is "+n.toString()+" "+A.toString()+" "+B.toString());
						System.out.println("------------------------------------------------------------------------");
						NumberOfTriad++;
					}
					
				}
			}
		}	
		System.out.println(NumberOfTriad);
	}
	
	public static void InCompleteTriad(DirectedGraph<Node, DefaultEdge> graph,Node[] nodes){
		// A -> B && B -> C but not A -> C 
	}
	
}
