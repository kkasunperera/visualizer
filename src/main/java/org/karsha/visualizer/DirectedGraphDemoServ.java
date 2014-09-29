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
	
	public static void findImmidietCycles(){
		// A <--> B cycles 
	}
	
	public static void something(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		// A -> B B->C --> A -> C
		
		Node n=nodes[0];
		Set<DefaultEdge> set=graph.outgoingEdgesOf(n);
		DefaultEdge[] edgeSet=set.toArray(new DefaultEdge[set.size()]);
		
		System.out.println(edgeSet.length);
		
		if(edgeSet.length > 1){
			for (int i = 0; i < edgeSet.length; i++) {
				for (int j = 0; j < edgeSet.length; j++) {
					System.out.println(edgeSet[i]+" "+edgeSet[j]);
				}
			}
		}
		
		
	}
	
}
