Ext.define("Core.component.grid.Panel", {
  extend: "Ext.grid.Panel",
  defaultListenerScope: true,

  xtype: "editablegrid",
  
  mixins: ["Ext.mixin.Keyboard"],

  plugins: [
    {
      ptype: "filterbar",
      renderHidden: false,
      showShowHideButton: false,
      showClearAllButton: false,
      showClearButton: true,
      enableOperators: false,
    },
    // {
    //     ptype: 'rowediting'
    // },
    {
      ptype: "cellediting",
      clicksToEdit: 1,
    },
  ],

  multiSelect: true,

  selModel: {
    type: "checkboxmodel",
    width: 40,
  },

  columns: [
    {
      xtype: "actioncolumn",
      items: [
        {
          xtype: "button",
          iconCls: "x-fa fa-trash",
          handler: "removeRow",
        },
        // {
        //   xtype: "button",
        //   iconCls: "x-fa fa-pencil-alt",
        //   handler: "editRow",
        // },
      ],

      cls: "content-column",
      width: 120,
      // dataIndex: 'bool',
      text: "Действия",
      tooltip: "edit ",
    },
  ],

  constructor: function (cfg) {
    var fields = cfg.store.model.getFields();
    var _columns = fields.map((item) => {
      var options = {
        dataIndex: item.name,
        filter: item.type,
        text: item.text,
        xtype: item.column,
        hidden: item.hidden,
        editor: item.editor,
      };
      if (item.hideable || item.hideable === false) {
        options.hideable = item.hideable;
      }
      return options;
    });
    this.columns = _columns.concat(this.columns);

    this.callParent([cfg]);
    debugger;
  },

  title: "Пользователи",

  tools: [
    {
      xtype: "button",
      iconCls: "x-fa fa-plus",
      handler: "addRow",
    },
    {
      xtype: "button",
      iconCls: "x-fa fa-save",
      handler: "syncStore",
    },
  ],

  bbar: {
    xtype: "pagingtoolbar",
    padding: 10,
    plugins: [
      {
        ptype: "pagesize",
        data: [10, 25, 50, 100, 250, 500, 1000, 10000],
        reloadOnChange: true,
      },
    ],
    ui: "white-paging",
    displayInfo: true,
    displayMsg: "Отображаются элементы {0} - {1} из {2}",
    emptyMsg: "Информация отсутствует",
  },

  listeners: {
    keydown: "handleKeyDown",
  },

  keyMap: {
    "CmdOrCtrl+C": "doCopy",
    ENTER: 'onEnterKey',
  },
  privates: {
    syncStore: function () {
      debugger;
      this.getStore();
      // var rec = grid.getStore().getAt(rowIndex);
      // alert("Edit " + rec.get("firstname"));
    },

    addRow: function () {
      debugger;
      this.getStore().add({});
      // var rec = grid.getStore().getAt(rowIndex);
      // alert("Edit " + rec.get("firstname"));
    },

    removeRow: function (grid, rowIndex, colIndex) {
      var record = grid.getStore().getAt(rowIndex);
      if (record) {
        if (record.phantom) {
          grid.getStore().removeAt(rowIndex);
        } else {
          record.set("sn_delete", true);
        }
      }
    },

    editRow: function (grid, rowIndex, colIndex) {
      // debugger;
      // var rec = grid.getStore().getAt(rowIndex);
      // alert("Edit " + rec.get("firstname"));
    },

    doCopy: function (e, t, eOpts) {
      debugger;
    },
    onEnterKey: function (e, t, eOpts) {
        debugger;
      },
  },
});
