enyo.kind({
	name: "wp.Posts",
	kind: "FittableRows",
	fit: true,classes: "enyo-fit",
	components:[

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Button", ontap: "drawerTap", style: "background-color: #21759b; width: 20px; margin-top: 10px; margin-left: -20px; margin-right: 10px; padding-top: 7px; padding-right: 5px;", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "drawer",  src: "images/toolbar/drawer.png"},
			]},
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left:5px; height: 38px; width: 38px;"},
			{content: "Posts", fit: true}, 
			{kind: "onyx.Button", classes: "toolbarButton", style: "background-color: #21759b;", ontap: "refresh", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "refresh",  src: "images/toolbar/refresh.png"}
			]},
			{kind: "onyx.Button", classes: "toolbarButton", style: "background-color: #21759b;", ontap: "newPostTap", components: [
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
				{id: "outerContainer", tag: "div"}
				//Posts List Definition
				
				/*{
					name: "postList",
					kind: "List",
					fit: true,
					count: 0,
					onSetupItem: "setupPostItem",
					components: [
						{
							name: "listItem",
							classes: "listItemContainer",
							ontap: "listItemTap",
							components: [
								{
									name: "postId",
									content: "",
									style: "visibility: hidden;"
								},
								{
									name: "postTitle",
									content: "Set Title..."
								},
								{
									name: "postStatus",
									content: "Set Status...",
									style: "text-align: right; font-size: 14px; font-weight: none; margin-top: 2px; padding-bottom: 0;"
								}
							]
						}
					]
				}*/
			]},
		]}
	],
	/*postDatasource: [
		{name: "Installing Sublime Text 2 on Fedora 19 – Schrodinger’s Cat", gist: "Here’s another three step guide to installing Sublime Text 2 on Fedora 19 – Schrodinger’s Cat:- Download the installation script from the following gist. https://gist.github.com/sayak-sarkar/5810101 Extract it to your home directory [or anywhere you like]. $tar -xvf gist5810101-3b0e9bb3ef5128760df9e3e06877fa4f7e5689ec.tar.gz Open your terminal (preferably as super user), navigate to your home directory and execute the shell script."},
		{name: "Installing VLC player on Fedora 19 – Schrodinger’s Cat", gist: "Here’s a simple three step guide to installing VLC media player on Fedora 19 [Schrodinger's Cat]:- Login as Super User: $su Setup rpmfusion: #rpm -ivh http://download1.rpmfusion.org/free/fedora/rpmfusion-free-release-stable.noarch.rpm Install vlc using the default yum package manager: #yum install vlc mozilla-vlc Voila! You now have VLC media player installed on you computer! Filed under: Fedora, How-to Guides, Technology,"},
		{name: "Porting WordPress for WebOS to Firefox OS", gist: "Introduction to WordPress for WebOS WordPress for WebOS was a web app which used the WebOS platform’s innovative “Cards” feature, which allowed users to quickly switch between managing, editing, and browsing content. WordPress for WebOS was built around Sliding Panels that enables users to easily switch between creating, editing and managing content. The app allowed "},
		{name: "Programming on Mobile Devices", gist: "This is a thought that’s been rather bugging me for sometime now: Is writing code (programming) via mobile devices really not a very feasible idea? In the current scenario, almost all conventional programming is done on desktop computers (PCs, laptops and the likes), wherein we have a standard keyboard which is used to write down "},
		{name: "The Greek Experience – Remo Training Days", gist: "Last week Mozilla brought together 40 Mozilla Reps from all over the world at Athens for week-long training exercise called Reps Training Days. The idea was to gather the most pro-active Mozillians under the ReMo programme in a single place and train them about leading the Webmaker initiative in their respective communities. The training event "},
		{name: "Running Friendlycode – A local instance of Thimble", gist: "Here is a breakdown of how to run Friendlycode in 3 (maybe not-so-simple) steps. Prerequisite: A static file server such as Apache. Steps:- Download Friendlycode from here. Extract the contents of the friendlycode-gh-pages package into a directory named friendlycode within your file server’s document root. For example, in Apache you might want to put the "},
		{name: "Installing Steam for Linux Beta | Counter Strike for Fedora 17/18", gist: "Here’s the link to a really interesting article by Russel Bryant that I found on the web. Especially helpful for all my geeky gamer friends who keep on complaining about how they are not able to play Counter Strike or Team Fortress 2 on their Linux based systems. Enjoy! If however you are a counter"},
		{name: "Debugging NO KEY warning during “yum install vlc”", gist: "This is a problem that I encountered today while tryiing to install VLC media player on my brand new Fedora 18 installation. Right after the dependency resolutions are complete, yum returns the following warning:- Transaction Summary =============================================== Install 1 Package (+45 Dependent packages) Total size: 37 M Installed size: 118 M Is this ok [y/N]:"},
		{name: "LAMP Setup for Fedora 18", gist: "Easy steps to setup Fedora 18 as a LAMP server containing Apache, PHP, Perl, Python, Ruby and MySQL. P.S.: This requires root access to the shell. Step 1: Open terminal as root user and enter the following: #yum install -y httpd php php-mysql php-gd php-imap php-ldap php-odbc php-pear php-xml php-xmlrpc php-magickwand php-mbstring php-mcrypt php-mssql php-shout"},
		{name: "Adobe Flex Builder 3 Download", gist: "Reblogged from Chris Tierney: I had to track down a download location for Adobe's Flex 3 install today. It was a little hard to find so I thought I'd share this link for a Windows install: http://download.macromedia.com/pub/flex/flex_builder/FB3_win.exe Why it's at a macromedia.com address I have no clue, but hope this helps someone out. This defaults"}
	],*/
	menuDatasource: [
		{name: "Reader"},
		{name: "Posts"},
		{name: "Pages",},
		{name: "Comments"},
		{name: "Stats"},
		{name: "View Site"},
	],	
	create: function () {
		getPosts();
		this.inherited(arguments);
		/*this.$.postList.setCount(this.postDatasource.length);*/
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
	/*setupPostItem: function (inSender, inEvent) {
		this.childName = this.postDatasource[inEvent.index].name;
		this.$.postTitle.setContent(this.childName);
	},*/
	listItemTap:function(inSender, inEvent) {
		/*alert(this.postDatasource[inEvent.index].gist);*/
	},
	newPostTap: function(inSender, inEvent) {
		new wp.PostCompose().renderInto(document.body);
	},
	drawerTap: function (inSender, inEvent) {
		this.$.menuDrawer.setOpen(!this.$.menuDrawer.open);
	},
	refresh: function(inSender, inEvent) {
		new wp.Posts().renderInto(document.body);
	}
});

