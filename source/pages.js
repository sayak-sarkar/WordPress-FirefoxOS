enyo.kind({
	name: "wp.Pages",
	kind: "FittableRows",
	fit: true, classes: "enyo-fit",
	components:[

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Button", ontap: "drawerTap", style: "background-color: #21759b; width: 20px; margin-top: 10px; margin-left: -20px; margin-right: 10px; padding-top: 7px; padding-right: 5px;", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "drawer",  src: "images/toolbar/drawer.png"},
			]},
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left:5px; height: 38px; width: 38px;"},
			{content: "Pages", fit: true}, 
			{kind: "onyx.Button", classes: "toolbarButton", style: "background-color: #21759b;", ontap: "refresh", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "refresh",  src: "images/toolbar/refresh.png"}
			]},
			{kind: "onyx.Button", classes: "toolbarButton", style: "background-color: #21759b;", ontap: "newPageTap", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "newContent",  src: "images/toolbar/new.png"}
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
							style: "width: 150px;",
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
				//Pages List Definition
				{
					name: "pageList",
					kind: "List",
					fit: true,
					count: 0,
					onSetupItem: "setupPageItem",
					components: [
						{
							name: "pageItem",
							classes: "listItemContainer",
							ontap: "pageItemTap",
							components: [
								{
									name: "pageTitle",
									content: "Set Title..."
								}
							]
						}
					]
				}
			]},
		]}
	],
	pageDatasource: [
		{name: "Sayak Sarkar - cv", gist: "Here’s my CV!"},
		{name: "GSoC 2012", gist: "bn-Disha.mim"},
		{name: "GSoC 2013", gist: "Porting WordPress for WebOS to Firefox OS"},
		{name: "About Me", gist: "http://sayak.in"}
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
		this.$.pageList.setCount(this.pageDatasource.length);
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
		else if (this.menuDatasource[inEvent.index].name == "Reader") {
			new wp.Reader().renderInto(document.body);
		}
		else{
			alert("Functionality on its way!");	
		};
	},
	setupPageItem: function (inSender, inEvent) {
		this.childName = this.pageDatasource[inEvent.index].name;
		this.$.pageTitle.setContent(this.childName);
	},
	pageItemTap:function(inSender, inEvent) {
		alert(this.pageDatasource[inEvent.index].gist);
	},
	newPageTap: function(inSender, inEvent) {
		new wp.PageCompose().renderInto(document.body);
	},
	drawerTap: function(inSender, inEvent) {
		this.$.menuDrawer.setOpen(!this.$.menuDrawer.open);
	},
	stub: function(inSender, inEvent) {
		this.$.main.addContent("<br/>");
	}
});
