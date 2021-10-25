Ext.define("Core.view.faq.Faq", {
    extend: "Ext.container.Container",
    xtype: "faq",
    defaultListenerScope: true,

    layout: "fit",
    height: "100%",
    
    mixins: ["FormMixin"],

    initComponent: function () {
        var me = this;

        me.callParent();
        var vm = this.getViewModel();

        var cd_form_templates = Ext.getStore("cd_form_templates");
        var dd_documents_record = cd_form_templates.getById("dd_documents");

        var formTemplate = dd_documents_record.get("jb_data");
        // vm.set("formTemplate", formTemplate);

        var dd_documents = Ext.getStore("dd_documents");
        dd_documents.load({
            limit: 10000,
            params: {
                select: dd_documents.getSelectFields(),
            },
            callback: function (items) {
                var record = items[0];
                // vm.set("record", record);

                me.add([
                    {
                        xtype: "formwrapper",
                        record: record,
                        formTemplate: formTemplate,
                        // bind: {
                        //     record: "{record}",
                        //     formTemplate: "{formTemplate}",
                        // },
                        listeners: {
                            formTemplate: "updateFormTemplate",
                            syncTemplate: "syncFormTemplate"
                        },
                    },
                ]);
            },
        });
    }
});
