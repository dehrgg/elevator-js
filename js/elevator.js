(function() {

	app.Models.Elevator = Backbone.Model.extend({
		initialize: function() {
			this.set('passengers', new app.Collections.DestinationSortedPersonList());
		},

		moveTo: function(floor) {
			if (floor == this.get('currentFloor')) {
				return;
			}
			if (this.get('moving')) {
				console.warn('Attempted to dispatch elevator which was already moving');
				return;
			}
			if (this.get('doorOpen')) {
				console.warn('Cannot move an elevator while the door is open');
				return;
			}
			var distance = Math.abs(this.get('currentFloor') - floor);
			window.setTimeout(_.bind(_arrivedAt, this, floor), distance * 1000 * this.get('frequency'));
			this.set('moving', floor);
		},

		isEmpty: function() {
			return this.get('passengers').length === 0;
		},

		hasSpace: function() {
			return this.get('passengers').length < this.get('capacity');
		},

		available: function() {
			return !(this.get('doorOpen') || this.get('moving')) && this.isEmpty();
		},

		unload: function() {
			var passengers = this.get('passengers');
			passengers.remove(passengers.where({destination: this.get('currentFloor')}));
		},

		addPassenger: function(passenger) {
			this.get('passengers').add(passenger);
		},

		closeDoor: function() {
			this.set('doorOpen', false);
		},

		defaults: {
			frequency: 0.5,
			capacity: 14,
			doorDelay: 0.1
		}
	});

	function _arrivedAt(floor) {
		this.set({
			moving: false,
			doorOpen: true,
			currentFloor: floor,
		});
		window.setTimeout(_.bind(this.closeDoor, this), this.get('doorDelay') * 1000);
	}

})();

window.app.Collections.Elevators = Backbone.Collection.extend({
	model: app.Models.Elevator
});