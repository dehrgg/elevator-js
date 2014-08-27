var app = {
	Models: [],
	Collections: [],
	Views: [],

	UP: 1,
	DOWN: -1,

	start: function() {

	}
};

(function() {

	function _updateFloor() {
		
	}

	var _currentActionTimeout = [],
		currentFloor,
		direction = 0,
		UP = 1,
		DOWN = -1,
		speed,
		passengers = [],
		actionInProgress = false,
		canInterrupt = false;

	app.Models.Elevator = Backbone.Model.extend({
		initialize: function() {
			// this.set('passengers', new )
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
		}
	});

})();

window.app.Collections.Elevators = Backbone.Model.extend({
	model: app.Models.Elevator
});

window.app.Collections.Floors = Backbone.Model.extend({
	model: app.Models.Floor
});

window.app.Models.Floor = Backbone.Model.extend({

	initialize: function() {

	},

	checkArrivals: function() {
		var destination;

		if (Math.random() < this.get('probabilityUp')) {
			this.trigger('arrival', this, app.UP);
		}
		if (Math.random() < this.get('probabilityDown')) {
			this.trigger('arrival', this, app.DOWN);
		}
	},

	nextInLine: function() {
		return this.get('queue').shift();
	}
});

function Floor()  {
	var spawnProbability,
		queue = [];
}

function Person() {
	var destination;
}

(function(){
	app.Models.Simulation = Backbone.Model.extend({

		initialize: function() {

			this.set('floors', new app.Collections.Floors());
			this.set('elevators', new app.Collections.Elevators());

			for (var i = 0; i < this.get('stories'); ++i) {
				var floor = new app.Models.Floor({
					probabilityUp: 0.10,
					probabilityDown: 0.10
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
				// FIXME - hardcoded that there are 3 'ground' levels
				destination = Math.floor(Math.random() * 2);
			}
			else {
				// FIXME hardcoded
				destination = Math.floor(Math.random() * (20 - 3)) + 3;
			}
		}
	});
})();

app.Models.Person = Backbone.Model.extend({

});

app.Collections.PersonQueue = Backbone.Collection.extend({
	model: app.Models.Person
});

app.Collections.DestinationSortedPersonList = Backbone.Collection.extend({
	model: app.Models.Person
});

app.Models.Statistics = Backbone.Model.extend({
	floorsCovered: 0,
	passengersDelivered: 0,
	passengersArrived: 0,
	startTime: 0,
	endTime: 0
});