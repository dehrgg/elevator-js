app.Models.SimpleDecisionModel = (function() {
	return {
		dispatch: function(floors, elevators) {
			var freeElevators = [], direction;
			elevators.each(function(elevator) {
				if (elevator.available()) {
					freeElevators.push(elevator);
				}
				else if (!elevator.get('moving') && !elevator.get('doorOpen')){
					direction = elevator.get('direction');
					if ( direction === app.UP) {
						elevator.moveTo(elevator.get('passengers').first().get('destination'));
					}
					else if (direction === app.DOWN) {
						elevator.moveTo(elevator.get('passengers').last().get('destination'));
					}
					else {
						app.LOG_LEVEL <= app.ERROR && console.error('Elevator not available, but not moving');
					}
				}
			});
			if (freeElevators.length > 0) {
				var lowestUpFloor, highestDownFloor;
					floors.each(function(floor) {
					if (floor.get('goingUp').length > 0 && !lowestUpFloor){
						lowestUpFloor = floor.get('floor');
					}
					if (floor.get('goingDown').length > 0) {
						highestDownFloor = floor.get('floor');
					}
				});

				_.each(freeElevators, function(elevator) {
					if (lowestUpFloor) {
						elevator.set('direction', app.UP)
						elevator.moveTo(lowestUpFloor)
						lowestUpFloor = false;
					}
					else if (highestDownFloor) {
						elevator.set('direction', app.DOWN);
						elevator.moveTo(highestDownFloor);
					}
				});
			}
		}
	};
});