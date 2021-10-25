Ext.define("Core.component.form.FormWrapper", {
    extend: "Ext.container.Container",
    xtype: "formwrapper",

    defaultListenerScope: true,

    layout: "hbox",
    height: "100%",

    config: {
        formTemplate: null,
        record: null,
        settingsHidden: false
    },

    setRecord: function (record) {
        this.record = record;
        if (record && this.formTemplate) {
            this.renderForm(record, this.formTemplate);
        }
    },

    setFormTemplate: function (formTemplate) {
        this.formTemplate = formTemplate; 
        if (this.record && formTemplate) {
            this.renderForm(this.record, formTemplate);
        }
    },

    constructor: function (cfg) {
        this.callParent([cfg]);
        if (cfg.record && cfg.formTemplate) {
            this.renderForm(cfg.record, cfg.formTemplate);
        }
    },
    
    privates: {
        renderForm: function (record, formTemplate) {
            var me = this;
            if (me.items) {
                me.removeAll(true);
                me.add([
                    {
                        dockedItems: [{
                            xtype: "panelheader",
                            title: "Форма",
                            items: [
                                {
                                    xtype: "button",
                                    iconCls: "x-fa fa-cog",
                                    handler: "toggleSettings",
                                    scope: me,
                                },
                            ],
                        }],
                        xtype: "baseform",
                        height: "100%",
                        flex: 2,
                        formTemplate: formTemplate,
                        formRecord: record,
                    },
                    {
                        xtype: "formprops",
                        height: "100%",
                        flex: 1,
                        hidden: me.getSettingsHidden(),
                        store: FormHelper.formTemplateToStore(formTemplate) || null,
                        listeners: {
                            saveTemplate: function (store) {
                                var formTemplate = FormHelper.storeToTemplate(store);
                                me.fireEvent("formTemplate", formTemplate, me);
                            },
                        },
                    },
                ]);
            }
        },

        toggleSettings: function () {
            var me = this;
            var formprops = me.down('formprops');

            if (formprops.hidden) {
                formprops.show();
                me.setSettingsHidden(false);
            } else {
                formprops.hide();
                me.setSettingsHidden(true);
            }
        }
    },
});
