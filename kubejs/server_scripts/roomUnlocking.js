
let structureMap = new Map([
    ['scp:verdant_containment_lock_block_1', { template: "verdant_containment_west", x: -16, y: -3, z: -8 }],
    ['scp:verdant_containment_lock_block_2', { template: "verdant_containment_east", x: 0, y: -3, z: -8 }],
    ['scp:verdant_hallway_lock_block', { template: "verdant_hallways", x: - 8, y: -3, z: -16 }]
])
    
BlockEvents.rightClicked(['scp:verdant_hallway_lock_block', 'scp:verdant_containment_lock_block_1', 'scp:verdant_containment_lock_block_2'], e => {
    let { level, block, server, player } = e
    if (level.isClientSide()) return

    let structureData = structureMap.get(`${block.id}`);
    server.runCommandSilent(`place template scp:${structureData.template} ${block.x + structureData.x} ${block.y + structureData.y} ${block.z + structureData.z}`);
    block.set("minecraft:air")
    level.getBlock(block.getPos().below()).set("minecraft:air")
})