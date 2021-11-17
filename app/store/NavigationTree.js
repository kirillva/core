Ext.define("Core.store.NavigationTree", {
    extend: "Ext.data.TreeStore",

    storeId: "NavigationTree",

    fields: [
        {
            name: "text"
        },
        {
            name: "jb_data"
        },
        {
            name: "layout"
        },
    ],

    root: {
        expanded: true,
        children: [
            {
                text: "Главная",
                iconCls: "x-fa fa-desktop",
                viewType: "home",
                id: "home",
                layout: 'layout_1',
                jb_data: {
                    items: [
                        { xtype: 'basegrid', title: "Заголовок 1", store: "dd_documents", model: "dd_documents_1" },
                        { xtype: 'basegrid', title: "Заголовок 2", store: "dd_documents", model: "dd_documents_2" },
                        {
                            xtype: "baseform",
                            formTemplate: "dd_documents",
                            formRecord: "a124a56e-3762-4882-9fa4-d1972ad291db",
                            store: "dd_documents",
                        },
                    ],
                },
                leaf: true,
            },
            {
                text: "Документы",
                iconCls: "x-fa fa-desktop",
                viewType: "documents",
                id: "documents",
                layout: 'layout_2',
                jb_data: {
                    items: [
                        { xtype: "basegrid", title: "Заголовок 1", store: "pd_users", model: "pd_users_1" },
                        { xtype: "basegrid", title: "Заголовок 2", store: "pd_users", model: "pd_users_1" },
                        {
                            xtype: "baseform",
                            formTemplate: "dd_documents",
                            formRecord: "a124a56e-3762-4882-9fa4-d1972ad291db",
                            store: "dd_documents",
                        },
                    ],
                },
                leaf: true,
            },
            {
                text: "Администрирование",
                iconCls: "x-fa fa-user",
                viewType: "admin",
                leaf: true,
            },
            {
                text: "Настройки",
                iconCls: "x-fa fa-cog",
                viewType: "settings",
                // visible: false,
                leaf: true,
            },
            // {
            //     text: 'Форма',
            //     iconCls: 'x-fa fa-search',
            //     viewType: 'formresults',
            //     leaf: true
            // },
            {
                text: "Помощь",
                iconCls: "x-fa fa-question",
                viewType: "faq",
                leaf: true,
            },
            {
                text: "Выход",
                iconCls: "x-fa fa-sign-out",
                viewType: "login",
                handler: function () {
                    AuthProvider.singOut();
                },
                leaf: true,
            },
            {
                text: "Pages",
                iconCls: "x-fa fa-leanpub",
                expanded: false,
                selectable: false,
                visible: false,
                children: [
                    {
                        text: "Профиль",
                        iconCls: "x-fa fa-send",
                        viewType: "profile",
                        leaf: true,
                    },
                    {
                        text: "Blank Page",
                        iconCls: "x-fa fa-file-o",
                        viewType: "pageblank",
                        leaf: true,
                    },

                    {
                        text: "404 Error",
                        iconCls: "x-fa fa-exclamation-triangle",
                        viewType: "page404",
                        leaf: true,
                    },
                    {
                        text: "500 Error",
                        iconCls: "x-fa fa-times-circle",
                        viewType: "page500",
                        leaf: true,
                    },
                    {
                        text: "Lock Screen",
                        iconCls: "x-fa fa-lock",
                        viewType: "lockscreen",
                        leaf: true,
                    },

                    {
                        text: "Login",
                        iconCls: "x-fa fa-check",
                        viewType: "login",
                        leaf: true,
                    },
                    {
                        text: "Register",
                        iconCls: "x-fa fa-pencil-square-o",
                        viewType: "register",
                        leaf: true,
                    },
                    {
                        text: "Password Reset",
                        iconCls: "x-fa fa-lightbulb-o",
                        viewType: "passwordreset",
                        leaf: true,
                    },
                ],
            },
        ],
    },
});
