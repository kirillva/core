Ext.define('CORE.model.cd_settings', {
    extend: 'Ext.data.Model',
    idProperty: 'LINK',
    identifier: 'uuid',

    fields: [
        { name: 'id', type: 'string', isGuid: true }
    ]
});