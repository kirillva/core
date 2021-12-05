Ext.define("Core.view.search.SearchForm", {
    extend: "Ext.form.Panel",
    xtype: "searchform",
    defaultListenerScope: true,
    
    viewModel: {
        data: {
            record: null,
        },
    },

    items: [
        {
            xtype: "combobox",
            fieldLabel: "Улица",
            store: Ext.create("Core.store.cs_street", {
                filters: [{ default: true, property: "b_disabled", operator: "=", value: false }],
            }),
            displayField: "c_name",
            valueField: "id",
            name: "f_street",
            itemId: "f_street",
            flex: 1,
            labelWidth: 100,
            minChars: 1,
            listeners: {
                change: 'onChange',
                select: 'onSelect',
            }
        },
        {
            xtype: "combobox",
            fieldLabel: "Дом",
            store: Ext.create("Core.store.cs_house", {
                filters: [{ default: true, property: "b_disabled", operator: "=", value: false }],
            }),
            displayField: "c_full_number",
            valueField: "id",
            name: "f_house",
            itemId: "f_house",
            disabled: true,
            flex: 1,
            labelWidth: 100,
            minChars: 1,
            listeners: {
                change: 'onChange',
                select: 'onSelect',
            }
        },
        {
            xtype: "combobox",
            fieldLabel: "Квартира",
            store: Ext.create("Core.store.cs_appartament", {
                filters: [{ default: true, property: "b_disabled", operator: "=", value: false }],
            }),
            displayField: "c_number",
            valueField: "id",
            name: "f_appartament",
            itemId: "f_appartament",
            disabled: true,
            flex: 1,
            labelWidth: 100,
            minChars: 1,
            listeners: {
                change: 'onChange',
                select: 'onSelect',
            }
        },
        {
            xtype: "textfield",
            fieldLabel: "Фамилия",
            name: "c_first_name",
            itemId: "c_first_name",
            flex: 1,
            labelWidth: 100,
            listeners: {
                change: 'onChange',
                select: 'onSelect',
            }
        },
        {
            xtype: "textfield",
            fieldLabel: "Имя",
            name: "c_last_name",
            itemId: "c_last_name",
            flex: 1,
            labelWidth: 100,
            listeners: {
                change: 'onChange',
                select: 'onSelect',
            }
        },
        {
            xtype: "textfield",
            fieldLabel: "Отчество",
            name: "c_middle_name",
            itemId: "c_middle_name",
            flex: 1,
            labelWidth: 100,
            listeners: {
                change: 'onChange',
                select: 'onSelect',
            }
        },
    ],

    buttons: [
        {
            text: "Поиск",
            formBind: true, //only enabled once the form is valid
            disabled: true,
            handler: function () {
                var form = this.up("form");
                if (form.isValid()) {
                    form.fireEvent("submit", form.getValues());
                }
            },
        },
    ],

    privates: {
        enableField: function (id, name) {
            var me = this;
            var fn = function (_name, _property) {
                var item = me.getComponent(_name);
                if (item.store) {
                    item.store.addFilter({
                        value: id,
                        property: _property,
                        operator: '='
                    });
                    item.setValue(null);
                }
                item.enable();
            }
            switch (name) {
                case "f_street":
                    fn('f_house', 'f_street');
                    break;

                case "f_house":
                    fn('f_appartament', 'f_house');
                    break;

                default:
                    break;
            }
            
        },
        
        disableField: function (id, name) {
            var me = this;
            var fn = function (_name, _property) {
                var item = me.getComponent(_name);
                if (item.store) {
                    item.store.removeFilter({
                        value: id,
                        property: _property,
                        operator: '='
                    });
                }
                item.setValue(null);
                item.disable();
            }

            switch (name) {
                case "f_street":
                    fn('f_house', 'f_street');

                case "f_house":
                    fn('f_appartament', 'f_house');

                default:
                    break;
            }
        },
        
        onChange: function (sender, value) {
            if (!value) {
                this.disableField(value, sender.name);
            }
        },

        onSelect: function (sender, record) {
            if (record) {
                this.enableField(record.id, sender.name);
            }
        },
    },
});
