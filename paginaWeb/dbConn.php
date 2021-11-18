<?php

$db = mysqli_connect("http://ec2-54-227-200-52.compute-1.amazonaws.com:3000","root","mysql","smartpark");

if(!$db)
{
    die("Connection failed: " . mysqli_connect_error());
}

?>