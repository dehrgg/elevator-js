var app = {
	Models: [],
	Collections: [],
	Views: [],

	UP: 1,
	DOWN: -1,

	start: function() {

		var buildingSettings = new app.Models.BuildingSettings();

		var floors = new app.Collections.Floors();
		var elevators =  new app.Collections.Elevators();

		for (var i = 1; i <= buildingSettings.totalFloors(); ++i) {
			floors.add(new app.Models.Floor({
				floor: i
			}));
		}

		for (i = 0; i < buildingSettings.get('elevators'); ++i) {
			elevators.add(new app.Models.Elevator({
				currentFloor: 1
			}));
		}

		var probability = new app.Models.Probability({
			buildingSettings: buildingSettings
		});

		var simulator = new app.Models.Simulator({
			floors: floors,
			elevators: elevators,
			probability: probability,
			decisionModel: new app.Models.SimpleDecisionModel()
		});

		var buildingView = new app.Views.Building({
			el: $('#mainshow .building'),
			floors: floors,
			elevators: elevators,
		});
		buildingView.render();

		simulator.start();
	}
};