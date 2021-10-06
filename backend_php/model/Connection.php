<?php

include_once(dirname(__FILE__).'/../config.php');

class Connection {

    private $server;
    private $user;
    private $password;
    private $db;
    private $connect;

    public function __construct() {

        global $CONFIG;

        $this->server   = $CONFIG["DATABASE"]["HOSTNAME"];
        $this->user     = $CONFIG["DATABASE"]["USERNAME"];
        $this->password = $CONFIG["DATABASE"]["PASSWORD"];
        $this->db       = $CONFIG["DATABASE"]["DATABASE"];

        $dsn = "mysql:host={$this->server};dbname={$this->db}";

        try {
            $this->connect = new PDO($dsn, $this->user, $this->password);
            // echo 'Connection was succesful!';
        } catch (PDOException $e) {
            echo "Connection error: {$e->getMessage()}";
            exit();
        }
    }

    public function query($query) {
        $statement = $this->connect->prepare($query);

        if ($statement) {
            $execute = $statement->execute();
            if (!$execute) {
                print_r($statement->errorInfo());
            }
            $result = $statement->fetchAll(PDO::FETCH_ASSOC);
            $statement->closeCursor();
        }

        return $result;
    }
}