enyo.kind({
	name: "wp.Posts",
	kind: "Scroller",
	touch: true,
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
				{name: "postContainer", kind: "Scroller", style: "position: relative;", components: [
					{tag: "div", id: "title", style: "margin-left: 5px; margin-right: 5px;"},
					{tag: "div", id: "postBody", style: "margin-left: 5px; margin-right: 5px;"},
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
		getPosts();
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
	var params = [sessionStorage.blogid, sessionStorage.username, sessionStorage.password];
	var xmlrpc_data =  XMLRPCBuilder.marshal("wp.getPosts", params);
	makePostRequest(sessionStorage.url, xmlrpc_data);
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
	//console.log(fault);
	var postIdData = [];
	var postStatusData = [];
	var postTitleData = [];
	var postContentData = [];
	if (json instanceof Array) {
		for (var i = 0; i < json.length; i++) {
			var obj = json[i];
			for(var key in obj) {
				if (key == "post_id") {
					postIdData.push(obj[key]);
				}
				if (key == "post_title") {
					postTitleData.push(obj[key]);
				}
				if (key == "post_status") {
					if (obj[key] == "publish") {
						postStatusData.push("Published");
					}
					else if (obj[key] == "draft") {
						postStatusData.push("Draft");
					}
					else if (obj[key] == "private") {
						postStatusData.push("Private");
					}
				}
				if (key == "post_content") {
					postContentData.push(obj[key]);
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
			    /*
			     Iterate through the array and get the all the elements text
			    */
			    //var data = {};
			    //for (i=0; i<childs.length; i++)
			    //       data[childs[i].id] = childs[i].innerHTML;

			    /*
			      Now you can access the data as:
			      data.itemID, data.itemTitle, data.Status
			    */
			    //alert(data.itemId);
			    /*
			         Or if you are interested in first element then
			    */
			    var itemId = childs[1].innerHTML;
			    //alert(itemId);

			    for (var i = 0; i < json.length; i++) {
					if (postIdData[i] == itemId) {
						document.getElementById("title").innerHTML = postTitleData[i];
						var element = document.getElementById("outerContainer");
						element.parentNode.removeChild(element);
						//alert(postContentData[i]);
						document.getElementById("postBody").innerHTML = postContentData[i];
					}
				}
			});
			listContainer.appendChild(listElement);

			//create and attach the subchilds for listElement.

			var itemTitle = document.createElement("span");
			itemTitle.innerHTML = postTitleData[i];
			itemTitle.id = 'title'+i;
			itemTitle.className = "itemTitle";
			listElement.appendChild(itemTitle);

			var itemId = document.createElement("div");
			itemId.innerHTML = postIdData[i];
			itemId.id = 'id'+i;
			itemId.className = "itemId";
			listElement.appendChild(itemId);
			
			var itemStatus = document.createElement("span");
			itemStatus.innerHTML = postStatusData[i];
			itemStatus.id = 'status'+i;
			itemStatus.className = "itemStatus";
			listElement.appendChild(itemStatus);

			/*console.log(postIdData[i]);
			console.log(postStatusData[i]);
			console.log(postTitleData[i]);*/
		}
	} else {
		 console.log(json);
	}
}

function handlePostError(xhr) {
	alert("Error: " + xhr.statusText);
}
