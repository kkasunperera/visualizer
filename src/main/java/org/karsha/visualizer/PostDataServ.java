package org.karsha.visualizer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.jgrapht.DirectedGraph;
import org.jgrapht.alg.cycle.JohnsonSimpleCycles;
import org.jgrapht.graph.DefaultEdge;



/**
 * Servlet implementation class PostDataServ
 */
@WebServlet("/PostDataServ")
public class PostDataServ extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PostDataServ() {
        super();
        // TODO Auto-generated constructor stub
    }

	/**
	 * @see Servlet#init(ServletConfig)
	 */
	public void init(ServletConfig config) throws ServletException {
		System.out.println("servlet going to initiate....");
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doPost(request,response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		long startTime = System.nanoTime();
		InputStream s=request.getInputStream();
		BufferedReader br=new BufferedReader(new InputStreamReader(s));
		
		String o="";
		o=br.readLine();
		System.out.println(o);
		
		ObjectMapper mapper=new ObjectMapper();
		JsonNode root=mapper.readTree(o);
		JsonNode nodes=root.get("nodes");
		JsonNode linkObj=root.get("link");
		JsonNode links=linkObj.get("links");
		
		if(nodes != null && linkObj != null ){
			Node[] nodeSet=mapper.readValue(nodes, Node[].class);
			Links[] linkSet=mapper.readValue(links, Links[].class);
			System.out.println("node length is "+nodeSet.length);	
			System.out.println("links length is "+linkSet.length);
			
			//initiate the graph
			DirectedGraph<Node,DefaultEdge> g = DirectedGraphDemoServ.createHrefGraph(nodeSet,linkSet);
			
			//print the graph 
	        System.out.println("the graph is "+g.toString());
	        
	        //finding simple cycles
	        JohnsonSimpleCycles<Node, DefaultEdge> gcycle=new JohnsonSimpleCycles<Node, DefaultEdge>(g);  
	        System.out.println("sub graph is "+ gcycle.findSimpleCycles().toString());
	        
	        //get element 
	       /* List<List<Node>> list=gcycle.findSimpleCycles();
	        System.out.println(list.size());*/
	        
	        /*for (int i = 0; i < list.get(0).size(); i++) {
				System.out.println(list.get(0).get(i).getGroup());
				System.out.println(list.get(0).get(i).getNodeId());
				System.out.println(list.get(0).get(i).getName());
			}
	        */
	        System.out.println("all the cycles detected ");
	        
	      //code
	        long endTime = System.nanoTime();
	        
	      System.out.println("Took "+(endTime - startTime) + " ns"); 
		}else{
			System.out.println("nodes is null");
		}
		
		}

}
