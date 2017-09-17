<%@ page language="java" import="java.util.*" pageEncoding="utf-8"%>
    <%
String path = request.getContextPath();
String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
        <!DOCTYPE html>
        <html>

        <head>
            <base href="<%=basePath%>">
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta name="renderer" content="webkit">
            <title>后台 - 登录</title>
            <meta name="keywords" content="后台">
            <link href="assets/img/favicon.ico" rel="shortcut icon" type="image/x-icon">
            <link href="assets/css/bootstrap.min14ed.css?v=3.3.6" rel="stylesheet">
            <link href="assets/css/font-awesome.min93e3.css?v=4.4.0" rel="stylesheet">
            <link href="assets/css/animate.min.css" rel="stylesheet">
            <link href="assets/css/style.min862f.css?v=4.1.0" rel="stylesheet">
            <link href="assets/css/login.min.css" rel="stylesheet">
            <!--[if lt IE 9]>
    <meta http-equiv="refresh" content="0;ie.html" />
    <![endif]-->
            <script>
                if (window.top !== window.self) {
                    window.top.location = window.location;
                }
            </script>
        </head>

        <body class="gray-bg signin">
            <div class="middle-box text-center loginscreen  animated fadeInDown">
                <div>
                    <h3>XXXX-后台管理系统</h3>
                    <form class="m-t" role="form" method="POST" id="login" action="index.html">
                        <div class="form-group">
                            <input class="form-control" placeholder="用户名" id="adminEmail" name="adminEmail" autofocus required="">
                        </div>
                        <div class="form-group">
                            <input type="password" class="form-control" placeholder="密码" id="adminPwd" name="adminPwd" type="password" required="">
                        </div>
                        <a class="btn btn-primary block full-width btn-login">登 录</a>
                    </form>
                </div>
            </div>
        </body>
        <script src="assets/scripts/sea.js"></script>
        <script>
            seajs.config({
                alias: {
                    "jquery": "../base/jquery.min",
                    "bootstrap": "../base/bootstrap.min",
                }
            });
        </script>
        <script>
            seajs.use("login");
        </script>

        </html>