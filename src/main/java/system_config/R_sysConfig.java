package system_config;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;

public class R_sysConfig {
	
	public Properties get_prog() {
		
		Properties prog = new Properties();
		try {
			InputStream path = getClass().getResourceAsStream("sys.configurations");		
			prog.load(path);
			
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return prog;
	}
	
	
}
