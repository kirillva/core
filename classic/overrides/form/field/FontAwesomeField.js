Ext.define('IServ.UI.Classic.form.field.FontAwesomeField', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'fontawesomefield',
    listConfig: {
        itemTpl: [
            '<div><span class="{value}">&nbsp;</span> {value}</div>'
        ]
    },
    store: {
        autoLoad: true,
        proxy: {
            type: 'ajax',
            url: 'resources/font-awesome.json',
            reader: {
                type: 'json'
            }
        }
    }
});