<?php
	
	require 'SimpleCart.php';
	$data = SimpleCart::data();
?>
<html lang="en-US">
	<head>
		<meta charset="UTF-8">
		
		<title>JS Cart sample - Form</title>		
		<link rel="stylesheet" href="css/main.css">
	</head>
	<body>
		<div id="container">
			<form>
				<?php foreach ($data as $item): ?>
					<input type="checkbox" name="item[]" value="<?php echo $item ?>">ID: <?php echo $item ?><br>
				<?php endforeach; ?>
			</form>
		</div>
		
		<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script src="js/js.cookie.js"></script>
		<script src="js/tmpl.min.js"></script>
		<script src="js/js_cart.js"></script>
	</body>
</html>