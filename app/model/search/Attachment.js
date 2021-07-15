Ext.define('Core.model.search.Attachment', {
    extend: 'Core.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'url'
        },
        {
            type: 'string',
            name: 'title'
        }
    ]
});
