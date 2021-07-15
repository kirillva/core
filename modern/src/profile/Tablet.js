Ext.define('Core.profile.Tablet', {
    extend: 'Ext.app.Profile',

    requires: [
        'Core.view.tablet.*'
    ],

    // Map tablet/desktop profile views to generic xtype aliases:
    //
    views: {
        email: 'Core.view.tablet.email.Email',
        inbox: 'Core.view.tablet.email.Inbox',
        compose: 'Core.view.tablet.email.Compose',

        searchusers: 'Core.view.tablet.search.Users'
    },

    isActive: function () {
        return !Ext.platformTags.phone;
    }
});
