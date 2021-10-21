Ext.define("Core.component.form.FormWrapper", {
    extend: "Ext.container.Container",
    xtype: "formwrapper",

    defaultListenerScope: true,

    layout: "hbox",
    height: "100%",

    config: {
        formTemplate: null,
        record: null
    },

    setRecord: function (record) {
        this.record = record;
        if (record && this.formTemplate) {
            this.renderForm(record, this.formTemplate);
        }
    },

    setFormTemplate: function (formTemplate) {
        debugger;
        this.formTemplate = formTemplate; 
        if (this.record && formTemplate) {
            this.renderForm(this.record, formTemplate);
        }
    },

    privates: {
        renderForm: function (record, formTemplate) {
            this.removeAll(true);
            this.add([
                {
                    dockedItems: [{
                        xtype: "panelheader",
                        title: "Форма",
                        items: [
                            {
                                xtype: "button",
                                iconCls: "x-fa fa-cog",
                                // handler: "saveTemplate",
                                // scope: this,
                            },
                        ],
                    }],
                    xtype: "baseform",
                    height: "100%",
                    flex: 2,
                    formTemplate: formTemplate,
                    formRecord: record,
                },
                {
                    xtype: "formprops",
                    height: "100%",
                    flex: 1,
                    store: this.formTemplateToStore(formTemplate) || null,
                    listeners: {
                        saveTemplate: "storeToTemplate",
                    },
                },
            ]);
        },

        formTemplateToStore: function (formTemplate) {
            var children = [];

            if (!formTemplate) return null;

            formTemplate.items.forEach((item, id) => {
                var childrens = [];
                item.items.forEach((field) => {
                    childrens.push({ text: field.itemId, leaf: true });
                });

                children.push({
                    text: `Панель`,
                    layout: item.layout,
                    expanded: true,
                    leaf: false,
                    children: childrens,
                });
            });

            return {
                root: {
                    expanded: true,
                    children: children,
                },
            };
        },

        storeToTemplate: function (store) {
            var root = store.getRootNode();
            var childrens = root.childNodes;
            var formTemplate = [];

            childrens.forEach((panel) => {
                var node = [];

                panel.childNodes.forEach((field) => {
                    node.push({ itemId: field.get("text") });
                });

                formTemplate.push({ layout: panel.get("layout") || "hbox", items: node });
            });

            this.fireEvent("formTemplate", { items: formTemplate });
        },
    },
});
