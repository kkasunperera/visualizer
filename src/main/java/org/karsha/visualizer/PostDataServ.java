package org.karsha.visualizer;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
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
	/*
	 * doPost method contain set of servlet paths and invokes the method of DirectedGraphDemoServ class
	 * */
	protected void doPost(HttpServletRequest request,
			HttpServletResponse response) throws ServletException, IOException {

		logger.log(Level.SEVERE, "doPost  Data:{0},{1}", new Object[] {
				"request", "response" });

		/**
		 * userPath is Servlet path that to be invoked 
		 * for example, if  /indegre excecuted the relevant method would invoke 
		 * */
		String userPath = request.getServletPath();

		/* Gson library have been used */
		Gson gson = new Gson();
		
		/**
		 * PostDataServ is defined in web.xml file { all the user paths defined there }
		 * servlet get inputstream from the ajax and read the data using GSON library
		 * which separates the arryas and object from inputstrema data.In stream contain 
		 * NODE ARRAY and LINKS ARRY as JSON format. Jackson mapper identified the nodes list and 
		 * links list then put it into the nodeSet array and linkSet array which are used later
		 * operations. 
		 * Also here initiate the graph from DirectedGraphDemoServ.Count the Triads when iniitiating.
		 * 
		 * */
		if (userPath.equals("/PostDataServ")) {
			logger.info("userPath is " + userPath);

			InputStream s = request.getInputStream();
			BufferedReader br = new BufferedReader(new InputStreamReader(s));

			String o = "";
			o = br.readLine();
			// System.out.println(o);

			ObjectMapper mapper = new ObjectMapper();
			JsonNode root = mapper.readTree(o);
			JsonNode nodes = root.get("nodes");
			JsonNode linkObj = root.get("link");
			JsonNode links = linkObj.get("links");

			if (nodes != null && linkObj != null) {
				nodeSet = mapper.readValue(nodes, Node[].class);
				linkSet = mapper.readValue(links, Links[].class);
				System.out.println("nodeset length " + nodeSet.length);
				System.out.println("linkset length " + linkSet.length);

				// System.out.println(linkSet[0].getQ3());

				// this is for send node set data with link set as json
				node = Arrays.asList(nodeSet);

				g = DirectedGraphDemoServ.createHrefGraph(nodeSet, linkSet);
				// linkChain = DirectedGraphDemoServ.LongerChain(g, nodeSet);
				linkCompleteTriad = DirectedGraphDemoServ.CompleteTriad(g, nodeSet);
				linkIncomplete = DirectedGraphDemoServ.InCompleteTriad(g, nodeSet);
				//DirectedGraphDemoServ.TriadInChain(g, nodeSet);
				//DirectedGraphDemoServ.chainDepthTwo(g, nodeSet);
								
			}
			/**
			 * when Indegree executed it wil return the set of link array where it calculated from graph
			 * method findHighInDegree will be called according to quater or year, data also will be filtered
			 * then convet it to GSON element. and that object will put to output stream.
			 * the it will read from ajax in web pages.
			 * 
			 * */
		} else if (userPath.equals("/Indegree")) {
			logger.info("userPath is " + userPath);

			/* get quater id from url parameter*/
			int quater = Integer.parseInt(request.getParameter("Quater"));

			DirectedGraph<Node, DefaultEdge> gg = DirectedGraphDemoServ
					.createHrefGraph(nodeSet,
							DirectedGraphDemoServ.link_filter(quater, linkSet));
			List<Links> link = DirectedGraphDemoServ.findHighInDegree(gg,
					nodeSet);

			/*set the application content to json type of response object*/
			response.setContentType("application/json");
			
			/*get the writer object of response object for writing data as output stream*/
			PrintWriter out = response.getWriter();

			/*initiate GSON element for sharing data in a root*/
			JsonObject Obj = new JsonObject();

			/*two json element for node set and link set and add it to root element*/
			JsonElement links = gson.toJsonTree(link);
			JsonElement nodes = gson.toJsonTree(node);
			Obj.add("links", links);
			Obj.add("nodes", nodes);

			/*writer writes the data in to stream*/
			out.println(Obj.toString());
			out.close();
			
			/**
			 * when Outdegree executed it wil return the set of link array where it calculated from graph
			 * method findHighOutDegree will be called according to quater or year, data also will be filtered
			 * then convet it to GSON element. and that object will put to output stream.
			 * the it will read from ajax in web pages.
			 * 
			 * */
		} else if (userPath.equals("/Outdegree")) {
			logger.info("userPath is " + userPath);

			int quater = Integer.parseInt(request.getParameter("Quater"));

			DirectedGraph<Node, DefaultEdge> gg = DirectedGraphDemoServ
					.createHrefGraph(nodeSet,
							DirectedGraphDemoServ.link_filter(quater, linkSet));

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
			
			/**
			 * CompleteTriad executed the it will return set of links list object from calculated  which will
			 * filter according to the quater or year and put it into the output stream.
			 * Two GSON element will be seperated node set and links set.
			 * 
			 * */
		} else if (userPath.equals("/CompleteTriad")) {
			logger.info("userPath is " + userPath);

			int quater = Integer.parseInt(request.getParameter("Quater"));
			
			DirectedGraph<Node, DefaultEdge> gg = DirectedGraphDemoServ
					.createHrefGraph(nodeSet,
							DirectedGraphDemoServ.link_filter(quater, linkSet));
			
			//String year = request.getParameter("year");			
			//DirectedGraphDemoServ.writeCSV(g, nodeSet, year);

			linkCompleteTriad = DirectedGraphDemoServ
					.CompleteTriad(gg, nodeSet);

			response.setContentType("application/json");
			PrintWriter out = response.getWriter();

			JsonObject Obj = new JsonObject();

			JsonElement links = gson.toJsonTree(linkCompleteTriad);
			JsonElement nodes = gson.toJsonTree(node);

			Obj.add("links", links);
			Obj.add("nodes", nodes);

			out.println(Obj.toString());
			out.close();

			/**
			 * InCompleteTriad executed the it will return set of links list object from calculated  which will
			 * filter according to the quater or year and put it into the output stream.
			 * Two GSON element will be seperated node set and links set.it will be prited in output stream.
			 * 
			 * */
		} else if (userPath.equals("/IncompleteTriad")) {
			logger.info("userPath is " + userPath);
			int quater = Integer.parseInt(request.getParameter("Quater"));
			DirectedGraph<Node, DefaultEdge> gg = DirectedGraphDemoServ
					.createHrefGraph(nodeSet,
							DirectedGraphDemoServ.link_filter(quater, linkSet));

			linkIncomplete = DirectedGraphDemoServ.InCompleteTriad(gg, nodeSet);
			response.setContentType("application/json");
			PrintWriter out = response.getWriter();

			JsonObject Obj = new JsonObject();

			JsonElement links = gson.toJsonTree(linkIncomplete);
			JsonElement nodes = gson.toJsonTree(node);

			Obj.add("links", links);
			Obj.add("nodes", nodes);

			out.println(Obj.toString());
			out.close();
			
			/**
			 * this will return set of immediate cycles of graph. which calculated from DirectedGraph.
			 * node set and link set put two GSON element and put it to output stream.
			 * 
			 * */
		} else if (userPath.equals("/ImmediateCycles")) {
			logger.info("userPath is " + userPath);

			int quater = Integer.parseInt(request.getParameter("Quater"));
			DirectedGraph<Node, DefaultEdge> gg = DirectedGraphDemoServ
					.createHrefGraph(nodeSet,
							DirectedGraphDemoServ.link_filter(quater, linkSet));

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

			/**
			 * 
			 * This will return the cluster coeffient of the graph. according to given quarter it can be read from 
			 * ajax in web pages.*/
		} else if (userPath.equals("/cc")) {
			logger.info("userPath is " + userPath);
			PrintWriter out = response.getWriter();
			int quater = Integer.parseInt(request.getParameter("Quater"));
			DirectedGraph<Node, DefaultEdge> gg = DirectedGraphDemoServ
					.createHrefGraph(nodeSet,
							DirectedGraphDemoServ.link_filter(quater, linkSet));

			double cc_value = DirectedGraphDemoServ.clusteringCoefficient(gg,
					nodeSet, linkSet);
			JsonElement Clustering_C = gson.toJsonTree(cc_value);
			JsonObject obj = new JsonObject();
			obj.add("Clustering_C", Clustering_C);
			out.print(obj.toString());
			out.close();

			/**
			 * This will called set of chain already calculated of graph. links and nodes object is add to output stream
			 * using servlet reponse object.
			 * 
			 * */
		} else if (userPath.equals("/chain")) {
			logger.info("userPath is " + userPath);

			int quater = Integer.parseInt(request.getParameter("Quater"));

			Links[] link = DirectedGraphDemoServ.link_filter(quater, linkSet);

			PrintWriter out = response.getWriter();

			JsonObject Obj = new JsonObject();

			JsonElement links = gson.toJsonTree(link);
			JsonElement nodes = gson.toJsonTree(node);

			Obj.add("links", links);
			Obj.add("nodes", nodes);

			out.print(Obj.toString());
			out.close();

		} else if (userPath.equals("/chain")) {
			logger.info("userPath is " + userPath);
			PrintWriter out = response.getWriter();
			int quater = Integer.parseInt(request.getParameter("Quater"));
			Links[] link = DirectedGraphDemoServ.link_filter(quater, linkSet);

			JsonObject Obj = new JsonObject();

			JsonElement links = gson.toJsonTree(link);
			JsonElement nodes = gson.toJsonTree(node);

			Obj.add("links", links);
			Obj.add("nodes", nodes);

			out.print(Obj.toString());
			out.close();

			/**
			 * here contains the set of data values of triads and number of edges contains in the graph and cluster 
			 * coeffient of each year. and filtering all the data according to quater or year.
			 * 
			 * */
		} else if (userPath.equals("/count")) {
			logger.info("userPath is " + userPath);
			ArrayList<Integer> edges_count_arry = new ArrayList<Integer>();
			ArrayList<Integer> completed_traid_count_arry = new ArrayList<Integer>();
			ArrayList<Integer> incompleted_traid_count_arry = new ArrayList<Integer>();
			ArrayList<Double> cc_count_arry = new ArrayList<Double>();
			
			PrintWriter out = response.getWriter();
			
			
			
			for (int i = 0; i < 6; i++) {
				Links[] link = DirectedGraphDemoServ.link_filter(i, linkSet);
				edges_count_arry.add(link.length);
				
				DirectedGraph<Node, DefaultEdge> gg = DirectedGraphDemoServ
						.createHrefGraph(nodeSet,
								DirectedGraphDemoServ.link_filter(i, linkSet));
				
				completed_traid_count_arry.add(DirectedGraphDemoServ.CompleteTriad_count(gg, nodeSet));
				incompleted_traid_count_arry.add(DirectedGraphDemoServ.InCompleteTriad_count(gg, nodeSet));
				cc_count_arry.add(DirectedGraphDemoServ.clusteringCoefficient(gg,nodeSet, linkSet));
			}
			
			out.println("edges count : " +edges_count_arry);
			out.println("completed traid : " +completed_traid_count_arry);
			out.println("incompleted traid : " +incompleted_traid_count_arry);
			out.println("cc value : " +cc_count_arry);
			
			out.close();

		}

	}

}
