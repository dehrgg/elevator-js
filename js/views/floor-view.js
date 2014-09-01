app.Views.Floor = Backbone.View.extend({
	className: 'floor',

	initialize: function(opts) {
		this.shafts = opts.shafts;
		this.template = $('#floor-tmpl').html();
	},

	render: function() {
		this.$el.html(this.template);
		for (var i = 0; i < this.shafts; ++i) {
			$('.shafts', this.$el).append($('<div>').addClass('shaft'));
		}
		return this;
	}
});