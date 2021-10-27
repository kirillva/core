Ext.define("Core.view.settings.EditForms", {
    extend: "Ext.panel.Panel",
    xtype: "editforms",
    defaultListenerScope: true,

    layout: "vbox",
    width: "100%",
    height: "100%",

    mixins: ["FormMixin"],
    margin: 12,
    constructor: function () {
        var me = this;

        this.items = [
            {
                xtype: "combobox",
                fieldLabel: "Выбор формы",
                width: "100%",
                store: {
                    data: [
                        { id: "dd_documents", name: "dd_documents" },
                        { id: "pd_users", name: "pd_users" }
                    ],
                },
                queryMode: "local",
                displayField: "name",
                valueField: "id",
                // focusable: false,
                editable: false,
                listeners: {
                    beforeselect: 'onSelectForm',
                },
            },
            {
                xtype: "container",
                width: "100%",
                layout: "fit",
                itemId: "formSetting",
                flex: 1,
            },
        ];
        this.callParent(arguments);
    },

    privates: {
        onSelectForm: function (combo, record) {
            if (record) {
                this.renderFormSetting(record.get('id'));
            }
        },

        renderFormSetting: function (name, callback) {
            var me = this;

            var cd_form_templates = Ext.getStore("cd_form_templates");
            var dd_documents_record = cd_form_templates.getById(name);

            var formTemplate = dd_documents_record.get("jb_data");

            var store = Ext.getStore(name);
            var formSetting = me.down("#formSetting");
            formSetting.mask('Загрузка...');
            store.load({
                callback: function (items) {
                    var record = items[0];
                    formSetting.removeAll(true);
                    formSetting.add([
                        {
                            xtype: "formwrapper",
                            record: record,
                            formTemplate: formTemplate,
                            listeners: {
                                formTemplate: "updateFormTemplate",
                                syncTemplate: "syncFormTemplate",
                            },
                        },
                    ]);
                    formSetting.unmask();
                },
            });
        },
    },
});
