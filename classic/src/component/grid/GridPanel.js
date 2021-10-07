Ext.define("Core.component.grid.Panel", {
  extend: "Ext.grid.Panel",
  defaultListenerScope: true,

  xtype: "editablegrid",

  plugins: [
    {
      ptype: "filterbar",
      renderHidden: false,
      showShowHideButton: false,
      showClearAllButton: false,
      showClearButton: true,
      enableOperators: false,
    },
    {
      ptype: "rowediting",
      clicksToEdit: 1,
    },
    // {
    //   ptype: "cellediting",
    //   clicksToEdit: 1,
    // },
  ],
  viewModel: {
    data: {
      title: "",
      selectable: false,
    },
  },

  multiSelect: true,

  selModel: {
    type: "checkboxmodel",
    bind: {
      hidden: "{selectable}",
    },
  },

  columns: [
    {
      xtype: "actioncolumn",
      align: "center",
      items: [
        {
          xtype: "button",
          iconCls: "x-fa fa-trash",
          handler: "removeRow",
        },
      ],
      cls: "content-column",
      width: 120,
      text: "Действия",
      tooltip: "edit ",
    },
  ],

  constructor: function (cfg) {
    var fields = cfg.store.model.getFields();

    var cd_additional_fields = Ext.StoreManager.get('cd_additional_fields');
    var additional_fields = Ext.StoreManager.get('cd_additional_fields').getById(cfg.store.model.entityName);

    if (additional_fields) {
      
      var jb_data = additional_fields.get('jb_data');
      if (jb_data) {
        fields = fields.concat(jb_data);
      }
    }
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
  },

  setTitle: function (value) {
    var vm = this.getViewModel();
    vm.set("title", value);
  },

  dockedItems: [
    {
      xtype: "toolbar",
      dock: "top",
      cls: "x-panel-header-default",
      items: [
        {
          xtype: "title",
          cls: "x-panel-header-title-default",
          bind: {
            text: "{title}",
          },
        },
        "->",
        // {
        //   xtype: "button",
        //   iconCls: "x-fa fa-paste",
        //   handler: "pasteRows"
        // },
        // {
        //   xtype: "button",
        //   iconCls: "x-fa fa-copy",
        //   handler: "copyRows"
        // },
        // "-",
        {
          xtype: "button",
          iconCls: "x-fa fa-trash",
          handler: "deleteRows",
          bind: {
            hidden: "{!selectable}",
          },
        },
        // {
        //   xtype: "button",
        //   iconCls: "x-fa fa-pencil-alt",
        //   handler: "editRows",
        //   bind: {
        //     hidden: "{!selectable}",
        //   },
        // },
        {
          xtype: "button",
          bind: {
            iconCls: "{selectable ? 'x-fa fa-check-square' : 'x-fa fa-square'}",
          },
          handler: "changeSelectable",
        },
        "-",
        {
          xtype: "button",
          iconCls: "x-fa fa-plus",
          handler: "addRow",
        },
        {
          xtype: "button",
          iconCls: "x-fa fa-undo",
          handler: "undoRows",
        },
        {
          xtype: "button",
          iconCls: "x-fa fa-save",
          handler: "syncStore",
        },
      ],
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

  privates: {
    changeSelectable: function () {
      var vm = this.getViewModel();
      this.updateSelectable();

      vm.set("selectable", !vm.get("selectable"));
      this.selModel.deselectAll();
    },

    updateSelectable: function () {
      var vm = this.getViewModel();
      var selectable = vm.get("selectable");

      var checkcolumn = this.down("checkcolumn");
      if (selectable) {
        checkcolumn.hide();
      } else {
        checkcolumn.show();
      }
    },

    syncStore: function () {
      this.getStore().sync();
    },

    addRow: function () {
      this.getStore().add({});
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
      debugger;
    },

    deleteRows: function () {
      var selection = this.getSelection();
      var phantom = [];

      selection.forEach((record) => {
        if (record.phantom) {
          phantom.push(record);
        } else {
          record.set("sn_delete", true);
        }
      });

      this.getStore().remove(phantom);
    },

    undoRows: function () {
      this.getStore().reload();
    },
  },
});
