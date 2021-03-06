Ext.define('Core.view.authentication.AuthenticationController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.authentication',

    //TODO: implement central Facebook OATH handling here

    onFaceBookLogin : function() {
        this.redirectTo('home', true);
    },

    onLoginButton: function(sender) {
        var me = this;
        sender.mask('Загрузка...')
        var view = this.getView();
        var values = view ? view.getValues() : {};
        AuthProvider.singIn(values.userid, values.password, true, function (response) {
            if (response.success) {
                Ext.getCurrentApp().onReady(function (name) {
                    // if (name) me.redirectTo(name);
                    sender.unmask();
                    me.redirectTo('home', true);
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
        this.redirectTo('home', true);
    },

    onResetClick:  function() {
        this.redirectTo('home', true);
    }
});