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
            result += `${item.dataIndex} as ${item.alias},`;
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
      var name = field.getName();

      var _dataIndex = name.split('.');
      if (_dataIndex.length == 2) {
        items.push({
          dataIndex: `${name}::${me.columnToSQLType(field.type)}`, 
          alias: `"${name}"`,
          dynamic: true
        });
      } else { 
        items.push({
          dataIndex: name,
          alias: null,
        });
      }

    },
  }
});
