app.Models.SimpleDecisionModel = (function() {

	var _inProcess = {};

   	function _isBetween(toTest, a, b) {
		var low = (a < b) ? a : b;
		var high = (a < b) ? b : a;
		return (toTest > low && toTest < high);
	}

	function _destinationForElevator(elevator) {
		var direction = elevator.get('direction');
		if ( direction === app.UP) {
			return elevator.get('passengers').first().get('destination');
		}
		else if (direction === app.DOWN) {
			return elevator.get('passengers').last().get('destination');
		}
	}

	function _closestFloorWithPassengersForDirection(floors, baseFloor, direction) {
		var floorsToCheck, 
			floor,
			floorIndex;
		if (direction === app.UP && baseFloor < floors.length) {
			floorsToCheck = floors.rest(baseFloor - 1);
			floor = _.find(floorsToCheck, function(floor){
				return floor.get('goingUp').length > 0 && !_alreadyCovered(floor.get('floor'), direction);
			});
			return (floor) ? floor.get('floor') : false;
		}
		else if (direction === app.DOWN && baseFloor > 1) {
			floorsToCheck = floors.first(baseFloor);
			for (var i = floorsToCheck.length - 1; i >= 0; --i) {
				floorIndex = floorsToCheck[i].get('floor');
				if (floorsToCheck[i].get('goingDown').length > 0 && !_alreadyCovered(floorIndex, direction))
					return floorIndex;
			}
		}
	}

	function _closestLogicalFloorWithPassengers(floors, baseFloor) {
		var goingUp = _closestFloorWithPassengersForDirection(floors, 1, app.UP),
		 	goingDown = _closestFloorWithPassengersForDirection(floors, floors.length, app.DOWN),
		 	target, 
		 	direction;
		if (Math.abs(goingUp - baseFloor) < Math.abs(goingDown - baseFloor) && goingUp ) {
			direction = app.UP;
			target = goingUp;
		}
		else if (goingDown) {
			direction = app.DOWN;
			target = goingDown;
		}
		if (target) {
			return {
				floor: target,
				direction: direction
			};
		}
	}

	function _send(elevator, floor, direction) {
		if (!_inProcess[floor]) {
			_inProcess[floor] = [];
		}
		_inProcess[floor].push(direction);
		elevator.set('direction', direction);
		elevator.moveTo(floor);
	}

	function _alreadyCovered(floor, direction) {
		if (!_inProcess[floor]) return false;
		if (_inProcess[floor].length === 2) return true;
		return (_inProcess[floor][0] === direction);
	}

	return {
		dispatch: function(floors, elevators) {
			var target, 
				direction,
				potentialTarget;
			_inProcess = {};
			elevators.each(function(elevator) {
				var currentFloor = elevator.get('currentFloor');
				if (elevator.available()) {
					target = _closestLogicalFloorWithPassengers(floors, currentFloor);
					if (target) {
						_send(elevator, target.floor, target.direction);
					}
				}
				else if (!elevator.get('moving') && !elevator.get('doorOpen')){
					direction = elevator.get('direction');
					target = elevator.nextPassengerDestination();
					potentialTarget = _closestFloorWithPassengersForDirection(floors, currentFloor, direction);
					if (potentialTarget && _isBetween(potentialTarget, currentFloor, target)) {
						target = potentialTarget;
					}
					_send(elevator, target, direction);
				}
			});
		},
	};
});