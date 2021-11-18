<?php

$db = mysqli_connect("ec2-54-227-200-52.compute-1.amazonaws.com","root","mysql","smartpark");

if(!$db)
{
    die("Connection failed: " . mysqli_connect_error());
}

?>