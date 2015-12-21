
$(function() {
	"use strict";
	
	if ($('#list').length === 0) {
		return;
	}
	
	// Elements
	var $list = $('#list'),
		$checkoutButton = $('.js-checkout');
	
	// Attributes
	var selectedItemsList = [],
		selectedClass = 'active',
		cookieName = 'selectedCartItems';
	
	var GenerateList = function() {
		$list.html(tmpl('template-list', {}));
	};
	
	var InitListItem = function($item) {
		
		// Save original URL
		$checkoutButton.attr('data-href', $checkoutButton.attr('href'));
		
		// Init click
		$item.find('.js-add-to-cart-button').on('click', function(e) {
			e.preventDefault();
			var $button = $(this);
			
			if (IsSelected($button)) {
				DeselectItem($button);
				return;
			}
			
			SelectItem($button);
		});
	};
	
	var InitList = function() {
		var $items = $list.find('.js-item');
		$items.each(function() {
			InitListItem($(this));
		});
	};
	
	var IsSelected = function($button) {
		return $button.hasClass(selectedClass);
	};
	
	var SelectItem = function($button) {
		$button.addClass(selectedClass);
		AddToList($button.data('id'));
	};
	
	var DeselectItem = function($button) {
		$button.removeClass(selectedClass);
		RemoveFromList($button.data('id'));
	};
	
	var AddToList = function(id) {
		if ($.inArray(id, selectedItemsList) !== -1)
		{
			return;
		}
		
		selectedItemsList.push(id);
		
		UpdateCookie();
		UpdateUrl();
	};
	
	var RemoveFromList = function(id) {		
		$.grep(selectedItemsList, function(value) {
		  return value != id;
		});
		
		UpdateCookie();
		UpdateUrl();
	};
	
	var SerializeData = function()
	{
		return selectedItemsList.join('-');
	};
	
	var UpdateCookie = function()
	{
		Cookies.set(cookieName, SerializeData(), { expires: 7 });
	};
	
	var UpdateUrl = function()
	{
		$checkoutButton.attr('href', $checkoutButton.data('href') + '?selectedItems=' + SerializeData());
	};
	
	
	// Init
	GenerateList();
	InitList();
});