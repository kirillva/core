Ext.define('Core.view.search.ResultsModel', {
    extend: 'Ext.app.ViewModel',
    alias: 'viewmodel.formresults',

    requires: [
        'Ext.data.Store',
        'Ext.data.proxy.Memory',
        'Ext.data.field.Integer',
        'Ext.data.field.String',
        'Ext.data.field.Date',
        'Ext.data.field.Boolean',
        'Ext.data.reader.Json'
    ],

    stores: {
        allResults: {
            type: 'formresults'
        },

        usersResults: {
            type: 'searchusers'
        },

        inboxResults: {
            type: 'inbox'
        }
    }
});
