Ext.define("Core.store.NavigationTree", {
    extend: "Ext.data.TreeStore",

    storeId: "NavigationTree",

    fields: [
        {
            name: "text",
        },
        {
            name: "jb_data",
        },
        {
            name: "layout",
        },
        {
            name: "allow",
        },
    ],

    loadAuth: function () {
        var items = [
            {
                text: "Адреса",
                iconCls: "x-fa fa-home",
                viewType: "vote",
                id: "vote",
                layout: "layout_1",
                jb_data: {
                    items: [
                        {
                            xtype: "basegrid",
                            title: "Улица",
                            store: Ext.create("Core.store.cs_street", {filters: [{property: 'b_disabled', operator: '=', value: false}]}),
                            model: "cs_street",
                            autoLoad:  true,
                            rowediting: {
                                clicksToEdit: 2,
                                listeners: {
                                    edit: function (editor, e) {
                                        editor.grid.setSelection(null);
                                        editor.grid.syncStore();
                                    },
                                },
                            },
                            disableAddRow: false,
                            sn_delete: "b_disabled",
                        },
                        {
                            xtype: "basegrid",
                            title: "Дом",
                            store: Ext.create("Core.store.cs_house", {filters: [{property: 'b_disabled', operator: '=', value: false}]}),
                            model: "cs_house",
                            autoLoad:  true,
                            rowediting: {
                                clicksToEdit: 2,
                                listeners: {
                                    edit: function (editor, e) {
                                        editor.grid.setSelection(null);
                                        editor.grid.syncStore();
                                    },
                                },
                            },
                            disableAddRow: true,
                            sn_delete: "b_disabled",
                        },
                        {
                            xtype: "basegrid",
                            title: "Квартира",
                            store: Ext.create("Core.store.cs_appartament", {filters: [{property: 'b_disabled', operator: '=', value: false}]}),
                            model: "cs_appartament",
                            autoLoad:  true,
                            rowediting: {
                                clicksToEdit: 2,
                                listeners: {
                                    edit: function (editor, e) {
                                        editor.grid.setSelection(null);
                                        editor.grid.syncStore();
                                    },
                                },
                            },
                            disableAddRow: true,
                            sn_delete: "b_disabled",
                        },
                        // { xtype: 'basegrid', title: "Избиратели", store: "cd_people", model: "cd_people", rowediting: { clicksToEdit: 2 }, },
                        // {
                        //     xtype: "baseform",
                        //     formTemplate: "1",
                        //     formRecord: "a124a56e-3762-4882-9fa4-d1972ad291db",
                        //     store: "dd_documents",
                        // },
                    ],
                },
                visible: true,
                // allow: ['monkey'],
                leaf: true,
            },
            {
                text: "Избиратели",
                iconCls: "x-fa fa-users",
                viewType: "home",
                id: "home",
                layout: "layout_2",
                jb_data: {
                    items: [
                        // { xtype: 'basegrid', title: "Улица", store: "cs_street", model: "cs_street", rowediting: { clicksToEdit: 2 }, disableAddRow: false },
                        // { xtype: 'basegrid', title: "Дом", store: "cs_house", model: "cs_house", rowediting: { clicksToEdit: 2 }, disableAddRow: true },
                        // { xtype: 'basegrid', title: "Квартира", store: "cs_appartament", model: "cs_appartament", rowediting: { clicksToEdit: 2 }, disableAddRow: true },
                        {
                            xtype: "basegrid",
                            title: "Избиратели",
                            store: 'cd_people',
                            model: "cd_people",
                            getParams: function () {
                                return [AuthProvider.getUserId(), null, null, null];
                            },
                            rowediting: { clicksToEdit: 2 },
                            disableAddRow: true,
                            rowediting: {
                                clicksToEdit: 2,
                                listeners: {
                                    edit: function (editor, e) {
                                        editor.grid.syncStore();
                                    },
                                },
                            },
                        },
                        // {
                        //     xtype: "baseform",
                        //     formTemplate: "1",
                        //     formRecord: "a124a56e-3762-4882-9fa4-d1972ad291db",
                        //     store: "dd_documents",
                        // },
                    ],
                },
                visible: true,
                // allow: ['monkey'],
                leaf: true,
            }
        ];
        var root = this.getRoot();
        items.forEach((item, id)=>{
            var node = root.childNodes.find(node=>node.get('text') == item.text);
            if (!node) {
                root.insertChild(id, item);
            }
        });
    },
    
    constructor: function  (cfg) {
        cfg.root = {
            expanded: true,
            children: [
                
                // {
                //     text: "Документы",
                //     iconCls: "x-fa fa-desktop",
                //     viewType: "documents",
                //     id: "documents",
                //     layout: 'layout_2',
                //     jb_data: {
                //         items: [
                //             { xtype: "basegrid", title: "Заголовок 1", store: "pd_users", model: "pd_users_3" },
                //             { xtype: "basegrid", title: "Заголовок 2", store: "pd_users", model: "pd_users_4" },
                //             {
                //                 xtype: "baseform",
                //                 formTemplate: "1",
                //                 formRecord: "a124a56e-3762-4882-9fa4-d1972ad291db",
                //                 store: "dd_documents",
                //             },
                //         ],
                //     },
                //     leaf: true,
                // },
                {
                    text: "Администрирование",
                    iconCls: "x-fa fa-user",
                    viewType: "admin",
                    // allow: ['admin'],
                    visible: false,
                    leaf: true,
                },
                // {
                //     text: "Настройки",
                //     iconCls: "x-fa fa-cog",
                //     viewType: "settings",
                //     // visible: false,
                //     leaf: true,
                // },
                // {
                //     text: 'Форма',
                //     iconCls: 'x-fa fa-search',
                //     viewType: 'formresults',
                //     leaf: true
                // },
                // {
                //     text: "Помощь",
                //     iconCls: "x-fa fa-question",
                //     viewType: "faq",
                //     leaf: true,
                // },
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
        };
        this.callParent([cfg]);
    }
});
