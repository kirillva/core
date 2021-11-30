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
            // {
            //     xtype: "combobox",
            //     fieldLabel: "Выбор формы",
            //     width: "100%",
            //     store: {
            //         data: [
            //             { id: "1", table: 'dd_documents', name: "dd_documents_1" },
            //             { id: "2", table: 'dd_documents', name: "dd_documents_2" }
            //         ],
            //     },
            //     queryMode: "local",
            //     displayField: "name",
            //     valueField: "id",
            //     // focusable: false,
            //     editable: false,
            //     listeners: {
            //         beforeselect: 'onSelectForm',
            //     },
            // },
            {
                xtype: "basegrid",
                store: Ext.create("Core.store.cd_form_templates"),
                autoLoad: true,
                title: "Настройка форм",
                width: "100%",
                flex: 1,
                // margin: "0 12px 0 0",
                plugins: [
                    {
                        ptype: "rowediting",
                        clicksToEdit: 2,
                    },
                ],
                listeners: {
                    rowclick: "onSelectForm",
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
            if (record && !record.phantom) {
                this.renderFormSetting(record);
            }
        },

        generateDefaultForm: function (store) {
            var fields = store.getModel().fields;
            var _fields = [];

            fields.forEach(field => {
                if (field.name != 'jb_data' && !field.hidden) {
                    _fields.push({
                        itemId: field.name
                    });
                }
            });

            return {
                items: [{
                    items: _fields
                }]
            }
        },

        renderFormSetting: function (record) {
            var me = this;

            var name = record.get('c_alias');
            var table = record.get('c_name');

            var cd_form_templates = Ext.getStore("cd_form_templates");
            var dd_documents_record = cd_form_templates.getById(name);

            var store = Ext.getStore(table);
            var formTemplate = dd_documents_record.get("jb_data") || me.generateDefaultForm(store);

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
