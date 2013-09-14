enyo.kind({
	name: "wp.OptionalSettings",
	kind: "FittableRows",
	fit: true,
	classes: "enyo-fit",
	components: [

		//Header Toolbar Definition
		{kind: "onyx.Toolbar", layoutKind:"FittableColumnsLayout", classes: "toolbar", components: [
			{kind: "onyx.Icon", src: "images/toolbar/wp.png", style: "margin-left:20px; height: 38px; width: 38px;"},
			{content: "WordPress", fit: true}
		]},

		{content: "OPTIONAL SETTINGS", style: "color: grey; margin-left: 20px; margin-top: 20px; margin-bottom: 0px; font-size: 12px; font-weight: bold;"},
		{kind: "onyx.Groupbox", style: "margin-bottom: 10px;", components: [
			{kind: "Input", name: "http_user_name", classes: "addExternalInputBox", placeholder: " HTTP username", type: "text", selectOnFocus: true},
			{kind: "Input", name: "http_pass1", classes: "addExternalInputBox", placeholder: " HTTP password", type: "password", selectOnFocus: true}
		]},

		{kind: "onyx.Button", style: "background-color: #ffffff; margin-left: 120px;", content: "Cancel", ontap: "cancelTap"},
		{kind: "onyx.Button", style: "background-color: #ffffff; margin-left: 20px;", content: "Save", ontap: "saveTap"},
	],
	cancelTap: function () {
		alert('Changes discarded.');
		new wp.AddExternal().renderInto(document.body);
	},
	saveTap: function () {
		alert('HTTP settings saved.');
		new wp.AddExternal().renderInto(document.body);
	}
})