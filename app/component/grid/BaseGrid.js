Ext.define("Core.component.grid.BaseGrid", {
    extend: "Ext.grid.Panel",
    defaultListenerScope: true,

    xtype: "basegrid",

    plugins: [
        {
            ptype: "filterbar",
            renderHidden: false,
            showShowHideButton: false,
            showClearAllButton: false,
            showClearButton: true,
            enableOperators: false,
        }
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
        var me = this;

        if (typeof cfg.store === 'string') {
            cfg.store = Ext.StoreManager.get(cfg.store)
        }
        var model = cfg.store.model;
        if (cfg.alias && model) {
            model = Ext.ClassManager.get(`${model.displayName}_${cfg.alias}`);
        }

        var fields = model.getFields();

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

        this.dockedItems = {
            xtype: "panelheader",
            bind: {
                title: "{title}",
            },
            items: [
                {
                    xtype: "button",
                    iconCls: "x-fa fa-trash",
                    handler: "deleteRows",
                    scope: me,
                    bind: {
                        hidden: "{!selectable}",
                    },
                },
                {
                    xtype: "button",
                    bind: {
                        iconCls: "{selectable ? 'x-fa fa-check-square' : 'x-fa fa-square'}",
                    },
                    handler: 'changeSelectable',
                    scope: me,
                },
                "-",
                {
                    xtype: "button",
                    iconCls: "x-fa fa-plus",
                    handler: 'addRow',
                    scope: me,
                },
                {
                    xtype: "button",
                    iconCls: "x-fa fa-undo",
                    handler: 'undoRows',
                    scope: me,
                },
                {
                    xtype: "button",
                    iconCls: "x-fa fa-save",
                    handler: 'syncStore',
                    scope: me,
                },
            ],
        };

        cfg.plugins = (this.plugins || []).concat(cfg.plugins || []);

        this.callParent([cfg]);
    },

    setTitle: function (value) {
        var vm = this.getViewModel();
        vm.set("title", value);
    },

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
        select: function (sender, record, index, eOpts) {
            var basegrid = this;
            var baseview = basegrid.up('baseview');
            
            if (baseview && basegrid) {
                baseview.fireEvent('select', sender, record, index, basegrid);
            }
        }
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
            var store = this.getStore();
            store.sync({
                callback: function () {
                    store.reload();
                },
            });
        },

        addRow: function () {
            this.getStore().add({});
        },

        removeRow: function (grid, rowIndex, colIndex) {
            var record = grid.getStore().getAt(rowIndex);
            Ext.Msg.show({
                title: "Ошибка",
                message: "<div>Вы действительно хотите удалить запись?</div>",
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (record && btn === 'yes') {
                        if (record.phantom || !record.fieldsMap.sn_delete) {
                            grid.getStore().removeAt(rowIndex);
                        } else {
                            record.set("sn_delete", true);
                        }
                    }
                },
            });
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
            var basegrid = this;
            var baseview = basegrid.up('baseview');
            debugger;
            if (baseview && basegrid) {
                baseview.fireEvent('reset', basegrid);
            }
            this.updateSelection(null);
            this.getStore().reload();
        },
    },
});
