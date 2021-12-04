

Ext.define('Core.view.main.MainTree', {
    extend: 'Ext.list.Tree',

    xtype: 'maintreelist',

    applyStore: function(store) {
        var _store = store && Ext.StoreManager.lookup(store, 'tree');
        if (_store) {
            _store.each(function (node) {
                var allow = node.get('allow');
                if (allow) {
                    node.set('visible', Shared.isAccessAllowed(allow));
                }
            })
        }
        return _store;
    }
});