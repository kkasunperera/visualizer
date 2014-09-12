package org.karsha.visualizer;

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
}
