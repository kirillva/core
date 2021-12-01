/*
 * провайдер для работы с авторизацией
 */
Ext.define('Core.AuthProvider', {
    singleton: true,
    alternateClassName: 'AuthProvider',

    config: {
        /**
         * авторизован
         */
        auth: null
    },

    /*
     * авторизован пользователь или нет
     */
    isAuthorize: function () {
        return localStorage.getItem('Authorize') === 'true';
    },

    /**
     * Проверить соответствует ли virtualDirPath конфига адресу
     * чтобы предотвратить перенос конфигов с приложения или другого арма
     */
    isCorrectDomainConfig: function () {
        if (!Ext.getConf('debug') && Ext.getConf('virtualDirPath') + '/' !== location.pathname) {
            ARM.app.onLogin();
        }
    },
    /*
     * возвращается токен авторизации
     */
    getToken: function () {
        return localStorage.getItem('token');
    },

    /** 
     * при ajax-запросе добавляет в header данные об авторизации
     * @param value - значения
     */
    setAuthoriseHeader: function (value) {
        if (value) {
            Ext.Ajax.setDefaultHeaders({
                "RPC-Authorization": "Token " + value
            });
        } else {
            var headers = Ext.Ajax.getDefaultHeaders();
            if (headers && headers.Authorization) {
                delete headers.Authorization;
                Ext.Ajax.setDefaultHeaders(headers);
            }
        }
    },

    /**
     *  вход в систему
     *  @param login - логин
     *  @param password - пароль
     *  @param rememberMe - значение поля "запомнить меня"
     *  @param callback - функция обратного вызова
     */
    singIn: function (login, password, rememberMe, callback) {
        // Audit.auth(login);
        this.sendPassToServer(login, password, rememberMe, callback);
    },

    /**
     * Проверка зашли ли под учеткой админа 
     */
    isIservAdmin: function () {
        return AuthProvider.getLogin() == 'admin';
    },

    /*
     * выход из системы
     */
    singOut: function () {
        document.cookie = 'name=logout; path=' + Ext.getConf('ws_url') + Ext.getConf('virtualDirPath') + '; expires=' + 0;
        // Audit.auth_out(this.getLogin());
        this.setAuthorize();
        this.setAuthoriseHeader('');
    },

    /** 
     * надо ли авторизоваться еще раз     
     * false - надо
     * true - не надо
     */
    getRememberMe: function () {
        return localStorage.getItem('rememberMe') == 'true';
    },

    /*
     * возвращается текущий авторизированный логин
     */
    getLogin: function () {
        return localStorage.getItem('login');
    },

    /**
     * возвращается идентификатор пользователя
     */
    getUserId: function () {
        return localStorage.getItem('user_id');
    },

    /**
     * возвращается список ролей
     */
    getRoles: function () {
        return localStorage.getItem('roles').toLowerCase();
    },

    getUserName: function () {
        return this.getLogin();
    },

    privates: {
        /**
         * Авторизация защищенными ключами
         * Если логин и пароль пустые то это win-авторизация через Active Directory
         */
        sendPassToServer: function (_login, _password, rememberMe, callback) {
            var me = this;
            var params = {
                UserName: _login,
                Password: _password
            };
            Ext.Ajax.request({
                url: me.getAuthUrl(),
                method: 'POST',
                params: params,
                success: function (response) {
                    var meta = JSON.parse(response.responseText);
                    if (callback) {
                        var rolesValidation = me.validateRoles(meta.user);
                        if (!rolesValidation.success) {
                            // Audit.auth_fail(_login);
                            me.setAuthorize();
                            me.setAuthoriseHeader('');
                            return callback({
                                success: false,
                                msg: rolesValidation.msg
                            });
                        }
                        if (meta.token != null) {
                            // Audit.auth_success(meta.user.userName);
                            me.setAuthorize(meta.token, meta.user.login, rememberMe, meta.user.claims.split('.').filter(item=>item).join(','), meta.user.userId);
                            me.setAuthoriseHeader(meta.token);
                            callback({
                                success: true,
                                token: meta.token
                            });
                        } else {
                            // Audit.auth_fail(_login);
                            me.setAuthorize();
                            me.setAuthoriseHeader('');
                            var msg = 'Ошибка токена';
                            callback({
                                success: false,
                                msg: msg
                            });
                        }
                    }
                },
                failure: function (response) {
                    if (callback) {
                        var msg = 'Ошибка доступа к серверу';
                        if (response.status == 401)
                            msg = 'Неверный логин или пароль';
                        me.setAuthoriseHeader('');
                        callback({
                            success: false,
                            msg: msg
                        });
                    }
                }
            });
        },
        /**
         * Переопределяется в регионе
         * Валидация ролей.
         */
        validateRoles: function () {
            return {
                success: true,
                msg: 'Успешно'
            };
        },
        /* 
         * получить URL для авторизации
         */
        getAuthUrl: function () {
            return Ext.String.format(Ext.getConf('RPC.AUTH_URL'), Ext.getConf('REMOTING_ADDRESS'));
        },

        /** 
         * аутентификация (добавление данных о пользователе в хранилище)
         *  @param token - токен
         *  @param login - логин пользователя
         *  @param rememberMe - значение поля "запомнить меня"
         */
        setAuthorize: function (token, login, rememberMe, roles, user_id) {
            if (token) {
                localStorage.setItem('Authorize', true);
                localStorage.setItem('token', token);
                if (rememberMe != undefined)
                    localStorage.setItem('rememberMe', rememberMe == 'on' ? true : rememberMe);
                else
                    localStorage.setItem('rememberMe', false);
                localStorage.setItem('login', login);

                if (roles) {
                    localStorage.setItem('roles', roles);
                }
                if (user_id) {
                    localStorage.setItem('user_id', user_id);
                }
            } else {
                localStorage.setItem('Authorize', false);
                localStorage.setItem('token', '');
                localStorage.setItem('rememberMe', false);
                localStorage.setItem('login', '');
                localStorage.setItem('roles', '');
                localStorage.setItem('user_id', '');
            }
        }
    }
});