app.Models.Person = Backbone.Model.extend({

});

app.Collections.PersonQueue = Backbone.Collection.extend({
	model: app.Models.Person
});

app.Collections.DestinationSortedPersonList = Backbone.Collection.extend({
	model: app.Models.Person,
	comparator: 'destination'
});