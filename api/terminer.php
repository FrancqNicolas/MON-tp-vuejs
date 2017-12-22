<?php
include('functions.php');
 $id = appel_id();

if(is_array($_SESSION["todos"]) && array_key_exists($id, $_SESSION['todos'])){
$_SESSION["todos"][$id]["termine"] = true;
echo json_encode(array("success" => true));
}
else {
echo json_encode(array("success" => false));
}
?>