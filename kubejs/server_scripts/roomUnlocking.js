
let structureMap = new Map([
    ['scp:verdant_containment_lock_block_1', { card: 'scp:verdant_containment_expansion_card', template: "verdant_containment_west", x: -16, z: -8 }],
    ['scp:verdant_containment_lock_block_2', { card: 'scp:verdant_containment_expansion_card', template: "verdant_containment_east", x: 1, z: -8 }],
    ['scp:verdant_hallway_lock_block', { card: 'scp:verdant_hallway_expansion_card', template: "verdant_hallways", x: -8, z: -16 }],
    
    ['scp:amber_containment_lock_block_1', { card: 'scp:amber_containment_expansion_card', template: "amber_containment_west", x: -7, z: -16 }],
    ['scp:amber_containment_lock_block_2', { card: 'scp:amber_containment_expansion_card', template: "amber_containment_east", x: -8, z: 1 }],
    ['scp:amber_hallway_lock_block', { card: 'scp:amber_hallway_expansion_card', template: "amber_hallways", x: 0, z: -8 }],

    ['scp:maroon_containment_lock_block_1', { card: 'scp:maroon_containment_expansion_card', template: "maroon_containment_west", x: 1, z: -7 }],
    ['scp:maroon_containment_lock_block_2', { card: 'scp:maroon_containment_expansion_card', template: "maroon_containment_east", x: -16, z: -8 }],
    ['scp:maroon_hallway_lock_block', { card: 'scp:maroon_hallway_expansion_card', template: "maroon_hallways", x: -7, z: 0 }]
])

BlockEvents.rightClicked(['scp:verdant_hallway_lock_block', 'scp:verdant_containment_lock_block_1', 'scp:verdant_containment_lock_block_2', 'scp:amber_hallway_lock_block', 'scp:amber_containment_lock_block_1', 'scp:amber_containment_lock_block_2', 'scp:maroon_hallway_lock_block', 'scp:maroon_containment_lock_block_1', 'scp:maroon_containment_lock_block_2'], e => {
    let { level, block, hand, item, server, player } = e
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;

    let structureData = structureMap.get(`${block.id}`);
    if (item.id != structureData.card) {
        player.tell("§7You need a §6" + Item.of(structureData.card).getDisplayName().string + "§7 to unlock this.")
        return;
    }
    if (!player.isCreative()) item.shrink(1);

    server.runCommandSilent(`playsound minecraft:entity.ender_dragon.hurt block @a ${block.x} ${block.y} ${block.z} 1 0.2`);
    server.runCommandSilent(`playsound industrialhellscape:metalpipefallingsoundeffect block @a ${block.x} ${block.y} ${block.z} 1 0.2`);

    server.runCommandSilent(`place template scp:${structureData.template} ${block.x + structureData.x} ${block.y - 3} ${block.z + structureData.z}`);
    block.set("minecraft:air")
    level.getBlock(block.getPos().below()).set("minecraft:air")
})