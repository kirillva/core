Ext.define("Core.model.dd_documents", {
  extend: "Ext.data.Model",
  idProperty: "id",
  // identifier: "int",

  fields: [
    { name: "id", type: "int", text: "Идентификатор", hidden: true, hideable: false, },
    { name: "c_first_name", type: "string", text: "Идентификатор", column: "gridcolumn", editor: 'textfield' },
    { name: "c_last_name", type: "string", text: "Идентификатор", column: "gridcolumn", editor: 'textfield' },
    { name: "c_middle_name", type: "string", text: "Идентификатор", column: "gridcolumn", editor: 'textfield' },
    { name: "d_birthday", type: "date", text: "Идентификатор", column: "datecolumn", editor: 'datefield' },
    { name: "f_created_user", type: "int", text: "Идентификатор", column: "gridcolumn", editor: 'textfield' },
    { name: "d_created_date", type: "date", text: "Идентификатор", column: "datecolumn", editor: 'datefield' },
    { name: "c_notice", type: "string", text: "Идентификатор", column: "gridcolumn", editor: 'textfield' },
    { name: "c_phone", type: "string", text: "Идентификатор", column: "gridcolumn", editor: 'textfield' },
    { name: "sn_delete", type: "boolean", text: "Идентификатор", column: "booleancolumn", editor: 'checkbox' },
    { name: "jb_data", text: "Идентификатор", hidden: true, hideable: false, },
  ]
});
