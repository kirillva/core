Ext.define('Core.store.cs_street', {
    extend: 'Ext.data.Store',
    model: 'Core.model.cs_street',

    alias: 'store.cs_street',
    storeId: 'cs_street',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: true,
    mixins: [
        'Core.data.Selectable'
    ],

    proxy: {
        type: 'itdirect',
        api: {
            read: 'cs_street.Query',
            create: 'cs_street.Add',
            update: 'cs_street.Update',
            destroy: 'cs_street.Delete'
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