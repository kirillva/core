Ext.define("Core.view.faq.Faq", {
    extend: "Ext.container.Container",
    xtype: "faq",
    defaultListenerScope: true,

    layout: "fit",
    height: "100%",

    viewModel: {
        data: {
            record: null,
            formTemplate: null,
        },
    },

    constructor: function () {
        this.items = [
            {
                xtype: "formwrapper",
                bind: {
                    record: "{record}",
                    formTemplate: "{formTemplate}",
                },
                listeners: {
                    formTemplate: "updateFormTemplate",
                },
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
                vm.set("record", items[0]);
            },
        });

        var cd_form_templates = Ext.getStore("cd_form_templates");
        var dd_documents = cd_form_templates.getById("dd_documents");

        vm.set("formTemplate", dd_documents.get("jb_data"));
    },

    privates: {
        updateFormTemplate: function (formTemplate) {
            var vm = this.getViewModel();
            vm.set("formTemplate", formTemplate);

            var cd_form_templates = Ext.getStore("cd_form_templates");
            var dd_documents = cd_form_templates.getById("dd_documents");

            dd_documents.set("jb_data", JSON.stringify(formTemplate));
            
            if (cd_form_templates.needsSync) {
                cd_form_templates.sync({
                    callback: function () {
                        cd_form_templates.load({
                            limit: 10000,
                        });
                    },
                });
            }
        },
    },
});
