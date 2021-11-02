Ext.define("Core.view.faq.Faq", {
    extend: "Ext.container.Container",
    xtype: "faq",
    margin: 12,

    constructor: function () {
        var name = 'dd_documents';

        var cd_form_templates = Ext.getStore("cd_form_templates");
        var dd_documents_record = cd_form_templates.getById(name);

        var formTemplate = dd_documents_record.get("jb_data");
        
        this.items = {
            xtype: "baseform",
            height: "100%",
            flex: 2,
            formTemplate: name,
            formRecord: 'a124a56e-3762-4882-9fa4-d1972ad291db',
            store: name,
        }
        this.callParent(arguments);
    }
});
