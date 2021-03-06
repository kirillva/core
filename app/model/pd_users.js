Ext.define("Core.model.pd_users", {
  extend: "Ext.data.Model",
  idProperty: "id",
  // identifier: "int",

  fields: [
    {
      name: "id",
      type: "int",
      text: "Идентификатор",
      hidden: true,
      hideable: false,
    },
    {
      name: "c_login",
      type: "string",
      text: "Логин",
      column: "gridcolumn",
      editor: "textfield",
    },
    {
      name: "c_password",
      type: "string",
      text: "Пароль",
      column: "gridcolumn",
    },
    // { name: 's_hash', type: 'string', text: '', column: '', },
    {
      name: "b_disabled",
      type: "boolean",
      text: "Отключен",
      column: "booleancolumn",
      editor: "checkbox",
    },
    { name: "f_created_user", type: "int", text: "Создатель", defaultValue: 0 },
    {
      name: "d_created_date",
      type: "date",
      text: "Дата создания",
      column: "datecolumn",
    },
    { name: "f_change_user", type: "int", text: "Автор изменений", defaultValue: 0 },
    {
      name: "d_change_date",
      type: "date",
      text: "Дата изменений",
      column: "datecolumn",
    },
    {
      name: "sn_delete",
      type: "boolean",
      text: "Удален",
      column: "booleancolumn",
    },
    // {
    //   name: "jb_data.c_name",
    //   type: "string",
    //   text: "Пароль",
    //   column: "gridcolumn",
    //   editor: "textfield",
    // },
    
    {
      name: "jb_data",
      // type: "json",
      text: "Дополнительные поля",
      hidden: true,
      hideable: false,
    },
  ],
});
