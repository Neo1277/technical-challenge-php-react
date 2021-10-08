<?php

require_once 'Connection.php';

/**
 * Description of Categories
 *
 */
class Categories {

    private $table_name;

    private $name;

    public function __construct() {

        $this->table_name   = "categories";
    }

    public function register($name) {
        $this->name = $name;

        $datetime = date("Y-m-d h:i:s");

        $query = "INSERT INTO "
                ."{$this->table_name} "
                ."("
                    ."name, "
                    ."created_on"
                .") "
                ."VALUES("
                    ."'{$this->name}',"
                    ."'{$datetime}'"
                .")";
        
        $conn = new Connection();
        return $conn->query($query);
    }

    public function updateCategory($id, $name) {
        $this->name = $name;

        $datetime = date("Y-m-d h:i:s");

        $query = "UPDATE "
                ."{$this->table_name} "
                ."set name = '{$this->name}', "
                ."updated_on = '{$datetime}' "
                ."WHERE id = '{$id}'";
        
        $conn = new Connection();
        return $conn->query($query);
    }

    public function deleteCategory($id) {

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
    
}
