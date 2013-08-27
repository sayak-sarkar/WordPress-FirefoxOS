enyo.kind({
    name: "wp.Menu",
    components: [
        {kind: "FittableColumns", ontap: "activateColumnsDrawer", classes: "outer-box",
            components: [
                {content: "Activate Horizontal", classes: "inner-box inner-box-h"},
                {name: "columnsDrawer", orient: "h", kind: "onyx.Drawer", fit: true, open: false,
                    components: [
                        {content: "Horizontal Drawer Horizontal Drawer",
                            classes: "inner-box inner-box-h"}
                    ]
                }
            ]
        }
    ],
    create: function () {
        this.inherited(arguments);
    },
    activateColumnsDrawer: function(inSender, inEvent) {
        this.$.columnsDrawer.setOpen(!this.$.columnsDrawer.open);
    }
});