Ext.define("Core.view.settings.EditFields", {
    extend: "Ext.panel.Panel",
    xtype: "editfields",

    config: {
        selectedRecord: null,
    },

    layout: "fit",

    setSelectedRecord: function (record) {
        var me = this;
        this.selectedRecord = record;
        if (!record) return;
        var jb_data = record.get("jb_data");

        this.removeAll(true);
        this.add({
            xtype: "basegrid",
            editable: true,
            plugins: [{
                ptype: "rowediting",
                clicksToEdit: 1,
            }],
            store: Ext.create("Core.store.jb_data", {
                data: jb_data,
                listeners: {
                    beforesync: function () {
                        var jb_data = JSON.stringify(this.getData().items.map((item) => item.getData()));
                        me.applyValues(jb_data);
                    },
                },
            }),
            title: "Доп.поля",
            margin: "0 12px 0 0",
        });
    },

    constructor: function () {
        this.callParent(arguments);
        
    },
    
    privates: {
        applyValues: function (jb_data) {
            var me = this;

            var record = me.getSelectedRecord();
            record.set("jb_data", jb_data);
            me.removeAll(true);
            
            record.store.sync({
                callback: function () {
                    me.setSelectedRecord(null);
                    record.store.reload();
                    // Ext.getCurrentApp().preloadStores(function () {
                    //     me.fireEvent("applyEdit");
                    // });
                },
            });
        },
    },
});
