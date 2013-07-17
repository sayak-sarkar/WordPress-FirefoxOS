enyo.kind({
	name: "wp.Compose",
	kind: "FittableRows",
	fit: true,
	classes: "enyo-fit",
	components:[

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", components: [
			{kind: "onyx.Button", classes: "toolbarButton", ontap: "backTap", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "back",  src: "assets/toolbar/back.png"},
			]},
			{content: "New Post", fit: true}, 
			{kind: "onyx.Button", content: "Preview", ontap: "previewTap"},
			{kind: "onyx.Button", content: "Save Draft", ontap: "saveDraftTap"},
			{kind: "onyx.Button", content: "Publish", ontap: "publishTap"},
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
						{kind: "onyx.Icon", classes: "buttonIcon", id: "ulButton",  src: "assets/compose/icon_ul.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "olTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "olButton",  src: "assets/compose/icon_ol.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "blockquoteTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "blockquoteButton",  src: "assets/compose/icon_bquote.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "linkTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "linkButton",  src: "assets/compose/icon_link.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "moreTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "moreButton",  src: "assets/compose/icon_more.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "leftTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "leftButton",  src: "assets/compose/icon_left.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "centerTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "centerButton",  src: "assets/compose/icon_center.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "rightTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "rightButton",  src: "assets/compose/icon_right.png"}
					]},
					{kind: "onyx.Button", classes: "toolbarButton", ontap: "imageTap", components: [
						{kind: "onyx.Icon", classes: "buttonIcon", id: "imageButton",  src: "assets/compose/icon_camera.png"}
					]},
				]},
				
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
	backTap: function(inSender, inEvent) {
		new wp.Posts().renderInto(document.body);
	},
	stub: function(inSender, inEvent) {
		this.$.main.addContent("<br/>");
	}
});
