/**
 * компонент для загрузки данных в виде строки base64
 * @class IServ.UI.form.field.FileBase64
 */
Ext.define('IServ.UI.Classic.form.field.FileBase64', {
    extend: 'Ext.form.field.File',
    xtype: 'filebase64',
    submitValue: true,

    config: {
        /**
         * строка в формате base64
         */
        base64Str: ''
    },

    /**
     * обработчик изменения файла
     * @param {any} fileUploadComponent текущий компонент
     * @param {any} value значение
     * @param {any} eOpts параметры
     */
    onFileChange: function (fileUploadComponent, value, eOpts) {
        var file = this.getEl().down('input[type=file]').dom.files[0];
        if (file != null) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            var me = this;
            reader.onloadend = function (oFREvent) {
                me.setBase64Str(oFREvent.target.result);
                me.fireEvent('change', me, oFREvent.target.result, null);
            }
        }
    },

    /**
     * возвращается значение
     * @returns {string}
     */
    getSubmitValue: function () {
        return this.getBase64Str();
    },

    /**
     * сбросить
     */
    reset: function () {
        this.callParent(arguments);

        this.setBase64Str('');
        this.fireEvent('change', this, null, null);
    }
});