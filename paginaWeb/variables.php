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
<h2>Selecciona la variable que deseas analizar</h2>
<table border="2px">
    <tr>
        <th>VARIABLE</th>
        <th>DESCRIPCIÓN</th>
        <th>ENLACE</th></tr>

        <tr>
            <td>Parqueaderos</td>
            <td>Permite ver los parqueaderos que estan registrados en la base de datos</td>
            <td>
                <a href="parqueaderos.php">Ir a los parqueaderos</a>
            </td>
        </tr>
        <tr>
            <td>Data</td>
            <td>Permite ver los todos datos registrados de los parqueaderos</td>
            <td>
                <a href="data.php">Ir a ver los datos</a>
            </td>
        </tr>
        <tr>
            <td>Resultados del día</td>
            <td>Permite ver los resultados almacenados del día</td>
            <td>
                <a href="dayresultselection.php">Ir a ver los datos diarios</a>
            </td>
        </tr>
</table>

<a href="logout.php">Cerrar Sesion</a>

</body>
</html>