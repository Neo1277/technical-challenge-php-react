<?php

require_once 'Connection.php';

/**
 * Description of Posts
 *
 */
class Posts {

    private $table_name;

    private $category_id;
    private $title;
    private $slug;
    private $short_text;
    private $large_text;


    public function __construct() {

        $this->table_name   = "posts";
    }

    public function register(
        $category_id, $title, 
        $slug, $short_text, 
        $large_text
    ) {
        $this->category_id = $category_id;
        $this->title = $title;
        $this->slug = $slug;
        $this->short_text = $short_text;
        $this->large_text = $large_text;

        $datetime = date("Y-m-d h:i:s");

        $query = "INSERT INTO "
                ."{$this->table_name} "
                ."("
                    ."category_id, "
                    ."title, "
                    ."slug, "
                    ."short_text, "
                    ."large_text, "
                    ."created_on"
                .") "
                ."VALUES("
                    ."'{$this->category_id}',"
                    ."'{$this->title}',"
                    ."'{$this->slug}',"
                    ."'{$this->short_text}',"
                    ."'{$this->large_text}',"
                    ."'{$datetime}'"
                .")";
        
        $conn = new Connection();
        return $conn->query($query);
    }

    public function updatePost(
        $id, $category_id, $title, 
        $slug, $short_text, 
        $large_text
    ) {
        $this->category_id = $category_id;
        $this->title = $title;
        $this->slug = $slug;
        $this->short_text = $short_text;
        $this->large_text = $large_text;

        $datetime = date("Y-m-d h:i:s");

        $query = "UPDATE "
                ."{$this->table_name} "
                ."set category_id = '{$this->category_id}', "
                ."title = '{$this->title}', "
                ."slug = '{$this->slug}', "
                ."short_text = '{$this->short_text}', "
                ."large_text = '{$this->large_text}', "
                ."updated_on = '{$datetime}' "
                ."WHERE id = '{$id}'";
        
        $conn = new Connection();
        return $conn->query($query);
    }

    public function deletePost($id) {

        $query = "DELETE FROM "
                ."{$this->table_name} "
                ."WHERE id = '{$id}'";
        
        $conn = new Connection();
        return $conn->query($query);
    }

    public function getAll() {

        $query = "SELECT p.*, c.name as category "
                ."FROM {$this->table_name} p "
                ."LEFT JOIN categories c ON c.id = p.category_id "
                ."ORDER BY p.id ASC";
        $conn = new Connection();
        return $conn->query($query);
    }
    
}
