enyo.kind({
	name: "wp.PageCompose",
	kind: "Scroller",
	components:[

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Button", ontap: "backTap", style: "background-color: #21759b; width: 10px; margin-top: 10px; margin-left: -10px; margin-right: 4px; padding-top: 7px; padding-right: 0px;", components: [
				{kind: "onyx.Icon", src: "images/toolbar/back.png", ontap: "backTap", style: "height: 38px;"},
			]},
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left: 5px; margin-right: 4px; height: 38px; width: 38px;"},
			{content: "New Page"}, 
			{kind: "onyx.Button", classes: "toolbarButton", ontap: "previewTap", style: "background-color: #21759b; margin-left: 2px;", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "preview", src: "images/toolbar/preview.png"}
			]},
			{kind: "onyx.Button", classes: "toolbarButton", ontap: "saveDraftTap", style: "background-color: #21759b;", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "saveDraft",  src: "images/toolbar/save.png"}
			]},
			{kind: "onyx.Button", classes: "toolbarButton", ontap: "publishTap", style: "background-color: #21759b;", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "publish",  src: "images/toolbar/publish.png"}
			]}
		]},

		{name: "previewContent", classes: "nice-margins", tag: "div"},

		{name: "main", classes: "nice-padding", touch: true, thumb: true, components: [

			//Title Input box Definition
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", name: "title", placeholder: "Title", style: "width: 270px;"}
			]},
			
			//Text Input Area Definition
			{kind: "onyx.InputDecorator", layoutKind:"FittableRowsLayout", style: "margin-top: 20px; width: 270px; height: 300px;", components: [
				{kind: "onyx.RichText", name: "contentField", placeholder: "Content (tap to add text)", fit: true, style: "width: 100%;"}
			]},

			//Status Menu
			{
				name:"pickerMemberType",
				kind: "onyx.PickerDecorator",
				style: "margin-top: 10px;",
				components: [
					{
						kind: "onyx.PickerButton",
						content: "Status",
						style: "width: 100%"
					},
					{
						kind: "onyx.Picker",
						components: [
							{content: "Publish"},
							{content: "Draft"},
							{content: "Pending Review"},
							{content: "Private"}
						]
					}
				]
			},

		]}
	],

	publishTap: function (inSender, inEvent) {
		this.payLoad = {};
		this.payLoad.title = this.$.title.getValue();
		this.payLoad.contentField = this.$.contentField.getValue();
		console.log(this.payLoad);
		return this.payLoad;
	},
	previewTap: function (inSender, inEvent) {
		this.payLoad = {};
		this.payLoad.title = this.$.title.getValue();
		this.payLoad.contentField = this.$.contentField.getValue();
		console.log(this.payLoad);
		return this.payLoad;
	},
	saveDraftTap: function (inSender, inEvent) {
		this.payLoad = {};
		this.payLoad.title = this.$.title.getValue();
		this.payLoad.contentField = this.$.contentField.getValue();
		console.log(this.payLoad);
		return this.payLoad;
	},
	backTap: function(inSender, inEvent) {
		new wp.Pages().renderInto(document.body);
	},
	settingsTap: function(inSender, inEvent) {
		new wp.PageSettings().renderInto(document.body);
	}
});
