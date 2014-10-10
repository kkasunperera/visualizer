package org.karsha.visualizer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
	
	private static final long serialVersionUID = 1L;
       
	public static Node[] nodeSet = null;
	public static Links[] linkSet = null;
	public static DirectedGraph<Node,DefaultEdge> g = null;
	List<Node> node;
	List<Links> linkCompleteTriad;
	List<Links> linkIncomplete;
	
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
		
		/*Gson library have been used*/
		Gson gson=new Gson();
		
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
				System.out.println("orignial data lengthis "+linkSet.length);
				
				//this is for send node set data with link set as json
				node=Arrays.asList(nodeSet);
				
				g = DirectedGraphDemoServ.createHrefGraph(nodeSet,linkSet);				
				linkCompleteTriad=DirectedGraphDemoServ.CompleteTriad(g, nodeSet);
				linkIncomplete=DirectedGraphDemoServ.InCompleteTriad(g, nodeSet);
					
			}
			
		}else if (userPath.equals("/Indegree")) {
			List<Links> link=DirectedGraphDemoServ.findHighInDegree(g, nodeSet);
			
			response.setContentType("application/json");
			PrintWriter out=response.getWriter();
			
			JsonObject Obj=new JsonObject();

			JsonElement links=gson.toJsonTree(link);
			JsonElement nodes=gson.toJsonTree(node);
			Obj.add("Links",links);
			Obj.add("nodes", nodes);
			
			out.println(Obj.toString());
			out.close();
			
		}else if(userPath.equals("/Outdegree")){
			List<Links> link=DirectedGraphDemoServ.findHighOutDegree(g, nodeSet);
			
			response.setContentType("application/json");
			PrintWriter out=response.getWriter();
			
			JsonObject Obj=new JsonObject();

			JsonElement links=gson.toJsonTree(link);
			JsonElement nodes=gson.toJsonTree(node);
			Obj.add("Links",links);
			Obj.add("nodes", nodes);
			
			out.println(Obj.toString());
			out.close();
			
<<<<<<< HEAD
		}else if(userPath.equals("/DataRetrieve")){

		}else if(userPath.equals("/CompleteTriad")){
				List<Links> link=DirectedGraphDemoServ.CompleteTriad(g, nodeSet);
				
=======
		}else if(userPath.equals("/CompleteTriad")){										

>>>>>>> upstream/master
				response.setContentType("application/json");
				PrintWriter out=response.getWriter();							
				
				JsonObject Obj=new JsonObject();
				
				JsonElement links=gson.toJsonTree(linkCompleteTriad);
				JsonElement nodes=gson.toJsonTree(node);
				
				Obj.add("Links",links);
				Obj.add("nodes", nodes);
				
				out.println(Obj.toString());
				out.close();
				
<<<<<<< HEAD
		}else if(userPath.equals("/IncompleteTriad")){
=======
		}else if(userPath.equals("/IncompleteTriad")){			
			
			response.setContentType("application/json");
			PrintWriter out=response.getWriter();
			
			JsonObject Obj=new JsonObject();
			
			JsonElement links=gson.toJsonTree(linkIncomplete);
			JsonElement nodes=gson.toJsonTree(node);
			
			Obj.add("Links",links);
			Obj.add("nodes", nodes);
			
			out.println(Obj.toString());
			out.close();
>>>>>>> upstream/master
			
		}else if(userPath.equals("/ImmediateCycles")){
			List<Links> link=DirectedGraphDemoServ.findImmidietCycles(g, nodeSet);
			
			response.setContentType("application/json");
			PrintWriter out=response.getWriter();
			
			JsonObject Obj=new JsonObject();
			
			JsonElement links=gson.toJsonTree(link);
			JsonElement nodes=gson.toJsonTree(node);
			
			Obj.add("Links", links);
			Obj.add("nodes", nodes);
			
			
			out.print(Obj.toString());
			out.close();

		}
			
	}

}
