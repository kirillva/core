Ext.define("Core.view.admin.EditFields", {
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

        var vm = this.getViewModel();

        this.removeAll(true);
        this.add({
            xtype: "editablegrid",
            editable: true,
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

    items: [],

    privates: {
        addColumn: function () {
            var me = this;

            jb_data = [
                {
                    name: "jb_data.c_name",
                    text: "Имя пользователя",
                    type: "string",
                    column: "gridcolumn",
                    editor: "textfield",
                    hidden: false,
                    dynamic: true,
                },
                {
                    name: "jb_data.c_const",
                    text: "Тег",
                    type: "string",
                    column: "gridcolumn",
                    editor: "textfield",
                    hidden: false,
                    dynamic: true,
                },
            ];
            // me.setJb_data(jb_data);
            // me.reloadItems(jb_data);
        },

        applyValues: function (jb_data) {
            var me = this;

            var record = me.getSelectedRecord();
            debugger;
            record.set("jb_data", jb_data);
            record.store.sync({
                callback: function () {
                    me.setSelectedRecord(null);
                    Ext.getCurrentApp().preloadStores(function () {
                        // callback();
                        debugger;
                        me.fireEvent("applyEdit");
                    });
                },
            });
        },
    },
});
