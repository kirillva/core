Ext.define("Core.view.search.SearchForm", {
    extend: "Ext.form.Panel",
    xtype: "searchform",
    defaultListenerScope: true,

    viewModel: {
        data: {
            record: null,
        },
        stores: {
            cd_uik: Ext.create("Ext.data.Store", {
                fields: ["id"],
                data: [],
                proxy: {
                    type: 'memory'
                }
            }),
            cs_street_by_uik: Ext.create("Ext.data.Store", {
                fields: ["id", "c_name"],
                data: [],
                proxy: {
                    type: 'memory'
                }
            })
        },
    },

    styles: {
        "border-radius": "5",
    },
    bodyStyle: {
        padding: "10px",
    },
    defaults: {
        width: "100%",
    },

    constructor: function () {
        this.callParent(arguments);
        var me = this;

        me.loadUik(function(){
            me.loadStreets(null);
        });
    },
    items: [
        {
            xtype: "combobox",
            fieldLabel: "УИК",
            bind: {
                store: "{cd_uik}",
            },
            queryMode: "local",
            displayField: "id",
            valueField: "id",
            name: "n_uik",
            itemId: "n_uik",
            flex: 1,
            triggerAction: "all",
            labelWidth: 100,
            minChars: 1,
            listeners: {
                change: "onChange",
                select: "onSelect",
            },
        },
        {
            xtype: "combobox",
            fieldLabel: "Улица",
            bind: {
                store: "{cs_street_by_uik}",
            },
            queryMode: "local",
            displayField: "c_name",
            allowBlank: false,
            valueField: "id",
            name: "f_street",
            itemId: "f_street",
            flex: 1,
            triggerAction: "all",
            labelWidth: 100,
            minChars: 1,
            listeners: {
                change: "onChange",
                select: "onSelect",
            },
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
            allowBlank: false,
            flex: 1,
            labelWidth: 100,
            minChars: 1,
            listeners: {
                change: "onChange",
                select: "onSelect",
            },
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
            allowBlank: false,
            flex: 1,
            labelWidth: 100,
            minChars: 1,
            listeners: {
                change: "onChange",
                select: "onSelect",
            },
        },
        {
            xtype: "textfield",
            fieldLabel: "Фамилия",
            name: "c_first_name",
            itemId: "c_first_name",
            allowBlank: false,
            flex: 1,
            labelWidth: 100,
            listeners: {
                focusleave: "onLeave",
                // change: 'onChange',
                select: "onSelect",
            },
        },
        {
            xtype: "textfield",
            fieldLabel: "Имя",
            name: "c_last_name",
            itemId: "c_last_name",
            allowBlank: false,
            flex: 1,
            labelWidth: 100,
            listeners: {
                focusleave: "onLeave",
                // change: 'onChange',
                select: "onSelect",
            },
        },
        {
            xtype: "textfield",
            fieldLabel: "Отчество",
            name: "c_middle_name",
            itemId: "c_middle_name",
            allowBlank: false,
            flex: 1,
            labelWidth: 100,
            listeners: {
                focusleave: "onLeave",
                // change: 'onChange',
                select: "onSelect",
            },
        },
        {
            xtype: "numberfield",
            fieldLabel: "Год",
            name: "n_birth_year",
            itemId: "n_birth_year",
            flex: 1,
            labelWidth: 100,
            listeners: {
                focusleave: "onLeave",
                // change: 'onChange',
                select: "onSelect",
            },
        },
        {
            xtype: "fieldcontainer",
            defaultType: "radiofield",
            defaults: {
                flex: 1,
            },
            height: 30,
            flex: 1,
            itemId: "f_type",
            layout: "hbox",
            items: [
                {
                    boxLabel: "Голосовал",
                    name: "f_type",
                    inputValue: 15,
                    checked: true,
                    id: "radio1",
                },
                {
                    boxLabel: "Не голосовал",
                    name: "f_type",
                    inputValue: 16,
                    id: "radio2",
                },
            ],
        },
    ],

    buttons: [
        {
            text: "Добавить нового",
            formBind: true,
            disabled: true,
            handler: function () {
                var form = this.up("form");
                if (form.isValid()) {
                    form.fireEvent("save", form.getValues());
                }
            },
        },
    ],

    privates: {
        loadUik: function (callback) {
            var vm = this.getViewModel();
            var cd_uik = Ext.create("Core.store.cd_uik", {
                pageSize: 10000,
                filters: [{ default: true, property: "id", operator: ">", value: 0 }],
            });
            cd_uik.load({
                callback: function (records) {
                    var store = vm.getStore("cd_uik");
                    store.setData(records);
                    if (typeof callback == 'function') 
                        callback();
                },
            });
        },
    
        loadStreets: function (uik, callback) {
            var vm = this.getViewModel();
            var cs_street_by_uik = Ext.create("Core.store.cs_street_by_uik", {
                proxy: {
                    extraParams: { 
                        limit: 10000,
                        params: [uik] 
                    },
                },
                data: [],
            });
            cs_street_by_uik.load({
                callback: function (records) {
                    var store = vm.getStore("cs_street_by_uik");
                    store.setData(records);
                    if (typeof callback == 'function') 
                        callback();
                },
            });
        },

        enableField: function (id, name) {
            var me = this;
            var fn = function (_name, _property, format = (value) => value) {
                var item = me.getComponent(_name);
                if (item.store) {
                    item.store.addFilter({
                        value: format(id),
                        property: _property,
                        operator: "=",
                    });
                    item.setValue(null);
                }
                item.enable();
            };
            switch (name) {
                case "n_uik":
                    me.loadStreets(Number(id));
                    var street = me.getComponent('f_street');
                    street && street.setValue(null);
                    fn("f_house", "n_uik", (value) => Number(value));
                    break;

                case "f_street":
                    fn("f_house", "f_street");
                    break;

                case "f_house":
                    fn("f_appartament", "f_house");
                    break;

                default:
                    break;
            }
        },

        disableField: function (id, name) {
            var me = this;
            var fn = function (_name, _property, format = (value) => value) {
                var item = me.getComponent(_name);
                if (item.store) {
                    item.store.removeFilter({
                        value: format(id),
                        property: _property,
                        operator: "=",
                    });
                }
                item.setValue(null);
                item.disable();
            };

            switch (name) {
                case "n_uik":
                    me.loadStreets(null);
                    var street = me.getComponent('f_street');
                    street && street.setValue(null);
                    fn("f_house", "n_uik", (value) => Number(value));

                case "f_street":
                    fn("f_house", "f_street");

                case "f_house":
                    fn("f_appartament", "f_house");

                default:
                    break;
            }
        },
        onLeave: function (sender, value) {
            this.fireEvent("submit", this.getValues());
            this.disableField(value, sender.name);
        },
        onChange: function (sender, value) {
            if (!value) {
                this.fireEvent("submit", this.getValues());
                this.disableField(value, sender.name);
            }
        },

        onSelect: function (sender, record) {
            if (record) {
                this.fireEvent("submit", this.getValues());
                this.enableField(record.id, sender.name);
            }
        },
    },
});
