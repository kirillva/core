Ext.define("Ext.overrides.data.writer.Writer", {
    override: "Ext.data.writer.Writer",

    getRecordData: function (record, operation) {
        var _record = this.callParent(arguments);
        var jb_data = null;

        Object.keys(_record).forEach((item) => {
            if (item.indexOf("jb_data") === 0) {
                var [prefix, c_name] = item.split(".");
                if (!jb_data) jb_data = record.get("jb_data") || {};
                jb_data[c_name] = _record[item];
                delete _record[item];
            }
        });

        _record = Object.assign({[record.idProperty]: ''}, _record);
        
        return jb_data ? Object.assign(_record, { jb_data: jb_data }) : _record;
    }
});
