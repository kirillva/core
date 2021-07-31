/**
 * поле для настройки критерия фильтрации
 */
Ext.define("IServ.UI.Classic.form.field.CriteriaField", {
    extend: 'Ext.form.field.Picker',
    xtype: 'criteriafield',

    /**
     * устанвливать ширину выпадайки по содержимому
     */
    matchFieldWidth: false,

    config: {
        /**
         * настройки панели для вывода критерии
         */
        panelConfig: {
            minWidth: 400,
            minHeight: 200
        },
        /**
         * модель для работы с критериями
         */
        model: null
    },

    /**
     * инициализация
     */
    initComponent: function () {
        this.callParent(arguments);
        this.initDefaultValuePicker(this.getValue() || null);
    },

    /**
     * переопределен
     * @override
     */
    createPicker: function () {
        var self = this;
        self.picker = Ext.create('IServ.UI.Classic.criteria.Group', Ext.apply({
            pickerField: self,
            floating: true,
            cls: 'x-menu',
            hidden: true,
            focusOnToFront: false,
            model: self.getModel(),
            criteria: self.jsonValue,
        }, self.getPanelConfig()));

        self.picker.ownerCt = self.up('[floating]');
        self.picker.registerWithOwnerCt();

        return self.picker;
    },

    /**
     * Переопределен
     * @param {any} value значение 
     */
    setValue: function (value) {
        if (value == "")
            value = null;

        if (this.picker && this.picker.rendered == true) {
            var picker = this.picker;
            picker.setCriteria(value);
            this.callParent([this.jsonValue = picker.getInnerValues()])
            this.setRawValue(picker.convertToString());
        } else {
            var picker = Ext.create('IServ.UI.Classic.criteria.Group', {
                hidden: true,
                model: this.getModel(),
                criteria: typeof value == 'string' ? JSON.parse(value) : value
            });

            this.callParent([this.jsonValue = picker.getInnerValues()]);
            this.setRawValue(picker.convertToString());
            Ext.destroy(picker);
        }
    },

    privates: {
        /**
         * обновление модели
         * @param {string} value имя модели 
         */
        updateModel: function (value) {
            if (this.picker) {
                this.picker.setModel(value);
                this.picker.removeAll();
            }
        },
        /**
         * переопределен
         */
        collapse: function () {

            var picker = this.getPicker();
            this.setValue(this.jsonValue = picker.getInnerValues());
            this.setRawValue(picker.convertToString());
            this.checkChange();
            this.callParent(arguments);
        },
        /**
         * Переопределен
         * @override
         * @returns {any}
         */
        getSubmitValue: function () {
            if (this.jsonValue)
                return JSON.stringify(this.jsonValue);
            else {
                var picker = this.picker;
                if (picker) {
                    return JSON.stringify(picker.getInnerValues());
                }
            }

            return '[]';
        },
        /**
         * иницализация значений по умолчанию
         * @param {any} criteria фильтрация
         */
        initDefaultValuePicker: function (criteria) {
            var picker = Ext.create('IServ.UI.Classic.criteria.Group', {
                hidden: true,
                model: this.getModel(),
                criteria: criteria
            });
            this.setValue(this.jsonValue = picker.getInnerValues());
            this.setRawValue(picker.convertToString());

            Ext.destroy(picker);
        }
    },
    destroy: function () {
        delete this.jsonValue;
        this.callParent(arguments);
    }
});