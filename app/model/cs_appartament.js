Ext.define("Core.model.cs_appartament", {
    extend: "Ext.data.Model",
    idProperty: "id",
    identifier: "uuid",

    fields: [
        { name: "id", type: "string", isGuid: true, hidden: true, hideable: false },
        { name: "f_house", type: "string", isGuid: true, hidden: true, hideable: false },
        { name: "f_house___f_street", type: "string", isGuid: true, hidden: true, hideable: false, persist: false },
        {
            name: "n_number",
            type: "int",
            isGuid: true,
            hidden: true,
            hideable: false,
            critical: true,
            serialize: function (value, record) {
                return Number.parseInt(record.get('c_number'));
            },
        },
        { name: "c_number", type: "string", text: "Номер", column: "gridcolumn", editor: "textfield" },
        { name: "c_number", type: "string", text: "Номер", column: "gridcolumn", editor: "textfield" },

        { name: "b_off_range", type: "boolean", hidden: true, hideable: false, defaultValue: false },
    ],
});
