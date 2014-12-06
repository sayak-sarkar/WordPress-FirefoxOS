enyo.kind({
	name: "wp.Comments",
	kind: "Scroller",
	touch: true,
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

		{tag: "div", id: "contents", components:[
			{name: "menuContainer", id: "menuContainer", kind: "FittableColumns", fit: true, components: [
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
				{name: "commentContainer", kind: "Scroller", style: "position: relative;", components: [
					{tag: "div", id: "author", style: "margin-left: 5px; margin-right: 5px;"},
					{tag: "div", id: "author_email", style: "margin-left: 5px; margin-right: 5px;"},
					{tag: "div", id: "author_url", style: "margin-left: 5px; margin-right: 5px;"},
					{tag: "div", id: "post_title", style: "margin-left: 5px; margin-right: 5px;"},
					{tag: "div", id: "comment_content", style: "margin-left: 5px; margin-right: 5px;"},
					{id: "outerContainer", tag: "div"}
				]}
			]}
		]}
	],
	menuDatasource: [
		{name: "Reader"},
		{name: "Posts"},
		{name: "Pages",},
		{name: "Comments"},
		{name: "Stats"},
		{name: "View Site"},
	],	
	create: function () {
		getComments();
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
		else if (this.menuDatasource[inEvent.index].name == "View Site") {
			window.open(sessionStorage.inputUrl);
		}
		else{
			alert("Functionality on its way!");	
		}
	},
	drawerTap: function (inSender, inEvent) {
		this.$.menuDrawer.setOpen(!this.$.menuDrawer.open);
	},
	refresh: function(inSender, inEvent) {
		new wp.Comments().renderInto(document.body);
	}
});

function getComments() {
	var params = [sessionStorage.blogid, sessionStorage.username, sessionStorage.password];
	var xmlrpc_data =  XMLRPCBuilder.marshal("wp.getComments", params);
	makeCommentRequest(sessionStorage.url, xmlrpc_data);
}

function makeCommentRequest(url, data) {
	var xhr = new XMLHttpRequest({mozSystem:true});
	xhr.open('POST', url);
	
	xhr.onreadystatechange = function() {
		console.log("Readystate: ", xhr.readyState)
	}
	
	xhr.onload = function() {
		handleCommentSuccess(xhr);
	};
	
	xhr.onerror = function() {
		handleCommentError(xhr);
	};
	
	xhr.send(data);
	return xhr;
}

function handleCommentSuccess(xhr) {
	var parser = new XMLRPCParser(xhr.response);
	var json = parser.toObject();
	var fault = parser.fault;
	//console.log(fault);

	var commentIdData = [];
	var commentStatusData = [];
	var commentContentData = [];
	var commentPostTitleData = [];
	var commentAuthorData = [];
	var commentAuthorUrlData = [];
	var commentAuthorEmailData = [];
	
	if (json instanceof Array) {
		for (var i = 0; i < json.length; i++) {
			var obj = json[i];
			for(var key in obj) {
				if (key == "comment_id") {
					commentIdData.push(obj[key]);
				}
				if (key == "status") {
					if (obj[key] == "hold") {
						commentStatusData.push("Unapproved");
					}
					else if (obj[key] == "approve") {
						commentStatusData.push("Approved");
					}
				}
				if (key == "content") {
					commentContentData.push(obj[key]);
				}
				if (key == "post_title") {
					commentPostTitleData.push(obj[key]);
				}
				if (key == "author") {
					commentAuthorData.push(obj[key]);
				}
				if (key == "author_url") {
					commentAuthorUrlData.push(obj[key]);
				}
				if (key == "author_email") {
					commentAuthorEmailData.push(obj[key]);
				}
				//console.log(key, obj[key]);
			}
		}

		var listContainer = document.createElement("div");
		document.getElementById("outerContainer").appendChild(listContainer);

		for (var i = 0; i < json.length; i++) {

			//create the element container and attach it to listContainer.
			var listElement = document.createElement("div");
			listElement.id = i;
			listElement.className = "listItemContainer";
			listElement.addEventListener("click", function(e){
				var target = e.target;
				var childs = target.children;
				var itemId = childs[1].innerHTML;
				//alert(itemId);

			    for (var i = 1; i < json.length; i++) {
					if (commentIdData[i] == itemId) {
						document.getElementById("author").innerHTML = commentAuthorData[i];
						document.getElementById("author_email").innerHTML = commentAuthorEmailData[i];
						document.getElementById("author_url").innerHTML = "<a href="+commentAuthorUrlData[i]+">"+commentAuthorUrlData[i]+"</a>";
						document.getElementById("post_title").innerHTML = commentPostTitleData[i];
						document.getElementById("comment_content").innerHTML = commentContentData[i];
						var element = document.getElementById("outerContainer");
						element.parentNode.removeChild(element);
					}
				}
			});
			listContainer.appendChild(listElement);

			//create and attach the subchilds for listElement.

			var commentAuthor = document.createElement("span");
			commentAuthor.innerHTML = commentAuthorData[i];
			commentAuthor.id = 'author'+i;
			commentAuthor.className = "itemTitle";
			listElement.appendChild(commentAuthor);

			var commentId = document.createElement("div");
			commentId.innerHTML = commentIdData[i];
			commentId.id = 'id'+i;
			commentId.className = "itemId";
			listElement.appendChild(commentId);
				
			var commentStatus = document.createElement("span");
			commentStatus.innerHTML = commentStatusData[i];
			commentStatus.id = 'status'+i;
			commentStatus.className = "commentStatus";
			listElement.appendChild(commentStatus);
		}
	} 
	else {
		console.log(json);
	}
}

function handlecommentError(xhr) {
	alert("Error: " + xhr.statusText);
}