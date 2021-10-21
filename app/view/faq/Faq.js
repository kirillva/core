Ext.define("Core.view.faq.Faq", {
    extend: "Ext.container.Container",
    xtype: "faq",
    defaultListenerScope: true,

    layout: "fit",
    height: "100%",

    viewModel: {
        data: {
            record: null,
            formTemplate: FormHelper.getFormTemplate()
        }
    },

    constructor: function () {
        this.items = [{
            xtype: 'formwrapper',
            bind: {
                record: '{record}',
                formTemplate: '{formTemplate}',
            },
            // formTemplate: FormHelper.getFormTemplate(),
            listeners: {
                formTemplate: 'updateFormTemplate'
            }
        }];

        this.callParent(arguments);

        var vm = this.getViewModel();
        var dd_documents = Ext.getStore("dd_documents");
        dd_documents.load({
            limit: 10000,
            params: {
                select: dd_documents.getSelectFields(),
            },
            callback: function (items) {
                vm.set("record", items[0]);
            },
        });
    },

    privates: {
        updateFormTemplate: function (formTemplate) {
            var vm = this.getViewModel();
            debugger;
            vm.set('formTemplate', formTemplate);
        }
    }
});
