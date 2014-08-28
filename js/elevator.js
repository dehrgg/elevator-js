(function() {

	function _updateFloor() {
		var currentFloor = this.get('currentFloor');
		var newFloor = (this.get('direction') === app.UP) ? ++currentFloor : --currentFloor;
		this.set('currentFloor', newFloor);
	}

	var _currentActionTimeout = [],
		currentFloor,
		direction = 0,
		speed,
		passengers = [],
		actionInProgress = false,
		canInterrupt = false;

	app.Models.Elevator = Backbone.Model.extend({
		initialize: function() {
			this.set('passengers', new app.Collections.DestinationSortedPersonList());
		},

		moveTo: function(floor) {
			var canInterrupt = this.get('canInterrupt');
			if (this.get('inMotion') && !canInterrupt) {
				return false;
			}
			this.set('realTarget', floor);
			var distance = this.get('currentFloor') - floor;
			this.set('inMotion', true);
			// Set timeout for updating the current floor
			window.setTimeout(_updateFloor, this.get('frequency') * 1000);
		},

		floorChange: function() {
			this.trigger('floorChange', this.get('passengers').length);
		},

		gettingOff: function() {
			var passengers = this.get('passengers');
			if (passengers.length === 0) {
				return false;
			}
			var method = this.get('direction') === app.UP ? 'first' : 'last';
			return passengers[method].get('destination') === this.get('currentFloor');
		}
	});

})();

window.app.Collections.Elevators = Backbone.Model.extend({
	model: app.Models.Elevator
});

app.Models.Statistics = Backbone.Model.extend({
	floorsCovered: 0,
	passengersDelivered: 0,
	passengersArrived: 0,
	startTime: 0,
	endTime: 0
});