<%-- 
    Document   : include
    Created on : Aug 28, 2014, 8:49:18 AM
    Author     : Hunter
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="description" content="">
<meta name="author" content="">

<title>Visualizer - Karsha project</title>
<link href="css/bootstrap.min.css" rel="stylesheet">
<link href="css/sb-admin.css" rel="stylesheet">
<link href="css/plugins/morris.css" rel="stylesheet">
<link href="font-awesome-4.1.0/css/font-awesome.min.css"
    rel="stylesheet" type="text/css">

</head>

<body>
    <div id="wrapper">
        <nav class="navbar navbar-inverse navbar-fixed-top" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse"
                    data-target=".navbar-ex1-collapse">
                    <span class="sr-only">Toggle navigation</span> <span
                        class="icon-bar"></span> <span class="icon-bar"></span> <span
                        class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="template.html">Visualizer - Karsha
                    project</a>
            </div>
           <div class="collapse navbar-collapse navbar-ex1-collapse">
                <ul class="nav navbar-nav side-nav">
                    <li class="active"><a href="template.html"><i
                            class="fa fa-fw fa-dashboard"></i> Visualizer</a></li>
                    <li><a href="javascript:;" data-toggle="collapse"
                        data-target="#demo"><i class="fa fa-fw fa-arrows-v"></i>
                            GC-Analysis <i class="fa fa-fw fa-caret-down"></i></a>
                        
                        <ul id="demo" name="demo" class="collapse">
                            <% for(int i = 2004;i < 2014;i++) {%>
                            <li><a href="index.jsp?filename=data<%=i%>.json"><%=i%></a></li>                            
                            <%}%>
                        </ul></li>
                    <li><a href="Overall.html"><i
                            class="fa fa-fw fa-bar-chart-o"></i> Overall</a></li>
                    <li><a href="RowData.html"><i class="fa fa-fw fa-table"></i>
                            Row Data</a></li>
                    <li><a href="blank-page.html"><i class="fa fa-fw fa-file"></i>
                            More About</a></li>
                </ul>
           </div>
        </nav>
        
    </div>
    
    <div class="container-fluid">
                <div class="row">
                    <!-- include the graph.jsp page which has graph according to the year-->
                    <div class="col-md-12"><jsp:include page="graph.jsp"/></div>
                </div>
            </div>
    <!-- /#wrapper -->

    <!-- jQuery Version 1.11.0 -->
    <script src="js/jquery-1.11.0.js"></script>

    <!-- Bootstrap Core JavaScript -->
    <script src="js/bootstrap.min.js"></script>

    <!-- Morris Charts JavaScript -->
    <script src="js/plugins/morris/raphael.min.js"></script>
    <script src="js/plugins/morris/morris.min.js"></script>
    <script src="js/plugins/morris/morris-data.js"></script>

</body>

</html>
