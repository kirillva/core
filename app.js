/*
 * This file is responsible for launching the application. Application logic should be
 * placed in the Core.Application class.
 */

Ext.application({
    extend: "CORE.Application",
    name: "CORE",
    requires: [
        'Core.*'
    ]
  });
  
  Ext.getCurrentApp = function () {
    if (CORE.app) return ARM.app;
  
    Ext.Error.raise("Приложение не найдено");
  };
  
  Ext.getConf = function (value) {
    return CORE.app.getConfiguration().data[value];
  };
  
  Ext.setConf = function (key, value) {
    return (CORE.app.getConfiguration().data[key] = value);
  };
  
  Ext.getGlobalParams = function (value) {
    return CORE.app.getGlobalParams().getData()[value];
  };
  
  Ext.conf = function () {
    return CORE.app.getConfiguration();
  };
  