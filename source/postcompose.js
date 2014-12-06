enyo.kind({
	name: "wp.PostCompose",
	kind: "Scroller",
	components:[

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Button", ontap: "backTap", style: "background-color: #21759b; width: 10px; margin-top: 10px; margin-left: -10px; margin-right: 4px; padding-top: 7px; padding-right: 0px;", components: [
				{kind: "onyx.Icon", src: "images/toolbar/back.png", ontap: "backTap", style: "height: 38px;"},
			]},
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left:5px; height: 38px; width: 38px;"},
			{content: "New Post", style: "margin-right: 40px;"}, 
			{kind: "onyx.Button", classes: "toolbarButton", ontap: "draftTap", style: "background-color: #21759b;", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "saveDraft",  src: "images/toolbar/save.png"}
			]},
			{kind: "onyx.Button", classes: "toolbarButton", ontap: "publishTap", style: "background-color: #21759b;", components: [
				{kind: "onyx.Icon", classes: "buttonIcon", id: "publish",  src: "images/toolbar/publish.png"}
			]}
		]},


		{name: "previewContent", classes: "nice-margins", tag: "div"},

		{name: "main", classes: "nice-padding", touch: true, thumb: true, components: [

			//Title Input box Definition
			{kind: "onyx.InputDecorator", components: [
				{kind: "onyx.Input", id: "post-title" ,name: "title", placeholder: "Title", style: "width: 270px;"}
			]},
			
			//Text Input Area Definition
			{kind: "onyx.InputDecorator", layoutKind:"FittableRowsLayout", style: "margin-top: 20px; width: 270px; height: 300px;", components: [
				{kind: "onyx.RichText", id: "post-content", name: "contentField", placeholder: "Content (tap to add text)", fit: true, style: "width: 100%;"}
			]}
		]}
	],
	publishTap: function (inSender, inEvent) {
		sessionStorage.postTitle = this.$.title.getValue();
		sessionStorage.postcontentField = this.$.contentField.getValue();

		console.log(sessionStorage.postTitle + "<br/>" + sessionStorage.postcontentField);
		console.log(sessionStorage.blogid, sessionStorage.username, sessionStorage.password);

		publishPost();
	},
	draftTap: function (inSender, inEvent) {
		sessionStorage.postTitle = this.$.title.getValue();
		sessionStorage.postcontentField = this.$.contentField.getValue();

		console.log(sessionStorage.postTitle + "<br/>" + sessionStorage.postcontentField);
		console.log(sessionStorage.blogid, sessionStorage.username, sessionStorage.password);

		draftPost();
	},
	backTap: function(inSender, inEvent) {
		new wp.Posts().renderInto(document.body);
	}
});


function publishPost() {

	var content = {
		"post_title": sessionStorage.postTitle,
		"post_status": "publish",
		"post_content" : sessionStorage.postcontentField
	};
	sessionStorage.statusIndicator = "Publish";
	var params = [sessionStorage.blogid, sessionStorage.username, sessionStorage.password, content];
	var xmlrpc_data =  XMLRPCBuilder.marshal("wp.newPost", params);
	
	makeNewPostRequest(sessionStorage.url, xmlrpc_data);		
}

function draftPost() {

	var content = {
		"post_title": sessionStorage.postTitle,
		"post_status": "draft",
		"post_content" : sessionStorage.postcontentField
	};
	sessionStorage.statusIndicator = "Draft";
	var params = [sessionStorage.blogid, sessionStorage.username, sessionStorage.password, content];
	var xmlrpc_data =  XMLRPCBuilder.marshal("wp.newPost", params);
	
	makeNewPostRequest(sessionStorage.url, xmlrpc_data);		
}

function makeNewPostRequest(url, data) {
	var xhr = new XMLHttpRequest({mozSystem:true});
	xhr.open('POST', url);
	
	xhr.onreadystatechange = function() {
		console.log("Readystate: ", xhr.readyState);
		if (xhr.readyState=="4") {
			alert("Post "+sessionStorage.statusIndicator+"ed Successfully!")
		};
	}
	
	xhr.onload = function() {
		handleNewPostSuccess(xhr);
	};
	
	xhr.onerror = function() {
		handleNewPostError(xhr);
	};
	
	xhr.send(data);
	return xhr;
}


function handleNewPostSuccess(xhr) {
	document.getElementById("results").innerHTML = xhr.responseText;

	var parser = new XMLRPCParser(xhr.response);
	var json = parser.toObject();
	var fault = parser.fault;
	console.log(fault);

	if (json instanceof Array) {
		for (var i = 0; i < json.length; i++) {
			var obj = json[i];
			for(var key in obj) {
				console.log(key, obj[key]);
			}
		}
	} else {
		 console.log(json);
	}
	
}


function handleNewPostError(xhr) {
	document.getElementById("results").innerHTML = "Error: " + xhr.statusText;
}