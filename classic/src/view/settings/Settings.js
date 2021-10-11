Ext.define("Core.view.settings.Settings", {
  extend: "Ext.tab.Panel",
  xtype: "settings",

  requires: ["Ext.grid.Panel", "Ext.toolbar.Paging", "Ext.grid.column.Date"],

  controller: "settings",

  cls: "shadow",
  activeTab: 0,

  items: [
    {
      xtype: "panel",
      title: 'Настройка таблиц',
      items: [{ xtype: "textfield" }],
    },

    // {
    //     xtype: 'gridpanel',
    //     cls: 'user-grid',
    //     title: 'User Results',
    //     routeId: 'user',
    //     bind: '{usersResults}',
    //     scrollable: false,
    //     columns: [
    //         {
    //             xtype: 'gridcolumn',
    //             width: 40,
    //             dataIndex: 'identifier',
    //             text: '#'
    //         },
    //         {
    //             xtype: 'gridcolumn',
    //             renderer: function(value) {
    //                 return "<img src='resources/images/user-profile/" + value + "' alt='Profile Pic' height='40px' width='40px'>";
    //             },
    //             width: 75,
    //             dataIndex: 'profile_pic',
    //             text: 'User'
    //         },
    //         {
    //             xtype: 'gridcolumn',
    //             cls: 'content-column',
    //             dataIndex: 'fullname',
    //             text: 'Name',
    //             flex: 1
    //         },
    //         {
    //             xtype: 'gridcolumn',
    //             cls: 'content-column',
    //             dataIndex: 'email',
    //             text: 'Email',
    //             flex: 1
    //         },
    //         {
    //             xtype: 'datecolumn',
    //             cls: 'content-column',
    //             width: 120,
    //             dataIndex: 'joinDate',
    //             text: 'Date'
    //         },
    //         {
    //             xtype: 'gridcolumn',
    //             cls: 'content-column',
    //             dataIndex: 'subscription',
    //             text: 'Subscription',
    //             flex: 1
    //         },
    //         {
    //             xtype: 'actioncolumn',
    //             items: [
    //                 {
    //                     xtype: 'button',
    //                     iconCls: 'x-fa fa-pencil'
    //                 },
    //                 {
    //                     xtype: 'button',
    //                     iconCls: 'x-fa fa-close'
    //                 },
    //                 {
    //                     xtype: 'button',
    //                     iconCls: 'x-fa fa-ban'
    //                 }
    //             ],

    //             cls: 'content-column',
    //             width: 120,
    //             dataIndex: 'bool',
    //             text: 'Actions',
    //             tooltip: 'edit '
    //         }
    //     ],
    //     dockedItems: [
    //         {
    //             xtype: 'pagingtoolbar',
    //             dock: 'bottom',
    //             itemId: 'userPaginationToolbar',
    //             displayInfo: true,
    //             bind: '{usersResults}'
    //         }
    //     ]
    // },
    // {
    //     xtype: 'gridpanel',
    //     cls: 'email-inbox-panel',
    //     itemId: 'messagesGrid',
    //     hideHeaders: true,
    //     title: 'Messages',
    //     routeId: 'messages',
    //     bind: '{inboxResults}',
    //     scrollable: false,
    //     columns: [
    //         {
    //             xtype: 'gridcolumn',
    //             renderer: function(value) {
    //                 if(value) {
    //                     return '<span class="x-fa fa-heart"></span>';
    //                 }
    //                 return '<span class="x-fa fa-heart-o"></span>';

    //             },
    //             width: 45,
    //             dataIndex: 'favorite'
    //         },
    //         {
    //             xtype: 'gridcolumn',
    //             dataIndex: 'from',
    //             flex: 1
    //         },
    //         {
    //             xtype: 'gridcolumn',
    //             dataIndex: 'title',
    //             flex: 2
    //         },
    //         {
    //             xtype: 'gridcolumn',
    //             renderer: function(value) {
    //                 return value ? '<span class="x-fa fa-paperclip"></span>' : '';
    //             },
    //             dataIndex: 'has_attachments'
    //         },
    //         {
    //             xtype: 'datecolumn',
    //             dataIndex: 'received_on'
    //         }
    //     ],
    //     dockedItems: [
    //         {
    //             xtype: 'pagingtoolbar',
    //             dock: 'bottom',
    //             itemId: 'pagingToolbar',
    //             prependButtons: true,
    //             bind: '{inboxResults}'
    //         }
    //     ]
    // }
  ],
});
