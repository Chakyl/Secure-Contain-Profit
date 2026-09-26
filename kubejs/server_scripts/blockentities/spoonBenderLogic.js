BlockEvents.blockEntityTick('scp:spoon_bender', (e) => {
    const { inventory, level, server, block } = e;
    const { x, y, z } = block;
    if (!level || level.isClientside) return;
    const facing = block.getProperties().get("facing")
    let depositPos = global.getFacing(facing, block.getPos());
    level.getEntitiesWithin(AABB.ofBlock(block).inflate(10))
        .filter((foundEntity) => foundEntity.type === 'minecraft:item')
        .forEach((entity) => {
            entity.setPos(depositPos.x + 0.5, depositPos.y, depositPos.z + 0.5);
        });
    if (Math.random() < 0.001) global.addDisrepair(server, block, 1)
})