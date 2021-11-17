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
            flex: 2,
        }];
        this.callParent(arguments);
    },

    privates: {
        onSelectionChange: function (treelist, record, eOpts)  {
            var _record = record[0];
            var layoutform = this.down('layoutform');
            if (layoutform && _record) {
                layoutform.form.reset();
                layoutform.loadRecord(_record);
            }
            
        },
        
        onBeforeDrop: function () {
            debugger;
        }
    }
});
