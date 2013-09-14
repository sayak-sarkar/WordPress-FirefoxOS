enyo.kind({
	name: "wp.AddInternal",
	kind: "FittableRows",
	fit: true,
	classes: "enyo-fit",
	components: [

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left:20px; height: 38px; width: 38px;"},
			{content: "WordPress", fit: true}
		]},

		{kind: "enyo.Image", classes: "banner", src: "images/wpcom.png"},

		{content: "ACCOUNT DETAILS", style: "color: grey; margin-left: 20px; margin-bottom: 0px; margin-top: 10px; font-size: 12px; font-weight: bold;"},
		{kind: "onyx.Groupbox", style: "margin-bottom: 10px;", components: [
			{kind: "Input", name: "user_name", classes: "addExternalInputBox", placeholder: " Username", type: "text", selectOnFocus: true},
			{kind: "Input", name: "pass1", classes: "addExternalInputBox", placeholder: " Password", type: "password", selectOnFocus: true}
		]},

		{kind: "onyx.Button", style: "margin-top: 10px; margin-left: 210px;", content: "Sign In", ontap: "signIn"},

		{content: "Don't yet have a blog?", style: "margin-top: 60px; text-align: center;"},
		{kind: "onyx.Button", style: "margin-left: 68px; width: 180px;", allowHtml: true, content: "Get a free blog at <br/> WordPress.com", ontap: "signUp"}
	],
	signUp: function () {
		new wp.Signup().renderInto(document.body);
		//window.open("https://en.wordpress.com/signup/?ref=wp-android");
	},
	signIn: function () {
		new wp.Posts().renderInto(document.body);
	}
})