Ext.define('Core.model.cs_street', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    // identifier: 'uuid',

    fields: [
        { name: 'id', type: 'string', isGuid: true, hidden: true, hideable: false,},
        { name: 'c_name', type: 'string', text: "Улица", column: "gridcolumn", editor: 'textfield' }
    ]
});