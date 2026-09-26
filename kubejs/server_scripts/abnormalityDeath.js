const $ExplosionEvent = Java.loadClass('net.neoforged.neoforge.event.level.ExplosionEvent$Start');

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

let respawnAbnormality = (level, tier, oldEntity) => {
    level.spawnParticles("supplementaries:green_flame", true, oldEntity.x, oldEntity.y + 0.5, oldEntity.z, 0.2, 0.2, 0.2, 20, 1.01);
    let newAbnormalityEntity = level.createEntity(oldEntity.type);
    newAbnormalityEntity.setPos(oldEntity.x + 0.5, oldEntity.y + 1.0, oldEntity.z + 0.5);
    newAbnormalityEntity.spawn();
    newAbnormalityEntity.setCustomName(Text.of(`${global.getAbnormalityName(tier, oldEntity.type)}`).red().bold());
    newAbnormalityEntity.setPersistenceRequired();

    let newHealth = newAbnormalityEntity.getMaxHealth() * (getClassEnkephalinCount(tier) * 5);
    newAbnormalityEntity.setMaxHealth(newHealth);
    newAbnormalityEntity.setHealth(newHealth);
    newAbnormalityEntity.persistentData.abnormality = true;
    newAbnormalityEntity.persistentData.respawned = true;
}

NativeEvents.onEvent($ExplosionEvent, (e) => {
    const { level, explosion } = e;
    let server = level.getServer();
    let entity = explosion.getIndirectSourceEntity();
    if (entity && "minecraft:creeper" == entity.type) {
    if (!entity.persistentData.abnormality || !entity.persistentData.getBoolean("abnormality")) return;
        server.scheduleInTicks(200, () => {
            server.runCommandSilent(`playsound netherman:respawn_totem block @a ${entity.x} ${entity.y} ${entity.z} 2 0.2`);
            respawnAbnormality(level, "verdant", entity);
        });
    }
});
