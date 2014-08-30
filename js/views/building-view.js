app.Views.Building = Backbone.View.extend({

	subViews: [],

	initialize: function(opts) {
		this.floors = opts.floors();
		this.elevators = opts.elevators();
	},

	render: function() {
		var view, shafts = this.elevators.length;
		this.floors.each(function() {
			view = new app.Views.Floor({ shafts: shafts });
			this.$el.prepend(floor);
		});
		return this;
	}
});