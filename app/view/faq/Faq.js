Ext.define("Core.view.faq.Faq", {
    extend: "Ext.container.Container",
    xtype: "faq",
    defaultListenerScope: true,

    layout: "vbox",
    width: "100%",
    height: "100%",

    mixins: ["FormMixin"],

    initComponent: function () {
        var me = this;

        me.callParent();

        // me.renderFormSetting();
    },

    margin: 12,

    items: [
        {
            xtype: "combobox",
            fieldLabel: "Выбор формы",
            width: "100%",
            store: {
                data: [
                    { id: "dd_documents", name: "dd_documents" },
                ],
            },
            queryMode: "local",
            displayField: "name",
            valueField: "id",
        },
        {
            xtype: 'container',
            width: "100%",
            layout: 'fit',
            itemId: 'formSetting',
            flex: 1
        },
    ],

    privates: {
        renderFormSetting: function (name) {
            var me = this;

            var cd_form_templates = Ext.getStore("cd_form_templates");
            var dd_documents_record = cd_form_templates.getById(name);

            var formTemplate = dd_documents_record.get("jb_data");

            var store = Ext.getStore(name);
            store.load({
                limit: 10000,
                params: {
                    select: store.getSelectFields(),
                },
                callback: function (items) {
                    var record = items[0];
                    debugger;
                    var formSetting = me.down('#formSetting');
                    formSetting.removeAll(true);
                    formSetting.add([
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
                                syncTemplate: "syncFormTemplate",
                            },
                        },
                    ]);
                },
            });
        },
    },
});
