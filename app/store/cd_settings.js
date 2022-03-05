Ext.define('Core.store.cd_settings', {
    extend: 'Ext.data.Store',
    model: 'Core.model.cd_settings',

    alias: 'store.cd_settings',
    storeId: 'cd_settings',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: true,
    mixins: [
        'Core.data.Selectable'
    ],

    proxy: {
        type: 'itdirect',
        api: {
            read: 'dbo.cd_settings.Query',
            create: 'dbo.cd_settings.Add',
            update: 'dbo.cd_settings.Update',
            destroy: 'dbo.cd_settings.Delete'
        },
        reader: {
            successProperty: 'success',
            rootProperty: 'records',
        },
        writer: {
            //writeAllFields : true
            dateFormat: "Y-m-d H:i:sO"
        }
    }
});