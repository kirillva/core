Ext.define("Core.component.form.Panel", {
    extend: "Ext.form.Panel",
    defaultListenerScope: true,
    xtype: "baseform",

    config: {
        formRendered: false,
        formRecord: null,
        formTemplate: null,
    },

    renderField: function (field) {
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
        this.callParent(arguments);
        this.renderTemplate(cfg.formTemplate);
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

        this.loadRecord(record);
    },

    

    bodyStyle: {
        padding: "10px",
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
            var formRecord = this.getFormRecord();
            if (formRecord && !this.getFormRendered()) {
                this.renderItems(formRecord);
            }
        },
    },
});
