<?php

$db = mysqli_connect("localhost","root","mysql","smartpark");

if(!$db)
{
    die("Connection failed: " . mysqli_connect_error());
}

?>