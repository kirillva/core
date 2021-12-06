Ext.define('Core.store.cd_uik', {
    extend: 'Ext.data.Store',
    model: 'Core.model.cd_uik',

    alias: 'store.cd_uik',
    storeId: 'cd_uik',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: true,
    // mixins: [
    //     'Core.data.Selectable'
    // ],
    sorters: ['id'],
    proxy: {
        type: 'itdirect',
        api: {
            read: 'cd_uik.Query'
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