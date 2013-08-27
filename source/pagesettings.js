enyo.kind({
	name: "wp.PageSettings",
	kind: "FittableRows",
	fit: true, classes: "enyo-fit",
	components:[
		{name: "main", kind: "Scroller", classes: "nice-padding", fit: true, components: [
			{name: "Status", layoutKind: "FittableColumnsLayout", components: [
				{classes: "settings-labels", content: "Publish", style:"padding-top: 10px; padding-right: 60px;",  name: "publish-status"}, 
				{			
					//Status Menu
					name:"pickerMemberType",
					kind: "onyx.PickerDecorator",
					fit: true,
					components: [
						{
							kind: "onyx.PickerButton",
							content: "Status",
							style: "width: 100%;"
						},
						{
							kind: "onyx.Picker",
							components: [
								{content: "Publish"},
								{content: "Draft"},
								{content: "Review Required"},
								{content: "Private"}
							]
						}
					]
				}
			]},
			{tag: "hr"},
			
			//Password Input Box Definition
			{
				layoutKind: "FittableRowsLayout", components: [
				 	{classes: "settings-labels", content: "Password", name: "password-input"},
				 	{
				 		layoutKind: "FittableColumnsLayout", components: [
						 	{kind: "onyx.InputDecorator", fit: true, components: [
								{kind: "onyx.Input", name: "password", placeholder: "Password", style: "width: 100%"}
							]}
						]
				 	}
				]
			},
			{tag: "hr"},

			//Publish Date Selector Definition
			{
				kind: "FittableRows", classes: "onyx", components: [
					{content:"Publish Date & Time", classes:"settings-labels"},
					{style:"background: #fff; padding-left: 20px;", fit:true, components: [
						{name:"datePicker", kind:"onyx.DatePicker"}
					]},
					{style:"background: #fff; padding-left: 35px;", fit:true, components: [
						{name:"timePicker", kind:"onyx.TimePicker"}
					]}
				]
			},

			{kind: "onyx.Toolbar", layoutKind: "FittableColumnsLayout", style: "text-align:center;", components: [
					{kind: "onyx.Button", content: "Save", style: "margin-bottom:0;", ontap: "saveTap"},
					{kind: "onyx.Button", content: "Cancel", style: "margin-bottom:0;", ontap: "cancelTap"}
			]}


		]}
	],
	create: function () {
		this.inherited(arguments);
	},
	saveTap: function (inSender, inEvent) {
		alert("Preferences Saved!");
		new wp.PageCompose().renderInto(document.body);
	},
	cancelTap: function (inSender, inEvent) {
		alert("Changes Discarded!");
		new wp.PageCompose().renderInto(document.body);
	}

});
