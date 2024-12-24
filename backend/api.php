<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, DELETE, PUT");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if (!file_exists('config.php')) {
    echo "500";
    exit();
}

include "config.php";
$DB_HOST = DB_HOST;
$DB_USER = DB_USER;
$DB_PASS = DB_PASS;
$DB_NAME = DB_NAME;

if (isset($DB_HOST) && isset($DB_USER) && isset($DB_PASS) && isset($DB_NAME)) {
    query("CREATE TABLE IF NOT EXISTS classification_box (id integer PRIMARY KEY AUTO_INCREMENT,code text,company text, name text,datos text)");

    if ($_SERVER['REQUEST_METHOD'] == 'GET') {
        if ($_GET['action'] == 'archives') {
            $result = query("SELECT code, company, name FROM classification_box");
            $data = [];
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                echo json_encode($data);
                exit(0);
            }
        } else if ($_GET['action'] == 'get_data') {
            $code = $_GET['code'];

            $result = query("SELECT `datos` FROM `classification_box` WHERE `classification_box`.`code` = '$code'");
            $data = [];
            if ($result->num_rows > 0) {
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                echo json_encode($data);
                exit(0);
            }
        }
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST') {

        if ($_POST["action"] == "create_new_classification_box") {
            $company = $_POST["company"];
            $code = $_POST["code"];
            $name = $_POST["name"];

            query("INSERT INTO classification_box (company, code, name) VALUES ('$company', '$code', '$name')");

            echo "201";
            exit(0);
        } else if ($_POST["action"] == "add_classification_data") {
            $code = $_POST["code"];
            $data = $_POST["data"];

            query("UPDATE `classification_box` SET `datos` = '$data' WHERE `classification_box`.`code` = '$code'");

            echo "201";
            exit(0);
        }
    }

    echo "200";
} else {
    echo "500";
}
exit();




function getDataBase()
{

    $c = @new mysqli(DB_HOST, DB_USER, DB_PASS);

    if ($c) {
        $c->select_db(DB_NAME);
        return $c;
    }
}

function query($string_sql)
{
    $c = getDataBase();
    return $c->query($string_sql);
}
