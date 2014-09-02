app.Models.BuildingSettings = Backbone.Model.extend({
	defaults: {
		groundFloors: 3,
		aboveGroundFloors: 14,
		elevators: 2
	},

	totalFloors: function() {
		return this.get('groundFloors') + this.get('aboveGroundFloors');
	}
});