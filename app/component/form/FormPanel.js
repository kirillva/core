Ext.define("Core.component.form.Panel", {
    extend: "Ext.form.Panel",
    defaultListenerScope: true,
    xtype: "baseform",

    config: {
        formRendered: false,
        formRecord: null,
        formTemplate: null,
    },

    title: "Форма",

    setFormRecord: function (formRecord) {
        this.formRecord = formRecord;
        if (formRecord && this.getFormTemplate()) {
            this.renderTemplate(this.formTemplate);
        }
    },

    setFormTemplate: function (formTemplate) {
        this.formTemplate = formTemplate;
        if (formTemplate && this.getFormRecord()) {
            this.renderTemplate(formTemplate);
        }
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

    formTemplateToStore: function (formTemplate) {
        var children = [];
        formTemplate.items.forEach((item, id) => {
            var childrens = [];
            item.items.forEach((field) => {
                childrens.push({ text: field.itemId, leaf: true });
            });

            children.push({ text: `Panel ${id}`, expanded: true, leaf: false, children: childrens });
        });

        return {
            root: {
                expanded: true,
                children: children,
            },
        };
    },

    renderTemplate: function (formTemplate) {
        var me = this;

        me.removeAll(true);
        me.add({
            layout: "hbox",
            items: [
                formTemplate,
                {
                    xtype: "treepanel",
                    width: 200,
                    height: '100%',
                    dock: "right",
                    // titleAlign: 'left',
                    // defaults: {
                    //     align: 'start'
                    // },
                    cls: 'formtree',
                    store: me.formTemplateToStore(formTemplate),
                    viewConfig: {
                        plugins: {
                            ptype: "treeviewdragdrop",
                            dragText: "Drag and drop to reorganize",
                        },
                    },
                },
            ],
        });
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

    dockedItems: [
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
        // {
        //     xtype: "toolbar",
        //     dock: "right",
        //     items: [
        //         {
        //             xtype: "button",
        //             iconCls: "x-fa fa-cog",
        //         },
        //     ],
        // },
    ],
    
    
    items: [],

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
