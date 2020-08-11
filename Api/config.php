<?php
$servername = 'localhost';
$username = 'root';
$password = '';
$dbname = 'manu_bakes';

/*
$servername = 'localhost';
$username = '145584';
$password = 'abcd1234';
$dbname = '145584';
*/

// Create connection
$conn = new mysqli( $servername, $username, $password, $dbname );

// Check connection
if ( $conn->connect_error ) {
    die( 'Connection failed: ' . $conn->connect_error );
}
?>