Ext.define('Core.store.cd_form_templates', {
    extend: 'Ext.data.Store',
    model: 'Core.model.cd_form_templates',

    alias: 'store.cd_form_templates',
    storeId: 'cd_form_templates',

    remoteFilter: true,
    remoteSort: true,
    remoteGroup: true,

    proxy: {
        type: 'itdirect',
        api: {
            read: 'core.cd_form_templates.Query',
            create: 'core.cd_form_templates.Add',
            update: 'core.cd_form_templates.Update',
            destroy: 'core.cd_form_templates.Delete'
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