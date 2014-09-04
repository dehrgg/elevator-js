(function(){
	
	app.Models.Simulator = Backbone.Model.extend({

		defaults: {
			processTick: 1,
		},

		initialize: function() {
			this.listenTo(this.get('elevators'), 'change:currentFloor', this.elevatorArrival);
		},

		elevatorArrival: function(elevator, floorNumber) {
			var floor = this.get('floors').at(floorNumber - 1),
				direction = elevator.get('direction');
			if (floor.hasPeopleWaiting(direction)) {
				while (elevator.hasSpace()) {
					elevator.addPassenger(floor.nextInLine(direction))
				}
			}
			this.dispatch();
		},

		tick: function() {
			this.get('probability').checkArrivals(this.get('floors'));
			this.get('decisionModel').dispatch(this.get('floors'), this.get('elevators'));
		},

		start: function() {
			window.setTimeout(_.bind(this.tick, this), this.get('processTick') * 1000);
		}
	});
})();
