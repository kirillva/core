Ext.define('Core.model.email.Friend', {
    extend: 'Core.model.Base',

    fields: [
        {
            type: 'int',
            name: 'id'
        },
        {
            type: 'string',
            name: 'name'
        },
        {
            type: 'string',
            name: 'thumbnail'
        },
        {
            type: 'boolean',
            name: 'online'
        }
    ]
});
