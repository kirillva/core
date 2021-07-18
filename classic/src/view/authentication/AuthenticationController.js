Ext.define('Core.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function() {
        this.redirectTo('home', true);
    },

    onLoginButton: function() {
        var me = this;
        AuthProvider.singIn("master", "2S4KEq", true, function () {
            me.redirectTo('home', true);
        });
    },

    onLoginAsButton: function() {
        this.redirectTo('login', true);
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
    },

    onSignupClick:  function() {
        this.redirectTo('home', true);
    },

    onResetClick:  function() {
        this.redirectTo('home', true);
    }
});