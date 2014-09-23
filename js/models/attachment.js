/* global Backbone */
var models = {};

models.Attachment = Backbone.Model.extend({

	initialize: function () {
		this.set('id', _.uniqueId());

		var s = this.get('fileName');
		if(s.charAt(0) === '/') {
			s = s.substr(1);
		}

		this.set('displayName',s);
	}
});

models.Attachments = Backbone.Collection.extend({
	model: models.Attachment
});

models.MessageFlags = Backbone.Model.extend({
	defaults: {
		answered: false
	}
});

models.Message = Backbone.Model.extend({
	defaults: {
		flags: []
	},

	initialize: function() {
		this.set('flags', new models.MessageFlags(this.get('flags')));
		this.listenTo(this.get('flags'), 'change', this._transformEvent);
	},

	_transformEvent: function(flags) {
		this.trigger('change');
		this.trigger('change:flags', flags);
	},

	// Custom toJSON
	toJSON: function() {
		var data = Backbone.Model.prototype.toJSON.call(this);
		if (data.flags && data.flags.toJSON) {
			data.flags = data.flags.toJSON();
		}
		if (!data.id) {
			data.id = this.cid;
		}
		return data;
	}
});

models.MessageList = Backbone.Collection.extend({
	model: models.Message
});

models.Folder = Backbone.Model.extend({
	defaults: {
		open: false
	},

	toggleOpen: function() {
		this.set({open: !this.get('open')});
	}
});

models.FolderList = Backbone.Collection.extend({
	model: models.Folder
});

models.Account = Backbone.Model.extend({
	folders: models.FolderList
});

models.AccountList = Backbone.Collection.extend({
	model: models.Account,

	comparator: function(folder) {
		return folder.get("id");
	}
});
