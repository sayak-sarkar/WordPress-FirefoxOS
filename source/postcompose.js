enyo.kind({
	name: "wp.PostCompose",
	kind: "FittableRows",
	fit: true,
	classes: "enyo-fit",
	components:[

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", components: [
			{kind: "onyx.Button", classes: "toolbarButton", ontap: "backTap", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "back",  src: "images/toolbar/back.png"},
			]},
			{content: "New Post", fit: true}, 
			{kind: "onyx.Button", classes: "toolbarButton", ontap: "previewTap", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "preview", src: "images/toolbar/preview.png"}
			]},
			{kind: "onyx.Button", classes: "toolbarButton", ontap: "saveDraftTap", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "saveDraft",  src: "images/toolbar/save.png"}
			]},
			{kind: "onyx.Button", classes: "toolbarButton", ontap: "publishTap", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "publish",  src: "images/toolbar/publish.png"}
			]}
		]},

		{name: "main", classes: "nice-padding", layoutKind:"FittableRowsLayout", fit: true, components: [

			//Title Input box Definition
			{
				 layoutKind:"FittableColumnsLayout", components: [
				 	{kind: "onyx.InputDecorator", fit: true, components: [
						{kind: "onyx.Input", name: "title", placeholder: "Title"}
					]}
				 ]
			},

			//Post Text Area Definition
			{kind: "onyx.Groupbox", style: "margin-top: 15px; ", layoutKind:"FittableRowsLayout", fit: true, components: [
/*
				//WYSIWYG Toolbar Definition
				{kind: "onyx.GroupboxHeader", components: [
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "boldTap", components: [
						{kind: "onyx.Icon", id: "strongButton", content: "B"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "italicTap", components: [
						{kind: "onyx.Icon", id: "emButton", content: "I"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "boldTap", components: [
						{kind: "onyx.Icon", id: "strikethroughButton", content: "ABC"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "underlineTap", components: [
						{kind: "onyx.Icon", id: "uButton", content: "U"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "ulTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "ulButton",  src: "images/compose/icon_ul.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "olTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "olButton",  src: "images/compose/icon_ol.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "blockquoteTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "blockquoteButton",  src: "images/compose/icon_bquote.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "linkTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "linkButton",  src: "images/compose/icon_link.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "moreTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "moreButton",  src: "images/compose/icon_more.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "leftTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "leftButton",  src: "images/compose/icon_left.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "centerTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "centerButton",  src: "images/compose/icon_center.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "rightTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "rightButton",  src: "images/compose/icon_right.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "imageTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "imageButton",  src: "images/compose/icon_camera.png"}
					]},
				]},
				*/
				//Main Scroller Definition
				{kind: "enyo.Scroller", fit: true, horizontal: "hidden", layoutKind:"FittableRowsLayout", touch: true, thumb: true, components: [
	
					//Text Input Area Definition
					{kind: "onyx.InputDecorator", layoutKind:"FittableRowsLayout", fit: true, style: "width: 100%; height: 100%;", components: [
				  	  {kind: "onyx.RichText", name: "contentField", fit: true, style: "width: 100%;"}
					]}
				]},

				//Settings Toolbar Definition
				{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", components: [
					{kind: "onyx.Button", content: "Setings", fit: true, style: "margin-bottom:0;", ontap: "settingsTap"}
				]}
			]}
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
		new wp.Posts().renderInto(document.body);
	},
	settingsTap: function(inSender, inEvent) {
		new wp.PostSettings().renderInto(document.body);
	}
});
