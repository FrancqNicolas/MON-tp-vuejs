
<?php
	header("content-type: application/json");
	session_start();

function appel_id() {

	$id = $_GET["id"];
	return $id;
}
?>