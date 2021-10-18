Ext.define("Core.Application", {
    extend: "Ext.app.Application",
    name: "Core",
    requires: ["Core.*"],
  
    stores: [
      "NavigationTree",
      "cd_settings",
      "current_user",
      "cd_additional_fields",
      "pd_users",
      "dd_documents"
    ],
  
    // defaultToken: 'dashboard',
  
    config: {
      configs: null,
    },
  
    // mainView: 'Core.view.main.Main',
  
    removeSplash: function () {
      Ext.getBody().removeCls("launching");
      var elem = document.getElementById("splash");
      elem && elem.parentNode.removeChild(elem);
    },
  
    launch: function () {
      this.registryGetter("Configuration", {
        url: "configs",
      });
      const me = this;
  
      this.onReady(function (name) {
        me.removeSplash();
        if (name) me.redirectTo(name);
        me.setMainView(Ext.create("Core.view.main.Main"));
      });
    },
  
    preloadStores: function (callback) {
      const cd_settings = Ext.getStore("cd_settings");
      cd_settings.load({
        limit: 10000,
        // params: {
        //   select: cd_settings.getSelectFields()
        // },
        callback: function () {
          const current_user = Ext.getStore("current_user");
          current_user.load({
            limit: 1,
            params: {
              filter: [
                {
                  property: "id",
                  value: AuthProvider.getUserId(),
                },
              ],
            },
            callback: function () {
              const cd_settings = Ext.getStore("cd_additional_fields");
              cd_settings.load({
                limit: 10000,
                // params: {
                //   select: cd_settings.getSelectFields()
                // },
                callback: function (records) {
                  records.forEach(item => {
                    var c_name = item.get('c_name');
                    var jb_data = item.get('jb_data');
  
                    var model = Ext.ClassManager.get(`Core.model.${c_name}`);
                    model.addFields(jb_data.map(item=>Object.assign(item, {dynamic: true})));
                  });
  
                  callback();
                },
              });
            },
          });
        },
      });
    },
  
    onAppUpdate: function () {
      Ext.Msg.confirm(
        "Обновление",
        "Доступна новая версия приложения, обновить?",
        function (choice) {
          if (choice === "yes") {
            window.location.reload();
          }
        }
      );
    },
    privates: {
      /**
       * приложение готово
       * @param callback {()=>void} функция обратного вызова
       */
      onReady: function (callback) {
        var me = this;
        this.loadSystemData(function () {
          console.info("загрузка системных конфигов");
          //AuthProvider.isCorrectDomainConfig();
          // обязательно вызывать после чтения конфигов
          // AuthProvider.singIn("master", "2S4KEq", true, function () {
          if (AuthProvider.isAuthorize() == true) {
            AuthProvider.setAuthoriseHeader(AuthProvider.getToken());
            me.onLoadMetaData(function (loaded) {
              if (loaded) {
                me.preloadStores(function () {
                  callback();
                });
              } else {
                callback("login");
              }
            });
          } else {
            callback("login");
          }
        });
      },
      /**
       * Загрузка мета -данных
       * @param callback {()=>void} функция обратого вызова
       */
      onLoadMetaData: function (callback) {
        var me = this;
        if (this.isLoadMeta()) {
          Meta.loadMetaData(function (status) {
            switch (status) {
              case 401:
                me.onLogin();
                return callback(false);
  
              case 200:
                console.info("метаданные загружены");
                return callback(true);
            }
          });
        } else {
          callback(true);
        }
      },
      /**
       * требуется загружать мета-описание
       */
      isLoadMeta: function () {
        return (
          AuthProvider.isAuthorize() == true &&
          !window[Ext.getConf("REMOTE_NAMESPACE")]
        );
      },
  
      onLogin: function () {
        this.redirectTo("login");
      },
      /**
       * загрузка системных данных для работы приложения
       */
      loadSystemData: function (callback) {
        var me = this;
        me.getConfiguration().read(function () {
          var useLocalAddress = Ext.getConf("useLocalAddress");
          if (useLocalAddress == true) {
            Ext.setConf("ws_url", location.protocol + "//" + location.host);
            var REMOTING_ADDRESS = Ext.getConf("REMOTING_ADDRESS");
            if (REMOTING_ADDRESS.indexOf("/") > 0) {
              var tmp = REMOTING_ADDRESS.substr(
                0,
                REMOTING_ADDRESS.indexOf("/") + 1
              );
              Ext.setConf(
                "REMOTING_ADDRESS",
                REMOTING_ADDRESS.replace(tmp, location.host + "/")
              );
            } else {
              Ext.setConf("REMOTING_ADDRESS", location.host);
            }
          }
          callback();
        });
  
        //   _.series(
        //     [
        //       // загрузка конфигов
        //       function (callback) {
        //         me.getConfiguration().read(callback);
        //       },
        //       function (callback) {
        //         var useLocalAddress = Ext.getConf("useLocalAddress");
        //         if (useLocalAddress == true) {
        //           Ext.setConf("ws_url", location.protocol + "//" + location.host);
        //           var REMOTING_ADDRESS = Ext.getConf("REMOTING_ADDRESS");
        //           if (REMOTING_ADDRESS.indexOf("/") > 0) {
        //             var tmp = REMOTING_ADDRESS.substr(
        //               0,
        //               REMOTING_ADDRESS.indexOf("/") + 1
        //             );
        //             Ext.setConf(
        //               "REMOTING_ADDRESS",
        //               REMOTING_ADDRESS.replace(tmp, location.host + "/")
        //             );
        //           } else {
        //             Ext.setConf("REMOTING_ADDRESS", location.host);
        //           }
        //         }
        //         callback();
        //       }
        //     ],
        //     callback
        //   );
      },
    },
  });
  