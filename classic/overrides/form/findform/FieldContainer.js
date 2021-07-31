/**
 * @file /src/form/findform/FieldContainer.js
 * @project ui_classic_package
 * @author Александр
 */

/**
 * контейнер для расположения полей для findform
 * @class IServ.UI.Classic.form.findform.FieldContainer
 * @example
 * {
 *      xtype: 'findfieldcontainer',
 *      items: [{
 *          xtype: 'numberfield',
 *          flex: 1,
 *          name: "age",
 *          value: 30
 *      }, {
 *          xtype: 'findform-splitter',
 *          logic: 'OR'
 *      }, {
 *          xtype: 'numberfield',
 *          flex: 1,
 *          name: "age",
 *          value: 28
 *      }]
 * }
 * 
 * var cmp = this.down('findfieldcontainer');
 * var filter = cmp.getFilter(); // получили RPC фильтр
 */
Ext.define('IServ.UI.Classic.form.findform.FieldContainer', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'findfieldcontainer',

    requires: [
        'IServ.UI.Classic.form.findform.Splitter'
    ],

    /**
     * получение фильтра на основе полей
     * @param {any} self контайнер для рекурсивного поиска. Можно не указывать
     * @returns {any}
     */
    getFilter: function (self) {
        self = self || this;
        if (self.rendered) {
            var filter = [];
            self.items.each(function (item) {
                if (item instanceof Ext.form.FieldContainer) {
                    if (item.getFilter) {
                        filter.push(this.getNormalFilter(item.getFilter()));
                    }
                } else { // значит тут простое поле
                    if (item instanceof Ext.form.field.Base) {
                        filter.push({
                            property: item.name,
                            value: item.getValue()
                        });
                    } else if (item instanceof IServ.UI.Classic.form.findform.Splitter) {
                        filter.push(item.logic || 'OR');
                    }
                }
            }, this);
        }

        return this.getNormalFilter(filter);
    },

    privates: {
        /**
         * Корректировка фильтра
         * @todo обработка оператора BETWEEN
         * @param {any[]} filter фильтр
         * @returns {any}
         * @example
         * var filter = [{
         *      property: 'age',
         *      value: 30
         * }, 'BETWEEN', {
         *      property: 'age',
         *      value: 28
         * }];
         * var obj = getNormalFilter(filter);
         * // результат
         * [
         *      {
         *          property: 'age',
         *          operator: '>',
         *          value: 30
         *      },
         *      {
         *          property: 'age',
         *          operator: '<',
         *          value: 28
         *      }
         * ]
         */
        getNormalFilter: function (filter) {
            var last = null;
            for (var i = 0; i < filter.length; i++) {
                if (typeof filter[i] == 'string') {
                    if (filter[i].toLowerCase() == 'between') {
                        last.operator = '>';
                    }
                }

                if (last && typeof last == 'string' && last.toLowerCase() == 'between') {
                    filter[i].operator = '<';
                }

                last = filter[i];
            }

            var items = [];
            for (var i in filter) {
                if (typeof filter[i] != 'string') {
                    items.push(filter[i]);
                } else {
                    if (filter[i].toLowerCase() != 'between') {
                        items.push(filter[i]);
                    }
                }
            }

            return items;
        }
    }
});