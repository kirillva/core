/**
 * Элемент для настройки количества записей на странице грида
 */
Ext.define('Core.grid.plugin.pagesize.PageSizeView', {
    extend: 'Ext.form.field.ComboBox',
    xtype: 'listview-pagesize',

    queryMode: 'local',
    displayField: 'value',
    valueField: 'value',
    editable: false,
    width: 100,

    cls:'pagesize',
    
    fieldCls:'pagesize-input',

    constructor: function () {
        this.callParent(arguments);
        this.select(this.getPageSize());
    },

    privates: {
        /**
         * Получить текущий размер страницы
         * @returns {number} Размер страницы
         */
        getPageSize: function () {
            var pageSize = 25;
            var toolbar = this.up('pagingtoolbar');
            if (toolbar) {
                var store = toolbar.getStore();
                if (store)
                    pageSize = store.getPageSize();
            }
            return pageSize;
        }
    }
});