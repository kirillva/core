Ext.define('Core.store.current_user', {
    extend: 'Ext.data.Store',
    model: 'Core.model.pd_users',

    alias: 'store.current_user',
    storeId: 'current_user',

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
            read: 'PN.user.getUser'
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