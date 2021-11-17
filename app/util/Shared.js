Ext.define("Core.util.Shared", {
    alternateClassName: ["Shared"],
    singleton: true,

    log: function (msg) {
        console.log(msg);
    },

    getTemplate: function (type) {
        switch (type) {
            case "layout_1":
                return {
                    layout: {
                        type: "hbox",
                        align: "stretch",
                    },
                    items: [
                        {
                            xtype: "panel",
                            itemId: "view_0",
                            layout: "fit",
                            flex: 1,
                        },
                        {
                            xtype: "panel",
                            itemId: "view_1",
                            layout: "fit",
                            flex: 1,
                        },
                        {
                            xtype: "panel",
                            itemId: "view_2",
                            layout: "fit",
                            flex: 1,
                        },
                    ],
                };

            case "layout_2":
                return {
                    layout: {
                        type: "hbox",
                        align: "stretch",
                    },
                    items: [
                        {
							layout: {
								type: "vbox",
								align: "stretch",
							},
                            flex: 1,
							items: [{
								xtype: "panel",
								itemId: "view_0",
								layout: "fit",
								flex: 1,
							},
							{
								xtype: "panel",
								itemId: "view_1",
								layout: "fit",
								flex: 1,
							}]
						},
                        {
                            xtype: "panel",
                            itemId: "view_2",
                            flex: 1,
                        },
                    ],
                };
            default:
                break;
        }
    },
});
