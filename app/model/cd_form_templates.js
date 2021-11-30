Ext.define('Core.model.cd_form_templates', {
    extend: 'Ext.data.Model',
    idProperty: 'c_alias',

    fields: [
        { name: "c_name", type: "string", text: "Имя формы", column: "gridcolumn", editor: 'textfield' },
        { name: "c_alias", type: "string", text: "Псевдоним", column: "gridcolumn", editor: 'textfield' },
    ],

});