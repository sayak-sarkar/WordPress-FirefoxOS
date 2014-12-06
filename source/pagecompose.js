enyo.kind({
	name: "wp.PageCompose",
	kind: "Scroller",
	components:[

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Button", ontap: "backTap", style: "background-color: #21759b; width: 10px; margin-top: 10px; margin-left: -10px; margin-right: 4px; padding-top: 7px; padding-right: 0px;", components: [
				{kind: "onyx.Icon", src: "images/toolbar/back.png", ontap: "backTap", style: "height: 38px;"},
			]},
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left: 5px; margin-right: 4px; height: 38px; width: 38px;"},
			{content: "New Page", style: "margin-right: 40px;"}, 
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
				{kind: "onyx.Input", id: "pageComposeTitle", name: "title", placeholder: "Title", style: "width: 270px;"}
			]},
			
			//Text Input Area Definition
			{kind: "onyx.InputDecorator", layoutKind:"FittableRowsLayout", style: "margin-top: 20px; width: 270px; height: 300px;", components: [
				{kind: "onyx.RichText", id: "pageComposeContent", name: "contentField", placeholder: "Content (tap to add text)", fit: true, style: "width: 100%;"}
			]},
		]}
	],
	publishTap: function (inSender, inEvent) {
		sessionStorage.pagetitle = this.$.title.getValue();
		sessionStorage.pagecontentField = this.$.contentField.getValue();
		
		console.log(sessionStorage.pagetitle + "<br/>" + sessionStorage.pagecontentField);
		publishPage();
	},
	draftTap: function (inSender, inEvent) {
		sessionStorage.pagetitle = this.$.title.getValue();
		sessionStorage.pagecontentField = this.$.contentField.getValue();

		console.log(sessionStorage.pagetitle + "<br/>" + sessionStorage.pagecontentField);
		draftPage();
	},
	backTap: function(inSender, inEvent) {
		new wp.Pages().renderInto(document.body);
	}
});

function publishPage() {

	var content = {
		"title": sessionStorage.pagetitle,
		"description" : sessionStorage.pagecontentField,
		"page_status": "publish"
	};
	sessionStorage.statusIndicator = "Publish";
	var params = [sessionStorage.blogid, sessionStorage.username, sessionStorage.password, content];
	var xmlrpc_data =  XMLRPCBuilder.marshal("wp.newPage", params);
	
	makeNewPageRequest(sessionStorage.url, xmlrpc_data);		
}

function draftPage() {

	var content = {
		"title": sessionStorage.pagetitle,
		"description" : sessionStorage.pagecontentField,
		"page_status": "draft"
	};
	sessionStorage.statusIndicator = "Draft";
	var params = [sessionStorage.blogid, sessionStorage.username, sessionStorage.password, content];
	var xmlrpc_data =  XMLRPCBuilder.marshal("wp.newPage", params);
	
	makeNewPageRequest(sessionStorage.url, xmlrpc_data);		
}


function makeNewPageRequest(url, data) {
	var xhr = new XMLHttpRequest({mozSystem:true});
	xhr.open('POST', url);
	
	xhr.onreadystatechange = function() {
		console.log("Readystate: ", xhr.readyState);
		if (xhr.readyState=="4") {
			alert("Page "+sessionStorage.statusIndicator+"ed Successfully!")
		};
	}
	
	xhr.onload = function() {
		handleNewPageSuccess(xhr);
	};
	
	xhr.onerror = function() {
		handleNewPageError(xhr);
	};
	
	xhr.send(data);
	return xhr;
}


function handleNewPageSuccess(xhr) {
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


function handleNewPageError(xhr) {
	document.getElementById("results").innerHTML = "Error: " + xhr.statusText;
}