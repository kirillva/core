Ext.define("Core.component.view.BaseView", {
    extend: "Ext.container.Container",
    xtype: "baseview",
    defaultListenerScope: true,
    
    layout: {
        type: "hbox",
        align: 'stretch'
    },

    constructor: function (cfg) {
        var cd_navigation = Ext.getStore("NavigationTree");
        var record = cd_navigation.getNodeById(cfg.routeId);
        var jb_data = record.get("jb_data");
        var layout = record.get('layout');
        cfg.layout = { type: layout || 'hbox', align: 'stretch' };

        var items = jb_data.items || [];

        this.items = items.map(function (item) {
            switch (item.xtype) {
                case "basegrid":
                    return {
                        ...item,
                        xtype: "basegrid",
                        editable: true,
                        store: Ext.create(`Core.store.${item.store}`, {
                            model: Ext.ClassManager.get(`Core.model.${item.model}`),
                        }),
                        autoLoad: true,
                        title: item.title,
                        // width: "100%",
                        plugins: [
                            {
                                ptype: "rowediting",
                                clicksToEdit: 1,
                            },
                        ],
                        flex: 1,
                    };

                case "baseform":
                    return item;

                default:
                    return item;
            }
        });
        this.callParent(arguments);
    },
});
