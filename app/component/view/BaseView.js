Ext.define("Core.component.view.BaseView", {
    extend: "Ext.container.Container",
    xtype: "baseview",
    defaultListenerScope: true,

    layout: 'fit',

    config: {
        viewTemplate: null,
        viewRendered: false,
        record: null
    },

    constructor: function (cfg) {
        var layout = cfg.node.get('layout');
        var items = Shared.getTemplate(layout);
        var { listeners, ..._items } = items;
        
        var cd_navigation = Ext.getStore("NavigationTree");
        var record = cd_navigation.getNodeById(cfg.routeId);

        this.record = record;
        this.items = _items;

        this.listeners = { ...cfg.listeners || {}, ...listeners }
        this.callParent(arguments);
        
        this.setViewRendered(false);
    },

    listeners: {
        afterlayout: function () {
            this.renderView();
        },
    },

    privates: {
        renderView: function () {
            var me = this;
            // var cd_navigation = Ext.getStore("NavigationTree");
            // var record = cd_navigation.getNodeById(me.routeId);
            var jb_data = this.record.get("jb_data");

            if (me.getViewRendered()) return;

            var items = jb_data.items || [];
            this.setViewRendered(true);

            me.suspendLayouts();
            
            items.forEach((item, id) => {
                var container = me.down(`#view_${id}`);
                var rowediting = item.rowediting || {};

                if (container) {
                    switch (item.xtype) {
                        case "basegrid":
                            container.add({
                                ...item,
                                xtype: "basegrid",
                                editable: item.editable,
                                store: (
                                    typeof item.store === 'string' ?
                                        Ext.create(`Core.store.${item.store}`, {
                                            model: Ext.ClassManager.get(`Core.model.${item.model}`),
                                        }) 
                                        : item.store
                                ),
                                title: item.title,
                                height: '100%',
                                plugins: [
                                    {
                                        ptype: "rowediting",
                                        itemId: 'rowediting',
                                        clicksToEdit: 1,
                                        ...rowediting
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
