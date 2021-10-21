Ext.define("Core.component.form.FormWrapper", {
    extend: "Ext.container.Container",
    xtype: "formwrapper",

    defaultListenerScope: true,

    layout: "hbox",
    height: "100%",

    config: {
        formTemplate: null,
        record: null,
        settingsHidden: false
    },

    setRecord: function (record) {
        this.record = record;
        if (record && this.formTemplate) {
            this.renderForm(record, this.formTemplate);
        }
    },

    setFormTemplate: function (formTemplate) {
        this.formTemplate = formTemplate; 
        if (this.record && formTemplate) {
            this.renderForm(this.record, formTemplate);
        }
    },

    privates: {
        renderForm: function (record, formTemplate) {
            var me = this;

            me.removeAll(true);
            me.add([
                {
                    dockedItems: [{
                        xtype: "panelheader",
                        title: "Форма",
                        items: [
                            {
                                xtype: "button",
                                iconCls: "x-fa fa-cog",
                                handler: "toggleSettings",
                                scope: me,
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
                    hidden: me.getSettingsHidden(),
                    store: FormHelper.formTemplateToStore(formTemplate) || null,
                    listeners: {
                        saveTemplate: function (store) {
                            var formTemplate = FormHelper.storeToTemplate(store);
                            me.fireEvent("formTemplate", formTemplate);
                        },
                    },
                },
            ]);
        },

        toggleSettings: function () {
            var me = this;
            var formprops = me.down('formprops');
            
            if (formprops.hidden) {
                formprops.show();
                me.setSettingsHidden(false);
            } else {
                formprops.hide();
                me.setSettingsHidden(true);
            }
        }

        // formTemplateToStore: function (formTemplate) {
        //     var children = [];

        //     if (!formTemplate) return null;

        //     formTemplate.items.forEach((item, id) => {
        //         var childrens = [];
        //         item.items.forEach((field) => {
        //             childrens.push({ text: field.itemId, leaf: true });
        //         });

        //         children.push({
        //             text: `Панель`,
        //             layout: item.layout,
        //             expanded: true,
        //             leaf: false,
        //             children: childrens,
        //         });
        //     });

        //     return {
        //         root: {
        //             expanded: true,
        //             children: children,
        //         },
        //     };
        // },

        // storeToTemplate: function (store) {
        //     var root = store.getRootNode();
        //     var childrens = root.childNodes;
        //     var formTemplate = [];

        //     childrens.forEach((panel) => {
        //         var node = [];

        //         panel.childNodes.forEach((field) => {
        //             node.push({ itemId: field.get("text") });
        //         });

        //         formTemplate.push({ layout: panel.get("layout") || "hbox", items: node });
        //     });

        //     this.fireEvent("formTemplate", { items: formTemplate });
        // },
    },
});
