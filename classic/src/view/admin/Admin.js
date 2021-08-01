Ext.define('Core.view.admin.Admin', {
    extend: 'Ext.container.Container',
    xtype: 'admin',

    // controller: 'dashboard',
    viewModel: {
        stores: {
            pd_users: {}
        }
    },

    layout: 'fit',

    // listeners: {
    //     hide: 'onHideView'
    // },

    items: [
        {
            xtype: 'gridpanel',
            title: '1',

            // Using the Named Store
            bind: {
                store: '{pd_users}',
            },

            width: "100%",
            // plugins: {
            //     gridfilters: true,
            // },
            plugins: [
                {
                ptype: 'filterbar',
                renderHidden: false,
                showShowHideButton: false,
                showClearAllButton: false,
                showClearButton: false,
                enableOperators: false
            },
            
            // {
            //     ptype: 'gridfilters'
            // }
        ],

            selModel: {
                type: 'spreadsheet'
            },

            columns: [
                { dataIndex: 'c_login', text: 'Логин', filter: 'string' },
                { dataIndex: 'c_password', text: 'Пароль', filter: 'string'  },
                { dataIndex: 'b_disabled', xtype: 'booleancolumn', text: 'Удален', filter: 'boolean'  },
                { dataIndex: 'f_created_user', text: 'Создатель' },
                { dataIndex: 'd_created_date', xtype: 'datecolumn', text: 'Дата создания', filter: 'date'  },
                { dataIndex: 'f_change_user', text: 'Автор изменений' },
                { dataIndex: 'd_change_date', xtype: 'datecolumn', text: 'Дата изменений', filter: 'date' },
                { dataIndex: 'sn_delete', xtype: 'booleancolumn', text: 'Удален', filter: 'boolean' }]
        }
    ],
    constructor: function () {
        this.callParent(arguments);
        const me = this;
        const pd_users = Ext.getStore('pd_users') || Ext.create('Core.store.pd_users')
        pd_users.load({
            limit: 10000,
            // params: {
            //   select: cd_settings.getSelectFields()
            // },
            callback: function () {
                me.getViewModel().setStores({pd_users: pd_users})
            },
        });
    }
});
