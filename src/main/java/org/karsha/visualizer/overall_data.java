package org.karsha.visualizer;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.nio.channels.ScatteringByteChannel;
import java.util.Scanner;

import com.google.gson.Gson;

public class overall_data {
	
	ClassLoader clsLod = getClass().getClassLoader(); 
	Gson gson = new Gson();
	
	
	File file = new File(clsLod.getResource("json/data2005").getFile());
	

	
	//BufferedReader bf = new BufferedReader(new FileReader());
}
