Ext.define("Core.util.Shared", {
    alternateClassName: ["Shared"],
    singleton: true,

    log: function (msg) {
        console.log(msg);
    },

    removeFilters: function (itemId, house, appartament, people) {
        switch (itemId) {
            case 'view_0':
                house.store.removeFilter('f_street');
                appartament.store.removeFilter('f_house___f_street');
                people.store.removeFilter('f_appartament___f_house___f_street');
                // break;
                
            case 'view_1':
                appartament.store.removeFilter('f_house');
                people.store.removeFilter('f_appartament___f_house');
                // break;

            case 'view_2':
                people.store.removeFilter('f_appartament');
                // break;

            default:
                break;
        }
    },

    addFilters: function (itemId, id, house, appartament, people, ) {
        switch (itemId) {
            case 'view_0':
                house.store.addFilter({
                    value: id,
                    property: 'f_street',
                    operator: '='
                });
                appartament.store.addFilter({
                    value: id,
                    property: 'f_house___f_street',
                    operator: '='
                });
                people.store.addFilter({
                    value: id,
                    property: 'f_appartament___f_house___f_street',
                    operator: '='
                });
                break;
                
            case 'view_1':
                appartament.store.addFilter({
                    value: id,
                    property: 'f_house',
                    operator: '='
                });
                people.store.addFilter({
                    value: id,
                    property: 'f_appartament___f_house',
                    operator: '='
                });
                break;

            case 'view_2':
                people.store.addFilter({
                    value: id,
                    property: 'f_appartament',
                    operator: '='
                });
                break;

            default:
                break;
        }
    },
    
    getTemplate: function (type) {
        switch (type) {
            case "layout_1":
                return {
                    layout: {
                        type: "hbox",
                        align: "stretch",
                    },
                    items: [
                        {
                            xtype: "panel",
                            itemId: "view_0",
                            layout: "fit",
                            flex: 1,
                        },
                        {
                            xtype: "panel",
                            itemId: "view_1",
                            layout: "fit",
                            flex: 1,
                        },
                        {
                            xtype: "panel",
                            itemId: "view_2",
                            layout: "fit",
                            flex: 1,
                        },
                        {
                            xtype: "panel",
                            itemId: "view_3",
                            layout: "fit",
                            flex: 1,
                        },
                    ],
                    listeners: {
                        reset: function (basegrid) {
                            var panel = basegrid.up('panel');

                            var house = panel.ownerCt.down('#view_1').down('basegrid');
                            var appartament = panel.ownerCt.down('#view_2').down('basegrid');
                            var people = panel.ownerCt.down('#view_3').down('basegrid');
                            var itemId = panel.itemId;
                            
                            Shared.removeFilters(itemId, house, appartament, people);
                        },
                        select: function (sender, record, index, basegrid) {
                            var panel = basegrid.up('panel');
                            var house = panel.ownerCt.down('#view_1').down('basegrid');
                            var appartament = panel.ownerCt.down('#view_2').down('basegrid');
                            var people = panel.ownerCt.down('#view_3').down('basegrid');
                            var id = record.id;
                            var itemId = panel.itemId;
                            
                            Shared.removeFilters(itemId, house, appartament, people);
                            Shared.addFilters(itemId, id, house, appartament, people);
                        }
                    }
                };

            case "layout_2":
                return {
                    layout: {
                        type: "hbox",
                        align: "stretch",
                    },
                    items: [
                        {
							layout: {
								type: "vbox",
								align: "stretch",
							},
                            flex: 1,
							items: [{
								xtype: "panel",
								itemId: "view_0",
								layout: "fit",
								flex: 1,
							},
							{
								xtype: "panel",
								itemId: "view_1",
								layout: "fit",
								flex: 1,
							}]
						},
                        {
                            xtype: "panel",
                            itemId: "view_2",
                            flex: 1,
                        },
                    ],
                };
            default:
                break;
        }
    },
});
