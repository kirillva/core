Ext.define('Core.view.main.Main', {
    extend: 'Ext.container.Viewport',

    requires: [
        'Ext.button.Segmented',
        'Ext.list.Tree'
    ],

    controller: 'main',
    viewModel: 'main',

    cls: 'sencha-dash-viewport',
    itemId: 'mainView',

    layout: {
        type: 'vbox',
        align: 'stretch'
    },

    listeners: {
        render: 'onMainViewRender'
    },

    // constructor: function () {
    //     this.callParent(arguments);
    // },

    items: [
        {
            xtype: 'toolbar',
            cls: 'sencha-dash-dash-headerbar shadow',
            height: 64,
            itemId: 'headerBar',
            items: [
                {
                    xtype: 'component',
                    reference: 'senchaLogo',
                    cls: 'sencha-logo',
                    html: `<div class="main-logo"><i class="fa fa-globe" aria-hidden="true"></i>${DefinedNames.get('projectName')}</div>`,
                    width: 250
                },
                {
                    margin: '0 0 0 8',
                    ui: 'header',
                    iconCls:'x-fa fa-navicon',
                    id: 'main-navigation-btn',
                    handler: 'onToggleNavigationSize'
                },
                '->',
                // {
                //     xtype: 'segmentedbutton',
                //     margin: '0 16 0 0',

                //     platformConfig: {
                //         ie9m: {
                //             hidden: true
                //         }
                //     },

                //     items: [{
                //         iconCls: 'x-fa fa-desktop',
                //         pressed: true
                //     }, {
                //         iconCls: 'x-fa fa-tablet',
                //         handler: 'onSwitchToModern',
                //         tooltip: 'Switch to modern toolkit'
                //     }]
                // },
                // {
                //     iconCls:'x-fa fa-search',
                //     ui: 'header',
                //     href: '#searchresults',
                //     hrefTarget: '_self',
                //     tooltip: 'Перейти к поиску'
                // },
                // {
                //     iconCls:'x-fa fa-question',
                //     ui: 'header',
                //     href: '#faq',
                //     hrefTarget: '_self',
                //     tooltip: 'Помощь'
                // },
                
                {
                    // ui: 'header',
                    xtype: 'tbtext',
                    style: { textAlign: 'end' },
                    flex: 1,
                    bind: {
                        html: 'Техническая поддержка. </br><a target="_blank" rel="noopener noreferrer" href="tel:+79613399624">+79613399624</a> <a target="_blank" rel="noopener noreferrer" href="https://t.me/+wb3lkYNLZF40MzBi">Телеграм чат</a>'
                    },
                },
                // {
                //     iconCls:'x-fa fa-th-large',
                //     ui: 'header',
                //     href: '#profile',
                //     hrefTarget: '_self',
                //     tooltip: 'Профиль'
                // },
                // {
                //     xtype: 'tbtext',
                //     bind: {
                //         text: '{name}'
                //     },
                //     cls: 'top-user-name'
                // },
                // {
                //     xtype: 'image',
                //     cls: 'header-right-profile-image',
                //     height: 35,
                //     width: 35,
                //     alt:'current user image',
                //     src: 'resources/images/user-profile/2.png'
                // }
            ]
        },
        {
            xtype: 'maincontainerwrap',
            id: 'main-view-detail-wrap',
            reference: 'mainContainerWrap',
            flex: 1,
            items: [
                {
                    xtype: 'maintreelist',
                    reference: 'navigationTreeList',
                    itemId: 'navigationTreeList',
                    ui: 'navigation',
                    store: 'NavigationTree',
                    width: 250,
                    expanderFirst: false,
                    expanderOnly: false,
                    listeners: {
                        selectionchange: 'onNavigationTreeSelectionChange'
                    }
                },
                {
                    xtype: 'container',
                    flex: 1,
                    height: 0,
                    reference: 'mainCardPanel',
                    cls: 'sencha-dash-right-main-container',
                    itemId: 'contentPanel',
                    layout: {
                        type: 'card',
                        anchor: '100%'
                    }
                }
            ]
        }
    ]
});
