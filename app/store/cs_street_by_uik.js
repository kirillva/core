Ext.define('Core.store.cs_street_by_uik', {
    extend: 'Ext.data.Store',
    model: 'Core.model.cs_street_by_uik',

    alias: 'store.cs_street_by_uik',
    storeId: 'cs_street_by_uik',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: true,
    mixins: [
        'Core.data.Selectable'
    ],
    sorters: ['c_name'],
    paramOrder: [
        'n_uik',
    ],
    proxy: {
        type: 'itdirect',
        api: {
            read: 'cf_bss_cs_streets.Select',
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