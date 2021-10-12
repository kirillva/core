/**
 * Плагин для вывода в колонках grid'a уникальных записей
 * @class Core.form.field.DistinctButton
 * @example
 * {
 *      ptype: 'distinctbutton',
 *      storeName: 'Core.store.sys_users', // полное имя хранилища
 *      columnName: role_id___name // наименование колонки по которой будет производиться поиск
 * }
 */
Ext.define('Core.form.field.DistinctButton', {
    extend: 'Ext.AbstractPlugin',
    alias: 'plugin.distinctbutton',

    /**
     * Класс для оформления
     * @returns {string}
     */
    operatorButtonCls: Ext.baseCSSPrefix + 'operator-button',

    /**
     * Элемент кнопки. Только для чтения
     * @returns {any}
     */
    operatorButtonEl: null,

    /**
     * Выпадающий список. Только для чтения
     * @returns {any}
     */
    picker: null,

    /**
     * настройки
     */
    config: {
        /**
         * Имя хранилища полностью
         * @returns {string}
         * @example
         * var name = "Core.store.sys_users";
         */
        storeName: '',
        /**
         * Имя колонки для поиска
         * @returns {string}
         * @example
         * name
         * // или
         * role_id_name
         */
        columnName: '',
        /**
         * ширина выпадающего списка
         * @returns {number|string}
         */
        width: 200,
        /**
         * высота выпадающего списка
         * @returns {number|string}
         */
        height: 150
    },

    /**
     * конструктор
     * @param {any} config дополнительнче настройки, параметры
     */
    constructor: function (config) {
        Ext.apply(this, config);
        this.callParent(arguments);
    },

    /**
     * инициализация
     * @param {any} textField поле для ввода фильтра
     */
    init: function (textField) {
        if (!textField.rendered) {
            textField.on('afterrender', this.onFieldRender, this, {
                single: true
            });
        } else {
            this.onFieldRender();
        }

        textField.on({
            destroy: this.onFieldDestroy,
            focus: this.onFieldFocus,
            blur: this.onFieldBlur,
            resize: this.onFieldResize,
            scope: this
        });

        var store = Ext.create(this.getStoreName(), {
            sorters: [{
                property: this.getColumnName(),
                direction: "ASC"
            }]
        });
        if (store.proxy.extraParams)
            store.proxy.extraParams['select'] = 'DISTINCT ' + this.getColumnName();

        this.picker = Ext.widget({
            xtype: 'boundlist',
            width: this.getWidth(),
            height: this.getHeight(),
            id: textField.id + '-picker',
            pickerField: textField,
            floating: true,
            border: true,
            hidden: true,
            preserveScrollOnRefresh: true,
            store: store,
            displayField: this.getColumnName(),
            valueField: this.getColumnName(),
            listeners: {
                itemclick: this.onItemClick,
                scope: this
            }
        });
        this.picker.ownerCt = textField.up('[floating]');
        this.picker.registerWithOwnerCt();
    },

    privates: {
        /**
         * обработчик нажатия на элемент в списке
         * @param {any} sender текущий объект
         * @param {any} record выбранная запись
         */
        onItemClick: function (sender, record, item, index, e, eOpts) {
            this.picker.hide();
            this.getCmp().setValue(record.get(this.getColumnName()));
        },

        /**
         * обработчик закрытия панели
         */
        onPickerBlur: function () {
            var me = this;
            this.picker.el.un('focusleave', this.onPickerBlur, this);
            this.picker.hide();
            me.updateOperatorButtonVisibility();
        },

        /**
         * обработчик отрисовки текстового поля к котором привязан плагин
         * @param {any} textField текстовое поле к которому привяхан плагин
         */
        onFieldRender: function () {
            var textField = this.getCmp();
            var bodyEl = textField.bodyEl;
            var btn = this.operatorButtonEl = textField.bodyEl.createChild({
                tag: 'div',
                cls: this.operatorButtonCls + ' ' + this.operatorButtonCls + '-filter x-fa',
                style: 'visibility: hidden;',
                'data-qtip': 'Уникальные значения'
            });

            bodyEl.on('mouseover', this.onFieldMouseOver, this);
            bodyEl.on('mouseout', this.onFieldMouseOut, this);
            btn.on('mouseover', this.onButtonMouseOver, this);
            btn.on('mouseout', this.onButtonMouseOut, this);
            btn.on('click', this.onButtonClick, this);

            this.repositionOperatorButton();
        },

        /**
         * обработчик удаления поля
         */
        onFieldDestroy: function () {
            if (this.operatorButtonEl) {
                this.operatorButtonEl.destroy();
                this.operatorButtonEl = null;
            }

            if (this.picker) {
                if (this.picker.el)
                    this.picker.el.un('focusleave', this.onPickerBlur, this);
                this.picker.destroy();
                this.picker = null;
            }
        },

        /**
         * обработчик фокуса на поле
         */
        onFieldFocus: function () {
            this.fieldInFocus = true;
            this.updateOperatorButtonVisibility();
        },

        /**
         * обработчик потери фокуса у поля
         */
        onFieldBlur: function () {
            this.fieldInFocus = false;
            this.updateOperatorButtonVisibility();
        },

        /**
         * обработчик изменения размера поля
         */
        onFieldResize: function () {
            this.repositionOperatorButton();
        },

        /**
         * обработчик mouseover у поля
         * @param {any} e объект события 
         */
        onFieldMouseOver: function (e) {
            var me = this;

            if (me.getCmp().triggerEl) {
                var elements = me.getCmp().triggerEl.elements;
                if (elements.length > 0 && e.getRelatedTarget() == elements[0].dom) {
                    return;
                }
            }
            me.operatorButtonEl.addCls(me.operatorButtonCls + '-mouse-over-input');
            if (e.getRelatedTarget() == me.operatorButtonEl.dom) {
                me.operatorButtonEl.removeCls(me.operatorButtonCls + '-mouse-over-button');
                me.operatorButtonEl.removeCls(me.operatorButtonCls + '-mouse-down');
            }
            me.updateOperatorButtonVisibility();
        },

        /**
         * обработчик mouseout у поля
         * @param {any} e объект события 
         */
        onFieldMouseOut: function (e) {
            var me = this;
            if (me.getCmp().triggerEl) {
                var elements = me.getCmp().triggerEl.elements;
                if (elements.length > 0 && e.getRelatedTarget() == elements[0].dom) {
                    return;
                }
            }
            me.operatorButtonEl.removeCls(me.operatorButtonCls + '-mouse-over-input');
            if (e.getRelatedTarget() == me.operatorButtonEl.dom) {
                // Moused moved from operator button and will generate another mouse event there.
                // Handle it here to avoid duplicate updates (else animation will break)
                me.operatorButtonEl.addCls(me.operatorButtonCls + '-mouse-over-button');
            }
            me.updateOperatorButtonVisibility();
        },

        /**
         * обработчик mouseover у кнопки операции
         * @param {any} e объект события 
         */
        onButtonMouseOver: function (e) {
            var me = this;

            e.stopEvent();
            if (me.getCmp().bodyEl.contains(e.getRelatedTarget())) {
                // has been handled in handleMouseOutOfInputField() to prevent double update
                return;
            }
            me.operatorButtonEl.addCls(me.operatorButtonCls + '-mouse-over-button');
            me.updateOperatorButtonVisibility();
        },

        /**
         * обработчик mouseout у кнопки операции
         * @param {any} e объект события 
         */
        onButtonMouseOut: function (e) {
            var me = this;

            e.stopEvent();
            if (me.getCmp().bodyEl.contains(e.getRelatedTarget())) {
                // will be handled in handleMouseOverInputField() to prevent double update
                return;
            }
            me.operatorButtonEl.removeCls(me.operatorButtonCls + '-mouse-over-button');
            me.operatorButtonEl.removeCls(me.operatorButtonCls + '-mouse-down');
            me.updateOperatorButtonVisibility();
        },

        /**
         * обработчик нажатия на операцию
         * @param {any} e объект события
         */
        onButtonClick: function (e) {
            var me = this;

            if (e.button !== 0)
                return;
            me.picker.store.load({
                limit: 1000,
                callback: function () {
                    me.picker.el.on('focusleave', me.onPickerBlur, me);
                }
            });
            me.picker.showAt(e.getX(), e.getY(), false);
            me.picker.el.focus();
            e.stopEvent();
        },

        /**
         * видна ли операция
         * @returns {boolean}
         */
        shouldButtonBeVisible: function () {
            var me = this;

            if (me.picker &&
                !me.picker.isVisible() &&
                !me.fieldInFocus &&
                !me.operatorButtonEl.hasCls(me.operatorButtonCls + '-mouse-over-button') &&
                !me.operatorButtonEl.hasCls(me.operatorButtonCls + '-mouse-over-input')) {
                return false;
            }
            return true;
        },

        /**
         * обновление видимости кнопки с операцией
         */
        updateOperatorButtonVisibility: function () {
            var me = this,
                btn = me.operatorButtonEl,
                oldVisible = btn.isVisible(),
                newVisible = me.shouldButtonBeVisible(),
                padding;

            if (!Ext.isWebKit) {
                padding = (newVisible ? 22 : 10);
            } else {
                padding = (newVisible || !me.webKitBugFlag ? 22 : 10);
                me.webKitBugFlag = true;
            }
            me.getCmp().inputEl.applyStyles({
                'padding-left': padding + 'px'
            });

            Ext.defer(function () {
                var oldVisible = btn.isVisible(),
                    newVisible = me.shouldButtonBeVisible();

                if (oldVisible == newVisible) return;

                btn.stopAnimation();
                btn.setVisible(newVisible, {
                    duration: 0
                });

                if (!Ext.isWebKit) {
                    padding = (newVisible ? 22 : 10);
                } else {
                    padding = (newVisible || !me.webKitBugFlag ? 22 : 10);
                    me.webKitBugFlag = true;
                }
                me.getCmp().inputEl.applyStyles({
                    'padding-left': padding + 'px'
                });
            }, 200);
        },

        /**
         * измненение положения кнопки с операцией
         */
        repositionOperatorButton: function () {
            var btn = this.operatorButtonEl;

            if (!btn)
                return;
            btn.alignTo(this.getCmp().bodyEl, 'l-l', [2, 0]);
        }
    },

    /**
     * удаление объекта
     */
    destroy: function () {
        this.onFieldDestroy();
        this.callParent(arguments);
    }
});