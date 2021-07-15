// Ext.define('Core.Application', {
//     extend: 'Ext.app.Application',

//     name: 'Core',

//     stores: [
//         'NavigationTree'
//     ],

//     defaultToken : 'dashboard',

//     // The name of the initial view to create. This class will gain a "viewport" plugin
//     // if it does not extend Ext.Viewport.
//     //
//     mainView: 'Core.view.main.Main',

//     onAppUpdate: function () {
//         Ext.Msg.confirm('Application Update', 'This application has an update, reload?',
//             function (choice) {
//                 if (choice === 'yes') {
//                     window.location.reload();
//                 }
//             }
//         );
//     }
// });


Ext.define("CORE.Application", {
    extend: "Ext.app.Application",
    name: "CORE",
    requires: ["CORE.*"],
    // defaultToken: "homeview",
  
    config: {
      configs: null,
    },
  
    removeSplash: function () {
      Ext.getBody().removeCls("launching");
      var elem = document.getElementById("splash");
      elem.parentNode.removeChild(elem);
    },
  
    launch: function () {
      this.registryGetter("Configuration", {
        url: "configs",
      });
  
      const me = this;
      this.onReady(function (name) {
        // me.removeSplash();
        var whichView = name;
        Ext.Viewport.add([{ xtype: whichView }]);
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
          debugger;
          // AuthProvider.singIn("master", "2S4KEq", true, function () {
          me.onLoadMetaData(function () {
            if (AuthProvider.isAuthorize() == true)
              AuthProvider.setAuthoriseHeader(AuthProvider.getToken());
  
            if (AuthProvider.isAuthorize() == true) {
              //   me.afterAuthLoadData(function () {
              callback("mainview");
              //   });
            } else {
              callback("login");
            }
          });
          // });
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
                break;
  
              case 200:
                console.info("метаданные загружены");
                return callback();
            }
          });
        } else {
          callback();
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
  