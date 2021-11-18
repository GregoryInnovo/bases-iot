<!DOCTYPE html>
<html>
    <head>
        <title>Proyecto Smart Park - variables</title>
    </head>
<body>
<?php
session_start();
    $us = $_SESSION["usuario"]; //se valida que se haya creado la variable de sesión
    if ($us == ""){
    header("Location:index.php"); //si la variable no se ha creado se redirige a index.php
}
?>
<h1>PROYECTO SMART PARK</h1>
<h2>Selecciona los datos de mayor demanda o de carros en circulación</h2>
<table border="2px">
    <tr>
        <th>VARIABLE</th>
        
        <th>DESCRIPCIÓN</th>
        <th>LINKS</th>
      
        
        <tr>
            <td>Mayor demanda</td>
            <td>Permite ver los datos de los parqueaderos con mayor demanda</td>
            <td>
                <a href="demanda.php">Mayor demanda</a>
            </td>
        </tr>
        <tr>
            <td>Circulación</td>
            <td>Permite ver los datos de los parqueaderos con mayor circulación</td>
            <td>
                <a href="circulacion.php">Mayor circulación</a>
            </td>
        </tr>
       
</table>

<a href="logout.php">Cerrar Sesion</a>

</body>
</html>