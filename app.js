/*
 * This file is responsible for launching the application. Application logic should be
 * placed in the Core.Application class.
 */

Ext.application({
    extend: "Core.Application",
    name: "Core",
    requires: [
        'Core.*',
        'Core.grid.FilterBar'
    ]
});
  
Ext.getCurrentApp = function () {
  if (Core.app) return Core.app;

  Ext.Error.raise("Приложение не найдено");
};

Ext.getConf = function (value) {
  return Core.app.getConfiguration().data[value];
};

Ext.setConf = function (key, value) {
  return (Core.app.getConfiguration().data[key] = value);
};

Ext.getGlobalParams = function (value) {
  return Core.app.getGlobalParams().getData()[value];
};

Ext.conf = function () {
  return Core.app.getConfiguration();
};
  