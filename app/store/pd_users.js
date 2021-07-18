Ext.define('Core.store.pd_users', {
    extend: 'Ext.data.Store',
    model: 'Core.model.pd_users',

    alias: 'store.pd_users',
    storeId: 'pd_users',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: true,
    mixins: [
        'Core.data.Selectable'
    ],

    autoLoad: false,
    
    proxy: {
        type: 'itdirect',
        api: {
            read: 'core.pd_users.Query',
            create: 'core.pd_users.Add',
            update: 'core.pd_users.Update',
            destroy: 'core.pd_users.Delete'
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