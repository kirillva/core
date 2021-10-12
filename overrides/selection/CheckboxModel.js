Ext.define('Ext.overrides.selection.CheckboxModel', {
    override: 'Ext.selection.CheckboxModel',

    getHeaderConfig: function() {
        var config = this.callParent(arguments);
        config.hidden = true;
        
        return config;
    }
});