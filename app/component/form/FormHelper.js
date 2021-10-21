Ext.define("Core.component.form.FormHelper", {
    alternateClassName: 'FormHelper',
    singleton: true,

    getFormTemplate: function () {
        return {
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
        }
    }
});