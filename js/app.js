var app = {
	Models: [],
	Collections: [],
	Views: [],

	UP: 1,
	DOWN: -1,

	start: function() {

		var buildingSettings = new app.Models.BuildingSettings();

		var probability = new app.Models.Probability({
			buildingSettings: buildingSettings
		});

		var simulator = new app.Models.Simulator({
			floors: floors,
			elevators: elevators,
			probability: probability
		});

		simulator.start();

		// var buildingView = app.Views.Building({
		// 	el: $('#mainshow')
		// });
	}
};