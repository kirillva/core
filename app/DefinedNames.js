Ext.define('Core.DefinedNames', {
    alternateClassName: ['DefinedNames'],
    singleton: true,

    names: {
        "projectName": "Голосование"
    },

    get: function (property) {
        return this.names[property];
    }
});
