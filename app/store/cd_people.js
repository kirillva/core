Ext.define('Core.store.cd_people', {
    extend: 'Ext.data.Store',
    model: 'Core.model.cd_people',

    alias: 'store.cd_people',
    storeId: 'cd_people',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: true,
    mixins: [
        'Core.data.Selectable'
    ],
    sorters: ['c_first_name'],
    autoLoad: false,
    proxy: {
        type: 'itdirect',
        // paramOrder: [
        //     'f_user',
        //     'f_street',
        //     'f_appartament',
        //     'f_house'
        // ],
        api: {
            read: 'cf_bss_cs_peoples.Select',
            create: 'cd_people.Add',
            update: 'cd_people.Update',
            destroy: 'cd_people.Delete'
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