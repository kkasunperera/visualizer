<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Insert title here</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/sb-admin.css" rel="stylesheet">
<link href="css/plugins/morris.css" rel="stylesheet">
<link href="font-awesome-4.1.0/css/font-awesome.min.css"
	rel="stylesheet" type="text/css">
<link href="css/jquery-ui.css" rel="stylesheet">
<script src="js/jquery.1.9.1.min.js"></script>
<script src="js/bootstrap.min.js"></script>
<script src="js/function.js"></script>
<script src="js/overall.js"></script>
<script src="js/tracepaths.js"></script>
<script src="js/node.js"></script>
<script src="js/app.js"></script>
</head>
<body>
	<script>
	$(document).ready(function(){
		/* $.post("db",function(responce){
			//alert(responce);
		}); */
		$.ajax({
				  type: 'POST',
				  url: "db?source=1&target=3",
				  dataType: 'json',
				  success: function(data,status) {
					alert(data[0].p_value_2007);
				  },
				  error: function(data,error){alert(error);},
				  async: false

				}); 	
		
	});
	

	</script>
</body>
</html>