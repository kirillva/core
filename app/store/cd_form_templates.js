Ext.define('Core.store.cd_form_templates', {
    extend: 'Ext.data.Store',
    model: 'Core.model.cd_form_templates',

    alias: 'store.cd_form_templates',
    storeId: 'cd_form_templates',

    // remoteFilter: true,
    // remoteSort: true,
    // remoteGroup: true,

    data: []
    // proxy: {
    //     type: 'itdirect',
    //     api: {
    //         read: 'cd_form_templates.Query',
    //         create: 'cd_form_templates.Add',
    //         update: 'cd_form_templates.Update',
    //         destroy: 'cd_form_templates.Delete'
    //     },
    //     reader: {
    //         successProperty: 'success',
    //         rootProperty: 'records',
    //     },
    //     writer: {
    //         //writeAllFields : true
    //         dateFormat: "Y-m-d H:i:sO"
    //     }
    // }
});