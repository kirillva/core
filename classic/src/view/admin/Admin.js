Ext.define("Core.view.admin.Admin", {
  extend: "Ext.container.Container",
  xtype: "admin",
  defaultListenerScope: true,
  layout: "vbox",

  mixins: ["Ext.mixin.Keyboard"],

  items: [
    {
      xtype: "editablegrid",
      store: Ext.getStore("pd_users") || Ext.create("Core.store.pd_users"),
      autoLoad: true,
      title: "Пользователи",
      width: "100%",
      flex: 1,
    },
    {
      xtype: "panel",
      width: "100%",
      title: "Пользователи",
      flex: 1,
    },
  ]
});
