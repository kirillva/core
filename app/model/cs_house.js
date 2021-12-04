Ext.define('Core.model.cs_house', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    identifier: 'uuid',

    fields: [
        { name: 'id', type: 'string', isGuid: true, hidden: true, hideable: false, },
        { name: 'f_street', type: 'string', isGuid: true, hidden: true, hideable: false, },
        { name: 'c_full_number', type: 'string', text: "Дом", column: "gridcolumn", editor: 'textfield' },
        {
            name: "n_number",
            type: "int",
            isGuid: true,
            hidden: true,
            hideable: false,
            critical: true,
            serialize: function (value, record) {
                return Number.parseInt(record.get('c_full_number'));
            },
        },
        { name: 'b_disabled', type: 'boolean', hidden: true, hideable: false, },
    ]
});