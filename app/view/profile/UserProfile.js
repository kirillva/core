Ext.define('Core.view.profile.UserProfile', {
    extend: 'Ext.Container',
    xtype: 'profile',
    cls: 'userProfile-container',
    

    viewModel: {
        data: {
            stores: {
                userSharedItems: {
                    autoLoad: true,
                    fields: [
                        {
                            name: '_id'
                        },
                        {
                            name: 'parent_id'
                        },
                        {
                            name: 'name'
                        },
                        {
                            name: 'source'
                        },
                        {
                            name: 'date'
                        },
                        {
                            name: 'isActive'
                        },
                        {
                            name: 'time'
                        },
                        {
                            name: 'content'
                        }
                    ],
                    proxy: {
                        type: 'api',
                        url: '~api/usershareditems'
                    }            
                },
        
                userTimeline: {
                    autoLoad: true,
                    fields: [
                        {
                            name: '_id'
                        },
                        {
                            name: 'name'
                        },
                        {
                            name: 'content'
                        },
                        {
                            name: 'date',
                            type: 'date'
                        },
                        {
                            name: 'userId'
                        },
                        {
                            name: 'notificationType'
                        }
                    ],
                    proxy: {
                        type: 'api',
                        url: '~api/usertimeline'
                    }
                }
            }
        }
    },
    
    requires: [
        'Ext.ux.layout.ResponsiveColumn'
    ],

    layout: 'responsivecolumn',

    items: [
        {
            xtype: 'profileshare',

            // Always 100% of container
            userCls: 'big-100 small-100 shadow'
        },
        {
            xtype: 'profilesocial',

            // Use 50% of container when viewport is big enough, 100% otherwise
            userCls: 'big-50 small-100 shadow'
        },
        {
            xtype: 'profiledescription',

            userCls: 'big-50 small-100 shadow'
        },
        {
            xtype: 'profilenotifications',

            userCls: 'big-50 small-100 shadow'
        },
        {
            xtype: 'profiletimeline',

            userCls: 'big-50 small-100 shadow'
        }
    ]
});
