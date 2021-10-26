Ext.define("Core.view.settings.Settings", {
    extend: "Ext.container.Container",
    xtype: "settings",
    defaultListenerScope: true,
    layout: "fit",

    viewModel: {
        data: {
            record: null,
        },
    },

    constructor: function () {
        this.items = {
            xtype: "tabpanel",
            items: [{
                xtype: "edittables",
                title: 'Таблицы'
            },{
                xtype: "editforms",
                title: 'Формы'
            },{
                xtype: "editmenu",
                title: 'Меню'
            },]
        };
        this.callParent(arguments);
    },

    privates: {
        handleRowClick: function (sender, record, element, rowIndex, e, eOpts) {
            var vm = this.getViewModel();
            vm.set("record", record);
        },
    },
});
