/**
 * Плагин для вывода значка очистки поля
 */
Ext.define('IServ.UI.Classic.form.field.plugin.Clearable', {
    extend: 'Ext.plugin.Abstract',

    alias: 'plugin.clearable',

    pluginId: 'clear',
    /**
     * инициализация
     */
    init: function () {
        var cmp = this.getCmp();
        var triggers = cmp.getTriggers();
        triggers.clear = {
            cls: 'x-form-clear-trigger',
            handler: Ext.bind(this.onClearable, this),
            hidden: cmp.getValue() ? false : true,
            hideOnReadOnly: false // чтобы при режиме readonly не было переподключения 
        };
        cmp.setTriggers(triggers);

        cmp.on('change', this.onFieldChange, this);
    },

    /**
     * проверка очистки данных
     */
    checkClear: function () {
        this.onFieldChange(this, this.getCmp().getValue());
    },

    privates: {
        /**
         * возвращается триггер для очистки данных
         * @returns {any}
         */
        getClearTrigger: function () {
            var cmp = this.getCmp();
            var triggers = cmp.getTriggers();
            return triggers.clear;
        },

        /**
         * обработчик очистки данных
         */
        onClearable: function () {
            var cmp = this.getCmp();
            if (cmp)
                cmp.checkChange();

            if (cmp.clearValue)
                cmp.clearValue();
            else
                cmp.reset();

            this.onFieldChange(this, null);
        },

        /**
         * обработчик изменения поля
         * @param {any} sender текущее поле
         * @param {any} value новое значение
         * @param {any} oldValue старое значение
         */
        onFieldChange: function (sender, value, oldValue) {
            var clear = this.getClearTrigger();
            if (clear && sender.readOnly !== true) {
                if (value != null && value != "") {
                    clear.show();
                } else {
                    clear.hide();
                }
            }
        }
    },

    /**
     * уничтожение объекта
     */
    destroy: function () {
        var cmp = this.getCmp();
        cmp.un('change', this.onFieldChange, this)
        this.callParent(arguments);
    }
});