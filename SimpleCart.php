<?php

class SimpleCart 
{
	public $get_key = 'selectedItems';
	public $cookie_key = 'selectedCartItems';
	public $delimiter = '-';
	public $cookie_time_days = 7; // default 7days
	protected $data = array();
	
	public static function data($getKey = '', $cookieKey = '')
	{
		$cart = new self($getKey, $cookieKey);
		return $cart->getItems();
	}
	
	public function __construct($getKey, $cookieKey) {
		$this->get_key = $getKey;
		$this->cookie_key = $cookieKey;
	}
	
	public function getItems()
	{
		// Check for GET parameters
		$this->data = $this->getUrlItems();
		
		// Check for cookie parameters
		if (empty($this->data))
		{
			$this->data = $this->getCookieItems();
		}
		
		// Reset cookie
		$this->resetCookie($this->data);
		
		return $this->data;
	}
	
	function getUrlItems()
	{
		$getItemsString = filter_input(INPUT_GET, $this->get_key);
		$items = array();
		
		if ($getItemsString !== null)
		{
			$items = explode($this->delimiter, $getItemsString);
		}		
		return $items;
	}
	
	function getCookieItems()
	{
		$getItemsString = filter_input(INPUT_COOKIE, $this->cookie_key);
		$items = array();
		
		if ($getItemsString !== null)
		{
			$items = explode($this->delimiter, $getItemsString);
		}
		return $items;
	}
	
	function resetCookie($data)
	{
		if (empty($this->data))
		{
			return;
		}
		
		setcookie(
			$this->cookie_key, 
			implode($this->delimiter, $data), 
			time() + self::getCookieDays($this->cookie_time_days),
			'/'
		);
	}
	
	public static function getCookieDays($days)
	{
		return 60*60*24*$days;
	}
}