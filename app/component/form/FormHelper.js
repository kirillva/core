Ext.define("Core.component.form.FormHelper", {
    alternateClassName: "FormHelper",
    singleton: true,

    // getFormTemplate: function () {
    // return {
    //     "items": [
    //       {
    //         "xtype": "panel",
    //         "layout": "hbox",
    //         "items": [
    //           {
    //             "itemId": "c_first_name"
    //           },
    //           {
    //             "itemId": "c_last_name"
    //           },
    //           {
    //             "itemId": "c_middle_name"
    //           }
    //         ]
    //       },
    //       {
    //         "xtype": "panel",
    //         "layout": "vbox",
    //         "items": [
    //           {
    //             "itemId": "d_birthday"
    //           },
    //           {
    //             "itemId": "d_created_date"
    //           },
    //           {
    //             "itemId": "c_notice"
    //           }
    //         ]
    //       },
    //       {
    //         "xtype": "panel",
    //         "layout": "hbox",
    //         "items": [
    //           {
    //             "itemId": "jb_data___type"
    //           },
    //           {
    //             "itemId": "c_phone"
    //           },
    //           {
    //             "itemId": "sn_delete"
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // },

    createPanel: function (options) {
        return Object.assign(
            options, 
            {
                text: options.title || `Панель`,
                // layout: item.layout,
                // expanded: true,
                // leaf: false,
                // children: childrens,
            }
        );
    },

    formTemplateToStore: function (formTemplate) {
        var me = this;
        var children = [];

        if (!formTemplate) return null;

        // debugger;
        formTemplate.items.forEach((item, id) => {
            var childrens = [];
            
            if (item.items) {
                item.items.forEach((field) => {
                    childrens.push({ text: field.itemId, fieldId: field.itemId, leaf: true });
                });
            }

            children.push(
                me.createPanel({
                    ...item,
                    layout: item.layout,
                    expanded: true,
                    leaf: false,
                    children: childrens,
                })
            );
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
                node.push({ itemId: field.get("fieldId") });
            });

            formTemplate.push({ layout: panel.get("layout") || "hbox", title: panel.get("text"), items: node });
        });

        // this.fireEvent("formTemplate", { items: formTemplate });
        return { items: formTemplate };
    },
});