function getPosts () {
	var params = [sessvars.blogid, sessvars.username, sessvars.password];
	var xmlrpc_data =  XMLRPCBuilder.marshal("wp.getPosts", params);
	//console.log(xmlrpc_data);
	makePostRequest(sessvars.url, xmlrpc_data);
}


function makePostRequest(url, data) {
	var xhr = new XMLHttpRequest({mozSystem:true});
	xhr.open('POST', url);
	
	xhr.onreadystatechange = function() {
		console.log("Readystate: ", xhr.readyState)
	}
	
	xhr.onload = function() {
		handlePostSuccess(xhr);
	};
	
	xhr.onerror = function() {
		handlePostError(xhr);
	};
	
	xhr.send(data);
	return xhr;
}

function handlePostSuccess(xhr) {
	var parser = new XMLRPCParser(xhr.response);
	var json = parser.toObject();
	var fault = parser.fault;
	console.log(fault);
	var idData = [];
	var statusData = [];
	var titleData = [];
	if (json instanceof Array) {
		for (var i = 0; i < json.length; i++) {
			var obj = json[i];
			for(var key in obj) {
				if (key == "post_id") {
					idData.push(obj[key]);
				}
				if (key == "post_title") {
					titleData.push(obj[key]);
				}
				if (key == "post_status") {
					if (obj[key] == "publish") {
						statusData.push("Published");
					}
					else if (obj[key] == "draft") {
						statusData.push("Draft");
					}
					else if (obj[key] == "private") {
						statusData.push("Private");
					}
				}
				console.log(key, obj[key]);
			}
		}
		var listContainer = document.createElement("div");
		document.getElementById("outerContainer").appendChild(listContainer);
		var listElement = document.createElement("div");
		listContainer.appendChild(listElement);
		listElement.className = "listItemContainer";

		for (var i = 0; i < json.length; i++) {
			
			var itemId = document.createElement("div");
			itemId.innerHTML = idData[i];
			listElement.appendChild(itemId);
			itemId.className = "itemId";

			var itemTitle = document.createElement("div");
			itemTitle.innerHTML = titleData[i];
			listElement.appendChild(itemTitle);
			itemTitle.className = "itemTitle";
			
			var itemStatus = document.createElement("div");
			itemStatus.innerHTML = statusData[i];
			listElement.appendChild(itemStatus);
			itemStatus.className = "itemStatus";

			listElement.appendChild(document.createElement("hr"));

			console.log(idData[i]);
			console.log(statusData[i]);
			console.log(titleData[i]);
		}
	} else {
		 console.log(json);
	}
}

function handlePostError(xhr) {
	alert("Error: " + xhr.statusText);
}