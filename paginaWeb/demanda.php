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
        <h2>Datos de las zonas con mayor demanda</h2>
        <table border="2px">
        <tr>
            
            <th>ID_PARQUEDO</th>
            <th>FECHA</th>
            <th>PORCENTAJE_DE_OCUPACIÓN</th>
            <th>ZONA</th>
        </tr>
            <?php

                $url_rest="localhost:3000/dayresult/demanda"; //se define la url del servidor

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
                    $percen = $j -> PorcentajeOcu;
                    $zone = $j -> zona;
                   
                    echo "<tr><td>$parqk</td><td>$date</td><td>$percen</td><td>$zone</td></tr>";
                }
            ?>
    </table>
    <a href="dayresultselection.php">Volver</a><br>
    <a href="logout.php">Cerrar Sesion</a>
    </body>
</html>