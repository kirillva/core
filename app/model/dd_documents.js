Ext.define("Core.model.dd_documents", {
  extend: "Ext.data.Model",
  idProperty: "id",
  identifier: 'uuid',

  fields: [
    { name: "id", type: "", text: "Идентификатор", isGuid: true, hidden: true, hideable: false, },
    { name: "c_first_name", type: "string", text: "Фамилия", column: "gridcolumn", editor: 'textfield' },
    { name: "c_last_name", type: "string", text: "Имя", column: "gridcolumn", editor: 'textfield' },
    { name: "c_middle_name", type: "string", text: "Отчество", column: "gridcolumn", editor: 'textfield' },
    { name: "d_birthday", type: "date", text: "Дата рождения", column: "datecolumn", editor: 'datefield' },
    // { name: "f_created_user", type: "int", text: "Автор", column: "gridcolumn", editor: 'textfield' },
    // { name: "d_created_date", type: "date", text: "Дата создания", column: "datecolumn", editor: 'datefield' },
    { name: "c_notice", type: "string", text: "Примечание", column: "gridcolumn", editor: 'textfield' },
    { name: "c_phone", type: "string", text: "Телефон", column: "gridcolumn", editor: 'textfield' },
    { name: "sn_delete", type: "boolean", text: "Удален", column: "booleancolumn", editor: 'checkbox' },
    { name: "jb_data", hidden: true, hideable: false, },
  ]
});
