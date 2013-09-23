enyo.kind({
	name: "wp.PostPreview",
	kind: "Scroller",
	components: [
		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Button", ontap: "backTap", style: "background-color: #21759b; width: 10px; margin-top: 10px; margin-left: -10px; margin-right: 4px; padding-top: 7px; padding-right: 0px;", components: [
				{kind: "onyx.Icon", src: "images/toolbar/back.png", ontap: "backTap", style: "height: 38px;"},
			]},
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left: 5px; margin-right: 4px; height: 38px; width: 38px;"},
			{content: "Post Preview"}
		]},


	],
	backTap: function(inSender, inEvent) {
		new wp.PostCompose().renderInto(document.body);
		populatePostComposer();
	},
});