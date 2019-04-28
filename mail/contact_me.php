<?php
// Check for empty fields

if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['contact']) 	||
   empty($_POST['message'])	    ||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	$response_array['status'] = 'error';  
	echo 'false';
   }
	//var_dump($_POST);exit();
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
$contact = $_POST['contact'];
// Create the email and send the message
$to = 'hello@fleym.com'; 
$email_subject = "Website Contact Form:  $name";
$email_body = "You have received a new message from your website contact form.\n\n"."Here are the details:\nName: $name\nEmail: $email_address\ncontact: $contact\nMessage: $message";
$headers = "From: hello@fleym.com\n"; // This is the email address the generated message will be from. We recommend using something like noreply@yourdomain.com.
$headers .= "Reply-To: $email_address";	
$succ = mail($to,$email_subject,$email_body,$headers);
if($succ){
echo 'true';            
}
else{
echo 'false';
}
exit();
?>