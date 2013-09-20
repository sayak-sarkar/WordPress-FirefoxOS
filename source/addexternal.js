enyo.kind({
	name: "wp.AddExternal",
	kind: "FittableRows",
	fit: true,
	classes: "enyo-fit",
	components: [

		
		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left:10px; height: 38px; width: 38px;"},
			{content: "WordPress", fit: true}
		]},
		

		{kind: "enyo.Image", classes: "logoBanner", src: "images/icon128.png", style: "margin-top: 10px;"},
		
		{content: "ACCOUNT DETAILS", style: "color: grey; margin-left: 20px; margin-bottom: -10px; font-size: 12px; font-weight: bold;"},
		{kind: "onyx.Groupbox", style: "margin-bottom: 10px;", components: [
			{kind: "Input", name: "blogurl", classes: "addExternalInputBox", placeholder: " Blog URL", type: "url", selectOnFocus: true},
			{kind: "Input", name: "username", classes: "addExternalInputBox", placeholder: " Username", type: "text", selectOnFocus: true},
			{kind: "Input", name: "password", classes: "addExternalInputBox", placeholder: " Password", type: "password", selectOnFocus: true}
		]},

		/*
		{kind: "onyx.Button", style: "margin-left: 20px;", content: "Optional Settings", ontap: "optionalSettings"},
		{tag: "br"},
		*/
		{kind: "onyx.Button", style: "margin-top: 2px; margin-left: 100px;", content: "Sign In", ontap: "signIn"},
		{tag: "br"},
		{id: "status", style: "margin-top: 10px; margin-left: 20px; font-size: 12px; font-weight: bold;", content: ""},

		/*
		{content: "Don't yet have a blog?", style: "margin-top: 10px; text-align: center;"},
		{kind: "onyx.Button", style: "margin-left: 68px; height: 55px; width: 180px;", allowHtml: true, content: "Get a free blog at <br/> WordPress.com", ontap: "signUp"}
		*/
	],

	signUp: function () {
		new wp.Signup().renderInto(document.body);
		//window.open("https://en.wordpress.com/signup/?ref=wp-android");
	},

	signIn: function () {
		var url = this.$.blogurl.getValue();
		var username = this.$.username.getValue();
		var password = this.$.password.getValue();	
		var params = [username, password];
		var xmlrpc_data =  XMLRPCBuilder.marshal("wp.getUsersBlogs", params);
		makeRequest(url, xmlrpc_data);
		//new wp.Posts().renderInto(document.body);
	},

	optionalSettings: function() {
		new wp.OptionalSettings().renderInto(document.body);
	}
})