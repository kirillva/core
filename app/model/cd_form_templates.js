Ext.define('Core.model.cd_form_templates', {
    extend: 'Ext.data.Model',
    idProperty: 'c_name',

    fields: [
        { name: "c_name", type: "string", text: "Имя таблицы", column: "gridcolumn", editor: 'textfield' },
    ],

});