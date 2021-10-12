Ext.define('Core.grid.plugin.pagesize.PageSize', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.pagesize',

    requires: [
        'Core.grid.plugin.pagesize.PageSizeView'
    ],

    config: {
        storeType: 'pagesize'
    },

    reloadOnChange: true,
    data: [10, 25, 50, 75, 100, 150],
    combobox: {},

    init: function (pagingtoolbar) {
        var me = this;
        var storeConfig = {
            fields: ['value']
        };
        if (Array.isArray(me.data)) {
            var data = [];
            me.data.forEach(function (item) {
                data.push({
                    value: item
                });
            });
            storeConfig.data = data;
        }
        pagingtoolbar.insert(this.getViewIndex(pagingtoolbar), [
            '-',
            Ext.apply({
                xtype: 'listview-pagesize',
                store: Ext.create('Ext.data.Store', storeConfig),
                listeners: {
                    change: function (sender, value) {
                        if (pagingtoolbar) {
                            var store = pagingtoolbar.getStore();
                            if (store) {
                                store.setPageSize(value);
                                if (me.reloadOnChange === true) {
                                    store.loadPage(1);
                                }
                            }
                        }

                        me.cmp.fireEvent('changepagesize', me.cmp, value, me);
                    }
                }
            }, me.combobox)
        ]);
    },

    getViewIndex: function (pagingtoolbar) {
        var index = 0;
        if (pagingtoolbar && pagingtoolbar.items && Array.isArray(pagingtoolbar.items.items)) {
            var items = pagingtoolbar.items.items;
            for (var i = 0; i < items.length; i++) {
                if (items[i].xtype === 'tbfill') {
                    index = i;
                    break;
                }
            }
        }
        return index;
    }
});