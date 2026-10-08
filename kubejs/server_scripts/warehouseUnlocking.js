
let warehouseMap = new Map([
    ['76', { template: "warehouse_up", x: -7, z: 0 }],
])

BlockEvents.rightClicked('scp:warehouse_lock_block', e => {
    let { level, block, hand, item, server, player } = e
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    if (!player.stages.has("starting_items")) return;
    let { x, y, z } = block;
    let xyz = `${x}${y}${z}`
    if (xyz !== "31333") {
        player.tell("§7This warehouse block is not yet implemented...")
    }
    if (item.id != 'scp:warehouse_expansion_card') {
        player.tell("§7You need a §6" + Item.of('scp:warehouse_expansion_card').getDisplayName().string + "§7 to unlock this.")
        return;
    }
    if (!player.isCreative()) item.shrink(1);

    let warehouse = { template: "warehouse_up", x: -7, z: 0 }
    server.runCommandSilent(`playsound minecraft:entity.ender_dragon.hurt block @a ${block.x} ${block.y} ${block.z} 1 0.5`);
    server.runCommandSilent(`playsound industrialhellscape:metalpipefallingsoundeffect block @a ${block.x} ${block.y} ${block.z} 1 0.5`);

    server.runCommandSilent(`place template scp:${warehouse.template} ${block.x - 14} ${block.y + 1} ${block.z - 14}`);
    block.set("minecraft:air")
    level.getBlock(block.getPos().above()).set("minecraft:air")
})