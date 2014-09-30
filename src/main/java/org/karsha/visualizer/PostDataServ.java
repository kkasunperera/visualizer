package org.karsha.visualizer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.map.ObjectMapper;
import org.jgrapht.DirectedGraph;
import org.jgrapht.graph.DefaultEdge;



/**
 * Servlet implementation class PostDataServ
 */

public class PostDataServ extends HttpServlet {
	static Logger logger = Logger.getLogger(PostDataServ.class);
	private static final long serialVersionUID = 1L;
       
	public static Node[] nodeSet = null;
	public static Links[] linkSet = null;
	public static DirectedGraph<Node,DefaultEdge> g = null;
	
    /**
     * @see HttpServlet#HttpServlet()
     */
    public PostDataServ() {
        super();
        
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
		
		System.out.println("methos is gointo start.....");
		String userPath=request.getServletPath();
		
		
		
		if (userPath.equals("/PostDataServ")) {
			System.out.println("post dat");
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
			
			if (nodes != null && linkObj != null ) {
				nodeSet=mapper.readValue(nodes, Node[].class);
				linkSet=mapper.readValue(links, Links[].class);
				//System.out.println(nodeSet.length+" "+linkSet.length);
				
				g = DirectedGraphDemoServ.createHrefGraph(nodeSet,linkSet);				
				//System.out.println(g.toString());
				//DirectedGraphDemoServ.findImmidietCycles(g, nodeSet);
				//DirectedGraphDemoServ.CompleteTriad(g, nodeSet);
			}
			
		}else if (userPath.equals("/Indegree")) {
			DirectedGraphDemoServ.findHighInDegree(g, nodeSet);
			
		}else if(userPath.equals("/Outdegree")){
			DirectedGraphDemoServ.findHighOutDegree(g, nodeSet);
			
		}else if(userPath.equals("/DataRetrieve")){
			
		}
		
		/*long startTime = System.nanoTime();
		String userPath=request.getServletPath();
		
		InputStream s=request.getInputStream();
		BufferedReader br=new BufferedReader(new InputStreamReader(s));
		
		String o="";
		o=br.readLine();
		
		ObjectMapper mapper=new ObjectMapper();
		JsonNode root=mapper.readTree(o);
		JsonNode nodes=root.get("nodes");
		JsonNode linkObj=root.get("link");
		JsonNode links=linkObj.get("links");
		
		if(nodes != null && linkObj != null ){
			Node[] nodeSet=mapper.readValue(nodes, Node[].class);
			Links[] linkSet=mapper.readValue(links, Links[].class);
			
			
			//initiate the graph
			DirectedGraph<Node,DefaultEdge> g = DirectedGraphDemoServ.createHrefGraph(nodeSet,linkSet);
						
	        long endTime = System.nanoTime();	        
	        System.out.println("Took "+(endTime - startTime) + " ns"); 
		}else{
			System.out.println("nodes is null");
		}
*/		
		}

}
