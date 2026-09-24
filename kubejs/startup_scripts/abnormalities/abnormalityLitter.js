const dropLitter = (block, x, y, z, item) => {
    let itemEntity = block.createEntity('item')
    itemEntity.x = x
    itemEntity.y = y + 0.2
    itemEntity.z = z
    itemEntity.item = item;
    itemEntity.spawn()
};
global.handleAbnormalityLitter = (entity) => {
    const { level } = entity;
    if (level.isClientSide()) return;
    if (!entity.persistentData.abnormality || !entity.persistentData.getBoolean("abnormality")) return
    let abnormalityData = global.ABNORMALITY_LITTERS.get(`${entity.type}`);
    if (!abnormalityData) return;
    abnormalityData.items.forEach((itemDef) => {
    if (Math.random() < itemDef.chance) {
        dropLitter(level.getBlock(entity.getOnPos()), entity.x, entity.y, entity.z, itemDef.item);
    }
    })
};

EntityJSEvents.modifyEntity((e) => {
    for (let abnormality of global.ABNORMALITY_LITTERS.keys()) {
        e.modify(abnormality, (modifyBuilder) => {
            modifyBuilder.tick((entity) => {
                if (entity.tickCount % 1200 === 0) {
                    global.handleAbnormalityLitter(entity);
                }
            });
        });
    }
});