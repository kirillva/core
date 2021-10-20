Ext.define("Core.component.form.FormProps", {
    extend: "Ext.form.Panel",
    defaultListenerScope: true,
    xtype: "formprops",

    setStore: function (store) {
        this.renderForm(store);
    },
    

    layout: 'vbox',
    
    renderForm: function (store) {
        this.add([
            {
                xtype: "treepanel",
                width: "100%",
                flex: 1,
                cls: "formtree",
                rootVisible: false,
                store: store,
                viewConfig: {
                    plugins: {
                        ptype: "treeviewdragdrop",
                        dragText: "Отпустить для перемещения",
                    },
                },
            },
            {
                xtype: 'panel',
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
});
