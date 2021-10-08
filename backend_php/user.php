<?php

include_once("./model/users.php");
include_once("./libraries/jwt_utils.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// all of these endpoints start with /user
// everything else results in a 404 Not Found
if ($uri[4] !== 'user') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

/*
 * En este archivo se hacen las acciones: login y tegistro de usuario
 */

$resource = $uri[5];

$method = $_SERVER["REQUEST_METHOD"];


$user = new Users();

if($resource == 'login'){
  if ($method == 'POST') {
    $json = file_get_contents('php://input'); // Returns data from the request body
    $user_data = json_decode($json, true);
    
    try {
      $login_user = $user->login(
        $user_data["email_address"],
        $user_data["password"],
      );

      if(!empty($login_user)){
        $headers = array('alg'=>'HS256','typ'=>'JWT');
        $payload = array('username'=>$user_data["email_address"], 'exp'=>(time() + 60 * 60 ));

        $jwt = generate_jwt($headers, $payload);

        $response = array(
            'success' => true,
            'token' => $jwt,
            'user_id' => (int)$login_user[0]['id'],
            'name' => $login_user[0]['name'],
            'user_type' => $login_user[0]['user_type']
        );
        
        echo json_encode($response);

      }else{
        $err = array(
          "response" => array(
            "status" => "400",
            "message" => "User not exist."
          )
        );
    
        echo json_encode($err);
      }



    }
    catch(Exception $e) {
      $err = array(
        "error" => array(
          "status" => "500",
          "message" => "There was a problem reading the database."
        )
      );
    
      echo json_encode($err);
      exit();
    }
  }
} else if ($resource == 'register') {
  if ($method == 'GET') {
    /*$teams_data = $teams->getAll();
    echo json_encode($teams_data);*/

    $bearer_token = get_bearer_token();

    #echo $bearer_token;

    $is_jwt_valid = is_jwt_valid($bearer_token);

    if($is_jwt_valid) {

      echo json_encode(array('error' => 'Access granted'));
    } else {
      echo json_encode(array('error' => 'Access denied'));
    }
  }
  else if ($method == 'POST') {
    $json = file_get_contents('php://input'); // Returns data from the request body
    $user_data = json_decode($json, true);
    
    try {
      $save_user = $user->register(
        $user_data["name"],
        $user_data["email_address"],
        $user_data["password"],
        $user_data["cell_phone_number"]
      );

      $err = array(
        "response" => array(
          "status" => "200",
          "message" => "User registered succesfully."
        )
      );
    
      echo json_encode($err);

    }
    catch(Exception $e) {
      $err = array(
        "error" => array(
          "status" => "500",
          "message" => "There was a problem reading the database."
        )
      );
    
      echo json_encode($err);
      exit();
    }
  }
  else if ($method == 'DELETE') {
    try {
      $update_user = $user->deleteUser($userId);

      $err = array(
        "response" => array(
          "status" => "200",
          "message" => "User deleted succesfully."
        )
      );
    
      echo json_encode($err);

    }
    catch(Exception $e) {
      $err = array(
        "error" => array(
          "status" => "500",
          "message" => "There was a problem reading the database."
        )
      );
    
      echo json_encode($err);
      exit();
    }
  }
  else if ($method == 'PUT') {
    $json = file_get_contents('php://input'); // Returns data from the request body
    $user_data = json_decode($json, true);
    
    try {
      $update_user = $user->updateUser(
        $userId,
        $user_data["name"],
        $user_data["email_address"],
        $user_data["password"],
        $user_data["cell_phone_number"],
        $user_data["user_type"]
      );

      $err = array(
        "response" => array(
          "status" => "200",
          "message" => "User updated succesfully."
        )
      );
    
      echo json_encode($err);

    }
    catch(Exception $e) {
      $err = array(
        "error" => array(
          "status" => "500",
          "message" => "There was a problem reading the database."
        )
      );
    
      echo json_encode($err);
      exit();
    }
  }
  else {
    $err = array(
      "error" => array(
        "status" => "404",
        "message" => "Bad URL. Wrong method for resource '" . $resource . "'."
      )
    );

    echo json_encode($err);
    exit();
  }
}
?>

