(function() {

	function _updateFloor() {
		
	}

	var _currentActionTimeout = [];

	var capacity = _capacity,
		logicModel = _logicModel,
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
		}
	});

})();

window.app.Collections.Elevators = Backbone.Model.extend({
	model: app.Models.Elevator
});

function Floor()  {
	var spawnProbability,
		queue = [];
}

function Person() {
	var destination;
}


function Simulation(stories, elevatorCount) {
	
	var spawnTick,
		floorsCovered,
		passengers,
		startTime,
		processTick,
		elevators = [],
		floors = [],
		elevatorCapacity = 14,
		i;

	for (i = 0; i < elevatorCount; ++i) {
		elevators.push(new Elevator(elevatorCapacity));
	}

	for (i = 0; i < stories; ++i) {
		floors.push(new Floor());
	}

	function start() {
		window.setTimeout(spawn, spawnTick);
		window.setTimeout(move, processTick);
	}

	function spawn() {

	}

	function move() {

	}
}