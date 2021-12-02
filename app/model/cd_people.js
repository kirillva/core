Ext.define('Core.model.cd_people', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    // identifier: 'uuid',

    fields: [
        { name: 'id', type: 'string', isGuid: true, hidden: true, hideable: false, },
        { name: 'f_appartament', type: 'string', isGuid: true, hidden: true, hideable: false, },
        { name: 'f_appartament___f_house', type: 'string', isGuid: true, hidden: true, hideable: false, },
        { name: 'f_appartament___f_house___f_street', type: 'string', isGuid: true, hidden: true, hideable: false, },
        
        { name: 'c_first_name', type: 'string', text: "Фамилия", column: "gridcolumn", editor: 'textfield' },
        { name: 'c_last_name', type: 'string', text: "Имя", column: "gridcolumn", editor: 'textfield' },
        { name: 'c_middle_name', type: 'string', text: "Отчество", column: "gridcolumn", editor: 'textfield' }
    ]
});



