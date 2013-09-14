enyo.kind({
	name: "wp.Comments",
	kind: "FittableRows",
	fit: true, classes: "enyo-fit",
	components:[

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Button", ontap: "drawerTap", style: "background-color: #21759b; width: 20px; margin-top: 10px; margin-left: -20px; margin-right: 10px; padding-top: 7px; padding-right: 5px;", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "drawer",  src: "images/toolbar/drawer.png"},
			]},
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left:5px; height: 38px; width: 38px;"},
			{content: "Comments", fit: true}, 
			{kind: "onyx.Button", classes: "toolbarButton", style: "background-color: #21759b;", ontap: "refresh", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "refresh",  src: "images/toolbar/refresh.png"}
			]}
		]},


		{name: "menuContainer", kind: "FittableColumns", fit: true, components: [
			{kind: "FittableColumns", components: [
				{
					name: "menuDrawer",
					kind: "onyx.Drawer",
					layoutKind: "FittableRowsLayout",
					style: "height: 100%;",
					orient: "h",
					open: false,
					components: [
						{
							name: "menuList",
							kind: "List",
							onSetupItem: "setupMenuItem",
							style: "background-color: grey; width: 150px;",
							touch: "true",
							components: [
								{
									name: "menuItem",
									classes: "menuItemContainer",
									ontap: "menuItemTap",
									components: [
										{
											name: "menuTitle",
											content: "Set Title..."
										}
									]
								}
							]
						},
					],
				},
			]},
			{name: "postContainer", style: "position: relative;", fit: true, components: [
				//Comments List Definition
				{
					name: "commentList",
					kind: "List",
					fit: true,
					count: 0,
					onSetupItem: "setupCommentItem",
					components: [
						{
							name: "commentItem",
							classes: "listItemContainer",
							ontap: "commentItemTap",
							components: [
								{
									name: "commentTitle",
									content: "Set Title..."
								}
							]
						}
					]
				}
			]},
		]}
	],
	commentDatasource: [
		{name: "Comment 1", gist: "First sample comment."},
		{name: "Second Comment", gist: "This is the second sample comment."},
		{name: "Third One", gist: "This one's the third one!"},
		{name: "4th Comment", gist: "Phew! This is the last comment."}
	],
	menuDatasource: [
		{name: "Reader"},
		{name: "Notifications"},
		{name: "Posts"},
		{name: "Pages",},
		{name: "Comments"},
		{name: "Stats"},
		{name: "View Site"}
	],
	create: function () {
		this.inherited(arguments);
		this.$.commentList.setCount(this.commentDatasource.length);
		this.$.menuList.setCount(this.menuDatasource.length);
	},
	setupMenuItem: function (inSender, inEvent) {
		this.childName = this.menuDatasource[inEvent.index].name;
		this.$.menuTitle.setContent(this.childName);
	},
	menuItemTap: function (inSender, inEvent) {
		if (this.menuDatasource[inEvent.index].name == "Posts") {
			new wp.Posts().renderInto(document.body);
		}
		else if (this.menuDatasource[inEvent.index].name == "Pages") {
			new wp.Pages().renderInto(document.body);
		}
		else if (this.menuDatasource[inEvent.index].name == "Comments") {
			new wp.Comments().renderInto(document.body);
		}
		else{
			alert("Functionality on its way!");	
		};
	},
	setupCommentItem: function (inSender, inEvent) {
		this.childName = this.commentDatasource[inEvent.index].name;
		this.$.commentTitle.setContent(this.childName);
	},
	commentItemTap:function(inSender, inEvent) {
		alert(this.commentDatasource[inEvent.index].gist);
	},
	drawerTap: function(inSender, inEvent) {
		this.$.menuDrawer.setOpen(!this.$.menuDrawer.open);
	},
	stub: function(inSender, inEvent) {
		this.$.main.addContent("<br/>");
	}
});
