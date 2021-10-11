/**
 * для установки параметра select в прокси
 */
Ext.define("Core.data.Selectable", {
  selectQueryables: null,
  /**
   * возвращается список Select - полей
   */
  getSelectQueryables: function () {
    return Array.isArray(this.selectQueryables) ? this.selectQueryables : [];
  },

  /**
   * Задать select - поля
   */
  setSelectQueryables: function (value) {
    this.selectQueryables = Array.isArray(value) ? value : [];
  },

  columnToSQLType: function (columnType) {
    switch (columnType) {
      case "string":
        return "text";
    
      default:
        return "text";
    }
  },
 
  /**
   * возвращается список полей который требуется вернуть
   */
  getSelectFields: function () {
    var me = this;

    me.writeSelectQuery();
    var _selectQueryables = me.getSelectQueryables();

    var cd_additional_fields = Ext.StoreManager.get('cd_additional_fields');
    var additional_fields = cd_additional_fields ? cd_additional_fields.getById(me.model.entityName) : null;

    if (additional_fields) {
      debugger;
      var jb_data = additional_fields.get('jb_data')
      jb_data.forEach(field => {
        _selectQueryables.push({dataIndex: `${field.name}::${me.columnToSQLType(field.type)} as "${field.name}"`, alias: null});
      });
    }

    return me.getSelectQueryableToString(_selectQueryables);
  },

  privates: {
    /**
     * возвращается строка для добавления в select параметр
     */
    getSelectQueryableToString: function (items) {
      var result = "";
      if (items) {
        Ext.each(items, function (item) {
          if (item.alias) {
            result += "(" + item.dataIndex + ") as " + item.alias + ",";
          } else {
            result += item.dataIndex + ",";
          }
        });
      }

      return result.substr(0, result.length - 1);
    },

    writeSelectQuery: function () {
      var me = this;
      me.setSelectQueryables([]);
      Ext.each(me.getModel().getFields(), function (field) {
        me.pushField(field);
      });
    },

    pushField: function (field) {
      var me = this;
      var items = this.getSelectQueryables();
      items.push({
        dataIndex: field.getName(),
        alias: null,
      });
    },
  }
});
