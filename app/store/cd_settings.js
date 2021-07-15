Ext.define('Core.store.cd_settings', {
    extend: 'Ext.data.Store',
    model: 'Core.model.cd_settings',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: true,
    mixins: [
        'Core.data.Selectable'
    ],

    proxy: {
        type: 'itdirect',
        api: {
            read: 'core.cd_settings.Query',
            create: 'core.cd_settings.Add',
            update: 'core.cd_settings.Update',
            destroy: 'core.cd_settings.Delete'
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