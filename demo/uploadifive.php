<?php
/*
@author Dario Cabrera
*/

// Set the uplaod directory
$uploadDir = '/uploads/';

// Set the allowed file extensions
$fileTypes = array('jpg', 'jpeg', 'gif', 'png'); // Allowed file extensions

if ($_FILES) {

	$verifyToken = md5('unique_salt' . $_POST['timestamp']);

	if (!empty($_FILES) && $_POST['token'] == $verifyToken) {

		$tempFile   = $_FILES['Filedata']['tmp_name'];
		$uploadDir  = getcwd() . $uploadDir;

		if (!is_dir($uploadDir)) {
		//If $uploadDir doesn't exist
			mkdir($uploadDir,0777);
		}
		//Change uploadDir Permissions
		chmod($uploadDir, 0777);

		//remove old uploaded files
		removeFiles($uploadDir, $verifyToken);

		// Validate the filetype
		$fileParts = pathinfo($_FILES['Filedata']['name']);
		$extension = strtolower($fileParts['extension']);
		if (in_array($extension, $fileTypes)) {

			//Set the filename
			$fileName = mktime(date("H"), date("i"), date("s"), date("n"), date("j"), date("Y"));
			//Add actual token to filename
			$fileName .= "_$verifyToken";
			$targetFile = $uploadDir . $fileName . ".$extension";

			// Save the file
			move_uploaded_file($tempFile, $targetFile);

			//Change new image permissions
			chmod($targetFile, 0777);

			die(json_encode($targetFile));

		} else {

			// The file type wasn't allowed
			echo 'Invalid file type.';

		}
	}

}

function removeFiles($uploadDir, $verifyToken){
//	Remove old uploaded files
	$files = scandir($uploadDir);

	foreach ($files as $key => $file) {
		if ($file !== '.'  && $file !== '..') {

			list($name,$token) = explode('_', $file);
			$token = substr($token, 0, strpos($token,'.'));

			if ($token !== $verifyToken) {
				//If has different tokens
				$fileName = $uploadDir . $file;
				//Remove uploaded file
				unlink($fileName);
			}
		}
	}
}

?>