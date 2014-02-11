<?php 

$response = array(
	"hide" => true,
	"message" => "<p>Thanks for sharing</p>"
);

// encode and return response
$response_json = json_encode( $response );
header( "Content-Type: application/json" );
echo $response_json;
exit;
