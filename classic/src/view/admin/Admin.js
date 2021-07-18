Ext.define('Core.view.admin.Admin', {
    extend: 'Ext.container.Container',
    xtype: 'admin',

    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    // controller: 'dashboard',
    // viewModel: {
    //     type: 'dashboard'
    // },

    layout: 'fit',

    // listeners: {
    //     hide: 'onHideView'
    // },

    items: [
        {
            xtype: 'todo'
        },
    ]
});
