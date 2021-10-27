Ext.define("Core.view.admin.Admin", {
    extend: "Ext.container.Container",
    xtype: "admin",
    defaultListenerScope: true,
    layout: "vbox",

    viewModel: {
        data: {
            record: null,
        },
    },

    constructor: function () {
        var pd_users = Ext.getStore("pd_users");
        pd_users.load();
        this.items = [
            {
                xtype: "basegrid",
                editable: true,
                store: pd_users,
                // autoLoad: true,
                title: "Пользователи",
                width: "100%",
                plugins: [
                    {
                        ptype: "rowediting",
                        clicksToEdit: 1,
                    },
                ],
                flex: 1,
            },
        ];
        this.callParent(arguments);
    },

    privates: {
        handleRowClick: function (sender, record, element, rowIndex, e, eOpts) {
            var vm = this.getViewModel();
            vm.set("record", record);
        },
    },
});
