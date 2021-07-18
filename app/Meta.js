Ext.define('Core.Meta', {
    alternateClassName: 'Meta',

    requires: [
        'Ext.direct.RemotingProvider'
    ],

    singleton: true,

    privates: {
        /*
         * Установка параметров для Ext.Direct
         * @param callback { () => void } функция обратного вызова
         */
        setDirectProvider: function (callback) {
            var me = this;

            Ext.Ajax.request({
                url: Ext.String.format(Ext.getConf('RPC.REMOTING_API'), Ext.getConf('REMOTING_ADDRESS')),

                success: function (response, opts) {
                    var text = response.responseText;
                    var data = JSON.parse(text);

                    if (!data.meta || data.meta.success === true) {
                        data.url = Ext.String.format(Ext.getConf('RPC_URL'), Ext.getConf('REMOTING_ADDRESS'));
                        me.createDirect(data);
                    }

                    if (callback)
                        callback(data.code || 200);
                },

                failure: function (response, opts) {
                    console.log('Ошибка при чтение мета данных. ' + response.statusText);
                    if (typeof callback == 'function')
                        callback(response.status);
                }
            });
        },


        /*
         * Создание Direct'а
         * @param data {any} данные считанные из настроек
         */
        createDirect: function (data) {
            Ext.ns(Ext.getConf('REMOTE_NAMESPACE'));
            Ext.Direct.addProvider(data);
        }
    },
    /*
     * Загрузка метаданных
     */
    loadMetaData: function (callback) {
        var me = this;
        Ext.Loader.setPath(Ext.getConf('REMOTE_NAMESPACE'), Ext.String.format(Ext.getConf('REMOTE_DATA_URL'), Ext.getConf('REMOTING_ADDRESS')));
        this.setDirectProvider(function (status) {
            if (callback)
                callback(status);
        });
    }
}); 