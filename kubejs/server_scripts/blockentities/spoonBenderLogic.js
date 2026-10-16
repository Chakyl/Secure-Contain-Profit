BlockEvents.blockEntityTick('scp:spoon_bender', (e) => {
    const { level, server, block } = e;
    const { x, y, z } = block;
    if (!level || level.isClientside) return;
    const facing = block.getProperties().get("facing")
    let depositPos = global.getFacing(facing, block.getPos());
    level.getEntitiesWithin(AABB.ofBlock(block).inflate(10))
        .filter((foundEntity) => foundEntity.type === 'minecraft:item')
        .forEach((entity) => {
            entity.setPos(depositPos.x + 0.5, depositPos.y, depositPos.z + 0.5);
        });
    if (Math.random() < 0.001) {
        let nbt = block.getEntityData();
        if (!nbt || !nbt.data) return;
        let teamName = String(nbt.data.getString("teamName")).trim();
        global.addDisrepair(server, block, teamName, 1)
    }
})

BlockEvents.placed('scp:spoon_bender', (e) => {
    const { player, level, block } = e;
    let nbt = block.getEntityData();
    if (!nbt || !nbt.data) return;
    nbt.merge({
        data: {
            teamName: global.getPlayerTeamName(level, player)
        },
    });
    global.setBlockEntityData(block, nbt);
});
