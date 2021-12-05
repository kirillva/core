Ext.define('Ext.overides.grid.filters.filter.List', {
    override: 'Ext.grid.filters.filter.List',

    // Переопределено для фильтрации in вида
    // {"filter":[{"property":"C_Mobile_Version","value":"3.2.0;3.0.0;3.0.8;3.1.0;3.1.9","operator":"in"}
    constructor: function () {
        this.callParent(arguments);
        if (!this.localFilter) {
            this.filter._value = '';
            this.filter.setValue = function (value) {
                this._value = value.join(';');
            }
        }
    },

    // Фильтрация стора чтобы не отображать элемент с пустой меткой
    createMenuItems: function (store) {
        var me = this;
        store.addFilter({
            filterFn: function (item) {
                return item.get(me.labelField);
            }
        });
        this.callParent(arguments);
    }
});