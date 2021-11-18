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
        <h2>Datos de los estados de los parqueaderos</h2>
        <table border="2px">
        <tr>
            <th>ID</th>
            <th>ID_Calle</th>
            <th>SLOT</th>
            <th>ESTADO</th>
            <th>FECHA_Y_HORA</th>
            <th>ID_PARQUEADERO</th>
            <th>BORRAR DATOS</th>
        </tr>
            <?php

                $url_rest="ec2-54-227-200-52.compute-1.amazonaws.com:3000/data"; //se define la url del servidor

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


                /*for ($i=0; $i<$tam; $i++){
                    
                    $j = $resp[$i];
                    $id = $j -> id_Calle; //se obtiene cada dato del json
                    $sl = $j -> slot;
                    $est = $j -> estado;
                    $fh = $j -> fechaHora;
                    $fk = $j -> fk_data;

                    
                    
                    echo "<tr><td>$id</td><td>$sl</td><td>$est</td><td>$fh</td><td>$fk</td>
                    
                    </tr>";
                }*/

                
                 for ($i=0; $i<$tam; $i++){
                   
                    $j = $resp[$i];
                    $id = $j -> id; //se obtiene cada dato del json
                    $id_Calle = $j -> id_Calle; 
                    $sl = $j -> slot;
                    $est = $j -> estado;
                    $fh = $j -> fechaHora;
                    $fk = $j -> fk_data;
                    
                    ?>
                    <tr>

                        <td><?php echo $id = $j -> id; ?></td>
                        <td><?php echo $id_Calle = $j -> id_Calle; ?></td>
                        <td><?php echo $sl = $j -> slot; ?></td>
                        <td><?php echo $est = $j -> estado; ?></td>
                        <td><?php echo $fh = $j -> fechaHora; ?></td>
                        <td><?php echo $fk = $j -> fk_data; ?></td>

                        <td><a href="delete.php?id=<?php echo  $id = $j -> id; ?>">Delete</a></td>
                     
                    
                    </tr>
            
                    <?php
                } 
                
            ?>
    </table>
    <a href="variables.php">Volver</a><br>
    <a href="logout.php">Cerrar Sesion</a>
    </body>
</html>