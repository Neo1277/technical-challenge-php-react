<?php

include_once("./model/Posts.php");
include_once("./libraries/jwt_utils.php");

header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: OPTIONS,GET,POST,PUT,DELETE");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

$uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
$uri = explode( '/', $uri );

// all of our endpoints start with /person
// everything else results in a 404 Not Found
if ($uri[4] !== 'posts') {
    header("HTTP/1.1 404 Not Found");
    exit();
}

// the user id is, of course, optional and must be a number:
$postId = null;
if (isset($uri[5])) {
    $postId = (int) $uri[5];
}


$method = $_SERVER["REQUEST_METHOD"];


$post = new Posts();

if ($method == 'GET') {
  /*$teams_data = $teams->getAll();
  echo json_encode($teams_data);*/
  /*
  $bearer_token = get_bearer_token();

  echo $bearer_token;

  $is_jwt_valid = is_jwt_valid($bearer_token);

  if($is_jwt_valid) {

    echo json_encode(array('error' => 'Access granted'));
  } else {
    echo json_encode(array('error' => 'Access denied'));
  }*/
  $posts = $post->getAll();
  echo json_encode($posts);

}
else if ($method == 'POST') {
  $json = file_get_contents('php://input'); // Returns data from the request body
  $post_data = json_decode($json, true);
  
  try {
    $save_post = $post->register(
      $post_data["category_id"],
      $post_data["title"],
      $post_data["slug"],
      $post_data["short_text"],
      $post_data["large_text"],
      $post_data["image"]
    );

    $err = array(
      "response" => array(
        "status" => "200",
        "message" => "Post registered succesfully."
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
    $update_post = $post->deletePost($postId);

    $err = array(
      "response" => array(
        "status" => "200",
        "message" => "Post deleted succesfully."
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
  $post_data = json_decode($json, true);
  
  try {

    $save_post = $post->updatePost(
      $postId,
      $post_data["category_id"],
      $post_data["title"],
      $post_data["slug"],
      $post_data["short_text"],
      $post_data["large_text"],
      $post_data["image"]
    );    

    $err = array(
      "response" => array(
        "status" => "200",
        "message" => "Post updated succesfully."
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
      "message" => "Bad URL. Wrong method for resource '" . $uri[4] . "'."
    )
  );

  echo json_encode($err);
  exit();
}

?>

