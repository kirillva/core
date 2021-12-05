Ext.define('Core.model.cs_house', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    identifier: 'uuid',

    fields: [
        { name: 'id', type: 'string', isGuid: true, hidden: true, hideable: false, },
        { name: 'f_street', type: 'string', isGuid: true, hidden: true, hideable: false, },
        { name: 'c_full_number', type: 'string', text: "Дом", column: "gridcolumn", editor: 'textfield', hidden: true, hideable: false, },
        { name: 'c_house_number', type: 'string', text: "Номер", column: "gridcolumn", editor: 'textfield' },
        { name: 'c_house_corp', type: 'string', text: "Корпус", column: "gridcolumn", editor: 'textfield' },
        { name: 'c_house_litera', type: 'string', text: "Литера", column: "gridcolumn", editor: 'textfield' },
        {
            name: "n_number",
            type: "number",
            isGuid: true,
            hidden: true,
            hideable: false,
            critical: true,
            serialize: function (value, record) {
                return Number.parseInt(record.get('c_full_number'));
            },
        },
        { name: 'b_disabled', type: 'boolean', hidden: true, hideable: false, },
        
        { name: 'f_user', type: 'string', isGuid: true, hidden: true, hideable: false, },
    ]
});