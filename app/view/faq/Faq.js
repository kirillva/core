Ext.define("Core.view.faq.Faq", {
    extend: "Ext.container.Container",
    xtype: "faq",
    defaultListenerScope: true,

    layout: "hbox",
    height: "100%",

    viewModel: {
        data: {
            record: null,
            formTemplate: {
                items: [
                    {
                        xtype: "panel",
                        layout: "hbox",
                        items: [
                            {
                                itemId: "c_first_name",
                            },
                            {
                                itemId: "c_last_name",
                            },
                            {
                                itemId: "c_middle_name",
                            },
                        ],
                    },
                    {
                        xtype: "panel",
                        layout: "vbox",
                        items: [
                            {
                                itemId: "d_birthday",
                            },
                            {
                                itemId: "d_created_date",
                            },
                            {
                                itemId: "c_notice",
                            },
                        ],
                    },
                    {
                        xtype: "panel",
                        layout: "hbox",
                        items: [
                            {
                                itemId: "jb_data___type",
                            },
                            {
                                itemId: "c_phone",
                            },
                            {
                                itemId: "sn_delete",
                            },
                        ],
                    },
                ],
            },
        },

        formulas: {
            formTemplateToStore: function (get) {
                var children = [];
                var formTemplate = get("formTemplate");

                formTemplate.items.forEach((item, id) => {
                    var childrens = [];
                    item.items.forEach((field) => {
                        childrens.push({ text: field.itemId, leaf: true });
                    });

                    children.push({ text: `Panel ${id}`, expanded: true, leaf: false, children: childrens });
                });

                return {
                    root: {
                        expanded: true,
                        children: children,
                    },
                };
            },
        },
    },

    constructor: function () {
        this.items = [
            {
                xtype: "baseform",
                height: "100%",
                flex: 2,
                bind: {
                    formTemplate: "{formTemplate}",
                    formRecord: "{record}",
                },
            },
            {
                xtype: "formprops",
                height: "100%",
                flex: 1,
                bind: {
                    store: "{formTemplateToStore}",
                },
            },
        ];

        this.callParent(arguments);

        var vm = this.getViewModel();

        var dd_documents = Ext.getStore("dd_documents");
        dd_documents.load({
            limit: 10000,
            params: {
                select: dd_documents.getSelectFields(),
            },
            callback: function (items) {
                vm.set("record", items[0]);
            },
        });
    },
});
