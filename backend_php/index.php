<?php

include_once("./model/users.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// all of our endpoints start with /person
// everything else results in a 404 Not Found
if ($uri[4] !== 'users') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

// the user id is, of course, optional and must be a number:
$userId = null;
if (isset($uri[5])) {
    $userId = (int) $uri[5];
}


$method = $_SERVER["REQUEST_METHOD"];


$user = new Users();

if ($method == 'GET') {
  /*$teams_data = $teams->getAll();
  echo json_encode($teams_data);*/

  $users = $user->getAll();
  echo json_encode($users);
}
else if ($method == 'POST') {
  $json = file_get_contents('php://input'); // Returns data from the request body
  $user_data = json_decode($json, true);
  
  try {
    $save_user = $user->register(
      $user_data["name"],
      $user_data["email_address"],
      $user_data["password"],
      $user_data["cell_phone_number"],
      $user_data["user_type"]
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

?>

