Ext.define('Core.store.dd_documents', {
    extend: 'Ext.data.Store',
    model: 'Core.model.dd_documents',

    alias: 'store.dd_documents',
    storeId: 'dd_documents',

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
            read: 'core.dd_documents.Query',
            create: 'core.dd_documents.Add',
            update: 'core.dd_documents.Update',
            destroy: 'core.dd_documents.Delete'
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