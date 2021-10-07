Ext.define("Core.view.admin.Admin", {
  extend: "Ext.container.Container",
  xtype: "admin",
  defaultListenerScope: true,
  layout: "vbox",

  mixins: ["Ext.mixin.Keyboard"],

  stores: ["pd_users", "cd_additional_fields"],

  constructor: function () {
    var pd_users = Ext.getStore("pd_users") || Ext.create("Core.store.pd_users");
    pd_users.proxy.extraParams = {
      select: `${pd_users.getSelectFields()},jb_data.c_name::text as c_name`

    };
    pd_users.load({
      limit: 10000,
      callback: function () {
        // callback();
      },
    });
    this.items = [{
      xtype: "editablegrid",
      store: pd_users,
      autoLoad: false,
      title: "Пользователи",
      width: "100%",
      flex: 1,
    },
    {
      xtype: "editablegrid",
      store: Ext.getStore("cd_additional_fields") || Ext.create("Core.store.cd_additional_fields"),
      autoLoad: false,
      title: "Доп.поля",
      width: "100%",
      flex: 1,
    }]
    this.callParent(arguments);
  },
});
