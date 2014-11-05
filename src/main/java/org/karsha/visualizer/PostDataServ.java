package org.karsha.visualizer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.Arrays;
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
import org.jgrapht.util.ArrayUnenforcedSet;

import com.google.gson.Gson;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;

import java.util.logging.*;

/**
 * Servlet implementation class PostDataServ
 */

public class PostDataServ extends HttpServlet {

	private static Logger logger = Logger.getLogger(PostDataServ.class
			.getName());

	private static final long serialVersionUID = 1L;

	public static Node[] nodeSet = null;
	public static Links[] linkSet = null;
	public static DirectedGraph<Node, DefaultEdge> g = null;
	List<Node> node;
	List<Links> linkCompleteTriad;
	List<Links> linkIncomplete;
	List<Links> linkChain;

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
		logger.info("servlet initiating.....");
	}

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doGet(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {
		doPost(request, response);
	}

	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse
	 *      response)
	 */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		logger.log(Level.SEVERE, "doPost  Data:{0},{1}", new Object[] {
				"request", "response" });

		// get the user path
		String userPath = request.getServletPath();

		/* Gson library have been used */
		Gson gson = new Gson();

		if (userPath.equals("/PostDataServ")) {

			logger.info("userPath is "+userPath);
			
			InputStream s=request.getInputStream();
			BufferedReader br=new BufferedReader(new InputStreamReader(s));
			
			String o="";
			o=br.readLine();
			//System.out.println(o);

			
			ObjectMapper mapper=new ObjectMapper();
			JsonNode root=mapper.readTree(o);
			JsonNode nodes=root.get("nodes");
			JsonNode linkObj=root.get("link");
			JsonNode links=linkObj.get("links");
			
			if (nodes != null && linkObj != null ) {
				nodeSet=mapper.readValue(nodes, Node[].class);
				linkSet=mapper.readValue(links, Links[].class);
				System.out.println("nodeset length "+nodeSet.length);
				System.out.println("linkset length "+linkSet.length);
				
				
				//System.out.println(linkSet[0].getQ3());
				
				//this is for send node set data with link set as json
				node=Arrays.asList(nodeSet);
				

				g = DirectedGraphDemoServ.createHrefGraph(nodeSet,linkSet);	
				//linkChain = DirectedGraphDemoServ.LongerChain(g, nodeSet);
				linkCompleteTriad=DirectedGraphDemoServ.CompleteTriad(g, nodeSet);
				linkIncomplete=DirectedGraphDemoServ.InCompleteTriad(g, nodeSet);
					
			}

		} else if (userPath.equals("/Indegree")) {
			logger.info("userPath is " + userPath);
			
			int quater = Integer.parseInt(request.getParameter("Quater"));
			
			DirectedGraph<Node,DefaultEdge> gg = DirectedGraphDemoServ.createHrefGraph(nodeSet, DirectedGraphDemoServ.link_filter(quater, linkSet));
			List<Links> link = DirectedGraphDemoServ.findHighInDegree(gg,
					nodeSet);

			response.setContentType("application/json");
			PrintWriter out = response.getWriter();

			JsonObject Obj = new JsonObject();

			JsonElement links = gson.toJsonTree(link);
			JsonElement nodes = gson.toJsonTree(node);
			Obj.add("links", links);
			Obj.add("nodes", nodes);

			out.println(Obj.toString());
			out.close();

		} else if (userPath.equals("/Outdegree")) {
			logger.info("userPath is " + userPath);
			
			int quater = Integer.parseInt(request.getParameter("Quater"));
			
			DirectedGraph<Node,DefaultEdge> gg = DirectedGraphDemoServ.createHrefGraph(nodeSet, DirectedGraphDemoServ.link_filter(quater, linkSet));
			
			List<Links> link = DirectedGraphDemoServ.findHighOutDegree(gg,
					nodeSet);

			response.setContentType("application/json");
			PrintWriter out = response.getWriter();

			JsonObject Obj = new JsonObject();

			JsonElement links = gson.toJsonTree(link);
			JsonElement nodes = gson.toJsonTree(node);
			Obj.add("links", links);
			Obj.add("nodes", nodes);

			out.println(Obj.toString());
			out.close();

		} else if (userPath.equals("/CompleteTriad")) {
			logger.info("userPath is " + userPath);

			int quater = Integer.parseInt(request.getParameter("Quater"));
			
			DirectedGraph<Node,DefaultEdge> gg = DirectedGraphDemoServ.createHrefGraph(nodeSet, DirectedGraphDemoServ.link_filter(quater, linkSet));
			
			
			linkCompleteTriad=DirectedGraphDemoServ.CompleteTriad(gg, nodeSet);
			
			response.setContentType("application/json");
			PrintWriter out = response.getWriter();

			JsonObject Obj = new JsonObject();

			JsonElement links = gson.toJsonTree(linkCompleteTriad);
			JsonElement nodes = gson.toJsonTree(node);

			Obj.add("links", links);
			Obj.add("nodes", nodes);

			out.println(Obj.toString());
			out.close();

		} else if (userPath.equals("/IncompleteTriad")) {
			logger.info("userPath is " + userPath);
			int quater = Integer.parseInt(request.getParameter("Quater"));
			DirectedGraph<Node,DefaultEdge> gg = DirectedGraphDemoServ.createHrefGraph(nodeSet, DirectedGraphDemoServ.link_filter(quater, linkSet));
			
			linkIncomplete=DirectedGraphDemoServ.InCompleteTriad(gg, nodeSet);
			response.setContentType("application/json");
			PrintWriter out = response.getWriter();

			JsonObject Obj = new JsonObject();

			JsonElement links = gson.toJsonTree(linkIncomplete);
			JsonElement nodes = gson.toJsonTree(node);

			Obj.add("links", links);
			Obj.add("nodes", nodes);

			out.println(Obj.toString());
			out.close();

		} else if (userPath.equals("/ImmediateCycles")) {
			logger.info("userPath is " + userPath);

			int quater = Integer.parseInt(request.getParameter("Quater"));
			DirectedGraph<Node,DefaultEdge> gg = DirectedGraphDemoServ.createHrefGraph(nodeSet, DirectedGraphDemoServ.link_filter(quater, linkSet));
			
			
			List<Links> link = DirectedGraphDemoServ.findImmidietCycles(gg,
					nodeSet);

			response.setContentType("application/json");
			PrintWriter out = response.getWriter();

			JsonObject Obj = new JsonObject();

			JsonElement links = gson.toJsonTree(link);
			JsonElement nodes = gson.toJsonTree(node);

			Obj.add("links", links);
			Obj.add("nodes", nodes);

			out.print(Obj.toString());
			out.close();

		} else if (userPath.equals("/cc")) {
			logger.info("userPath is " + userPath);
			PrintWriter out = response.getWriter();
			int quater = Integer.parseInt(request.getParameter("Quater"));
			DirectedGraph<Node,DefaultEdge> gg = DirectedGraphDemoServ.createHrefGraph(nodeSet, DirectedGraphDemoServ.link_filter(quater, linkSet));
			
			double cc_value = DirectedGraphDemoServ.clusteringCoefficient(gg,
					nodeSet, linkSet);
			JsonElement Clustering_C = gson.toJsonTree(cc_value);
			JsonObject obj = new JsonObject();
			obj.add("Clustering_C", Clustering_C);
			out.print(obj.toString());			
			out.close();

		}

	}

}
