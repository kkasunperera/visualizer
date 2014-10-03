package org.karsha.visualizer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.List;

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

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;



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
			
			InputStream s=request.getInputStream();
			BufferedReader br=new BufferedReader(new InputStreamReader(s));
			
			String o="";
			o=br.readLine();
			
			
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
			System.out.println("data retrive methos is invoke....");
			
			response.setContentType("application/json");
			PrintWriter out=response.getWriter();
			
			/*Gson library have been used*/
			Gson gson=new Gson();
			JsonObject Obj=new JsonObject();
			
			List<Links> link=new ArrayList<Links>();
			List<Node> node=new ArrayList<Node>();
			
			Links l1=new Links();
			l1.setSource("1");
			l1.setTarget("0");
			link.add(l1);
			
			Links l2=new Links();
			l2.setSource("2");
			l2.setTarget("1");
			link.add(l2);
			
			Links l3=new Links();
			l3.setSource("0");
			l3.setTarget("2");
			link.add(l3);
			
			Node n1=new Node();
			n1.setGroup("1");
			n1.setName("Util");
			n1.setNodeId("22");
			node.add(n1);
			
			Node n2=new Node();
			n2.setGroup("1");
			n2.setName("ManEdible");
			n2.setNodeId("31");
			node.add(n2);
			
			Node n3=new Node();
			n3.setGroup("2");
			n3.setName("WholTr");
			n3.setNodeId("42");
			node.add(n3);
			
			
			JsonElement links=gson.toJsonTree(link);
			JsonElement nodes=gson.toJsonTree(node);
			Obj.add("Links",links);
			Obj.add("nodes", nodes);
			
			out.println(Obj.toString());
			out.close();
		}
			
		}

}
