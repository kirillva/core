Ext.define('Core.store.jb_data', {
    extend: 'Ext.data.Store',
    model: 'Core.model.jb_data',

    alias: 'store.jb_data',
    storeId: 'jb_data',

    remoteFilter: false,
    remoteSort: false,
    remoteGroup: false,
    
    proxy: {
        type: 'memory',
        reader: {
            type: 'json'
        }
    }
});