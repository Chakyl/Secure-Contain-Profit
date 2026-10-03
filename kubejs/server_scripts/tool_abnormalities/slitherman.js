
BlockEvents.placed('netherman:maze_door', (e) => {
    let { player, level, server } = e;
    let { x, y, z } = player;
    FieldGuide.unlock(player, `block:netherman/maze_door`);
    let newAbnormalityEntity = level.createEntity("netherman:believer");
    newAbnormalityEntity.setPos(x + 0.5, y + 1.0, z + 0.5);
    newAbnormalityEntity.spawn();
    newAbnormalityEntity.setCustomName(Text.of("Slitherman's Martyr").red().bold())
    newAbnormalityEntity.setPersistenceRequired();
    newAbnormalityEntity.setMaxHealth(100);
    newAbnormalityEntity.setHealth(100);
});

EntityEvents.death("netherman:believer", (e) => {
    const { entity, source, level, server } = e;
    let killer = source.player

    let heart = Item.of('netherman:azazel_helmet')
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

    global.addChaos(server, level.getBlock(entity.getOnPos()), 10);
})
