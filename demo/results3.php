<?php 

$response = array(
	"error" => true
);

// encode and return response
$response_json = json_encode( $response );
header( "Content-Type: application/json" );
echo $response_json;
exit;
