<?php

$db = mysqli_connect("localhost","root","root","smartpark");

if(!$db)
{
    die("Connection failed: " . mysqli_connect_error());
}

?>