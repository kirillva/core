Ext.define('Core.model.cd_settings', {
    extend: 'Ext.data.Model',
    idProperty: 'id',
    // identifier: 'uuid',

    fields: [
        { name: 'id', type: 'string', isGuid: true }
    ]
});