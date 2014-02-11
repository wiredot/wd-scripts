<?php 

$response = array(
	"redirect" => array(
		"url" => "http://google.com",
		"delay" => 2000
	),
	"reset" => true
);

// encode and return response
$response_json = json_encode( $response );
header( "Content-Type: application/json" );
echo $response_json;
exit;