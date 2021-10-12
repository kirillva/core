Ext.define("Core.view.admin.Admin", {
    extend: "Ext.container.Container",
    xtype: "admin",
    defaultListenerScope: true,
    layout: "vbox",

    mixins: ["Ext.mixin.Keyboard"],

    stores: ["pd_users", "cd_additional_fields"],

    viewModel: {
        data: {
            record: null,
        },
    },

    constructor: function () {
        this.items = [
            {
                xtype: "container",
                itemId: "previewTable",
                layout: "fit",
                width: "100%",
                flex: 1,
            },
            {
                xtype: "panel",
                flex: 1,
                width: "100%",
                layout: "hbox",
                items: [
                    {
                        xtype: "editablegrid",
                        store: Ext.getStore("cd_additional_fields") || Ext.create("Core.store.cd_additional_fields"),
                        autoLoad: false,
                        title: "Настройка таблиц",
                        height: "100%",
                        flex: 1,
                        margin: "0 12px 0 0",
                        listeners: {
                            rowclick: "handleRowClick",
                        },
                    },
                    {
                        xtype: "editfields",
                        bind: {
                            selectedRecord: "{record}",
                        },
                        listeners: {
                            applyEdit: "onApplyEdit",
                        },
                        height: "100%",
                        flex: 1,
                    },
                ],
            },
        ];
        this.callParent(arguments);
        this.showTablePreview();
    },

    privates: {
        handleRowClick: function (sender, record, element, rowIndex, e, eOpts) {
            var vm = this.getViewModel();
            vm.set("record", record);
        },

        showTablePreview: function () {
            var pd_users = Ext.getStore("pd_users") || Ext.create("Core.store.pd_users");
            pd_users.proxy.extraParams = {
                select: `${pd_users.getSelectFields()}`,
            };
            pd_users.load({
                limit: 10000,
                callback: function () {
                    // callback();
                },
            });
            var previewTable = this.getComponent("previewTable");
            previewTable.removeAll(true);

            previewTable.add({
                xtype: "editablegrid",
                editable: true,
                store: pd_users,
                autoLoad: false,
                title: "Пользователи",
                width: "100%",
            });
        },

        onApplyEdit: function () {
            debugger;
            this.showTablePreview();
        },
    },
});
