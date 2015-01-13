package org.karsha.visualizer;

import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.jgrapht.DirectedGraph;
import org.jgrapht.graph.DefaultDirectedGraph;
import org.jgrapht.graph.DefaultEdge;

public class DirectedGraphDemoServ {
	private static final Logger log = Logger
			.getLogger(DirectedGraphDemoServ.class.getName());

	public static int indegree_count;
	public static int outdegree_count;
	
	
	public static DirectedGraph<Node, DefaultEdge> createHrefGraph(
			Node[] nodes, Links[] links) {
		log.log(Level.SEVERE, "createHrefGraph()  Data:{0},{1}", new Object[] {
				"nodes[]", "links[]" });

		DirectedGraph<Node, DefaultEdge> g = new DefaultDirectedGraph<Node, DefaultEdge>(
				DefaultEdge.class);

		for (int i = 0; i < nodes.length; i++) {
			g.addVertex(nodes[i]);
		}

		for (int i = 0; i < links.length; i++) {
			g.addEdge(nodes[links[i].getSource()], nodes[links[i].getTarget()]);
		}

		return g;
	}

	/* find the highest in coming edges from node */
public static List<Links> findHighInDegree(
			DirectedGraph<Node, DefaultEdge> graph, Node[] nodes) {
		log.log(Level.SEVERE, "findHighInDegree()  Data:{0},{1}", new Object[] {
				"graph", "nodes[]" });

		int highInDegre = 0;
		Set<DefaultEdge> s = null;

		for (int i = 0; i < nodes.length; i++) {
			// find the degree
			int degree = graph.inDegreeOf(nodes[i]);
			if (degree > highInDegre) {
				highInDegre = degree;
				s = graph.incomingEdgesOf(nodes[i]);/* check incoming edges */
			}
		}

		// assign edges to default edges
		DefaultEdge[] o = s.toArray(new DefaultEdge[highInDegre]);

		// add to link to list
		List<Links> list = new ArrayList<Links>();

		for (int i = 0; i < o.length; i++) {
			Links link = new Links();
			link.setSource(Arrays.asList(nodes).indexOf(
					graph.getEdgeSource(o[i])));
			link.setTarget(Arrays.asList(nodes).indexOf(
					graph.getEdgeTarget(o[i])));
			list.add(link);

		}
		/*
		 * for (int i = 0; i < o.length; i++) {
		 * System.out.println(list.get(i).getSource() +
		 * " "+list.get(i).getTarget()); }
		 */
		indegree_count = list.size();
		return list;

	}

	/* find the highest out going edges from node */
public static List<Links> findHighOutDegree(
			DirectedGraph<Node, DefaultEdge> graph, Node[] nodes) {
		log.log(Level.SEVERE, "findHighOutDegree()  Data:{0},{1}",
				new Object[] { "graph", "nodes[]" });
		int highOutDegre = 0;
		Set<DefaultEdge> s = null;

		for (int i = 0; i < nodes.length; i++) {

			int degree = graph.outDegreeOf(nodes[i]);
			if (degree > highOutDegre) {
				highOutDegre = degree;
				s = graph.outgoingEdgesOf(nodes[i]);/* check outgoing degree */
			}
		}

		// add edges to default edge array
		DefaultEdge[] o = s.toArray(new DefaultEdge[highOutDegre]);
		// adding links to list
		List<Links> list = new ArrayList<Links>();

		for (int i = 0; i < o.length; i++) {
			Links link = new Links();
			link.setSource(Arrays.asList(nodes).indexOf(
					graph.getEdgeSource(o[i])));
			link.setTarget(Arrays.asList(nodes).indexOf(
					graph.getEdgeTarget(o[i])));
			list.add(link);
		}
		/*
		 * for (int i = 0; i < o.length; i++) {
		 * System.out.println(list.get(i).getSource() +
		 * " "+list.get(i).getTarget()); }
		 */
		outdegree_count = list.size();

		return list;
	}

