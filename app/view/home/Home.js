Ext.define("Core.view.home.Home", {
    extend: "Core.component.view.BaseView",
    xtype: "home",
    defaultListenerScope: true,
    
    refreshContentView: function () {
        var basegrid = this.down('basegrid');
        basegrid && basegrid.store.reload();
    }
});