Ext.define("Core.component.form.BaseForm", {
    extend: "Ext.form.Panel",
    defaultListenerScope: true,
    xtype: "baseform",

    config: {
        formRendered: false,
        formRecord: null,
        store: null,
        formTemplate: null,
    },

    renderField: function (field) {
        // debugger;
        switch (field.type) {
            case "string":
                return {
                    xtype: field.editor,
                    name: field.name,
                    fieldLabel: field.text,
                };
            case "date":
                return {
                    xtype: field.editor,
                    name: field.name,
                    fieldLabel: field.text,
                };

            case "boolean":
                return {
                    xtype: field.editor,
                    name: field.name,
                    fieldLabel: field.text,
                };

            default:
                break;
        }

        return;
    },

    constructor: function (cfg) {
        this.dockedItems = [
            {
                xtype: "toolbar",
                dock: "bottom",
                items: [
                    {
                        text: "Сохранить",
                        handler: "saveForm",
                    },
                ],
            },
        ].concat(cfg.dockedItems);

        this.callParent(arguments);
        if (typeof cfg.formTemplate === 'string') {
            var cd_form_templates = Ext.getStore("cd_form_templates");
            var dd_documents_record = cd_form_templates.getById(cfg.formTemplate);
        
            var _formTemplate = dd_documents_record.get("jb_data");

            this.renderTemplate(_formTemplate);
        }

        if (typeof cfg.formTemplate === 'object') {
            this.renderTemplate(cfg.formTemplate);
        }
    },

    renderTemplate: function (formTemplate) {
        var me = this;
        me.removeAll(true);
        this.setFormRendered(false);
        me.add(formTemplate);
    },

    renderItems: function (record) {
        var me = this;

        this.setFormRendered(true);

        var fields = record.fields;
        var fieldsMap = record.fieldsMap;

        var items = [];
        me.suspendLayouts();

        record.fields.forEach((item) => {
            var name = item.name.replace(".", "___");
            var target = this.down(`#${name}`);

            if (target) {
                target.add(me.renderField(item));
            } else {
                items.push(me.renderField(item));
            }
        });

        me.add(items);

        me.resumeLayouts(true);
        me.loadRecord(record);
    },

    saveForm: function () {
        var me = this;
        var record = me.getRecord();

        var values = me.getValues();
        Object.keys(values).forEach((key) => {
            record.set(key, values[key]);
        });

        if (record.dirty) {
            me.mask("Загрузка...");
            record.store.sync({
                callback: function () {
                    me.unmask();
                },
            });
        }
    },

    listeners: {
        afterlayout: function () {
            var me = this;
            var formRecord = me.getFormRecord();
            var store = me.store;

            if (typeof formRecord === "string" && typeof store === "string") {
                store = Ext.create(`Core.store.${store}`);
                store.load({
                    params: {
                        filter: [
                            {
                                property: "id",
                                value: formRecord,
                            },
                        ],
                    },
                    callback: function (records) {
                        var record = store.getById(formRecord);
                        if (formRecord && !me.getFormRendered()) {
                            me.renderItems(record);
                        }
                    },
                });
            } else {
                if (formRecord && !me.getFormRendered()) {
                    me.renderItems(formRecord);
                }
            }
        },
    },
});
