<?php
include('functions.php');
 $id = appel_id();
if($id != ""){

  // If todo exist in session.
  if (array_key_exists($id, $_SESSION["todos"]) && $_SESSION["todos"][$id]["termine"]){
    unset($_SESSION["todos"][$id]);
	echo json_encode(array("success" => true)); 
	
  }
  
  else {
	  echo json_encode(array("success" => false)); 
  }
 


}


?>