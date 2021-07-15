/**
 * компонент для чтения настроек приложения
*/
Ext.define('CORE.Configuration', {
    alternateClassName: 'Configuration',

    CONFIG_NAME: 'config',

    url: null,
    data: {},
    isLoaded: false,

    /*
     * добавляем настройки
     * @param value {any} данные
     */
    setData: function (value) {
        Ext.apply(this.data, value);
    },

    /*
     * возвращаются данные
     */
    getData: function () {
        return this.data;
    },

    comments: {},

    /**
     * возвращаются комментарии
     */
    getComments: function () {
        return this.comments;
    },

    /**
     * Конструктор
     * параметр url является обязательным
     */
    constructor: function (cfg) {
        Ext.apply(this, cfg);
        if (!cfg.url) {
            console.log('Адрес чтения настроек не указан.');
        }
        this.createLocalStorage(this.CONFIG_NAME);
        this.callParent(arguments);
    },

    /**
     * очистка данных из локального хранилища
     * @param {string} name имя настройки
     */
    createLocalStorage: function (name) {
        if (!localStorage.getItem(name))
            localStorage.setItem(name, '{}');
    },

    /**
    * чтение настроек
    * @param callback {()=>void} функция обратного вызова
    */
    read: function (callback) {
        var me = this;
        this.readReferenceConfig(this.url + '/app.json', function () {
            me.isLoaded = true;
            if (typeof callback == 'function')
                callback();
        });
    },

    /**
     * возвращается настройка
     * @param key {string} ключ настройки
     * @param original {boolean} достать оригинальный параметр 
     */
    get: function (key, original) {
        // дополнительная настройка для чтения параметра из localstorage
        if (localStorage.getItem(this.CONFIG_NAME) && !original) {
            var data = JSON.parse(localStorage.getItem(this.CONFIG_NAME));
            if (data[key] != undefined)
                return data[key];
        }

        if (this.getData()) {
            return this.getData()[key];
        } else {
            return null;
        }
    },

    /*
     * установить настройки (локально)
     * @param key {string} ключ настройки
     * @param value {any} значение настройки
     */
    set: function (key, value) {
        if (!localStorage.getItem(this.CONFIG_NAME)) {
            this.createLocalStorage(this.CONFIG_NAME);
        }

        if (localStorage.getItem(this.CONFIG_NAME)) {

            var data = JSON.parse(localStorage.getItem(this.CONFIG_NAME));
            data[key] = value;
            localStorage.setItem(this.CONFIG_NAME, JSON.stringify(data));
        }
    },

    /*
     * путь к генерации иконок
     */
    getIconPath: function () {
        return Ext.getConf('ws_url') + Ext.getConf('virtualDirPath') + '/icon-generator?c={0}&t={1}';
    },

    privates: {
        /**
         * чтение связанной конфигурации
         * @param url {string} адрес для чтения настроек
         * @param callback {()=>void} функция обратного вызова
         */
        readReferenceConfig: function (url, callback) {
            var me = this;
            Ext.Ajax.request({
                url: url,

                success: function (response, opts) {
                    var text = response.responseText;
                    var values = null;
                    do {
                        values = /\/\/\/\s*\w+:\s*.+;/gi.exec(text);
                        Ext.each(values, function (item) {
                            var data = item.replace(';', '').replace('///', '').split(':');
                            me.comments[data[0].trim()] = data[1].trim();
                            text = text.replace(item, '');
                        });
                    } while (values);
                    delete me.comments.readme;
                    var tmp = JSON.parse(text);
                    me.setData(tmp);
                    var reference = tmp.reference;
                    if (reference) { // нужно произвести чтение связанной конфигурации
                        me.readReferenceConfig(me.url + '/' + reference + '.json', function () {
                            if (typeof callback == 'function')
                                callback();
                        });
                    } else {
                        if (typeof callback == 'function')
                            callback();
                    }
                },

                failure: function (response, opts) {
                    console.log('Ошибка чтения файла настроек. ' + response.statusText);
                    if (typeof callback == 'function')
                        callback();
                }
            });
        }
    }
});