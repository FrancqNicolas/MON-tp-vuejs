<?php
include('functions.php');

// Dans le cadre du traitement, vérifier si $_SESSION["todos"] est bien un tableau (is_array…)
if(!isset($_SESSION["todos"]) || !is_array($_SESSION["todos"])){
  $_SESSION["todos"] = array();
}

if(isset($_POST["texte"]) && $_POST["texte"] != ""){
  $todo = array("id" => uniqid(), "texte" => $_POST["texte"], "date" => time(), "termine" => false);
  // Sauvegarder dans la Session.
  $_SESSION["todos"][$todo["id"]] = $todo;
  // Afficher un JSON
  echo json_encode(array("success" => true));
}else{
  echo json_encode(array("success" => false));
}

?>