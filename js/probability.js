(function() {
		app.Models.Probability = Backbone.Model.extend({

		overrides: [],

		checkArrivals: function(floors) {
			floors.each(this.addArrivals, this);
		},
		
		addArrivals: function(floor) {
			var arrivals = {}, destination, floorNumber = floor.get('floor');
			if (this.anyoneArriving(floorNumber, app.UP)) {
				destination = _randomBetween(floorNumber + 1, this.get('buildingSettings').totalFloors());
				floor.get('goingUp').add(new app.Models.Person({destination: destination}));
			}
			if (this.anyoneArriving(floorNumber, app.DOWN)) {
				destination = _randomBetween(1, this.get('buildingSettings').get('groundFloors'));
				floor.get('goingDown').add(new app.Models.Person({destination: destination}));
			}
		},

		anyoneArriving: function(floor, direction) {
			return Math.random() < this.probabilityForCurrentTime(floor, direction);
		},

		probabilityForCurrentTime: function(floor, direction) {
			var isGroundFloor = floor <= this.get('buildingSettings').get('groundFloors');
			if (isGroundFloor && direction === app.UP) {
				return 0.4;
			}
			else if (isGroundFloor) {
				return (floor === 1) ? 0 : 0.05;
			}
			else if (direction === app.DOWN) {
				return 0.1;
			}
			else {
				return (floor === this.get('buildingSettings').totalFloors()) ? 0 : 0.05;
			}
			// var overrides = this.get('overrides');
			// if (overrides[direction][floor]) {
			// 	return 
			// }
			// 
			// if (overrides[floor]) {
			// 	return _valueForSetting(overrides[floor]);
			// }
			// var buildingSettings = this.get('buildingSettings');
			// if (floor > buildingSettings.get('groundFloors')) {

			// }
		},

		defaults: function() { return _residentialDefaults; }
	});

	function _randomBetween(low, high) {
		return Math.floor(Math.random() * (low - high)) + low;
	}

	var _residentialDefaults = {

	};

	_officeDefaults = {

	};

})();