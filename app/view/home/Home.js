Ext.define("Core.view.home.Home", {
    extend: "Ext.container.Container",
    xtype: "home",
    defaultListenerScope: true,
    layout: "vbox",

    constructor: function () {
        this.callParent(arguments);
    }
});
