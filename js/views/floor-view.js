app.Views.Floor = Backbone.View.extend({
	className: 'floor',

	initialize: function(opts) {
		this.shafts = opts.shafts;
		this.template = $('#floor-tmpl').html();
		this.listenTo(this.model.get('goingUp'), 'add remove reset', this.updateWaitingCounts);
		this.listenTo(this.model.get('goingDown'), 'add remove reset', this.updateWaitingCounts);
	},

	render: function() {
		this.$el.html(this.template);
		for (var i = 0; i < this.shafts; ++i) {
			$('.shafts', this.$el).append($('<div>').addClass('shaft'));
		}
		this.updateWaitingCounts();
		return this;
	},

	updateWaitingCounts: function() {
		this.updateWaitingCount('.person-count:first', this.model.get('goingUp'));
		this.updateWaitingCount('.person-count:last', this.model.get('goingDown'));
	},

	updateWaitingCount: function(selector, collection) {
		var value = collection.length;
		value = value > 0 ? value : '';
		$(selector, this.$el).html(value);
	}
});