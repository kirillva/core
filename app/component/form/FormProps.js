Ext.define("Core.component.form.FormProps", {
    extend: "Ext.form.Panel",
    defaultListenerScope: true,
    xtype: "formprops",

    config: {
        store: null,
        selectedRecord: null
    },

    layout: "vbox",

    constructor: function (cfg) {
        this.callParent(arguments);
        this.renderForm(cfg.store)
    },

    privates: {
        renderForm: function (store) {
            this.add([
                {
                    xtype: "treepanel",
                    width: "100%",
                    flex: 1,
                    cls: "formtree",
                    dockedItems: {
                        xtype: "panelheader",
                        title: "Структура",
                        items: [
                            "-",
                            {
                                xtype: "button",
                                iconCls: "x-fa fa-plus",
                                handler: "addLayout",
                                scope: this,
                            },
                            {
                                xtype: "button",
                                iconCls: "x-fa fa-save",
                                handler: "syncTemplate",
                                scope: this,
                            },
                        ],
                    },
                    store: store,
                    viewConfig: {
                        plugins: {
                            ptype: "treeviewdragdrop",
                            dragText: "Отпустить для перемещения",
                        },
                    },
                    listeners: {
                        selectionchange: "onSelectionChange",
                        drop: "onDrop",
                        beforedrop: 'onBeforeDrop'
                    },
                },
                {
                    xtype: "panel",
                    title: "Свойства",
                    width: "100%",
                    itemId: "settings",
                    flex: 1,
                    items: [
                        // {
                        //     xtype: "textfield",
                        //     fieldLabel: "fieldLabel",
                        // },
                    ],
                },
            ]);
        },

        addLayout: function () {
            var treepanel = this.down("treepanel");
            var store = treepanel.getStore();

            store.getRootNode().appendChild({ text: `Панель`, expanded: true, leaf: false, root: false });
        },

        saveTemplate: function () {
            var treepanel = this.down("treepanel");
            var store = treepanel.getStore();

            return store;
        },

        onSelectionChange: function (treelist, records, eOpts) {
            if (!records || !records.length) return;

            var record = records[0];

            this.renderSettings(record);
            this.setSelectedRecord(record);
        },

        renderSettings: function (record) {
            var me = this;
            var settings = this.down("#settings");
            settings.removeAll(true);

            var layout = record.get("layout");

            if (record.isLeaf()) {

            } else {
                settings.add([
                    {
                        xtype: "combobox",
                        fieldLabel: "Расположение полей",
                        displayField: "name",
                        valueField: "id",
                        value: layout,
                        store: {
                            data: [
                                { id: "hbox", name: "Горизонтально" },
                                { id: "vbox", name: "Вертикально" },
                            ],
                        },
                        listeners: {
                            select: 'selectLayout'
                        },
                    },
                ]);
            }
        },

        selectLayout: function (combo, record, eOpts) {
            var selectedRecord = this.getSelectedRecord();

            selectedRecord.set('layout', record.id);

            var store = this.saveTemplate();
            this.fireEvent("saveTemplate", store);
        },

        onDrop: function (node, data, overModel, dropPosition, eOpts) {
            var store = this.saveTemplate();
            this.fireEvent("saveTemplate", store);
        },

        syncTemplate: function () {
            var store = this.saveTemplate();
            var formTemplate = FormHelper.storeToTemplate(store);

            this.fireEvent("syncTemplate", formTemplate);
        },

        onBeforeDrop: function (node, data, overModel, dropPosition, dropHandlers, eOpts) {
            var record = data.records && data.records[0];

            if (overModel.isRoot() && dropPosition == 'append' && !record.isLeaf()) {
                return true;
            } 

            if ((!overModel.isLeaf() && !overModel.isRoot()) && dropPosition == 'before' && !record.isLeaf()) {
                return true;
            } 

            if (overModel.isLeaf() && (dropPosition == 'before' || dropPosition == 'after') && record.isLeaf()) {
                return true;
            } 

            return false;
        }
    },
});
