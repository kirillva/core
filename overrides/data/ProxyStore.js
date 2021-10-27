Ext.define("Ext.overrides.data.ProxyStore", {
    override: "Ext.data.ProxyStore",
    
    load: function (options) {
        if (this.getSelectFields) {
            options.params = Object.assign(
                options.params || {},
                { select: this.getSelectFields() }
            );
        }
        this.callParent([options]);
    }
});
