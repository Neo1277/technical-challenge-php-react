<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
require_once 'Connection.php';

/**
 * Description of Wishers
 *
 * @author fguzmanr
 */
class Users {

    private $table_name;

    private $name;
    private $email_address;
    private $password;
    private $cell_phone_number;
    private $user_type;
    private $created_on;
    private $updated_on;

    public function __construct() {

        $this->table_name   = "users";
    }

    public function register(
        $name, $email_address, 
        $password, $cell_phone_number, 
        $user_type
    ) {
        $this->name = $name;
        $this->email_address = $email_address;
        $this->password = md5($password);
        $this->cell_phone_number = $cell_phone_number;
        $this->user_type = $user_type;

        $datetime = date("Y-m-d h:i:s");

        $query = "INSERT INTO "
                ."{$this->table_name} "
                ."("
                    ."name, "
                    ."email_address, "
                    ."password, "
                    ."cell_phone_number, "
                    ."user_type, "
                    ."created_on"
                .") "
                ."VALUES("
                    ."'{$this->name}',"
                    ."'{$this->email_address}',"
                    ."'{$this->password}',"
                    ."'{$this->cell_phone_number}',"
                    ."'{$this->user_type}',"
                    ."'{$datetime}'"
                .")";
        
        $conn = new Connection();
        return $conn->query($query);
    }

    public function updateUser(
        $id, $name, $email_address, 
        $password, $cell_phone_number, 
        $user_type
    ) {
        $this->name = $name;
        $this->email_address = $email_address;
        $this->password = md5($password);
        $this->cell_phone_number = $cell_phone_number;
        $this->user_type = $user_type;

        $datetime = date("Y-m-d h:i:s");

        $query = "UPDATE "
                ."{$this->table_name} "
                ."set name = '{$this->name}', "
                ."email_address = '{$this->email_address}', "
                ."password = '{$this->password}', "
                ."cell_phone_number = '{$this->cell_phone_number}', "
                ."user_type = '{$this->user_type}', "
                ."updated_on = '{$datetime}' "
                ."WHERE id = '{$id}'";
        
        $conn = new Connection();
        return $conn->query($query);
    }

    public function deleteUser($id) {

        $query = "DELETE FROM "
                ."{$this->table_name} "
                ."WHERE id = '{$id}'";
        
        $conn = new Connection();
        return $conn->query($query);
    }

    public function getAll() {

        $query = "SELECT * "
                ."FROM {$this->table_name} "
                ."ORDER BY id ASC";
        $conn = new Connection();
        return $conn->query($query);
    }

    public function login($email_address, $password) {
        $this->email_address = $email_address;
        $this->password = md5($password);

        $query = "SELECT id, name "
                . "FROM users "
                . "WHERE email_address='{$this->email_address}' "
                . "AND password='{$this->password}' "
                . "LIMIT 1";
        $conn = new Connection();
        return $conn->query($query);
    }

}
