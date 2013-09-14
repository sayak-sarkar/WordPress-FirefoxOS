enyo.kind({
	name: "wp.Signup",
	kind: "FittableRows",
	fit: true,
	classes: "enyo-fit signupPage",
	components: [

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Button", ontap: "backTap", style: "background-color: #21759b; width: 10px; margin-top: 10px; margin-left: -10px; margin-right: 4px; padding-top: 7px; padding-right: 0px;", components: [
				{kind: "onyx.Icon", src: "images/toolbar/back.png", ontap: "backTap", style: "height: 38px;"},
			]},
			
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "height: 38px; width: 38px;"},
			{content: "New Account", fit: true}
		]},

		{kind: "Input", name: "user_email", classes: "signupInputBox", placeholder: " Email Address", type: "email", selectOnFocus: true},

		{kind: "onyx.Groupbox", components: [
			{kind: "Input", name: "user_name", classes: "signupInputBox", placeholder: " Username", type: "text", selectOnFocus: true},
			{kind: "Input", name: "pass1", classes: "signupInputBox", placeholder: " Password", type: "password", selectOnFocus: true},
		]},
		{
			kind: "FittableColumns", classes: "signupInputBox", components: [
				{kind: "Input", name: "blogname", placeholder: " Blog URL", type: "url", fit: true, selectOnFocus: true},
				{allowHtml: true, content: "&nbsp;.wordpress.com", style: "padding-top: 11px;"}
			]
		},
		{
			content: "By submitting this form you agree to the ", allowHtml: true, style: "margin-top: 40px; margin-left: 20px; width: 280px;",
		},
		{
			content: "<br/><a href=''> fascinating terms of service.</a>", allowHtml: true, ontap: "tos", style: "margin-top: -20px; margin-left: 60px; width: 280px;",
		},
		{kind: "onyx.Button", id: "signupButton", content: "Start Blogging", ontap: "submitDetails"}
	],
	backTap: function(inSender, inEvent) {
		new wp.Login().renderInto(document.body);
	},
	submitDetails: function (inSender, inEvent) {
		this.payLoad = {};
		this.payLoad.user_email = this.$.user_email.getValue();
		this.payLoad.user_name = this.$.user_name.getValue();
		this.payLoad.pass1 = this.$.pass1.getValue();
		this.payLoad.blogname = this.$.blogname.getValue();
		console.log(this.payLoad);
		return this.payLoad;

		//This is a standard enyo.Ajax to post data.
		var ajax = new enyo.Ajax({
			url: "https://signup.wordpress.com/signup/",
			method:"POST",
			timeout:5000,
			contentType:"application/json"
		});
		
		// send parameters the remote service using the 'go()' method
		ajax.go(this.payLoad);
		
		// attach responders to the transaction object. processResponse is the handler function.
		ajax.response(this, "processResponse");
		
		// handle error
		ajax.error(this, "processError");
	},
	tos: function (inSender, inEvent) {
		window.open('http://wordpress.com/tos/')
	},
	processResponse:function(inSender,inResponse) {
		alert("All Done");
	},
	processError:function(inSender,inResponse) {
		alert("Failed");
	}
})