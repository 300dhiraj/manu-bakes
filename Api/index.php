<?php

include( 'config.php' );
header( 'Access-Control-Allow-Origin: *' );
header( 'Access-Control-Allow-Headers: Content-Type' );

$REQUEST_METHOD = $_SERVER['REQUEST_METHOD'];
$API_NAME = $_SERVER['QUERY_STRING'];

if ( !$API_NAME ) {
    Error( 'No API Found' );
}

switch( $API_NAME ) {
    case 'Login' :

    Login( $conn );
    break;

    default:
    CheckValidSession( $conn );
}

function Encode_Data( $data ) {
    echo json_encode( $data );
}

function Error( $data ) {
    $Obj =  new \stdClass();
    $Obj->Error = $data;
    Encode_Data( $Obj );
    exit;
}

function Success( $data ) {
    $Obj =  new \stdClass();
    $Obj->Success = $data;
    Encode_Data( $Obj );
}

function Check_Json() {
    //Make sure that it is a POST request.
    if ( strcasecmp( $_SERVER['REQUEST_METHOD'], 'POST' ) != 0 ) {
        Error( 'Request method must be POST!' );
    }

    //Make sure that the content type of the POST request has been set to application/json
    $contentType = isset( $_SERVER['CONTENT_TYPE'] ) ? trim( $_SERVER['CONTENT_TYPE'] ) : '';
    if ( strcasecmp( $contentType, 'application/json' ) != 0 ) {
        Error( 'Content type must be: application/json' );
    }

    //Receive the RAW post data.
    $content = trim( file_get_contents( 'php://input' ) );

    //Attempt to decode the incoming RAW post data from JSON.
    $decoded = json_decode( $content, true );
    return $decoded;
}

function Login( $conn ) {
    $post = Check_Json();
    $username = mysqli_real_escape_string( $conn, $post['username'] );
    $password = mysqli_real_escape_string( $conn, $post['password'] );

    $sql = "SELECT * FROM admin WHERE username = '$username' and password = '$password'";
    $result = $conn->query( $sql );

    if ( $result->num_rows > 0 ) {
        while( $row = $result->fetch_assoc() ) {
            $token = microtime();

            $sql = "UPDATE admin SET session='".$token."' WHERE username = '$username'";
            $conn->query( $sql );

            $Obj =  new \stdClass();
            $Obj->token = $token;
            Success( $Obj );
        }
    } else {
        Error( 'Your Login Name or Password is invalid' );
    }
}

function CheckValidSession( $conn ) {
    $Authorization = GetAuthorization();

    $sql = "SELECT * FROM admin WHERE session = '$Authorization'";
    $result = $conn->query( $sql );

    if ( $result->num_rows > 0 ) {
        while( $row = $result->fetch_assoc() ) {
            Success( 'Valid' );
        }
    } else {
        Error( 'Your Login Name or Password is invalid' );
    }

}

function GetAuthorization() {
    $Authorization = '';
    foreach ( apache_request_headers() as $headers => $value ) {
        if ( 'Authorization' == $headers ) {
            $Authorization = $value;
        }
    }

    return $Authorization;
}

?>