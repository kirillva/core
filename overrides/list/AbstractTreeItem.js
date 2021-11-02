Ext.define('Ext.overrides.list.AbstractTreeItem', {
    override: 'Ext.list.AbstractTreeItem',

    nodeInsert: function(node, refNode) {
        var me = this,
            owner = me.getOwner(),
            map = me.itemMap,
            id = node.internalId,
            item = owner.getItem(node),
            refItem = null,
            oldParent;
 
        if (item) {
            oldParent = item.getParentItem();
            // May have some kind of custom removal processing, allow it to happen, even if it's us
            if (oldParent) 
            {
                oldParent.removeItem(item);
    
                if (oldParent !== me) {
                    oldParent.doUpdateExpandable();
                    item.setParentItem(me);
                }
            }
        }
        else {
            item = me.getOwner().createItem(node, me);
        }
 
        map[id] = item;
 
        if (refNode) {
            refItem = map[refNode.internalId];
        }
 
        me.insertItem(item, refItem);
        me.doUpdateExpandable();
 
        owner.fireEvent('iteminsert', owner, me, item, refItem);
 
        owner.updateLayout();
    },
});
