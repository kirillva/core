/**
 * для установки параметра select в прокси
 */
Ext.define("CORE.data.Selectable", {
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

  /**
   * возвращается список полей который требуется вернуть
   */
  getSelectFields: function () {
    this.writeSelectQuery();
    return this.getSelectQueryableToString(this.getSelectQueryables());
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
