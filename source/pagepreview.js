enyo.kind({
	name: "wp.PagePreview",
	kind: "Scroller",
	components:[
		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Button", ontap: "backTap", style: "background-color: #21759b; width: 10px; margin-top: 10px; margin-left: -10px; margin-right: 4px; padding-top: 7px; padding-right: 0px;", components: [
				{kind: "onyx.Icon", src: "images/toolbar/back.png", ontap: "backTap", style: "height: 38px;"},
			]},
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left: 5px; margin-right: 4px; height: 38px; width: 38px;"},
			{content: "Post Preview"}
		]},
		{tag: "div", id: "previewContainer", components: [
			{tag: "div", name: "pagePreviewTitle"},
			{tag: "div", name: "pagePreviewContent"}
		]}
	],
	create: function (inSender, inEvent) {
		//generatePreview();
	},
	backTap: function(inSender, inEvent) {
		new wp.PageCompose().renderInto(document.body);
		populatePageComposer();
	},
});

/*function generatePreview(inSender, inEvent) {
	var titleElement = document.createElement("div");
	titleElement.innerHTML = sessvars.pagetitle;
	titleElement.id = "pagePreviewTitle";
	document.getElementById("previewContainer").appendChild(titleElement);
	
	var contentElement = document.createElement("div");
	contentElement.innerHTML = sessvars.pagecontentField;
	contentElement.id = "pagePreviewContent";
	document.getElementById("previewContainer").appendChild(contentElement);
}*/
