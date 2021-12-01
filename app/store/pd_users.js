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
            read: 'pd_users.Query',
            create: 'pd_users.Add',
            update: 'pd_users.Update',
            destroy: 'pd_users.Delete'
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