Ext.define("Core.view.settings.Settings", {
    extend: "Ext.container.Container",
    xtype: "settings",
    defaultListenerScope: true,
    layout: "vbox",

    viewModel: {
        data: {
            record: null,
        },
    },
    
    constructor: function () {
        this.items = {
            xtype: "panel",
            flex: 1,
            width: "100%",
            layout: "hbox",
            items: [
                {
                    xtype: "editablegrid",
                    store: Ext.create("Core.store.cd_additional_fields"),
                    autoLoad: true,
                    title: "Настройка таблиц",
                    height: "100%",
                    flex: 1,
                    margin: "0 12px 0 0",
                    plugins: [{
                        ptype: "rowediting",
                        clicksToEdit: 2,
                    }],
                    listeners: {
                        rowclick: "handleRowClick",
                    },
                },
                {
                    xtype: "editfields",
                    bind: {
                        selectedRecord: "{record}",
                    },
                    height: "100%",
                    flex: 1,
                    listeners: {
                        applyEdit: "onApplyEdit",
                    },
                },
            ],
        }
        this.callParent(arguments);
    },

    privates: {
        handleRowClick: function (sender, record, element, rowIndex, e, eOpts) {
            var vm = this.getViewModel();
            vm.set("record", record);
        }
    }
});
