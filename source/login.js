enyo.kind({
	name: "wp.Login",
	kind: "FittableRows",
	fit: true,
	classes: "enyo-fit",
	components: [

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left:20px; height: 38px; width: 38px;"},
			{content: "WordPress", fit: true}
		]},

		{kind: "enyo.Image", id: "centerPiece", src: "images/icon128.png"},
		{content: "Start blogging in seconds.", style: "text-align: center;"},
		{
			kind: "FittableRows",
			fit: true,
			classes: "loginButtons",
			components: [
				{kind: "onyx.Button", classes: "loginButton", content: "Start a new blog at WordPress.com", ontap: "signUp"},
				{kind: "onyx.Button", classes: "loginButton", content: "Add blog hosted at WordPress.com", ontap: "addInternal"},
				{kind: "onyx.Button", classes: "loginButton", content: "Add self-hosted WordPress blog", ontap: "addExternal"},
			]
		}
	],
	signUp: function () {
		new wp.Signup().renderInto(document.body);
		//window.open("https://en.wordpress.com/signup/?ref=wp-android");
	},
	addInternal: function () {
		new wp.AddInternal().renderInto(document.body);
	},
	addExternal: function () {
		new wp.AddExternal().renderInto(document.body);
	}
})