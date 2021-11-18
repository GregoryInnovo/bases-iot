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
        <h2>Datos de la cantidad de carros en circulacion por zonas</h2>
        <table border="2px">
        <tr>
            <th>ID_PARQUEDO</th>
            <th>FECHA</th>
            <th>ZONA</th>
            <th>VALORES DE LOS CARROS EN CIRCULACIÓN X SLOT</th>
        </tr>
            <?php

                $url_rest="localhost:3000/dayresult/circulacion"; //se define la url del servidor

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
                    $parqk = $j -> fkPark;
                    $date = $j -> fecha;
                    $zone = $j -> zona;
                    $values = $j -> valores;
                    echo "<tr><td>$parqk</td><td>$date</td><td>$zone</td><td>$values</td></tr>";
                }
            ?>
    </table>
    <a href="dayresultselection.php">Volver</a><br>
    <a href="logout.php">Cerrar Sesion</a>
    </body>
</html>