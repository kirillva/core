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
            flex: 1,
            items: [
                {
                    xtype: "searchform",
                    listeners: {
                        submit: "onSubmit",
                        save: "onSave",
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
                '<div style="cursor: pointer;margin-bottom: 10px;background-color:#FFF;padding: 15px;border-radius: 5px;" class="item-wrap">',
                "<b>{c_first_name} {c_last_name} {c_middle_name}</b><div>{c_type}</div><div>Год рождения: {n_birth_year}</div>",
                "<div style='background-color: #5fa2dd;width:200px;color:#FFF;height:32px;display: flex;'><span style='margin:auto'>Выбрать</span></div>",
                "</div>",
                "</tpl>"
            ),
            emptyText: "Ничего не найдено",
            listeners: {
                itemclick: "onItemClick",
            },
        },
    ],

    privates: {
        onSave: function (values) {
            this.addRecord(values);
        },
        onItemClick: function (sender, record, item, index, e, eOpts) {
            var searchform = this.down('searchform');
            searchform && searchform.form.setValues(record.getData())
        },

        addRecord: function (values) {
            var dataview = this.down("#results");
            var searchform = this.down("searchform");
            dataview.mask("Создание...");

            var c_first_name = values.c_first_name;
            var c_last_name = values.c_last_name;
            var c_middle_name = values.c_middle_name;
            var f_appartament = values.f_appartament;
            var n_birth_year = values.n_birth_year;

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
                        n_birth_year: n_birth_year ? n_birth_year : null,
                        f_type,
                        f_user,
                    },
                    function (response, options, success) {
                        searchform && searchform.form.setValues(
                            Object.assign(searchform.form.getValues(), {
                                c_first_name: "",
                                c_last_name: "",
                                c_middle_name: "",
                                n_birth_year: null,
                            })
                        );
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
            filter.push({
                property: "c_first_name",
                value: null,
                operator: "isnot",
            });
            return filter;
        },

        onSubmit: function (values) {
            var dataview = this.down("#results");
            if (values.f_appartament) {
                dataview.mask("Загрузка...");
                var filter = this.getFilterValues(values);
                PN.cf_bss_cs_peoples.Select(
                    {
                        params: [null, values.f_street || null, values.f_house || null, values.f_appartament || null],
                        // select: 'id,f_user,f_street,c_street,f_house,c_house,f_appartament,c_appartament,c_first_name,c_last_name,c_middle_name,n_birth_year,f_type,c_type',
                        limit: 1000,
                        filter: filter,
                    },
                    function (response, options, success) {
                        dataview.unmask();
                        if (success) {
                            dataview.store.setData(response.records);
                        }
                    }
                );
            }
        },
    },
});
