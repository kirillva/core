Ext.define("Core.component.form.FormMixin", {
    alternateClassName: "FormMixin",

    updateFormTemplate: function (formTemplate, sender) {
        sender.setFormTemplate(formTemplate);
    },
    
    syncFormTemplate: function (formTemplate, sender) {
        var store = sender.record && sender.record.store ? sender.record.store : null; 
        var name = store ? store.$className.replace('Core.store.', '') : "";

        sender.setFormTemplate(formTemplate);

        
        var cd_form_templates = Ext.getStore("cd_form_templates");
        var dd_documents = cd_form_templates.getById(name);
        
        dd_documents.set("jb_data", JSON.stringify(formTemplate));
        
        if (cd_form_templates.needsSync) {
            sender.mask('Сохранение...');
            cd_form_templates.sync({
                callback: function () {
                    sender.unmask();
                    cd_form_templates.load();
                },
            });
        }
    },
});
