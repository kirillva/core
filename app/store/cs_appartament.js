Ext.define('Core.store.cs_appartament', {
    extend: 'Ext.data.Store',
    model: 'Core.model.cs_appartament',

    alias: 'store.cs_appartament',
    storeId: 'cs_appartament',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: true,
    mixins: [
        'Core.data.Selectable'
    ],
    sorters: ['n_number'],
    proxy: {
        type: 'itdirect',
        api: {
            read: 'cs_appartament.Query',
            create: 'cs_appartament.Add',
            update: 'cs_appartament.Update',
            destroy: 'cs_appartament.Delete'
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