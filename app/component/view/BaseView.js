Ext.define("Core.component.view.BaseView", {
    extend: "Ext.container.Container",
    xtype: "baseview",
    defaultListenerScope: true,
    layout: "vbox",

    constructor: function (cfg) {
        var cd_navigation = Ext.getStore("cd_navigation");
        var record = cd_navigation.getById(cfg.routeId);
        var jb_data = record.get("jb_data");

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
