Ext.define("Core.container.PanelHeader", {
    extend: "Ext.container.Container",
    defaultListenerScope: true,

    xtype: "panelheader",

    config: {
        title: ''
    },

    setTitle: function (value) {
        if (!this.rendered) return;
        var title = this.down('title');
        if (title) {
            title.setText(value);
        }
    },

    constructor: function (cfg) {
        cfg.items = [
            {
                xtype: "toolbar",
                dock: "top",
                cls: "x-panel-header-default",
                items: [
                    {
                        xtype: "title",
                        cls: "x-panel-header-title-default",
                        text: cfg.title,
                        bind: {
                            text: "{title}",
                        },
                    },
                    "->",
                    ...cfg.items,
                ],
            },
        ];
        this.callParent([cfg]);
    },
});
