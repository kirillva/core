Ext.define('Core.DefinedNames', {
    alternateClassName: ['DefinedNames'],
    singleton: true,

    names: {
        "projectName": "Город"
    },

    get: function (property) {
        return this.names[property];
    }
});
