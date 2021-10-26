Ext.define("Core.view.settings.EditTables", {
    extend: "Ext.panel.Panel",
    xtype: "edittables",
    layout: "hbox",
    defaultListenerScope: true,

    items: [
        {
            xtype: "basegrid",
            store: Ext.create("Core.store.cd_additional_fields"),
            autoLoad: true,
            title: "Настройка таблиц",
            height: "100%",
            flex: 1,
            // margin: "0 12px 0 0",
            plugins: [
                {
                    ptype: "rowediting",
                    clicksToEdit: 2,
                },
            ],
            listeners: {
                rowclick: "handleRowClick",
            },
        },
        {
            xtype: "editfields",
            height: "100%",
            flex: 1,
            listeners: {
                applyEdit: "onApplyEdit",
            },
        },
    ],

    privates: {
        handleRowClick: function (sender, record, element, rowIndex, e, eOpts) {
            var vm = this.getViewModel();
            var editfields = this.down('editfields');
            
            editfields.setSelectedRecord(record);
        },
    }
});
