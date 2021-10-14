Ext.define("Core.view.faq.Faq", {
    extend: "Ext.container.Container",
    xtype: "faq",
    defaultListenerScope: true,
    layout: "vbox",

    viewModel: {
        data: {
            record: null,
        },
    },

    constructor: function () {
        this.items = [
            {
                xtype: "baseform",
                bind: {
                    record: '{record}'
                }
            },
        ];
        this.callParent(arguments);

        var vm = this.getViewModel();

        var dd_documents = Ext.getStore("dd_documents");
        dd_documents.load({
            limit: 10000,
            params: {
                select: dd_documents.getSelectFields(),
            },
            callback: function (items) {
                vm.set('record', items[0]);
            }
        });
        
    },
});
