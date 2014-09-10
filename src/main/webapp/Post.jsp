<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>sample page</title>
<script src="js/jquery.1.9.1.min.js"></script>
</head>
<body>
	<h3>hello world!!!</h3>
	<button id="message">send to serve</button>
	<script>
	
	var obj=[{"source":"gihan","target":"nimal"},{"source":"srinath","target":"mohan"}];
	
		$('#message').click(function(){
			//alert('clicke');
			$.post("/visualizer/PostDataServ",JSON.stringify(obj));
		});
	</script>
</body>
</html>