app.Models.Probability = Backbone.Model.extend({

	overrides: [],
	
	getArrivals: function(floor) {
		var arrivals = {};
		// arrivals[app.UP] = destination;
		// arrivals[app.DOWN] = destination;
	},

	probabilityForCurrentTime: function(floor, direction) {
		var buildingSettings = this.get('buildingSettings');
	}
});