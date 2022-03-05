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
        setDirectProvider: function (NAMESPACE, callback) {
            var me = this;

            Ext.Ajax.request({
                url: `${Ext.String.format(Ext.getConf('RPC.REMOTING_API'), Ext.getConf('REMOTING_ADDRESS'))}/${NAMESPACE}`,

                success: function (response, opts) {
                    var text = response.responseText;
                    var data = JSON.parse(text);

                    if (!data.meta || data.meta.success === true) {
                        data.url = `${Ext.String.format(Ext.getConf('RPC_URL'), Ext.getConf('REMOTING_ADDRESS'))}/${NAMESPACE}`;
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
        var DIRECT = Ext.getConf('DIRECT');
        DIRECT.split(',').forEach((NAMESPACE)=>{
            Ext.Loader.setPath(NAMESPACE, `${Ext.String.format(Ext.getConf('REMOTE_DATA_URL'), Ext.getConf('REMOTING_ADDRESS'))}/${NAMESPACE}` );
            me.setDirectProvider(NAMESPACE, function (status) {
                if (callback)
                    callback(status);
            });
        })
    }
}); 