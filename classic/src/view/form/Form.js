Ext.define('Core.view.search.Results', {
    extend: 'Ext.tab.Panel',
    xtype: 'formresults',

    requires: [
        'Ext.grid.Panel',
        'Ext.toolbar.Paging',
        'Ext.grid.column.Date'
    ],

    controller: 'formresults',
    viewModel: {
        type: 'formresults'
    },

    cls: 'shadow',
    activeTab: 0,
    margin: 20,

    items: [
        {
            xtype: 'panel',
            title: 'panel',
            items: [{
                xtype: 'textfield',
            },{
                xtype: 'textfield',
            }]
        }
    ]
});
