/*
 * @file /overrides/util/FilterCollection.js
 * @project iserv_package
 * @author Александр
 *
 * переопределен для применения расширенных возможностей фильтрации по OR и AND
 * @class IServ.overrides.util.FilterCollection
 */
Ext.define('Core.overrides.util.FilterCollection', {
    override: 'Ext.util.FilterCollection',


    removeAll: function () {
        var items = this.items;
        var clearItems = items.filter(function (i) {
            return i.default != true;
        });
        if (this.generation && clearItems.length) {
            for (var i in clearItems) {
                this.remove(clearItems[i]);
            }
        }
        return this;
    },

    clear: function (all) {
        var items = this.items;
        var clearItems = items.filter(function (i) {
            return i.default == true;
        });
        if (clearItems.length > 0 && !all) {
            return this.removeAll();
        } else {
            return this.callParent();
        }
    },

    /**
     * преобразование фильтра. переопределен
     * @param {any} filter фильтр
     * @override
     */
    decodeFilter: function (filter) {
        if (typeof filter == 'string') {
            return new IServ.util.Logic({
                name: filter
            });
        }
        if (Array.isArray(filter)) {
            return new IServ.util.FilterGroup({
                items: filter
            });
        }
        return this.callParent(arguments);
    }
});