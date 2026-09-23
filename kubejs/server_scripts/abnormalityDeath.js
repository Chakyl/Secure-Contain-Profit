EntityEvents.death((e) => {
    const { entity, source } = e;
    if (!entity.persistentData.abnormality || !entity.persistentData.getBoolean("abnormality")) return;
    let killer = source.player

    let heart = Item.of('scp:abnormality_heart')
    heart.set('minecraft:custom_data', { entity_id: entity.type })

    if (killer && killer.isPlayer()) {
        killer.give(heart)
    } else {
        let itemEntity = entity.block.createEntity('item')
        itemEntity.x = entity.x
        itemEntity.y = entity.y
        itemEntity.z = entity.z
        itemEntity.item = heart
        itemEntity.spawn()
    }
})
