package org.karsha.visualizer;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import javax.management.ImmutableDescriptor;
import javax.xml.crypto.NodeSetData;

import org.jgrapht.DirectedGraph;
import org.jgrapht.graph.DefaultDirectedGraph;
import org.jgrapht.graph.DefaultEdge;


public class DirectedGraphDemoServ {
	private static final Logger log=Logger.getLogger(DirectedGraphDemoServ.class.getName());
	
	public static int indegree_count ;
	public static int outdegree_count ;
	public static DirectedGraph<Node,DefaultEdge> createHrefGraph(Node[] nodes,Links[] links)
    {
		log.log(Level.SEVERE, "createHrefGraph()  Data:{0},{1}", new Object[]{"nodes[]","links[]"});
		
		DirectedGraph<Node, DefaultEdge> g = new DefaultDirectedGraph<Node, DefaultEdge>(DefaultEdge.class);

		for (int i = 0; i < nodes.length; i++) {
			g.addVertex(nodes[i]);
		}
        
		for (int i = 0; i < links.length; i++) {			
			g.addEdge(nodes[links[i].getSource()],nodes[links[i].getTarget()]);
		}
		
        return g;
    }
	
	/*find the highest in coming edges from node*/
	public static List<Links> findHighInDegree(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){		
		log.log(Level.SEVERE, "findHighInDegree()  Data:{0},{1}", new Object[]{"graph","nodes[]"});
		
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
		/*
		for (int i = 0; i < o.length; i++) {
			System.out.println(list.get(i).getSource() + " "+list.get(i).getTarget());
		}
        */
		indegree_count = list.size();
		return list;
		
	}
	
	/*find the highest out going edges from node*/
	public static List<Links> findHighOutDegree(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		log.log(Level.SEVERE, "findHighOutDegree()  Data:{0},{1}", new Object[]{"graph","nodes[]"});
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
		/*
		for (int i = 0; i < o.length; i++) {
			System.out.println(list.get(i).getSource() + " "+list.get(i).getTarget());
		}
        * 
        */
		outdegree_count = list.size();
		
		return list;	
	}	
	
	//input to be a array but for test two node 
	public static List<Links> findImmidietCycles(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		log.log(Level.SEVERE, "findImmidietCycles() A <--> B cycles  Data:{0},{1}", new Object[]{"graph","nodes[]"});

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
						//System.out.println(edge[j].toString()+graph.getEdge(graph.getEdgeTarget(edge[j]), graph.getEdgeSource(edge[j])));
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
		//System.out.println("imediate cycle ;"+listOfImEdges.size());
		return list;
		}
	
