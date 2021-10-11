Ext.define("Core.model.jb_data", {
    extend: "Ext.data.Model",
    idProperty: "id",
    identifier: "sequential",

    fields: [
        { name: "id", text: 'id', type: "int"},
        
        { name: "hidden", text: 'hidden', type: "boolean", column: "booleancolumn" },
        { name: "dynamic", text: 'dynamic', type: "boolean", editor: "checkbox" },
        { name: "column", text: 'column', type: "string", column: "gridcolumn", editor: "textfield" },
        { name: "editor", text: 'editor', type: "string", column: "gridcolumn", editor: "textfield" },
        { name: "name", text: 'name', type: "string", column: "gridcolumn", editor: "textfield" },
        { name: "text", text: 'text', type: "string", column: "gridcolumn", editor: "textfield" },
        { name: "type", text: 'type', type: "string", column: "gridcolumn", editor: "textfield" },
    ],
});
