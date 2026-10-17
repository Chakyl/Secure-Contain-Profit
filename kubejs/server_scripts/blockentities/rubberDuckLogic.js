BlockEvents.blockEntityTick('scp:rubber_duck', (e) => {
    const {  level, block } = e;
    const { x, y, z } = block;
    if (!level || level.isClientside) return;
    if (Math.random() < 0.9) return;
    let newPos = global.getFacing(global.rollArray(["north", "south", "east", "west"]), block.getPos());
    if (!level.isLoaded(newPos)) return;
    let newBlock = level.getBlock(newPos);
    if (newBlock.id == "minecraft:air") {
        block.set("minecraft:air");
        newBlock.set('scp:rubber_duck')
        if (Math.random() < 0.1) {
            let nbt = block.getEntityData();
            if (!nbt || !nbt.data) return;
            let teamName = String(nbt.data.getString("teamName")).trim();
            global.addChaos(level.getServer(), block, teamName, 1);
        }
        else {
            let itemEntity = block.createEntity('item')
            itemEntity.x = x
            itemEntity.y = y + 0.2
            itemEntity.z = z
            itemEntity.item = Item.of('minecraft:raw_gold');
            itemEntity.spawn()
        }
        return;
    }
});

BlockEvents.placed('scp:rubber_duck', (e) => {
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
