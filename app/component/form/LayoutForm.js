Ext.define("Core.component.form.LayoutForm", {
    extend: "Ext.form.Panel",
    defaultListenerScope: true,
    xtype: "layoutform",

    constructor: function (cfg) {
        cfg.items = [{
            xtype: 'textfield',
            fieldLabel: 'template',
            name: 'template'
        },]
        this.callParent([cfg]);
        // cfg.dockedItems = [
        //     {
        //         xtype: "toolbar",
        //         dock: "bottom",
        //         items: [
        //             {
        //                 text: "Сохранить",
        //                 handler: "saveForm",
        //             },
        //         ],
        //     },
        // ].concat(cfg.dockedItems);

        // if (typeof cfg.formTemplate === 'string') {
        //     var cd_form_templates = Ext.getStore("cd_form_templates");
        //     var dd_documents_record = cd_form_templates.getById(cfg.formTemplate);
        
        //     var _formTemplate = dd_documents_record.get("jb_data");

        //     this.renderTemplate(_formTemplate);
        // }

        // if (typeof cfg.formTemplate === 'object') {
        //     this.renderTemplate(cfg.formTemplate);
        // }
    }
});
