package org.karsha.visualizer;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.map.ObjectMapper;


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
		// TODO Auto-generated method stub
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
		System.out.println("starting......");
		InputStream s=request.getInputStream();
		BufferedReader br=new BufferedReader(new InputStreamReader(s));
		
		String o="";
		System.out.println(o=br.readLine());
		
		/*while(br != null){
			o=br.readLine();
		}*/
		
		ObjectMapper mapper=new ObjectMapper();
		Node[] myObjects = mapper.readValue(o, Node[].class);
		
		System.out.println(myObjects[0].getSource()+" "+myObjects[0].getTarget());
		System.out.println(myObjects[1].getSource()+" "+myObjects[1].getTarget());
	}

}
