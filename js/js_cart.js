// New preview
$(function() {
	
	var updateMobileCart = function() {
		console.log(regions.serialize());
	};
	
	var updateUrl = function() {
		var url = new URI($('.js-checkout').attr('href'));
		url.query({ selectedItems: cart.serialize(), selectedRegions: regions.serialize() });
		
		$('.js-checkout').attr('href', url);
		$('.js-serialized-url').val(url);
	};

	// Regions
	var regions = new Collection('regions',{
		itemSelector: '.js-region-item',
		itemButtonSelector: '.js-add-region-button',
		
		// Callbacks
		afterInit: function(Collection) {
			$('.js-regions-count').html(Collection.activeItemsCount());
		},
		afterItemInit: function(Collection, Item) {
			if (Item.selected) {
				Item.button.addClass('active');
			}
		},
		afterItemClick: function(Collection, Item) {
			
			$('.js-regions-count').html(Collection.activeItemsCount());
			updateUrl();
			
			if (Item.selected) {
				Item.button.addClass('active');
				return;
			}
			Item.button.removeClass('active');
		}
	});
	
	// Items
	var cart = new Collection('cart',{
		itemSelector: '.js-cart-item',
		itemButtonSelector: '.js-add-to-cart-button',
		
		// Callbacks
		afterInit: function(Collection) {
			$('.js-offers-count').html(Collection.activeItemsCount());
		},
		afterItemInit: function(Collection, Item) {
			if (Item.selected) {
				Item.button.addClass('active');
			}
		},
		afterItemClick: function(Collection, Item) {
			
			$('.js-offers-count').html(Collection.activeItemsCount());
			updateUrl();
			
			if (Item.selected) {
				Item.button.addClass('active');
				return;
			}
			Item.button.removeClass('active');
		}
	});
	
	updateUrl();
});