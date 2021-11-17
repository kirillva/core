Ext.define("Core.component.form.LayoutForm", {
    extend: "Ext.form.Panel",
    defaultListenerScope: true,
    xtype: "layoutform",

    constructor: function (cfg) {
        cfg.items = [{
            xtype: 'textfield',
            fieldLabel: 'Наименование',
            name: 'text'
        },{
            xtype: 'textfield',
            fieldLabel: 'Константа',
            name: 'viewType'
        },{
            xtype: "combobox",
            fieldLabel: "Тип шаблона",
            name: 'layout',
            store: {
                data: [
                    { id: "layout_1", name: "Шаблон 1" },
                    { id: "layout_2", name: "Шаблон 2" }
                ],
            },
            queryMode: "local",
            displayField: "name",
            valueField: "id",
            editable: false,
        }];
        cfg.dockedItems = {
            xtype: "panelheader",
            title: "Свойства",
            items: [
                {
                    xtype: "button",
                    iconCls: "x-fa fa-save",
                    handler: "saveSettings",
                    scope: this,
                },
            ],
        };
        this.callParent([cfg]);
    },

    privates: {
        saveSettings: function () {
            this.updateRecord();
        }
    }
});
