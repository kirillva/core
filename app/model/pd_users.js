Ext.define('Core.model.pd_users', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    identifier: 'uuid',

    fields: [
        { name: 'id', type: 'number', isGuid: true },
        { name: 'c_login', type: 'string' },
        { name: 'c_password', type: 'string' },
        { name: 's_hash', type: 'string' },
        { name: 'b_disabled', type: 'boolean' },
        { name: 'f_created_user', type: 'number' },
        { name: 'd_created_date', type: 'date' },
        { name: 'f_change_user', type: 'string' },
        { name: 'd_change_date', type: 'date' },
        { name: 'sn_delete', type: 'boolean' },
    ]
});
