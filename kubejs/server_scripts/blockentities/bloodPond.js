BlockEvents.blockEntityTick('scp:blood_pond', (e) => {
    const { level, server, block } = e;
    const { x, y, z } = block;
    if (!level || level.isClientside) return;
    let newAbnormalityEntity = level.createEntity(global.rollArray(["minecraft:zombie", "minecraft:skeleton", "opposing_force:gnat", "scguns:swarm", "scguns:hive"]));
    newAbnormalityEntity.setPos(x + 0.5, y + 1.0, z + 0.5);
    newAbnormalityEntity.spawn();
    newAbnormalityEntity.setCustomName(Text.of("???").red().bold());
    newAbnormalityEntity.setMaxHealth(50);
    newAbnormalityEntity.setHealth(50);
});