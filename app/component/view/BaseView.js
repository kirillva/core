Ext.define("Core.component.view.BaseView", {
    extend: "Ext.container.Container",
    xtype: "baseview",
    defaultListenerScope: true,

    layout: {
        type: "hbox",
        align: "stretch",
    },

    config: {
        viewTemplate: null,
        viewRendered: false,
    },

    constructor: function (cfg) {
        var items = this.getTemplate([
            {
                xtype: "panel",
                itemId: "view_0",
                layout: 'fit',
                flex: 1,
            },
            {
                xtype: "panel",
                itemId: "view_1",
                layout: 'fit',
                flex: 1,
            },
            {
                xtype: "panel",
                itemId: "view_2",
                layout: 'fit',
                flex: 1,
            },
        ]);

        this.items = items;
        this.callParent(arguments);
        this.setViewRendered(false);
    },

    listeners: {
        afterlayout: function () {
            this.renderView();
        },
    },

    privates: {
        getTemplate: function (template) {
            return template;
        },

        renderView: function () {
            var me = this;
            var cd_navigation = Ext.getStore("NavigationTree");
            var record = cd_navigation.getNodeById(me.routeId);
            var jb_data = record.get("jb_data");

            if (me.getViewRendered()) return;

            var items = jb_data.items || [];
            this.setViewRendered(true);

            me.suspendLayouts();
            items.forEach((item, id) => {
                var container = me.down(`#view_${id}`);
                if (container) {
                    switch (item.xtype) {
                        case "basegrid":
                            container.add({
                                ...item,
                                xtype: "basegrid",
                                editable: true,
                                store: Ext.create(`Core.store.${item.store}`, {
                                    model: Ext.ClassManager.get(`Core.model.${item.model}`),
                                }),
                                autoLoad: true,
                                title: item.title,
                                plugins: [
                                    {
                                        ptype: "rowediting",
                                        clicksToEdit: 1,
                                    },
                                ],
                                flex: 1,
                            });
                            
                            break;
                        case "baseform":
                            container.add({ ...item });
                            break;

                        default:
                            container.add({ ...item });
                            break;
                    }
                }
            });

            this.setMasked(true);
            me.resumeLayouts(true);
        },
    },
});
