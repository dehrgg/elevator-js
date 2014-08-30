window.app.Models.Floor = Backbone.Model.extend({

	initialize: function() {
		this.set('goingUp', new app.Collections.PersonQueue());
		this.set('goingDown', new app.Collections.PersonQueue());
	},

	checkArrivals: function() {
		var destination;

		if (Math.random() < this.get('probabilityUp')) {
			this.get('goingUp').add(new Person({
				destination: app.getDestination()
			}));
			this.trigger('arrival', this, app.UP);
		}
		if (Math.random() < this.get('probabilityDown')) {
			this.trigger('arrival', this, app.DOWN);
		}
	},

	nextInLine: function() {
		return this.get('queue').shift();
	},

	elevatorArrival: function(elevator) {
		// fill it up
	}
});

window.app.Collections.Floors = Backbone.Model.extend({
	model: app.Models.Floor,
	comparator: floor
});