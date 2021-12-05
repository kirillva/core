Ext.define('Ext.overrides.grid.filters.filter.Date', {
    override: 'Ext.grid.filters.filter.Date',
    config: {
        fields: {
            lt: { text: 'Меньше' },
            gt: { text: 'Больше' },
            eq: { text: 'Равно' }
        }
    }
})