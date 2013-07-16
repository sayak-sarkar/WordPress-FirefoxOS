enyo.kind({
	name: "wp.Home",
	kind: "FittableRows",
	fit: true,classes: "enyo-fit",
	components:[

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", components: [
			{kind: "onyx.Button", style: "width: 30px;", ontap: "backTap", components: [
				{kind: "onyx.Icon", id: "strongButton",  content: "="}
			]},
			{content: "Posts", fit: true}, 
			
			{kind: "onyx.Button", content: "+", ontap: "newPostTap"},
		]},
	],
	newPostTap: function(inSender, inEvent) {
		new wp.Compose().renderInto(document.body);
	},
	stub: function(inSender, inEvent) {
		this.$.main.addContent("<br/>");
	}
});