	// input to be a array but for test two node
public static List<Links> findImmidietCycles(
			DirectedGraph<Node, DefaultEdge> graph, Node[] nodes) {
		log.log(Level.SEVERE,
				"findImmidietCycles() A <--> B cycles  Data:{0},{1}",
				new Object[] { "graph", "nodes[]" });

		// this list contains visited edges
		List<DefaultEdge> listOfImEdges = new ArrayList<DefaultEdge>();
		List<Links> list = new ArrayList<Links>();

		for (int i = 0; i < nodes.length; i++) {
			Set<DefaultEdge> edges = graph.outgoingEdgesOf(nodes[i]);
			DefaultEdge[] edge = edges.toArray(new DefaultEdge[edges.size()]);
			for (int j = 0; j < edge.length; j++) {

				if (listOfImEdges.contains(edge[j])) {
					// do nothing if already checked edge
				} else {
					if (graph.containsEdge(edge[j])
							&& graph.containsEdge(graph.getEdgeTarget(edge[j]),
									graph.getEdgeSource(edge[j]))) {
						// System.out.println(edge[j].toString()+graph.getEdge(graph.getEdgeTarget(edge[j]),
						// graph.getEdgeSource(edge[j])));
						listOfImEdges.add(graph.getEdge(
								graph.getEdgeTarget(edge[j]),
								graph.getEdgeSource(edge[j])));
						Links linkA = new Links();
						Links linkB = new Links();

						linkA.setSource(Arrays.asList(nodes).indexOf(
								graph.getEdgeSource(edge[j])));
						linkA.setTarget(Arrays.asList(nodes).indexOf(
								graph.getEdgeTarget(edge[j])));

						linkB.setSource(Arrays.asList(nodes).indexOf(
								graph.getEdgeTarget(edge[j])));
						linkB.setTarget(Arrays.asList(nodes).indexOf(
								graph.getEdgeSource(edge[j])));

						list.add(linkA);
						list.add(linkB);
					}
				}

			}
		}
		// System.out.println("imediate cycle ;"+listOfImEdges.size());
		return list;
	}
	
public static List<Links> CompleteTriad(DirectedGraph<Node, DefaultEdge> graph, Node[] nodes) {
		log.log(Level.SEVERE,"CompleteTriad() A -> B && B->C --> A -> C Triad Data:{0},{1}",new Object[] { "graph", "nodes[]" });

		int NumberOfCompleteTriad = 0;
		List<Links> list = new ArrayList<Links>();
			for (int k = 0; k < nodes.length; k++) {
				Node A=nodes[k];			

				Set<DefaultEdge> set = graph.outgoingEdgesOf(A);
				DefaultEdge[] edgeSet = set.toArray(new DefaultEdge[set.size()]);

				if (edgeSet.length > 0) {
					for (int i = 0; i < edgeSet.length; i++) {
						for (int j = 0; j < edgeSet.length; j++) {
							Links linkA = new Links();
							Links linkB = new Links();
							Links linkC = new Links();

							// System.out.println(edgeSet[i]+" "+edgeSet[j]);
							Node B = graph.getEdgeTarget(edgeSet[i]);
							Node C = graph.getEdgeTarget(edgeSet[j]);
							if(graph.containsEdge(edgeSet[i]) && graph.containsEdge(edgeSet[j]) && graph.containsEdge(B, C)){
								//System.out.println(A.toString() + "," + B.toString() + "," + C.toString());
								// link A-->B
								linkA.setSource(Arrays.asList(nodes).indexOf(A));
								linkA.setTarget(Arrays.asList(nodes).indexOf(B));

								// link A-->c
								linkB.setSource(Arrays.asList(nodes).indexOf(A));
								linkB.setTarget(Arrays.asList(nodes).indexOf(C));

								// link B-->c
								linkC.setSource(Arrays.asList(nodes).indexOf(B));
								linkC.setTarget(Arrays.asList(nodes).indexOf(C));
								
								if (!isAdded(linkA, list)) {
									list.add(linkA);
								}
								if (!isAdded(linkB, list)) {
									list.add(linkB);
								}
								if (!isAdded(linkC, list)) {
									list.add(linkC);
								}
								NumberOfCompleteTriad++;
							}
						}
					}
				}
			}
		System.out.println("Number of CompletedTriad are "+NumberOfCompleteTriad);
		//System.out.println("Number of Edges contain in the List are "+list.size());

		return list;
	}


public static int CompleteTriad_count(
		DirectedGraph<Node, DefaultEdge> graph, Node[] nodes) {
	log.log(Level.SEVERE,
			"CompleteTriad() A -> B && B->C --> A -> C Triad Data:{0},{1}",
			new Object[] { "graph", "nodes[]" });

	int NumberOfCompleteTriad = 0;
	List<Links> list = new ArrayList<Links>();

	for (int k = 0; k < nodes.length; k++) {
		Node A=nodes[k];
		Set<DefaultEdge> set = graph.outgoingEdgesOf(A);
		DefaultEdge[] edgeSet = set.toArray(new DefaultEdge[set.size()]);

		if (edgeSet.length > 1) {
			for (int i = 0; i < edgeSet.length; i++) {
				for (int j = 0; j < edgeSet.length; j++) {
					Links linkA = new Links();
					Links linkB = new Links();
					Links linkC = new Links();

					// System.out.println(edgeSet[i]+" "+edgeSet[j]);
					Node B = graph.getEdgeTarget(edgeSet[i]);
					Node C = graph.getEdgeTarget(edgeSet[j]);

					if (graph.containsEdge(edgeSet[i]) && graph.containsEdge(edgeSet[j]) && graph.containsEdge(B, C)) {
						
						// link A-->B
						linkA.setSource(Arrays.asList(nodes).indexOf(A));
						linkA.setTarget(Arrays.asList(nodes).indexOf(B));

						// link A-->c
						linkB.setSource(Arrays.asList(nodes).indexOf(A));
						linkB.setTarget(Arrays.asList(nodes).indexOf(C));

						// link B-->c
						linkC.setSource(Arrays.asList(nodes).indexOf(B));
						linkC.setTarget(Arrays.asList(nodes).indexOf(C));

						if (!isAdded(linkA, list)) {
							list.add(linkA);
						}
						if (!isAdded(linkB, list)) {
							list.add(linkB);
						}
						if (!isAdded(linkC, list)) {
							list.add(linkC);
						}
						NumberOfCompleteTriad++;
						// displya to console
						// System.out.println(edgeSet[i]+" "+edgeSet[j]+" "+graph.getEdge(A,
						// B).toString());
						// System.out.println("------------------------------------------------------------------");
					}

				}
			}
		}
	}
	System.out.println("Number of CompletedTriad are "+NumberOfCompleteTriad);
	System.out.println("Number of Edges contain in the List are "+list.size());

	return NumberOfCompleteTriad;
}

public static List<Links> InCompleteTriad(
			DirectedGraph<Node, DefaultEdge> graph, Node[] nodes) {
		log.log(Level.SEVERE,
				"InCompleteTriad() A -> B && B->C --> A no C Triad Data:{0},{1}",
				new Object[] { "graph", "nodes[]" });

		int NumberOfIncompleteTriad = 0;
		int linkscount = 0;

		List<Links> list = new ArrayList<Links>();

		for (int k = 0; k < nodes.length; k++) {
			Node A = nodes[k];
			
			/*incoming edges of node A*/
			Set<DefaultEdge> inSet=graph.incomingEdgesOf(A);
			DefaultEdge[] inEdgeSet=inSet.toArray(new DefaultEdge[inSet.size()]);
			
			for (int i = 0; i < inEdgeSet.length; i++) {
				Links link=new Links();				
				link.setSource(Arrays.asList(nodes).indexOf(graph.getEdgeSource(inEdgeSet[i])));
				link.setTarget(Arrays.asList(nodes).indexOf(graph.getEdgeTarget(inEdgeSet[i])));
				link.inedge=true;
				
				if (!isIncomingEdgeAdded(link, list)) {
					//this link cannot be already added link and only incoming edges true
					list.add(link);
				}			
			}
			Set<DefaultEdge> set = graph.outgoingEdgesOf(A);
			DefaultEdge[] edgeSet = set.toArray(new DefaultEdge[set.size()]);

				for (int i = 0; i < edgeSet.length; i++) {

					Node B = graph.getEdgeTarget(edgeSet[i]);

					Set<DefaultEdge> setOfB = graph.outgoingEdgesOf(B);
					DefaultEdge[] edgeSetOfB = setOfB.toArray(new DefaultEdge[setOfB.size()]);

					for (int j = 0; j < edgeSetOfB.length; j++) {

						Node C = graph.getEdgeTarget(edgeSetOfB[j]);

						/*if ((!graph.containsEdge(A, C) && !graph.containsEdge(C, A)) && (graph.containsEdge(A, B) && !graph.containsEdge(B, A)) && (graph.containsEdge(B, C) && !graph.containsEdge(C, B))) {*/
						if ((!graph.containsEdge(A, C) && !graph.containsEdge(C, A)) && graph.containsEdge(A, B) && graph.containsEdge(B, C)) {
							Links linkA = new Links();
							Links linkB = new Links();
							Links linkC = new Links();// for the incomplete edge :D 

							// link A-->B
							linkA.setSource(Arrays.asList(nodes).indexOf(A));
							linkA.setTarget(Arrays.asList(nodes).indexOf(B));
							linkA.status = false;
							
							// link A-->c
							linkB.setSource(Arrays.asList(nodes).indexOf(B));
							linkB.setTarget(Arrays.asList(nodes).indexOf(C));
							linkB.status = false;
							
							//link B -->c
							linkC.setSource(Arrays.asList(nodes).indexOf(A));
							linkC.setTarget(Arrays.asList(nodes).indexOf(C));
							linkC.status = true;

							System.out.println(graph.getEdge(A, B).toString() + graph.getEdge(B, C).toString());

							if (!isAdded(linkA, list)) {
								list.add(linkA);
								linkscount++;
							}
							if (!isAdded(linkB, list)) {
								list.add(linkB);
								linkscount++;
							}
							if(!isAdded(linkC, list)){
								list.add(linkC);
								linkscount++;
							}
							NumberOfIncompleteTriad++;							
						}

					}
				}
			//}

		}

		System.out.println("Number of IncompleteTriad are "+NumberOfIncompleteTriad);
		// System.out.println("Number of Edges Containing in the list is "+list.size());
			System.out.println("links"+linkscount);
		return list;
	}
	
public static int InCompleteTriad_count(
			DirectedGraph<Node, DefaultEdge> graph, Node[] nodes) {
		log.log(Level.SEVERE,
				"InCompleteTriad() A -> B && B->C --> A no C Triad Data:{0},{1}",
				new Object[] { "graph", "nodes[]" });

		int NumberOfIncompleteTriad = 0;
		int linkscount = 0;

		List<Links> list = new ArrayList<Links>();

		for (int k = 0; k < nodes.length; k++) {
			Node A = nodes[k];

			Set<DefaultEdge> set = graph.outgoingEdgesOf(A);
			DefaultEdge[] edgeSet = set.toArray(new DefaultEdge[set.size()]);

				for (int i = 0; i < edgeSet.length; i++) {

					Node B = graph.getEdgeTarget(edgeSet[i]);

					Set<DefaultEdge> setOfB = graph.outgoingEdgesOf(B);
					DefaultEdge[] edgeSetOfB = setOfB.toArray(new DefaultEdge[setOfB.size()]);

					for (int j = 0; j < edgeSetOfB.length; j++) {

						Node C = graph.getEdgeTarget(edgeSetOfB[j]);

						if ((!graph.containsEdge(A, C) && !graph.containsEdge(C, A)) && (graph.containsEdge(A, B) && !graph.containsEdge(B, A)) && (graph.containsEdge(B, C) && !graph.containsEdge(C, B))) {
							Links linkA = new Links();
							Links linkB = new Links();
							Links linkC = new Links();// for the incomplete edge :D 

							// link A-->B
							linkA.setSource(Arrays.asList(nodes).indexOf(A));
							linkA.setTarget(Arrays.asList(nodes).indexOf(B));
							linkA.status = false;
							
							// link A-->c
							linkB.setSource(Arrays.asList(nodes).indexOf(B));
							linkB.setTarget(Arrays.asList(nodes).indexOf(C));
							linkB.status = false;
							
							//link B -->c
							linkC.setSource(Arrays.asList(nodes).indexOf(A));
							linkC.setTarget(Arrays.asList(nodes).indexOf(C));
							linkC.status = true;

							//System.out.println(A.toString()+ " " + B.toString()+ " " + C.toString());

							if (!isAdded(linkA, list)) {
								list.add(linkA);
								linkscount++;
							}
							if (!isAdded(linkB, list)) {
								list.add(linkB);
								linkscount++;
							}
							if(!isAdded(linkC, list)){
								list.add(linkC);
								linkscount++;
							}
							NumberOfIncompleteTriad++;
							
						}

					}
				}
			//}

		}

		// System.out.println("Number of IncompleteTriad are "+NumberOfIncompleteTriad);
		// System.out.println("Number of Edges Containing in the list is "+list.size());
		//System.out.println("links"+linkscount);
		return NumberOfIncompleteTriad;
	}

public static double clusteringCoefficient(
			DirectedGraph<Node, DefaultEdge> graph, Node[] nodes, Links[] links) {
		log.log(Level.SEVERE, "clusteringCoefficient() Data:{0},{1}",
				new Object[] { "graph", "nodes[]" });

		
		

		
		int count_open_trangle = 0;
		int count_close_trangle = 0;
		/*
		 * bi directional cc calculation => for directed graph 
		 * List<Links> imediatCycl1 = new ArrayList<Links>();
			imediatCycl1 = findImmidietCycles(graph, nodes);		
			List<Links> Temp1 = imediatCycl1;
		 * for (int j = 0; j<Temp1.size(); j++) {
		 * 	 for (int j2 = 0; j2 < Temp1.size(); j2++) {
		 * 		 if(Temp1.get(j).source == Temp1.get(j2).source & j!=j2) {
		 * 			count_open_trangle++;
		 * 		    node_count.add(j);
		 * 			node_count.add(j2);
		 *  	 if(graph.containsEdge(nodes[Temp1.get(j).target],nodes[Temp1.get(j2).target])&& graph.containsEdge(nodes[Temp1.get(j2).target],nodes[Temp1.get(j).target
		 * ])) { count_close_trangle++; } } } }
		 */

		// ignore the direction and calculating cc value.
		for (int j = 0; j < links.length; j++) {
			for (int j2 = 0; j2 < links.length; j2++) {
				if (links[j].source == links[j2].source) {
					count_open_trangle++;
					if (graph.containsEdge(nodes[links[j].target],
							nodes[links[j2].target])) {
						count_close_trangle++;
					}
				}
			}
		}

		count_close_trangle = count_close_trangle / 3;

		double original_rslt = 3 * count_close_trangle / (double) (count_open_trangle);
		// double[] rslt =
		// {Math.round(original_rslt*100000.0)/100000.0,count_open_trangle/3,count_close_trangle};
		double rslt = Math.round(original_rslt * 1000000.0) / 1000000.0;
		return rslt;

	}

private static boolean isAdded(Links link, List<Links> list) {

		boolean state = false;

		if (list.size() > 0) {
			for (int i = 0; i < list.size(); i++) {
				if (list.get(i).getSource() == link.getSource()
						&& list.get(i).getTarget() == link.getTarget()) {
					state = true;
				}
			}
		}
		return state;
	}
	
private static boolean isIncomingEdgeAdded(Links link,List<Links> list){
		boolean state= false;
		if(list.size() > 0){
			for (int i = 0; i < list.size(); i++) {
				if(list.get(i).getSource() == link.getSource() && list.get(i).getTarget() == link.getTarget() && link.inedge == true){
					state=true;
				}
			}
		}
		return state;
	}

public static List<Links> LongerChain(DirectedGraph<Node, DefaultEdge> graph, Node[] nodes){
		System.out.println("method is gointo start......");
		
		List<Links> list=new ArrayList<Links>();
		Node A=nodes[1];
		Set<DefaultEdge> setA=graph.outgoingEdgesOf(A);
		DefaultEdge[] edgeSetA=setA.toArray(new DefaultEdge[setA.size()]);
		
		for (int i = 0; i < setA.size(); i++) {
			Node B=graph.getEdgeTarget(edgeSetA[i]);
				if(graph.containsEdge(A, B)){
					
					Set<DefaultEdge> setB=graph.outgoingEdgesOf(B);
					DefaultEdge[] edgeSetB=setB.toArray(new DefaultEdge[setB.size()]);
					
					for (int j = 0; j < edgeSetB.length; j++) {
						Node C=graph.getEdgeTarget(edgeSetB[j]);
						
						if(graph.containsEdge(B, C)){
							Set<DefaultEdge> setC=graph.outgoingEdgesOf(C);
							DefaultEdge[] edgeSetC=setC.toArray(new DefaultEdge[setC.size()]);
							
							for (int k = 0; k < edgeSetC.length; k++) {
								Node D=graph.getEdgeTarget(edgeSetC[k]);
									if(graph.containsEdge(C,D)){
										Links AB=new Links();
										AB.setSource(Arrays.asList(nodes).indexOf(A));
										AB.setTarget(Arrays.asList(nodes).indexOf(B));
										
										Links BC=new Links();
										BC.setSource(Arrays.asList(nodes).indexOf(B));
										BC.setTarget(Arrays.asList(nodes).indexOf(C));
										
										Links CD=new Links();
										CD.setSource(Arrays.asList(nodes).indexOf(C));
										CD.setTarget(Arrays.asList(nodes).indexOf(D));
										
										list.add(AB);
										list.add(BC);
										list.add(CD);
										
										//System.out.println("A-> "+A.toString()+" B-> "+B.toString()+" C-> "+C.toString()+" D-> "+D.toString());
									}
							}
						}
					}
				}
		}
		System.out.println("end");
		return list;
	}
	
public static Links[] link_filter(int quater , Links[] linkset) {
		ArrayList<Links> temp = new ArrayList<Links>();
		switch (quater) {
		case 0:
			for (int j = linkset.length-1; j >= 0; j--) {
				temp.add(linkset[j]);
			}
	    	
			break;
		case 1:
			for (int j = linkset.length-1; j >= 0; j--) {
				if(linkset[j].Q1.equals("1"))temp.add(linkset[j]);
			}
	    	
			break;
		case 2:
			for (int j = linkset.length-1; j >= 0; j--) {
				if(linkset[j].Q2.equals("1"))temp.add(linkset[j]);
			}
	    	
			break;
		case 3:
			for (int j = linkset.length-1; j >= 0; j--) {
				if(linkset[j].Q3.equals("1"))temp.add(linkset[j]);
			}
	    	
			break;
		case 4:
			for (int j = linkset.length-1; j >= 0; j--) {
				if(linkset[j].Q4.equals("1"))temp.add(linkset[j]);
			}
	    	
			break;
		default:
			break;
		}
		return temp.toArray(new Links[temp.size()]);
	}

public static void writeCSV(DirectedGraph<Node, DefaultEdge> graph, Node[] nodes, String year) throws IOException{
	
	//write path
	File file=new File("C://Users/lsf-admin/Desktop/data.csv");
	BufferedWriter writer=new BufferedWriter(new FileWriter(file));
		

	for (int k = 0; k < nodes.length; k++) {
		Node A=nodes[k];
		Set<DefaultEdge> set = graph.outgoingEdgesOf(A);
		DefaultEdge[] edgeSet = set.toArray(new DefaultEdge[set.size()]);

		if (edgeSet.length > 1) {
			for (int i = 0; i < edgeSet.length; i++) {
				for (int j = 0; j < edgeSet.length; j++) {
				
					// System.out.println(edgeSet[i]+" "+edgeSet[j]);
					Node B = graph.getEdgeTarget(edgeSet[i]);
					Node C = graph.getEdgeTarget(edgeSet[j]);

					if ((graph.containsEdge(B, C) && !graph.containsEdge(C, B)) && (graph.containsEdge(A, B) && !graph.containsEdge(B, A)) && (graph.containsEdge(A, C) && !graph.containsEdge(C, A))) {
						
						System.out.println(A.toString()+ " " + B.toString() + " " + C.toString());
						writer.write("\""+A.toString()+ " " + B.toString() + " " + C.toString()+"\""+","+ year +"\n");
					}

				}
			}
		}
	}	
	
	writer.close();

	}

public static void chainStat(DirectedGraph<Node, DefaultEdge> graph, Node[] nodes) throws IOException{

	int chainCout = 0;
	File file=new File("C://Users/lsf-admin/Desktop/data.csv");
	BufferedWriter writer=new BufferedWriter(new FileWriter(file));
	
	for (int i = 0; i < nodes.length; i++) {
		Node A = nodes[i];
		Set<DefaultEdge> setA=graph.outgoingEdgesOf(A);
		DefaultEdge[] edgeSetA = setA.toArray(new DefaultEdge[setA.size()]);
		
	/*check where node a has outgoing edges or not*/
		if(edgeSetA.length > 0){
			for (int j = 0; j < edgeSetA.length; j++) {
				Node B = graph.getEdgeTarget(edgeSetA[j]);
				Set<DefaultEdge> setB = graph.outgoingEdgesOf(B);
				DefaultEdge[] edgeSetB = setB.toArray(new DefaultEdge[setB.size()]);
				
			/*check whether node b has outgoing edges or not and should not contain B to A edge*/
				if(edgeSetB.length > 0){
					for (int k = 0; k < edgeSetB.length; k++) {
						Node C = graph.getEdgeTarget(edgeSetB[k]);
						//if(C != A){
						if(!C.equals(A)){
							Set<DefaultEdge> setC = graph.outgoingEdgesOf(C);
							DefaultEdge[] edgeSetC = setC.toArray(new DefaultEdge[setC.size()]);
							
						/*check whether node c has outgoin edegs or not*/
							if(edgeSetC.length > 0){
								for (int l = 0; l < edgeSetC.length; l++) {
									Node D = graph.getEdgeTarget(edgeSetC[l]);
									//if(D != A && D != B){
									if(!D.equals(A) && !D.equals(B)){
										//System.out.println(A + "->" + B + "->" + C + "->" + D);
										//System.out.println(A.toString() + "," + B.toString() + "," + C.toString() + "," + D.toString());
										writer.write(A.toString() + "," + B.toString() + "," + C.toString() + "," + D.toString()+"\n");
										chainCout++;
									}
								}
							}
						}
					}
				}
			}
		}
	}
	writer.close();
	//System.out.println("chain count is "+chainCout);
}

public static void TriadInChain(DirectedGraph<Node, DefaultEdge> graph, Node[] nodes) throws IOException{

	int chainCout = 0;
	int triadCmpCount = 0;
	int triadInCmpCount = 0;
	
	File file=new File("C://Users/lsf-admin/Desktop/data1.csv");
	BufferedWriter writer=new BufferedWriter(new FileWriter(file));
	
	File file1=new File("C://Users/lsf-admin/Desktop/data.csv");
	BufferedWriter writer1=new BufferedWriter(new FileWriter(file1));
	
	for (int i = 0; i < nodes.length; i++) {
		Node A = nodes[i];
		Set<DefaultEdge> setA=graph.outgoingEdgesOf(A);
		DefaultEdge[] edgeSetA = setA.toArray(new DefaultEdge[setA.size()]);
		
	/*check where node a has outgoing edges or not*/
		if(edgeSetA.length > 0){
			for (int j = 0; j < edgeSetA.length; j++) {
				Node B = graph.getEdgeTarget(edgeSetA[j]);
				Set<DefaultEdge> setB = graph.outgoingEdgesOf(B);
				DefaultEdge[] edgeSetB = setB.toArray(new DefaultEdge[setB.size()]);
				
			/*check whether node b has outgoing edges or not and should not contain B to A edge*/
				if(edgeSetB.length > 0){
					for (int k = 0; k < edgeSetB.length; k++) {
						Node C = graph.getEdgeTarget(edgeSetB[k]);
						//if(C != A){
						if(!C.equals(A)){
							Set<DefaultEdge> setC = graph.outgoingEdgesOf(C);
							DefaultEdge[] edgeSetC = setC.toArray(new DefaultEdge[setC.size()]);
							
						/*check whether node c has outgoing edegs or not*/
							if(edgeSetC.length > 0){
								for (int l = 0; l < edgeSetC.length; l++) {
									Node D = graph.getEdgeTarget(edgeSetC[l]);
									//if(D != A && D != B){
									if(!D.equals(A) && !D.equals(B)){
										chainCout++;
										//System.out.println(A + "->" + B + "->" + C + "->" + D);
										//System.out.println(A.toString() + "," + B.toString() + "," + C.toString() + "," + D.toString());
										/*writer.write(A.toString() + "," + B.toString() + "," + C.toString() + "," + D.toString()+"\n");*/
										
										/*counting triad in each chain*/
										/*complete triads*/
										if(graph.containsEdge(A, C) && graph.containsEdge(B, D)){
											//triadCmpCount = triadCmpCount + 2;
											//writer.write(A.toString()+","+B.toString()+","+C.toString()+"\n");
											//writer.write(B.toString()+","+C.toString()+","+D.toString()+"\n");
											//System.out.println(A.toString()+","+B.toString()+","+C.toString());
											//System.out.println(B.toString()+","+C.toString()+","+D.toString());
											//System.out.println(graph.getEdge(B, C).toString()+graph.getEdge(C, D)+graph.getEdge(B, D));
										}
										
										/*in complete triad count*/
										if(!graph.containsEdge(A, C) && !graph.containsEdge(C, A) && !graph.containsEdge(B, D) &&  !graph.containsEdge(D, B)){
											 //writer1.write(graph.getEdge(A, B).toString()+graph.getEdge(B, C)+"\n");
											 //writer1.write(graph.getEdge(B, C).toString()+graph.getEdge(C, D)+"\n");
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	//writer.write(triadCmpCount+","+triadInCmpCount);
	writer.close();
	writer1.close();
	//System.out.println("Cmp "+ triadCmpCount);
	//System.out.println("Incmp"+triadInCmpCount);
	//System.out.println("chain count is "+chainCout);	
}

}

