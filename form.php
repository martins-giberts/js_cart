<?php
	
	require 'SimpleCart.php';
	$cart = SimpleCart::data('selectedItems', 'cartCollection');
	$regions = SimpleCart::data('selectedRegions', 'regionsCollection');
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
				<h2>Cart</h2>
				<?php foreach ($cart as $item): ?>
					<input type="checkbox" name="item[]" value="<?php echo $item ?>">ID: <?php echo $item ?><br>
				<?php endforeach; ?>
					
				<h2>Region</h2>
				<?php foreach ($regions as $item): ?>
					<input type="checkbox" name="item[]" value="<?php echo $item ?>">ID: <?php echo $item ?><br>
				<?php endforeach; ?>
			</form>
		</div>
		
		<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script src="js/js.cookie.js"></script>
		<script src="js/URI.min.js"></script>
		<script src="js/tmpl.min.js"></script>
		<script src="js/js-cart-lib.js"></script>
		<script src="js/js_cart.js"></script>
	</body>
</html>