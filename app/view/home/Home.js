Ext.define("Core.view.home.Home", {
    extend: "Ext.container.Container",
    xtype: "home",
    defaultListenerScope: true,
    layout: "vbox",

    constructor: function () {
        var cd_navigation = Ext.getStore("cd_navigation");
        var home = cd_navigation.getById("home");
        var jb_data = home.get("jb_data");

        this.items = jb_data.map(function (item) {
            return {
                xtype: "basegrid",
                editable: true,
                store: Ext.create(`Core.store.${item.store}`, {
                    model: Ext.ClassManager.get(`Core.model.${item.model}`),
                }),
                autoLoad: true,
                title: item.title,
                width: "100%",
                plugins: [
                    {
                        ptype: "rowediting",
                        clicksToEdit: 1,
                    },
                ],
                flex: 1,
            };
        });
        this.callParent(arguments);
    },
});
