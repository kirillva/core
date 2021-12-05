Ext.define("Core.view.search.Search", {
    extend: "Ext.container.Container",
    xtype: "search",
    defaultListenerScope: true,

    layout: {
        type: "hbox",
        align: "stretch",
    },

    items: [
        {
            padding: 5,
            layout: {
                type: "vbox",
                align: "stretch",
            },
            items: [
                {
                    xtype: "searchform",
                    listeners: {
                        submit: "onSubmit",
                    },
                },
            ],
        },
        {
            xtype: "dataview",
            flex: 1,
            store: Ext.create("Ext.data.Store", {
                data: [],
                proxy: {
                    type: "memory",
                },
            }),
            padding: "5 5 5 0",
            itemId: "results",
            scrollable: true,
            itemSelector: "div.item-wrap",
            tpl: new Ext.XTemplate(
                '<tpl for=".">',
                '<div style="cursor: pointer;margin-bottom: 10px;" class="item-wrap">',
                "<b>Фамилия: {c_first_name}; Имя: {c_last_name}; Отчество: {c_middle_name}</b><div>{c_type}</div><div>Год рождения: {n_birth_year}</div>",
                "<div><b>(Указать как голосовавшего)</b></div>",
                "</div>",
                "</tpl>"
            ),
            emptyText: "Ничего не найдено",
            listeners: {
                itemclick: "onItemClick",
            },
        },
    ],

    // constructor: function () {
    //     // var pd_users = Ext.getStore("pd_users");
    //     // pd_users.load();
    //     this.items = [

    //     ];
    //     this.callParent(arguments);
    // },

    privates: {
        onItemClick: function (sender, record, item, index, e, eOpts) {
            var dataview = this.down("#results");
            dataview.mask("Создание...");

            var c_first_name = record.get("c_first_name");
            var c_last_name = record.get("c_last_name");
            var c_middle_name = record.get("c_middle_name");
            var f_appartament = record.get("f_appartament");
            var n_birth_year = record.get("n_birth_year");
            var f_type = 15;
            var f_user = AuthProvider.getUserId();

            var filter = this.getFilterValues({
                c_first_name,
                c_last_name,
                c_middle_name,
                f_type: 15,
                n_birth_year,
            });

            var addFunc = function () {
                PN.cd_people.Add(
                    {
                        c_first_name,
                        c_last_name,
                        c_middle_name,
                        f_appartament,
                        n_birth_year,
                        f_type,
                        f_user,
                    },
                    function (response, options, success) {
                        // var cd_people = Ext.StoreManager.get('cd_people');
                        // cd_people.reload();
                        dataview.unmask();
                    }
                );
            };

            PN.cd_people.Query(
                {
                    limit: 10000,
                    filter: filter,
                },
                function (response, options, success) {
                    if (response.records && response.records.length) {
                        Ext.Msg.show({
                            title: "Внимание",
                            message:
                                "<div>Вы уже создали такого пользователя. Вы действительно хотите его добавить? Возможно создание дублей.</div>",
                            buttons: Ext.Msg.YESNO,
                            // icon: Ext.Msg.ERROR,
                            fn: function (btn) {
                                if (btn == "yes") {
                                    addFunc();
                                } else {
                                    dataview.unmask();
                                }
                            },
                        });
                    } else {
                        addFunc();
                    }
                }
            );
        },

        getFilterValues: function (values) {
            var filter = [];
            if (values.c_first_name) {
                filter.push({
                    property: "c_first_name",
                    value: values.c_first_name,
                    operator: "like",
                });
            }
            if (values.c_last_name) {
                filter.push({
                    property: "c_last_name",
                    value: values.c_last_name,
                    operator: "like",
                });
            }
            if (values.c_middle_name) {
                filter.push({
                    property: "c_middle_name",
                    value: values.c_middle_name,
                    operator: "like",
                });
            }
            if (values.n_birth_year) {
                filter.push({
                    property: "n_birth_year",
                    value: values.n_birth_year,
                    operator: "=",
                });
            }
            if (values.f_type) {
                filter.push({
                    property: "f_type",
                    value: values.f_type,
                    operator: "=",
                });
            }
            return filter;
        },

        onSubmit: function (values) {
            var dataview = this.down("#results");
            dataview.mask("Загрузка...");
            var filter = this.getFilterValues(values);
            PN.cf_bss_cs_peoples.Select(
                {
                    params: [null, values.f_street || null, values.f_house || null, values.f_appartament || null],
                    limit: 1000,
                    filter: filter,
                },
                function (response, options, success) {
                    dataview.unmask();
                    dataview.store.setData(response.records);
                }
            );
        },
    },
});
