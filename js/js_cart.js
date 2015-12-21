
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
		seperator = '-',
		cookieName = 'selectedCartItems';
	
	var GenerateList = function() {
		$list.html(tmpl('template-list', {}));
	};
	
	var InitListItem = function($item) {
		
		var $button = $item.find('.js-add-to-cart-button');
		
		// Mark Item selected		
		if ($.inArray($button.data('id').toString(), selectedItemsList) !== -1)
		{
			SelectItem($button);
		}
		
		// Init click
		$button.on('click', function(e) {
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
		
		// Get saved data
		if (typeof Cookies.get(cookieName) !== 'undefined') {
			selectedItemsList = Cookies.get(cookieName).split(seperator);
		}
		
		// Save original URL
		$checkoutButton.attr('data-href', $checkoutButton.attr('href'));
		
		
		var $items = $list.find('.js-item');
		$items.each(function() {
			InitListItem($(this));
		});
		
		// Reset cookie
		Cookies.set(cookieName, " ", { expires: 1 });
		
		UpdateCookie();
		UpdateUrl();
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
		if ($.inArray(id.toString(), selectedItemsList) !== -1)
		{
			return;
		}
		
		selectedItemsList.push(id);
		
		UpdateCookie();
		UpdateUrl();
	};
	
	var RemoveFromList = function(id) {
		id = id.toString();
		for (var i=selectedItemsList.length-1; i>=0; i--) {
			if (selectedItemsList[i].toString() === id) {
				selectedItemsList.splice(i, 1);
				break;
			}
		}
		
		UpdateCookie();
		UpdateUrl();
	};
	
	var SerializeData = function()
	{
		return selectedItemsList.join(seperator);
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