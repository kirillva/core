Ext.define("Core.view.settings.EditMenu", {
    extend: "Ext.panel.Panel",
    xtype: "editmenu",
    defaultListenerScope: true,

    layout: 'hbox',


    constructor: function (cfg) {
        var cd_navigation = Ext.getStore("NavigationTree");

        cfg.items = [{
            xtype: "treepanel",
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
                selectionchange: "onSelectionChange",
                // drop: "onDrop",
                beforedrop: "onBeforeDrop",
            },
        }, {
            xtype: "layoutform",
            flex: 1,
            
        }];
        this.callParent(arguments);
    },

    privates: {
        onSelectionChange: function () {
            debugger;
        },
        
        onBeforeDrop: function () {
            debugger;
        }
    }
});
