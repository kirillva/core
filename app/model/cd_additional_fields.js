Ext.define('Core.model.cd_additional_fields', {
    extend: 'Ext.data.Model',
    idProperty: 'c_alias',

    fields: [
        { name: "c_name", type: "string", text: "Имя таблицы", column: "gridcolumn", editor: 'textfield' },
        { name: "c_alias", type: "string", text: "Псевдоним", column: "gridcolumn", editor: 'textfield' },
    ],

});