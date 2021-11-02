Ext.define("Core.view.settings.EditMenu", {
    extend: "Ext.panel.Panel",
    xtype: "editmenu",
    defaultListenerScope: true,

    constructor: function (cfg) {
        var cd_navigation = Ext.getStore("NavigationTree");

        cfg.items = [{
            xtype: "treepanel",
            width: "100%",
            flex: 1,
            cls: "formtree",
            // dockedItems: {
            //     xtype: "panelheader",
            //     title: "Структура",
            //     items: [
            //         "-",
            //         {
            //             xtype: "button",
            //             iconCls: "x-fa fa-plus",
            //             handler: "addLayout",
            //             scope: this,
            //         },
            //         {
            //             xtype: "button",
            //             iconCls: "x-fa fa-save",
            //             handler: "syncTemplate",
            //             scope: this,
            //         },
            //     ],
            // },
            store: cd_navigation,
            viewConfig: {
                plugins: {
                    ptype: "treeviewdragdrop",
                    dragText: "Отпустить для перемещения",
                },
            },
            listeners: {
                // selectionchange: "onSelectionChange",
                // drop: "onDrop",
                beforedrop: "onBeforeDrop",
            },
        }];
        this.callParent(arguments);
    },

    privates: {
        onBeforeDrop: function () {
            debugger;
        }
    }
});
