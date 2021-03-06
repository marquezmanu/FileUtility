<!doctype html>
<html>
	<head>
		<meta charset="UTF-8">
		<title>File Utility</title>
		<meta name="viewport" content="user-scalable=no, width=device-width">
		<link rel="stylesheet" href="css/style.css" type="text/css"/>
		<script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
		<script src="js/fileUtility.js"></script>
		<script src="js/jquery.uploadify.js"></script>
 	</head>
 	
	<body>
		<div id="container">
			<div class="content">
				<header>
					<h1>File Utility Example</h1>
					A simple demostration of File Utility
				</header>
				<div class="buttons">
					<span class="btn-position">
						<input type="file" id="fileupload"/>
					</span>				
				</div>
				<div class="wrapper-queue">
					<span class="queue-clear">Clear Queue</span>
					<div class="js-queue">
					</div>
				</div>
				<div class="progress-bar">
					<div class="progress-fill"></div>
				</div>
				<a href="https://github.com/marquezmanu/FileUtility"><img style="position: absolute; top: 0; right: 0; border: 0;" src="https://s3.amazonaws.com/github/ribbons/forkme_right_gray_6d6d6d.png" alt="Fork me on GitHub"></a>
				<div class="spacer" style="clear: both;"></div>
			</div>
		</div>
		<footer>
			<div class="footer-container">
				<a href="http://www.000webhost.com/" target="_blank"><img src="http://www.000webhost.com/images/80x15_powered.gif" alt="Web Hosting" width="80" height="15" border="0" /></a>
			</div>
		</footer>
	</body>

	<script>
 		<?php $timestamp = time();?>
		$(document).ready(function() {
			// Pass a true boolean to use the flash version in this demo. If you want the HTML5 of uploadifive 
			// visit http://www.uploadify.com/download/download-uploadifive-standard/ the add the file and pass non-arguments.
			var uploader = new fileUtility(true);
			var options = {
				'url': 'uploadifive.php',
				'buttonText': 'Upload',
				'buttonClass': 'btn-uploader',
				'formData'     : {
					'timestamp' : '<?php echo $timestamp;?>',
					'token'     : '<?php echo md5('unique_salt' . $timestamp);?>'
				},
				'width': 140,
				'height': 54,
				'onUploadComplete': function(file, data, response) {
					var $queue_wrapper = $('.wrapper-queue');
					var $queue_list = $('.js-queue');
					var $element = $('<div class="queue-file">'+file.name+'</div>')
					$queue_list.append($element);
					if (!$queue_wrapper.is(':visible')) {
						$queue_wrapper.show();
					}
				},
				'onError': function(errorType, file) {
					alert('Sorry an error ocurred: '+errorType);
				},
				'onProgress': function (file, bytesUploaded, bytesTotal) {
					var progress = $('.progress-fill');
					if (!progress.is(':visible')) {
						progress.show();
					}
					progress.css('width', bytesUploaded/bytesTotal * 100 + '%')
					if (bytesUploaded === bytesTotal) {
						setTimeout(function() {
							progress.hide();
							progress.css('width',0);
						}, 1000);
					}
				}
			};
			$('.queue-clear').on('click', function() {
				uploader.cancel();
				$('.queue-file').remove();
				$('.wrapper-queue').hide();
			});
			// Set File Utility instance
			uploader.init($('#fileupload'), options);
		}); 
	</script>
</hmtl>