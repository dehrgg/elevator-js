(function(){

	app.Models.Simulation = Backbone.Model.extend({

		defaults: {
			processTick: 1,
			groundLevels: 3,
			aboveGroundLevels: 17
		},

		initialize: function() {

			this.set('floors', new app.Collections.Floors());
			this.set('elevators', new app.Collections.Elevators());

			for (var i = 1; i <= this.get('stories'); ++i) {
				var floor = new app.Models.Floor({
					floor: i
				});
				this.listenTo(floor, 'arrival', this.newArrival);
				this.get('floors').add(floor);
			}
			for (i = 0; i < this.get('elevatorCount'); ++i) {
				var elevator = new app.Models.Elevator({
					currentFloor: 0
				});
				this.get('elevators').add(elevator);
			}

		},

		newArrival: function(floor, direction) {
			var destination;
			if (direction === app.DOWN) {
				destination = Math.floor(Math.random() * this.get('groundLevels'));
			}
			else {
				destination = Math.floor(Math.random() * this.get('aboveGroundLevels')) + this.get('groundLevels');
			}
		},

		tick: function() {
			this.get('floors').each(function(floor){
				floor.checkArrivals();
			});
		},

		start: function() {
			window.setTimeout(_.bind(this.tick, this), this.get('processTick') * 1000);
		}
	});
})();
