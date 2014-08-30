(function() {
		app.Models.Probability = Backbone.Model.extend({

		overrides: [],
		
		getArrivals: function(floor) {
			var arrivals = {}, destination;
			if (_anyoneArriving(floor, app.UP)) {
				destination = _randomBetween(floor + 1, this.get('buildingSettings').totalFloors());
				arrivals[app.UP] = destination;
			}
			if (_anyoneArriving(floor, app.DOWN)) {
				destination = _randomBetween(1, this.get('buildingSettings').get('groundFloors'));
				arrivals[app.DOWN] = destination;
			}
			return arrivals;
		},

		defaults: function() { return _residentialDefaults; }
	});

	function _annyoneArriving(floor, direction) {
		return Math.random() < _probabilityForCurrentTime(floor, direction);
	}

	function _probabilityForCurrentTime(floor, direction) {
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
	}

	function _randomBetween(low, high) {
		return Math.floor(Math.random() * (low - high)) + low;
	}

	var _residentialDefaults = {

	};

	_officeDefaults = {

	};

})();