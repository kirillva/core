Ext.define('Core.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function() {
        this.redirectTo('search', true);
    },

    onLoginButton: function(sender) {
        var me = this;
        sender.mask('Загрузка...')
        var view = this.getView();
        var values = view ? view.getValues() : {};
        AuthProvider.singIn(values.userid, values.password, true, function (response) {
            if (response.success) {
                var app = Ext.getCurrentApp();
                app.onReady(function (name) {
                    // var cd_navigation = Ext.getStore("NavigationTree");
                    // cd_navigation.loadAuth();
                    sender.unmask();
                    me.redirectTo('search', true);
                });
            } else {
                Ext.Msg.show({
                    title: "Ошибка",
                    message: response.msg,
                    buttons: Ext.Msg.OK,
                    // icon: Ext.Msg.ERROR,
                    fn: function (btn) {
                        sender.unmask();
                    },
                });
            }
        });
    },

    onLoginAsButton: function() {
        this.redirectTo('login', true);
    },

    onNewAccount:  function() {
        this.redirectTo('register', true);
    },

    onSignupClick:  function() {
        this.redirectTo('search', true);
    },

    onResetClick:  function() {
        this.redirectTo('search', true);
    }
});