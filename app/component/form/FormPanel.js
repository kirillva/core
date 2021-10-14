Ext.define("Core.component.form.Panel", {
    extend: "Ext.form.Panel",
    defaultListenerScope: true,
    xtype: "baseform",

    setRecord: function (record) {
        if (record) {
            this.renderItems(record);
        }
    },

    renderField: function (field) {
        switch (field.type) {
            case 'string':
                return {
                    xtype: field.editor,
                    name: field.name,
                    fieldLabel: field.text
                }
        
            default:
                break;
        }
        
        return 
    },

    renderItems: function (record) {
        var me = this;
        
        var fields = record.fields;
        var fieldsMap = record.fieldsMap;
        debugger;

        var items = [];

        record.fields.forEach(item=>{
            items.push(me.renderField(item));
        });
        
        me.add(items);

        this.loadRecord(record);
    },

    constructor: function () {
        this.callParent(arguments);
    },


    dockedItems: [{
        xtype: 'toolbar',
        dock: 'bottom',
        items: [{
            text: 'Сохранить',
            handler: 'saveForm'
        }]
    }],

    items: [],

    saveForm: function () {
        debugger;
        var record = this.getRecord();

        this.getValues();
    }
});
