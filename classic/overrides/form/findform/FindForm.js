/**
 * @file /src/form/findform/FindForm.js
 * @project ui_classic_package
 * @author Александр
 */

/**
 * Базовая форма для работы с плагином findform
 * @class IServ.UI.Classic.form.findform.FindForm
 * @todo см. IServ.UI.Classic.plugin.FindForm
 * @example
 * {
 *      xtype: 'findform',
 *      bodyForm: 'simplefindform'
 * }
 */
Ext.define('IServ.UI.Classic.form.findform.FindForm', {
    extend: 'Ext.form.Panel',
    xtype: 'findform',
    defaultListenerScope: true,

    requires: [
        'IServ.UI.Classic.form.findform.FieldContainer'
    ],

    layout: 'fit',

    config: {
        bodyForm: ''
    },

    title: 'Быстрый',

    items: [{
        layout: 'fit',
        xtype: 'tabpanel',
        tabPosition: 'bottom',
        defaults: {
            scrollable: true
        },
        items: [{
                title: 'Расширенный',
                disabled: true
            },
            {
                title: 'Шаблон поиска',
                disabled: true
            }
        ]
    }],

    buttons: [{
        xtype: 'button',
        text: 'Искать',
        formBind: true, //only enabled once the form is valid
        disabled: true,
        handler: 'onClickSearch'
    }, '->', {
        xtype: 'button',
        text: 'Очистить',
        handler: 'onClickReset'
    }],

    privates: {
        /**
         * Применение компонента для вставки в тело формы
         * @override
         * @param {string} name имя компонента для вставки тело формы
         * @returns {string}
         */
        applyBodyForm: function (name) {
            if (name) {
                var TAB_NAME = 'Быстрый';
                var tabIndex = 0;
                if (this.rendered == false) {
                    var items = [{
                        xtype: name,
                        title: TAB_NAME
                    }];
                    for (var i in this.items[tabIndex].items) {
                        items.push(this.items[tabIndex].items[i]);
                    }
                    this.items[tabIndex].items = items;
                } else {
                    var tabpanel = this.down('tabpanel');
                    var tabs = tabpanel.items;
                    if (tabs.length == 3) {
                        this.down('tabpanel').remove(tabs.items[tabIndex], true);
                    }
                    this.down('tabpanel').insert(0, {
                        xtype: name,
                        title: TAB_NAME
                    });
                }
            }
            return name;
        },

        /**
         * обработчик начала поиска
         */
        onClickSearch: function () {
            /**
             * событие поиска
             * @event search
             * @property {any} this текущий объект
             * @property {any} filter фильтр
             */
            this.fireEvent('search', this, this.getFilter());
        },

        /**
         * Обработчик сброса значений на форме
         */
        onClickReset: function () {
            this.reset();
            /**
             * событие сброса значения формы по умолчанию
             * @event reset
             * @property {any} this текущий объект
             * @property {any} filter фильтр
             */
            this.fireEvent('reset', this, this.getFilter());
        },

        /**
         * возвращается фильтр на основе полей формы
         * @returns {any[]}
         * @todo возвращается объект, который формируется на основе полей формы см. IServ.UI.Classic.form.findform.FieldContainer
         * @example
         * // при наличии у панели с формой метода getFilter данные будут взяты из данного метода
         * items: [{
         *      xtype: 'textfield',
         *      fieldLabel: 'Имя',
         *      name: "name",
         *      value: "Администратор"
         * }, {
         *      xtype: 'findfieldcontainer',
         *      fieldLabel: 'Логин',
         * ...
         * getFilter: function () {
         *      return [{
         *          property: "login",
         *          operator: 'like',
         *          value: 'adm'
         *      }];
         * }
         */
        getFilter: function () {
            var filter = []
            var form = this.down(this.getBodyForm());
            if (form) {
                if (form.getFilter) {
                    return form.getFilter();
                }
                form.items.each(function (item) {
                    if (item instanceof Ext.form.field.Base) {
                        filter.push({
                            property: item.name,
                            value: item.getValue()
                        });
                    } else if (item instanceof Ext.form.FieldContainer) {
                        filter.push(item.getFilter());
                    }
                }, this);
            }
            return filter;
        }
    }
});