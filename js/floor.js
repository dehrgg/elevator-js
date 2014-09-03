window.app.Models.Floor = Backbone.Model.extend({

	initialize: function() {
		var up = new app.Collections.PersonQueue();
		var down = new app.Collections.PersonQueue();
		this.set('goingUp', up);
		this.set('goingDown', down);
		this.listenTo(up, 'add', this.arrival);
		this.listenTo(down, 'add', this.arrival);
	},

	hasPeopleWaiting: function(direction) {
		return ( direction === app.UP && this.get('goingUp').length > 0) 
			|| (direction === app.DOWN && this.get('goingDown').length > 0);
	},

	nextInLine: function(direction) {
		var key = (direction === app.UP) ? 'goingUp' : 'goingDown';
		this.get(key).shift();
	},

	arrival: function() {
		this.trigger('arrival');
	}
});

app.Collections.Floors = Backbone.Collection.extend({
	model: app.Models.Floor,
	comparator: 'floor'
});