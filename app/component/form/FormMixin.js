Ext.define("Core.component.form.FormMixin", {
    alternateClassName: "FormMixin",

    updateFormTemplate: function (formTemplate, sender) {
        var name = sender.record && sender.record.store ? sender.record.store.getId() : "";

        sender.setFormTemplate(formTemplate);
        // var vm = this.getViewModel();
        // vm.set("formTemplate", formTemplate);

        var cd_form_templates = Ext.getStore("cd_form_templates");
        var dd_documents = cd_form_templates.getById(name);

        dd_documents.set("jb_data", JSON.stringify(formTemplate));

        if (cd_form_templates.needsSync) {
            cd_form_templates.sync({
                callback: function () {
                    cd_form_templates.load({
                        limit: 10000,
                    });
                },
            });
        }
    },
});
