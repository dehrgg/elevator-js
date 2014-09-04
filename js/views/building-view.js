app.Views.Building = Backbone.View.extend({

	floorViews: {},

	initialize: function(opts) {
		this.floors = opts.floors;
		this.elevators = opts.elevators;
		this.listenTo(this.floors, 'add', this.addFloor);
		this.listenTo(this.floors, 'remove', this.removeFloor);
	},

	render: function() {
		this.floors.each(this.addFloor, this);
		this.elevators.each(this.addElevator, this);
		return this;
	},

	addFloor: function(model) {
		var view = new app.Views.Floor({ 
			model: model,
			shafts: this.elevators.length 
		});
		this.$el.prepend(view.render().$el);
		this.floorViews[model.cid] = view;
	},

	removeFloor: function(model) {
		this.floorViews[model.cid].$el.remove();
		delete this.floorViews[model.cid];
	},

	addElevator: function(model) {
		var view = new app.Views.Elevator({model: model});
		this.$el.append(view.render().$el);
	}
});

app.Views.Elevator = Backbone.View.extend({
	className: 'elevator',

	initialize: function() {
		this.listenTo(this.model, "change:moving", this.updatePosition)
	},

	updatePosition: function(model, newFloor) {
		if (newFloor) {
			var distance = Math.abs(newFloor - model.get('currentFloor'));
			this.$el.animate({
				top: 9 + (-40 * newFloor)
			}, model.get('frequency') * 1000 * distance);
		}
		
	}
});