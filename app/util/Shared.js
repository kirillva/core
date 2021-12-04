Ext.define("Core.util.Shared", {
    alternateClassName: ["Shared"],
    singleton: true,

    log: function (msg) {
        console.log(msg);
    },

    isAccessAllowed: function (allow = [], reject = []) {
        var roles = AuthProvider.getRoles();
        return Boolean(Ext.Array.intersect(allow, roles).length);
    },

    removeFilters: function (itemId, house, appartament, people) {
        var avm = appartament && appartament.getViewModel();
        var hvm = house && house.getViewModel();
        var pvm = people && people.getViewModel();
        
        switch (itemId) {
            case 'view_0':
                house && house.store.removeFilter('f_street');
                appartament && appartament.store.removeFilter('f_house___f_street');
                people && people.store.removeFilter('f_appartament___f_house___f_street');
                hvm && hvm.set('disableAddRow', true);
                // break;
                
            case 'view_1':
                appartament &&  appartament.store.removeFilter('f_house');
                people &&  people.store.removeFilter('f_appartament___f_house');
                avm && avm.set('disableAddRow', true);
                // break;

            case 'view_2':
                people && people.store.removeFilter('f_appartament');
                pvm && pvm.set('disableAddRow', true);
                break;

            default:
                break;
        }
    },

    addFilters: function (itemId, id, house, appartament, people) {
        var avm = appartament && appartament.getViewModel();
        var hvm = house && house.getViewModel();
        var pvm = people && people.getViewModel();

        switch (itemId) {
            case 'view_0':
                if (house) {
                    house.store.addFilter({
                        value: id,
                        property: 'f_street',
                        operator: '='
                    });
                    house.store.reload();
                }
                if (appartament) {
                    appartament.store.addFilter({
                        value: id,
                        property: 'f_house___f_street',
                        operator: '='
                    });
                    appartament.store.reload();
                }
                if (people) {
                    people.store.addFilter({
                        value: id,
                        property: 'f_appartament___f_house___f_street',
                        operator: '='
                    });
                    people.store.reload();
                }
                hvm && hvm.set('disableAddRow', false);
                break;
                
            case 'view_1':
                if (appartament) {
                    appartament.store.addFilter({
                        value: id,
                        property: 'f_house',
                        operator: '='
                    });
                    appartament.store.reload();
                }
                if (people) {
                    people.store.addFilter({
                        value: id,
                        property: 'f_appartament___f_house',
                        operator: '='
                    });
                    people.store.reload();
                }
                avm && avm.set('disableAddRow', false);
                break;

            case 'view_2':
                if (people) {
                    people.store.addFilter({
                        value: id,
                        property: 'f_appartament',
                        operator: '='
                    });
                    people.store.reload();
                }
                pvm && pvm.set('disableAddRow', false);
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
                        // {
                        //     xtype: "panel",
                        //     itemId: "view_3",
                        //     layout: "fit",
                        //     flex: 1,
                        // },
                    ],
                    listeners: {
                        reset: function (basegrid) {
                            var panel = basegrid.up('panel');

                            var house = panel.ownerCt.down('#view_1').down('basegrid');
                            var appartament = panel.ownerCt.down('#view_2').down('basegrid');
                            // var people = panel.ownerCt.down('#view_3').down('basegrid');
                            var itemId = panel.itemId;

                            Shared.removeFilters(itemId, house, appartament /** , people */);
                        },
                        select: function (sender, record, index, basegrid) {
                            var panel = basegrid.up('panel');
                            var house = panel.ownerCt.down('#view_1').down('basegrid');
                            var appartament = panel.ownerCt.down('#view_2').down('basegrid');
                            // var people = panel.ownerCt.down('#view_3').down('basegrid');
                            var id = record.id;
                            var itemId = panel.itemId;

                            if (!record.phantom) {
                                Shared.removeFilters(itemId, house, appartament /** , people */);
                                Shared.addFilters(itemId, id, house, appartament /** , people */);
                            }
                        }
                    }
                };

            case "layout_2":
                return {
                    layout: {
                        type: "vbox",
                        align: "stretch",
                    },
                    items: [
                        {
                            layout: {
                                type: "hbox",
                                align: "stretch",
                            },
                            margin: '5px 10px',
                            defaults: {
                                margin: '0 10px',
                            },
                            items: [{
                                xtype: 'combobox',
                                fieldLabel: 'Улица',
                                store: Ext.StoreManager.get('cs_street') || Ext.create('Core.store.cs_street'),
                                displayField: 'c_name',
                                valueField: 'id',
                                itemId: 'street',
                                minChars: 1,
                                listeners: {
                                    select: function (sender, record, index, basegrid) {
                                        var container = sender.up();
                                        var house = container.getComponent('house');
                                        var appartament = container.getComponent('appartament');
                                        
                                        var people = sender.up().up().down('basegrid');
                                        var id = record.id;
            
                                        house.setValue();
                                        appartament.setValue();

                                        Shared.removeFilters('view_0', house, appartament, people);
                                        Shared.addFilters('view_0', id, house, appartament, people);
                                    }
                                }
                            },{
                                xtype: 'combobox',
                                fieldLabel: 'Дом',
                                store: Ext.StoreManager.get('cs_house') || Ext.create('Core.store.cs_house'),
                                displayField: 'c_full_number',
                                valueField: 'id',
                                itemId: 'house',
                                minChars: 1,
                                listeners: {
                                    
                                    select: function (sender, record, index, basegrid) {
                                        var container = sender.up();
                                        var appartament = container.getComponent('appartament');
                                        
                                        var people = sender.up().up().down('basegrid');
                                        var id = record.id;
            
                                        appartament.setValue();

                                        Shared.removeFilters('view_1', null, appartament, people);
                                        Shared.addFilters('view_1', id, null, appartament, people);
                                    }
                                }
                            },{
                                xtype: 'combobox',
                                fieldLabel: 'Квартира',
                                store: Ext.StoreManager.get('cs_appartament') || Ext.create('Core.store.cs_appartament'),
                                displayField: 'c_number',
                                valueField: 'id',
                                itemId: 'appartament',
                                minChars: 1,
                                listeners: {
                                    
                                    select: function (sender, record, index, basegrid) {
                                        var people = sender.up().up().down('basegrid');
                                        var id = record.id;

                                        Shared.removeFilters('view_2', null, null, people);
                                        Shared.addFilters('view_2', id, null, null, people);
                                    }
                                }
                            },]
                        },
                        {
                            xtype: "panel",
                            itemId: "view_0",
                            layout: "fit",
                            flex: 1,
                        }
                    ],
                };
            default:
                break;
        }
    },
});
