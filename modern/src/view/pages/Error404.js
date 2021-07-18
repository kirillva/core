Ext.define('Core.view.pages.Error404', {
    extend: 'Core.view.pages.ErrorBase',
    xtype:'page404',

    items:[{
        cls: 'error-page-top-text',
        html: '404'
    },{
        cls: 'error-page-desc',
        html: '<p>Seems you\'ve hit a wall!</p><p>Try going back to our ' +
        '<a href="#home"> Home page </a></p>'
    }]
});
