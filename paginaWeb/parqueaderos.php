<!DOCTYPE html>
<html>
    <head>
        <title>Proyecto SmartPark - Parqueaderos</title>
    </head>
    <body>
    <?php
        session_start();
        $us = $_SESSION["usuario"];
            if ($us == ""){
                header("Location:index.php");
            }
    ?>
        <h1>PROYECTO FIOT</h1>
        <h2>Datos de parqueaderos</h2>
        <table border="2px">
        <tr>
            <th>ID</th>
            <th>NOMBRE</th>
            <th>UBICACIÓN</th>
            <th>CANTIDAD</th>
            <th>TIPO</th>
        </tr>
            <?php

                $url_rest="localhost:3000/parqueaderos"; //se define la url del servidor

                $curl=curl_init($url_rest); //se da inicio al curl y se fijanlas opciones
                curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
                $respuesta = curl_exec($curl); //se ejecuta curl
                if ($respuesta === false){
                    curl_close();
                    die ("Error");
                }
                curl_close($curl);
                $resp = json_decode($respuesta);//se convierte el json en un arreglo
                $tam = count($resp);


                for ($i=0; $i<$tam; $i++){
                    $j = $resp[$i];
                    $id = $j -> id; //se obtiene cada dato del json
                    $name = $j -> nombre;
                    $ubi = $j -> ubicacion;
                    $amount = $j -> cantidad;
                    $type = $j -> tipo;
                    echo "<tr><td>$id</td><td>$name</td><td>$ubi</td><td>$amount</td><td>$type</td></tr>";
                }
            ?>
    </table>
    <a href="variables.php">Volver</a><br>
    <a href="logout.php">Cerrar Sesion</a>
    </body>
</html>