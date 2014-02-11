<?php 

$response = array(
	'alert' => array(
		'title' => 'Hi there!',
		'type' => 'error',
		'message' => 'There was an error',
		'list' => array(
			'1' => 'Fill this field',
			'2' => 'Also this field',
			'3' => 'And this field'
		),
		'container' => '#wrapper'
	)
);

// encode and return response
$response_json = json_encode( $response );
header( "Content-Type: application/json" );
echo $response_json;
exit;