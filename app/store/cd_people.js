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
    
    proxy: {
        type: 'itdirect',
        api: {
            read: 'cd_people.Query',
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