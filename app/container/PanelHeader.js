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
                xtype: "container",
                dock: "top",
                layout: 'hbox',
                padding: '5 10',
                cls: "x-panel-header-default",
                items: [
                    {
                        xtype: "title",
                        cls: "x-panel-header-title-default",
                        text: cfg.title,
                        height: '100%',
                        flex: 1,
                        bind: {
                            text: "{title}",
                        },
                    },
                    // "->",
                    ...cfg.items,
                ],
            },
        ];

        this.callParent([cfg]);
    },
});
