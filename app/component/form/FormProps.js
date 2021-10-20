Ext.define("Core.component.form.FormProps", {
    extend: "Ext.form.Panel",
    defaultListenerScope: true,
    xtype: "formprops",

    config: {
        store: null,
    },

    setStore: function (store) {
        this.store = store;
        this.renderForm(store);
    },

    layout: "vbox",

    constructor: function () {
        var me = this;
        this.dockedItems = {
            xtype: "panelheader",
            title: "Настройки",
            items: [
                // {
                //     xtype: "button",
                //     iconCls: "x-fa fa-trash",
                //     // handler: "deleteRows",
                //     // scope: me,
                //     bind: {
                //         hidden: "{!selectable}",
                //     },
                // },
                // {
                //     xtype: "button",
                //     bind: {
                //         iconCls: "{selectable ? 'x-fa fa-check-square' : 'x-fa fa-square'}",
                //     },
                //     // handler: 'changeSelectable',
                //     // scope: me,
                // },
                "-",
                {
                    xtype: "button",
                    iconCls: "x-fa fa-plus",
                    handler: 'addLayout',
                    scope: me,
                },
                {
                    xtype: "button",
                    iconCls: "x-fa fa-save",
                    handler: "saveTemplate",
                    scope: me,
                },
            ],
        };
        this.callParent(arguments);
    },

    privates: {
        renderForm: function (store) {
            this.removeAll(true);
            this.add([
                {
                    xtype: "treepanel",
                    width: "100%",
                    flex: 1,
                    cls: "formtree",
                    // rootVisible: false,
                    store: store,
                    viewConfig: {
                        plugins: {
                            ptype: "treeviewdragdrop",
                            dragText: "Отпустить для перемещения",
                        },
                    },
                },
                {
                    xtype: "panel",
                    width: "100%",
                    flex: 1,
                    items: [
                        {
                            xtype: "textfield",
                            fieldLabel: "fieldLabel",
                        },
                        {
                            xtype: "textfield",
                            fieldLabel: "fieldLabel",
                        },
                    ],
                },
            ]);
        },

        addLayout: function () {
            var treepanel = this.down('treepanel');
            var store = treepanel.getStore();

            debugger;
            store.getRootNode().appendChild({ text: `Панель`, expanded: true, leaf: false, root: false });
        },

        saveTemplate: function () {
            var treepanel = this.down('treepanel');

            this.fireEvent('saveTemplate', treepanel.getStore());
        },
    },
});
