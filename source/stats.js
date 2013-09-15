enyo.kind({
	name: "wp.Stats",
	kind: "FittableRows",
	fit: true, classes: "enyo-fit",
	components:[

		//Header Toolbar Definition
		{name: "topPane", kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Button", ontap: "drawerTap", style: "background-color: #21759b; width: 20px; margin-top: 10px; margin-left: -20px; margin-right: 10px; padding-top: 7px; padding-right: 5px;", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "drawer",  src: "images/toolbar/drawer.png"},
			]},
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left:5px; height: 38px; width: 38px;"},
			{content: "Reader", fit: true}, 
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
			{name: "readerContainer", style: "position: relative;", fit: true, components: [
				{
					fit: true,
					touch: true,
					name: "iframe",
					src: "https://wordpress.com/reader/mobile/v2/",
					tag: "iframe",
					classes: "frame",
					onload: "frameload",
					attributes: {
						onload: enyo.bubbler
					},
					style: "background: white; height:98%; width:100%;"
				}
			]}
		]}
	],
	menuDatasource: [
		{name: "Reader"},
		{name: "Notifications"},
		{name: "Posts"},
		{name: "Pages",},
		{name: "Comments"},
		{name: "Stats"},
		{name: "View Site"},
	],	
	create: function () {
		this.inherited(arguments);
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
			window.open("http://wordpress.com/reader/mobile/v2/");
			//new wp.Reader().renderInto(document.body);
		}
		else if (this.menuDatasource[inEvent.index].name == "Stats") {
			window.open("http://wordpress.com/my-stats/");
			//new wp.Stats().renderInto(document.body);
		}
		else{
			alert("Functionality on its way!");	
		};
	},
	drawerTap: function (inSender, inEvent) {
		this.$.menuDrawer.setOpen(!this.$.menuDrawer.open);
	},
	refresh: function () {
		// reload iframe
	}
})