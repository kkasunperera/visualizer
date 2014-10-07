package org.karsha.visualizer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Iterator;
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
			//g.addEdge(nodes[Integer.parseInt(links[i].getSource())],nodes[Integer.parseInt(links[i].getTarget())]);
			g.addEdge(nodes[links[i].getSource()],nodes[links[i].getTarget()]);
		}
		
        return g;
    }
	
	/*find the highest in coming edges from node*/
	public static List<Links> findHighInDegree(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		
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
			link.setSource(Arrays.asList(nodes).indexOf(graph.getEdgeSource(o[i])));
			link.setTarget(Arrays.asList(nodes).indexOf(graph.getEdgeTarget(o[i])));
			list.add(link);
						
		}
		
		for (int i = 0; i < o.length; i++) {
			System.out.println(list.get(i).getSource() + " "+list.get(i).getTarget());
		}
		return list;
		
	}
	
	/*find the highest out going edges from node*/
	public static List<Links> findHighOutDegree(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		
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
			link.setSource(Arrays.asList(nodes).indexOf(graph.getEdgeSource(o[i])));
			link.setTarget(Arrays.asList(nodes).indexOf(graph.getEdgeTarget(o[i])));
			list.add(link);					
		}
		
		for (int i = 0; i < o.length; i++) {
			System.out.println(list.get(i).getSource() + " "+list.get(i).getTarget());
		}
		return list;	
	}	
	
	//input to be a array but for test two node 
	public static List<Links> findImmidietCycles(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		// A <--> B cycles 
		//this list contains visited edges
		List<DefaultEdge> listOfImEdges=new ArrayList<DefaultEdge>();
		List<Links> list=new ArrayList<Links>();
		for (int i = 0; i < nodes.length; i++) {
			Set<DefaultEdge> edges=graph.outgoingEdgesOf(nodes[i]);
			DefaultEdge[] edge=edges.toArray(new DefaultEdge[edges.size()]);
			for (int j = 0; j < edge.length; j++) {
				
				if(listOfImEdges.contains(edge[j])){
					//do nothing if already checked edge
				}else{
					if(graph.containsEdge(edge[j]) && graph.containsEdge(graph.getEdgeTarget(edge[j]), graph.getEdgeSource(edge[j]))){
						System.out.println(edge[j].toString()+graph.getEdge(graph.getEdgeTarget(edge[j]), graph.getEdgeSource(edge[j])));
						listOfImEdges.add(graph.getEdge(graph.getEdgeTarget(edge[j]), graph.getEdgeSource(edge[j])));
						Links linkA=new Links();
						Links linkB=new Links();
						
						linkA.setSource(Arrays.asList(nodes).indexOf(graph.getEdgeSource(edge[j])));
						linkA.setTarget(Arrays.asList(nodes).indexOf(graph.getEdgeTarget(edge[j])));
						
						linkB.setSource(Arrays.asList(nodes).indexOf(graph.getEdgeTarget(edge[j])));
						linkB.setTarget(Arrays.asList(nodes).indexOf(graph.getEdgeSource(edge[j])));
						
						list.add(linkA);
						list.add(linkB);
					}
				}
					
				}
			}
		System.out.println("imediate cycle ;"+listOfImEdges.size());
		return list;
		}
	
	/*find the completeTriad of the graph*/
	public static List<Links> CompleteTriad(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		// A -> B B->C --> A -> C
		int NumberOfTriad;
		List<Links> list=new ArrayList<Links>();
		
		for (int k = 0; k < nodes.length; k++) {
			Set<DefaultEdge> set=graph.outgoingEdgesOf(nodes[k]);
			DefaultEdge[] edgeSet=set.toArray(new DefaultEdge[set.size()]);
			
			NumberOfTriad=0;
			
			if(edgeSet.length > 1){
				for (int i = 0; i < edgeSet.length; i++) {
					for (int j = 0; j < edgeSet.length; j++) {
						Links linkA=new Links();
						Links linkB=new Links();
						Links linkC=new Links();
						
						//System.out.println(edgeSet[i]+" "+edgeSet[j]);
						Node A=graph.getEdgeTarget(edgeSet[i]);
						Node B=graph.getEdgeTarget(edgeSet[j]);
						
						if(graph.containsEdge(A, B)){
							/*System.out.println("edges is "+edgeSet[i].toString()+" "+edgeSet[j].toString()+" "+graph.getEdge(A, B));
							System.out.println("Triad is "+nodes[k].toString()+" "+A.toString()+" "+B.toString());
							System.out.println("-----------------------------------------------------------------------------------");*/
							NumberOfTriad++;
									
							
							
							//link A-->B
							linkA.setSource(Arrays.asList(nodes).indexOf(graph.getEdgeSource(edgeSet[i])));
							linkA.setTarget(Arrays.asList(nodes).indexOf(graph.getEdgeTarget(edgeSet[i])));											
							
							//link A-->c
							linkB.setSource(Arrays.asList(nodes).indexOf(graph.getEdgeSource(edgeSet[j])));
							linkB.setTarget(Arrays.asList(nodes).indexOf(graph.getEdgeTarget(edgeSet[j])));
							
							//link B-->c
							linkC.setSource(Arrays.asList(nodes).indexOf(A));
							linkC.setTarget(Arrays.asList(nodes).indexOf(B));
		
							if(!isAdded(linkA, list)){
								list.add(linkA);
							}
							if(!isAdded(linkB, list)){
								list.add(linkB);
							}
							if(!isAdded(linkC, list)){
								list.add(linkC);
							}							

							NumberOfTriad++;
						}
						
					}
				}
			}			
		}
		
		
		
		System.out.println("number of completed triad length  "+list.size());
		
		return list;
	}
	
	/*find the IncompleteTriad of the graph*/
	public static List<Links> InCompleteTriad(DirectedGraph<Node, DefaultEdge> graph,Node[] nodes){		
		// A -> B && B -> C but not A -> C 
		int NumberOfTriad;
		List<Links> list=new ArrayList<Links>();
		
		for (int k = 0; k < nodes.length; k++) {
			Set<DefaultEdge> set=graph.outgoingEdgesOf(nodes[k]);
			DefaultEdge[] edgeSet=set.toArray(new DefaultEdge[set.size()]);
			
			NumberOfTriad=0;
			
			if(edgeSet.length > 1){
				for (int i = 0; i < edgeSet.length; i++) {
					for (int j = 0; j < edgeSet.length; j++) {
						Links linkA=new Links();
						Links linkB=new Links();						
						
						//System.out.println(edgeSet[i]+" "+edgeSet[j]);
						Node A=graph.getEdgeTarget(edgeSet[i]);
						Node B=graph.getEdgeTarget(edgeSet[j]);
						
						if(!graph.containsEdge(A, B)){
							/*System.out.println("edges is "+edgeSet[i].toString()+" "+edgeSet[j].toString()+" ");
							System.out.println("Triad is "+nodes[k].toString()+" "+A.toString()+" "+B.toString());
							System.out.println("-----------------------------------------------------------------------------------");*/
							NumberOfTriad++;
							
							//link A-->B
							linkA.setSource(Arrays.asList(nodes).indexOf(graph.getEdgeSource(edgeSet[i])));
							linkA.setTarget(Arrays.asList(nodes).indexOf(graph.getEdgeTarget(edgeSet[i])));											
							
							//link A-->c
							linkB.setSource(Arrays.asList(nodes).indexOf(graph.getEdgeSource(edgeSet[j])));
							linkB.setTarget(Arrays.asList(nodes).indexOf(graph.getEdgeTarget(edgeSet[j])));
							
							//link B-->c
							//due to incomplete there is no b->c edges
							
							if(!isAdded(linkA, list)){
								list.add(linkA);
							}
							if(!isAdded(linkB, list)){
								list.add(linkB);
							}

							NumberOfTriad++;
						}
						
					}
				}
			}
			
			
		}
		
		System.out.println("number of incompleted triad length "+list.size());
		return list;

		
	}
	


private static boolean isAdded(Links link,List<Links> list){
		
	boolean state=false;
	
		if(list.size() > 0){
			for (int i = 0; i < list.size(); i++) {
				if(list.get(i).getSource() == link.getSource() && list.get(i).getTarget() == link.getTarget()){
					state=true;
				}
			}
		}
		return state;
	}
}

