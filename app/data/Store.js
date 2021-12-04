// Ext.define('Core.store.S', {
//     extend: 'Ext.data.Store',
//     model: 'Core.model.cs_house',

//     alias: 'store.cs_house',
//     storeId: 'cs_house',

//     remoteFilter: true,
//     remoteSort: true,
//     remoteGroup: true,
//     mixins: [
//         'Core.data.Selectable'
//     ],

//     proxy: {
//         type: 'itdirect',
//         api: {
//             read: 'cs_house.Query',
//             create: 'cs_house.Add',
//             update: 'cs_house.Update',
//             destroy: 'cs_house.Delete'
//         },
//         reader: {
//             successProperty: 'success',
//             rootProperty: 'records',
//         },
//         writer: {
//             //writeAllFields : true
//             dateFormat: "Y-m-d H:i:sO"
//         }
//     }
// });