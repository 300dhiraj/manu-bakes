<?php

include( 'config.php' );
header( 'Access-Control-Allow-Origin: *' );
header( 'Access-Control-Allow-Headers: Authorization,Content-Type' );

$REQUEST_METHOD = $_SERVER['REQUEST_METHOD'];
$API_NAME = $_SERVER['QUERY_STRING'];

if ( !$API_NAME ) {
    Error( 'No API Found' );
}

switch( $API_NAME ) {
    case 'Login' :
    LoginFn( $conn );
    break;

    case 'GetProduct' :
    // CheckValidSession( $conn );
    GetProductFn( $conn );
    break;

    case 'AddProduct' :
    // CheckValidSession( $conn );
    AddProductFn( $conn );
    break;

    case 'SetProductFlags' :
    // CheckValidSession( $conn );
    SetProductFlagsFn( $conn );
    break;

    case 'deleteProduct' :
    // CheckValidSession( $conn );
    deleteProductFn( $conn );
    break;

    case 'GetOrders' :
    // CheckValidSession( $conn );
    GetOrdersFn( $conn );
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

function GetPostJson() {
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

function CheckValidSession( $conn ) {
    $Authorization = GetAuthorization();

    $sql = "SELECT * FROM admin WHERE session = '$Authorization'";
    $result = $conn->query( $sql );

    if ( ! $result->num_rows > 0 ) {
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

function LoginFn( $conn ) {
    $post = GetPostJson();
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

function GetProductFn( $conn ) {
    $sql = 'SELECT * FROM products';
    $result = $conn->query( $sql );

    if ( $result->num_rows > 0 ) {
        $Obj =  new \stdClass();
        $productsArr = array();

        while( $row = $result->fetch_assoc() ) {
            array_push( $productsArr, $row );
        }

        $Obj->products = $productsArr;
        Success( $Obj );
    } else {
        Error( 'Error: ' . $sql . '<br>' . $conn->error );
    }
}

function AddProductFn( $conn ) {
    $post = GetPostJson();
    $productType = mysqli_real_escape_string( $conn, $post['productType'] );
    $productName = mysqli_real_escape_string( $conn, $post['productName'] );
    $productDescription = mysqli_real_escape_string( $conn, $post['productDescription'] );
    $price1 = mysqli_real_escape_string( $conn, $post['price1'] );
    $price2 = mysqli_real_escape_string( $conn, $post['price2'] );
    $price3 = mysqli_real_escape_string( $conn, $post['price3'] );
    $price4 = mysqli_real_escape_string( $conn, $post['price4'] );
    $image = 1;
    //mysqli_real_escape_string( $conn, $post['image'] );

    $sql = "INSERT INTO products (productType, productName, productDescription, price1,price2,price3,price4,image,disable,outOfStock) VALUES ('".$productType."', '".$productName."', '".$productDescription."', $price1,$price2,$price3,$price4,$image,false,false)";

    if ( $conn->query( $sql ) === TRUE ) {
        $Obj =  new \stdClass();
        $Obj->msg = 'New record created successfully';
        $Obj->last_id = $conn->insert_id;
        Success( $Obj );
    } else {
        Error( 'Error: ' . $sql . '<br>' . $conn->error );
    }
}

function SetProductFlagsFn( $conn ) {
    $post = GetPostJson();
    $id = mysqli_real_escape_string( $conn, $post['id'] );
    $sql = '';

    if ( array_key_exists( 'disable', $post ) ) {
        $disable = mysqli_real_escape_string( $conn, $post['disable'] );
        $sql = 'UPDATE products SET disable='.$disable." WHERE id = $id";
    } else if ( array_key_exists( 'outOfStock', $post ) ) {
        $outOfStock = mysqli_real_escape_string( $conn, $post['outOfStock'] );
        $sql = 'UPDATE products SET outOfStock='.$outOfStock." WHERE id = $id";
    }

    if ( $conn->query( $sql ) === TRUE ) {
        $Obj =  new \stdClass();
        $Obj->msg = 'Record updated successfully';
        Success( $Obj );
    } else {
        Error( 'Error: ' . $sql . '<br>' . $conn->error );
    }
}

function deleteProductFn( $conn ) {
    $post = GetPostJson();
    $id = mysqli_real_escape_string( $conn, $post['id'] );
    $sql = 'DELETE FROM products WHERE id = '.$id;

    if ( $conn->query( $sql ) === TRUE ) {
        $Obj =  new \stdClass();
        $Obj->msg = 'Record deleted successfully';
        Success( $Obj );
    } else {
        echo 'Error deleting record: ' . $conn->error;
    }
}

function GetOrdersFn( $conn ) {
    $sql = 'SELECT * FROM orders';
    $result = $conn->query( $sql );

    if ( $result->num_rows > 0 ) {
        $Obj =  new \stdClass();
        $ordersArr = array();

        while( $row = $result->fetch_assoc() ) {
            array_push( $ordersArr, $row );
        }

        $Obj->orders = $ordersArr;
        Success( $Obj );
    } else {
        Error( 'Error: ' . $sql . '<br>' . $conn->error );
    }
}

?>