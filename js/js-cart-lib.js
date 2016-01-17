var Collection;
var CookieStorrage;
(function() {
	Collection = function(name, conf) {
		var config = {
			
			// Item
			itemSelector: null,
			itemButtonSelector: null,
			itemAttributeId: 'id',
			
			cookieName: name + 'Collection',
			
			// Callbacks
			afterInit: null,
			afterItemInit: null,
			afterItemClick: null,
			afterItemAdd: null,
			afterItemRemove: null
		};
		this.name = name;
		this.db;
		this.items = [];

		this.initialize = function(conf) {
			$.extend(config, conf);
			this.db = new CookieStorrage(config.cookieName);
			this.initCollection();
		};

		this.initCollection = function() {
			var $list = $(config.itemSelector);			
			for ( var i = 0, len = $list.length; i < len; i++) {
				this.initItem($($list[i]));
			};
			
			this.runCallback(config.afterInit, this, null);
		};
		
		this.initItem = function($el) {
			var item = this.findItem($el);
			item.button.on('click', null, {id: item.id, collection: this}, function(e) {
				e.preventDefault();
				e.data.collection.addOrRemoveItem(e.data.id);
				e.data.collection.runCallback(config.afterItemClick, e.data.collection, e.data.collection.findItem(e.data.id));
			});
			this.runCallback(config.afterItemInit, this, item);
		};
		
		this.runCallback = function(callback, collection, item) {
			if (typeof callback !== 'function') {
				return;
			}			
			callback(collection, item);
		};
		
		this.findItemByObj = function(obj) {
			var item = {
				obj: obj,
				button: (config.itemButtonSelector !== null) ? obj.find(config.itemButtonSelector) : obj
			};
			item.id = parseInt(item.button.data(config.itemAttributeId));
			item.selected = this.isItemSelected(item.id);			
			
			this.items[item.id] = item;
			return item;
		};
		
		this.findItemById = function(id) {
			return this.items[parseInt(id)];
		};
		
		this.findItem = function(attr) {			
			if (typeof attr === 'object') {
				return this.findItemByObj(attr);
			};			
			return this.findItemById(attr);
		};
		
		this.addOrRemoveItem = function(id) {			
			if(this.isItemSelected(id)) {
				this.removeItem(id);
			}
			else {
				this.addItem(id);
			}
		};
		
		this.isItemSelected = function(id) {		
			return this.db.find(id);
		};
		
		this.addItem = function(id) {
			this.db.add(id);
			var item = this.findItem(id);
			item.selected = true;
			this.runCallback(config.afterItemAdd, this, item);
		};
		
		this.removeItem = function(id) {
			this.db.remove(id);
			var item = this.findItem(id);
			item.selected = false;
			this.runCallback(config.afterItemRemove, this, item);
		};
		
		this.serialize = function() {
			return this.db.getString();
		};
		
		this.activeItemsCount = function() {
			return this.db.getCookie().length;
		};

		this.initialize(conf);
	};

	// Storrage singleton
	CookieStorrage = function(name, conf) {
		var config = {
			path: '/',
			ttlDays: 7,
			seperator: '-'
		};
		this.name = name;
		
		// Store data in cookies
		this.scheme;

		// Store data in arrays to generate URLs and Cookies

		// Keep cookies tidy
		this.initialize = function(conf) {
			$.extend(config, conf);
		};
		
		this.stringToArray = function(string) {
			return string.split(config.seperator);
		};		
		this.arrayToString = function(array) {
			return array.join(config.seperator);
		};
		
		this.getString = function() {
			return Cookies.get(this.name);
		};
		
		this.getCookie = function() {
			if (this.cookieExists()) {
				return this.stringToArray(Cookies.get(this.name));
			}
			return [];
		};
		
		this.setCookie = function(data) {
			Cookies.set(this.name, this.arrayToString(data), { expires: config.ttlDays, path: config.path });
		};
		
		this.deleteCookie = function() {
			Cookies.remove(this.name, { path: config.path });
		};
		
		this.cookieExists = function() {
			if (typeof Cookies.get(this.name) !== 'undefined' && Cookies.get(this.name) !== '') {
				return true;
			}
			return false;
		};
		
		this.find = function(id) {
			var data = this.getCookie();
			
			if ($.inArray(id.toString(), data) !== -1)
			{
				// We already know what we are looking for
				return true;
			}
			
			return false;
		};
		
		this.add = function(id) {
			if (parseInt(id) !== 'NaN' && this.find(id)) {
				return false;
			}
			
			var data = this.getCookie();
			data.push(id);
			this.setCookie(data);		
			
			return true;
		};
		
		this.remove = function(id) {
			var id = id.toString();
			var data = this.getCookie();
			var removed = false;
			
			for (var i = data.length-1; i>=0; i--) {
				if (data[i].toString() === id) {
					data.splice(i, 1);
					removed = true;
					break;
				}
			}			
			this.setCookie(data);
			return removed;
		};
		this.initialize(conf);
	};
})();