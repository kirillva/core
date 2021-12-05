Ext.define("Core.view.search.ResultDataView", {
    extend: "Ext.view.View",

    xtype: 'resultdataview',

    store: Ext.create('Core.store.cd_people'),

    tpl: [
        '<tpl for=".">',
        '<div style="margin-bottom: 10px;" class="thumb-wrap">',
        '<img src="{src}" />',
        "<br/><span>{caption}</span>",
        "</div>",
        "</tpl>",
    ],

    emptyText: "Ничего не найдено",
});
