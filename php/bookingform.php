<?php

 // ++++++++++++++++++++++++++++++++++++
error_reporting(0);

  
 // configuration
 
$email_it_to = "your_own_email_address@some_domain.com";
$email_it_to = "221alexandra@gmail.com";


$error_message = "Please complete the form first";

$rnd=$_POST['rnd'];
$name=$_POST['name'];
$email=$_POST['email'];

$surname=$_POST['surname'];
$arrival=$_POST['arrival'];
$departure=$_POST['departure'];
$room=$_POST['room'];
$adults=$_POST['adults'];
$children=$_POST['children'];
$rooms=$_POST['rooms'];

$body=$_POST['body'];

  
if(!isset($rnd) || !isset($name) || !isset($surname) || !isset($arrival) || !isset($departure) || !isset($room) || !isset($adults) || !isset($children) || !isset($rooms) || !isset($email) || !isset($body)) {
	echo $error_message;
    die();
}


$subject = stripslashes($subject);
$email_from = $email;

$email_message = "Message submitted by '".stripslashes($name)."', email:".$email_from;
$email_message .=" on ".date("d/m/Y")."\n\n";
$email_message .="Name: ".$name." ".$surname."\n\n";
$email_message .="Arrival date: ".$arrival."\n\n";
$email_message .="Departure date: ".$departure."\n\n";
$email_message .="Room nr: ".$room."\n\n";
$email_message .="Adults nr: ".$adults."\n\n";
$email_message .="Children nr: ".$children."\n\n";
$email_message .="Rooms nr: ".$rooms."\n\n";

$email_message .= stripslashes($body);
$email_message .="\n\n";

// Always set content-type when sending HTML email


$headers = "MIME-Version: 1.0" . "\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8". "\r\n";
$headers .= 'From: '.stripslashes($name);

//$headers .= 'From: <'.$email_from.'>' . "\r\n";

mail($email_it_to,$subject,$email_message,$headers);



?>