Ext.define("Core.view.home.Home", {
    extend: "Ext.container.Container",
    xtype: "home",
    defaultListenerScope: true,
    layout: "vbox",

    constructor: function () {
        var dd_documents = Ext.getStore("dd_documents");
        dd_documents.load({
            limit: 10000,
            params: {
                select: dd_documents.getSelectFields(),
            }
        });
        this.items = [
            {
                xtype: "basegrid",
                editable: true,
                store: dd_documents,
                // autoLoad: true,
                title: "Главная",
                width: "100%",
                plugins: [
                    {
                        ptype: "rowediting",
                        clicksToEdit: 1,
                    },
                ],
                flex: 1,
            },
        ];
        this.callParent(arguments);
    },
});
