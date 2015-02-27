package org.karsha.visualizer;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;

public class overall_dataUpdate {
	
	public static void write_it(String path, String header, ArrayList<?> arr) {
		
		try {
			BufferedWriter wr = new BufferedWriter(new FileWriter(path));
			String lin = header+"\n";
			for (int i = 0; i < 8; i++) {
				lin = lin + "Year-"+(2005+i);
				for (int j = 0; j < 5; j++) {
					lin = lin +","+ arr.get(i*5+j);
				}
				lin = lin +"\n";
				
			}
			wr.write(lin);
			wr.close();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}
}
