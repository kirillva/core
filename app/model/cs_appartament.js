Ext.define('Core.model.cs_appartament', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    // identifier: 'uuid',

    fields: [
        { name: 'id', type: 'string', isGuid: true, hidden: true, hideable: false, },
        { name: 'c_number', type: 'string', text: "Номер", column: "gridcolumn", editor: 'textfield' }
    ]
});