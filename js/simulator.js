(function(){

	app.Models.Simulator = Backbone.Model.extend({

		defaults: {
			processTick: 1,
			play: false,
		},

		initialize: function() {
			this.listenTo(this.get('elevators'), 'change:currentFloor', this.elevatorArrival);
		},

		elevatorArrival: function(elevator, floorNumber) {
			var floor = this.get('floors').at(floorNumber - 1),
				direction = elevator.get('direction');
			elevator.unload();
			if (floor.hasPeopleWaiting(direction)) {
				while (elevator.hasSpace() && floor.hasPeopleWaiting(direction)) {
					elevator.addPassenger(floor.nextInLine(direction))
				}
			}
		},

		tick: function() {
			this.get('probability').checkArrivals(this.get('floors'));
			this.get('decisionModel').dispatch(this.get('floors'), this.get('elevators'));
			this.get('play') && window.setTimeout(_.bind(this.tick, this), this.get('processTick') * 1000);
		}
	});
})();