	/*find the completeTriad of the graph*/
	public static List<Links> CompleteTriad(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes){
		log.log(Level.SEVERE, "CompleteTriad() A -> B && B->C --> A -> C Triad Data:{0},{1}", new Object[]{"graph","nodes[]"});
		
		int NumberOfCompleteTriad=0;
		List<Links> list=new ArrayList<Links>();
		
		for (int k = 0; k < nodes.length; k++) {
			Set<DefaultEdge> set=graph.outgoingEdgesOf(nodes[k]);
			DefaultEdge[] edgeSet=set.toArray(new DefaultEdge[set.size()]);
			
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
							NumberOfCompleteTriad++;
							//displya to console
						//System.out.println(edgeSet[i]+" "+edgeSet[j]+" "+graph.getEdge(A, B).toString());
						//	System.out.println("------------------------------------------------------------------");
						}
						
					}
				}
			}			
		}
		//System.out.println("Number of CompletedTriad are "+NumberOfCompleteTriad);
		//System.out.println("Number of Edges contain in the List are "+list.size());
		
		return list;
	}
	
	/*find the IncompleteTriad of the graph*/
	public static List<Links> InCompleteTriad(DirectedGraph<Node, DefaultEdge> graph,Node[] nodes){	
		log.log(Level.SEVERE, "InCompleteTriad() A -> B && B->C --> A no C Triad Data:{0},{1}", new Object[]{"graph","nodes[]"});
		
		int NumberOfIncompleteTriad=0;
		
		List<Links> list=new ArrayList<Links>();
		
		for (int k = 0; k < nodes.length; k++) {			
			Node A=nodes[k];
			
			Set<DefaultEdge> set=graph.outgoingEdgesOf(A);
			DefaultEdge[] edgeSet=set.toArray(new DefaultEdge[set.size()]);
			
			if(edgeSet.length > 1){
				for (int i = 0; i < edgeSet.length; i++) {
					
					Node B=graph.getEdgeTarget(edgeSet[i]);
										
					Set<DefaultEdge> setOfB=graph.outgoingEdgesOf(B);
					DefaultEdge[] edgeSetOfB=setOfB.toArray(new DefaultEdge[setOfB.size()]);
					
					for (int j = 0; j < edgeSetOfB.length; j++) {
						
						Node C=graph.getEdgeTarget(edgeSetOfB[j]);				

						if(!graph.containsEdge(A, C)){
							Links linkA=new Links();
							Links linkB=new Links();	
							
							//link A-->B
							linkA.setSource(Arrays.asList(nodes).indexOf(A));
							linkA.setTarget(Arrays.asList(nodes).indexOf(B));											
							
							//link A-->c
							linkB.setSource(Arrays.asList(nodes).indexOf(B));
							linkB.setTarget(Arrays.asList(nodes).indexOf(C));
							
							//link B-->c
							//due to incomplete there is no b->c edges
							
							if(!isAdded(linkA, list)){
								list.add(linkA);
							}
							if(!isAdded(linkB, list)){
								list.add(linkB);
							}
							NumberOfIncompleteTriad++;
							//display to console
							//System.out.println(edgeSet[i]+ " " + edgeSetOfB[j] );
							//System.out.println("---------------------------------------------------------------");
						}
						
					}
				}
			}
			
			
		}
		
	//	System.out.println("Number of IncompleteTriad are "+NumberOfIncompleteTriad);
		//System.out.println("Number of Edges Containing in the list is "+list.size());
		
		return list;		
	}
	
	public static double clusteringCoefficient(DirectedGraph<Node,DefaultEdge> graph,Node[] nodes) {
		log.log(Level.SEVERE,"clusteringCoefficient() Data:{0},{1}", new Object[]{"graph","nodes[]"});
		
		List<Links> imediatCycl1=new ArrayList<Links>();
		List<Links> imediatCycl2=new ArrayList<Links>();
		imediatCycl1 = findImmidietCycles(graph, nodes);
		imediatCycl2 = findImmidietCycles(graph, nodes);
		
		
		//count open traingles
		List<Links> Temp1= imediatCycl1;
		List<Links> Temp2= imediatCycl2;
		
		ArrayList<Integer> node_count = new ArrayList<Integer>();
		ArrayList<Integer> node_count_noDups = new ArrayList<Integer>();
		
		
		int count_open_trangle = 0;
		int count_close_trangle = 0;
		for (int j = 0; j <Temp1.size(); j++) {
			for (int j2 = 0; j2 < Temp1.size(); j2++) {
				if (Temp1.get(j).source == Temp1.get(j2).source & j!=j2) {
					count_open_trangle++;
					node_count.add(j);
					node_count.add(j2);
					if (graph.containsEdge(nodes[Temp1.get(j).target],nodes[Temp1.get(j2).target]) && graph.containsEdge(nodes[Temp1.get(j2).target],nodes[Temp1.get(j).target])) {
						count_close_trangle++;
					}
					}
				}
			}
			
		double original_rslt = 3*count_close_trangle /(double)count_open_trangle;
		double rslt = Math.round(original_rslt*100000.0)/100000.0;
		return rslt;
		
		
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
