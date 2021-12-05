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
            disableAddRow: true,
            addRecordData: {}
        },
    },

    multiSelect: true,

    selModel: {
        type: "checkboxmodel",
        bind: {
            hidden: "{selectable}",
        },
    },

    sn_delete: 'sn_delete',

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

    autoLoad: false,

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
                flex: 1,
                align: 'left'
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
                // "-",
                {
                    xtype: "button",
                    iconCls: "x-fa fa-plus",
                    handler: 'addRow',
                    disabled: cfg.disableAddRow,
                    bind: {
                        tooltip: '{disableAddRow}',
                        disabled: '{disableAddRow}'
                    },
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

        if (cfg.getParams) {
            cfg.store.proxy.extraParams.params = cfg.getParams();
        }
        if (cfg.pagingtoolbar) {
            this.bbar = {
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
            }
        } else {
            cfg.store.pageSize = cfg.pageSize || 100;
        }

        cfg.plugins = (this.plugins || []).concat(cfg.plugins || []);

        this.callParent([cfg]);
        // debugger;
        
        // this.getStore().load({
        //     params: {
        //         params: [null, null, null, null]
        //     },
        //     limit: 10000,
        // });
        // this.getStore().proxy.extraParams.params = [null, null, null, null];
        var vm = this.getViewModel();
        vm.set('disableAddRow', cfg.disableAddRow);
    },

    setTitle: function (value) {
        var vm = this.getViewModel();
        vm.set("title", value);
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
            var store = this.getStore();
            var [record] = store.insert(0, [{}]);

            if (record.getField('f_user')) {
                record.set('f_user', AuthProvider.getUserId());
            }

            var vm = this.getViewModel();
            var addRecordData = vm.get('addRecordData');

            Object.keys(addRecordData).forEach(key=>{
                record.set(key, addRecordData[key]);
            });
            
            store.getFilters().each(item=>{
                record.set(item.getProperty(), item.getValue());
            });
            
            if (record) {
                this.editingPlugin.startEdit(record)
            }
        },

        removeRow: function (grid, rowIndex, colIndex) {
            var me = this;
            var store = grid.getStore();
            var record = store.getAt(rowIndex);
            Ext.Msg.show({
                title: "Внимание",
                message: "<div>Вы действительно хотите удалить одну запись?</div>",
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    if (record && btn === 'yes') {
                        if (record.phantom || !record.fieldsMap[me.sn_delete]) {
                            store.removeAt(rowIndex);
                        } else {
                            record.set(me.sn_delete, true);
                            if (store.needsSync) {
                                store.sync({callback: function () {
                                    store.reload();
                                }});
                            }
                        }
                    }
                },
            });
        },

        deleteRows: function () {
            var me = this;
            var selection = me.getSelection();
            var store = me.getStore();
            Ext.Msg.show({
                title: "Внимание",
                message: "<div>Вы действительно хотите удалить выбранные записи?</div>",
                buttons: Ext.Msg.YESNO,
                fn: function (btn) {
                    var phantom = [];
                    if (btn === 'yes') { 
                        selection.forEach((record) => {
                            if (record.phantom) {
                                phantom.push(record);
                            } else {
                                record.set(me.sn_delete, true);
                                if (store.needsSync) {
                                    store.sync({callback: function () {
                                        store.reload();
                                    }});
                                }
                            }
                        });
            
                        store.remove(phantom);
                    }
                },
            });
            
        },

        undoRows: function () {
            var basegrid = this;
            var baseview = basegrid.up('baseview');
            if (baseview && basegrid) {
                baseview.fireEvent('reset', basegrid);
            }
            this.updateSelection(null);
            this.getStore().reload();
        },
    },
});
