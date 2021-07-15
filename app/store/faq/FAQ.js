Ext.define('Core.store.faq.FAQ', {
    extend: 'Ext.data.Store',
    alias: 'store.faq',

    model: 'Core.model.faq.Category',

    proxy: {
        type: 'api',
        url: '~api/faq/faq'
    }
});
