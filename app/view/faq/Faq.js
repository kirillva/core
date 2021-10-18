Ext.define("Core.view.faq.Faq", {
    extend: "Ext.container.Container",
    xtype: "faq",
    defaultListenerScope: true,
    layout: "vbox",

    width: '100%',

    viewModel: {
        data: {
            record: null,
            formTemplate: {
                items: [
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [{
                            itemId: 'c_first_name',
                        }, {
                            itemId: 'c_last_name',
                        }, {
                            itemId: 'c_middle_name',
                        }]
                    },
                    {
                        xtype: 'panel',
                        layout: 'vbox',
                        items: [{
                            itemId: 'd_birthday',
                        }, {
                            itemId: 'd_created_date',
                        }, {
                            itemId: 'c_notice',
                        }]
                    },
                    {
                        xtype: 'panel',
                        layout: 'hbox',
                        items: [{
                            itemId: 'jb_data___type',
                        }, {
                            itemId: 'c_phone',
                        }, {
                            itemId: 'sn_delete',
                        }]
                    }
                ]
            }
        },
    },

    constructor: function () {
        this.items = [
            {
                xtype: "baseform",
                width: '100%',
                height: '100%',
                bind: {
                    formTemplate: '{formTemplate}',
                    formRecord: '{record}'
                }
            }
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
