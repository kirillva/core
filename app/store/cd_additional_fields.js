Ext.define('Core.store.cd_additional_fields', {
    extend: 'Ext.data.Store',
    model: 'Core.model.cd_additional_fields',

    alias: 'store.cd_additional_fields',
    storeId: 'cd_additional_fields',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: true,

    proxy: {
        type: 'itdirect',
        api: {
            read: 'core.cd_additional_fields.Query',
            create: 'core.cd_additional_fields.Add',
            update: 'core.cd_additional_fields.Update',
            destroy: 'core.cd_additional_fields.Delete'
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