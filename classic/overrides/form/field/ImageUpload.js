/**
 * компонент для загрузки изображений
 * @class IServ.UI.form.field.ImageUpload
 */
Ext.define('Core.form.field.ImageUpload', {
    extend: 'Ext.form.FieldContainer',
    xtype: 'imageupload',

    requires: [
        'Core.form.field.FileBase64'
    ],

    layout: {
        type: 'hbox'
    },

    config: {
        /**
         * возможность очистки изображения
         */
        clearable: true,
        value: null,
        readOnly: null,
        /**
         * ширина изображения по умолчанию
         */
        imageWidth: 128,
        /**
         * высота изображения по умолчанию
         */
        imageHeight: 128
    },

    /**
     * конструктор
     * @param {any} cfg параметры
     */
    constructor: function (cfg) {
        cfg.items = [{
            xtype: 'image',
            width: cfg.imageWidth || 128,
            height: cfg.imageHeight || 128,
            border: 1,
            style: {
                borderColor: '#d0d0d0',
                borderStyle: 'solid'
            },
            // bind: {
            //     src: '{' + cfg.name + '}'
            // },
            listeners: {
                updatesrc: Ext.bind(this.onUpdateSrc, this)
            }
        }, {
            xtype: 'filebase64',
            name: cfg.name,
            // bind: {
            //     disabled: '{readOnly}'
            // },
            buttonOnly: true,
            listeners: {
                change: Ext.bind(this.onChangeImage, this)
            }
        }, {
            xtype: 'button',
            itemId: 'clear',
            text: 'Очистить',
            hidden: true,
            // bind: {
            //     disabled: '{readOnly}'
            // },
            listeners: {
                click: Ext.bind(this.onClear, this)
            }
        }];
        this.callParent(arguments);
    },

    privates: {
        /**
         * обработчик очистки изобаржения
         */
        onClear: function () {
            this.down('filebase64').reset();
        },

        /**
         * обработчик изменения изображения
         * @param {any} sender текущий объект
         * @param {string} value значение
         */
        onChangeImage: function (sender, value) {
            var image = this.down('image');
            image.setSrc(value);
        },

        /**
         * обработчик обновления изображения
         * @param {any} sender текущий объект
         * @param {string} src значение
         */
        onUpdateSrc: function (sender, src) {
            var clear = this.down('#clear');
            if (src) {
                clear.show();
            } else {
                clear.hide();
            }
        }
    }
})