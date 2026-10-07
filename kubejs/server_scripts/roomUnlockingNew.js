

let getBedrockDirection = (block) => {
    let directions = [
        { name: 'north', check: block.north },
        { name: 'south', check: block.south },
        { name: 'east', check: block.east },
        { name: 'west', check: block.west },
        { name: 'up', check: block.up },
        { name: 'down', check: block.down }
    ]

    for (let i = 0; i < directions.length; i++) {
        if (directions[i].check.id === 'minecraft:bedrock') {
            return { block: directions[i].check, direction: directions[i].name }
        }
    }
    return null
}


// Every structure starts facing south
let directionMap = new Map([
    ['north', { rotation: "180", x: 7, z: -1 }],
    ['south', { x: -7, z: 1 }],
    ['east', { rotation: "counterclockwise_90", x: 1, z: 7 }],
    ['west', { rotation: "clockwise_90", x: -1, z: -7 }],
    ['down', { x: -17, z: -16 }],

]);
// let containmentDirectionMap = new Map([
//     ['north', { rotation: "180", x: 7, z: -1 }],
//     ['south', { x: -7, z: 1 }],
//     ['east', { rotation: "counterclockwise_90", x: 1, z: 7 }],
//     ['west', { rotation: "clockwise_90", x: -1, z: -7 }],
// ]);
let structureMap = new Map([
    ["scp:verdant_containment_expansion_card", { structurePool: ["verdant_containment_unit"] }],
    ["scp:verdant_hallway_expansion_card", { structurePool: ["verdant_hallways_1", "verdant_hallways_2", "verdant_hallways_3"] }],
    ["scp:verdant_hallway_left_expansion_card", { structurePool: ["verdant_hallways_left_turn"] }],
    ["scp:verdant_hallway_right_expansion_card", { structurePool: ["verdant_hallways_right_turn"] }],
    ["scp:verdant_hallway_t_intersection_expansion_card", { structurePool: ["verdant_hallways_t_intersection"] }],
    ["scp:verdant_hallway_cross_intersection_expansion_card", { structurePool: ["verdant_hallways_cross_intersection"] }],
    ["scp:verdant_hallway_dead_end_expansion_card", { structurePool: ["verdant_hallways_deadend"] }],

    ["scp:amber_containment_expansion_card", { structurePool: ["amber_containment_unit"] }],
    ["scp:amber_hallway_expansion_card", { structurePool: ["amber_hallways_1", "amber_hallways_2", "amber_hallways_3"] }],
    ["scp:amber_hallway_left_expansion_card", { structurePool: ["amber_hallways_left_turn"] }],
    ["scp:amber_hallway_right_expansion_card", { structurePool: ["amber_hallways_right_turn"] }],
    ["scp:amber_hallway_t_intersection_expansion_card", { structurePool: ["amber_hallways_t_intersection"] }],
    ["scp:amber_hallway_cross_intersection_expansion_card", { structurePool: ["amber_hallways_cross_intersection"] }],
    ["scp:amber_hallway_dead_end_expansion_card", { structurePool: ["amber_hallways_deadend"] }],

    ["scp:maroon_containment_expansion_card", { structurePool: ["maroon_containment_unit"] }],
    ["scp:maroon_hallway_expansion_card", { structurePool: ["maroon_hallways_1", "maroon_hallways_2", "maroon_hallways_3"] }],
    ["scp:maroon_hallway_left_expansion_card", { structurePool: ["maroon_hallways_left_turn"] }],
    ["scp:maroon_hallway_right_expansion_card", { structurePool: ["maroon_hallways_right_turn"] }],
    ["scp:maroon_hallway_t_intersection_expansion_card", { structurePool: ["maroon_hallways_t_intersection"] }],
    ["scp:maroon_hallway_cross_intersection_expansion_card", { structurePool: ["maroon_hallways_cross_intersection"] }],
    ["scp:maroon_hallway_dead_end_expansion_card", { structurePool: ["maroon_hallways_deadend"] }],
    ['scp:warehouse_expansion_card', {}]
])
let clearBlocks = (level, block) => {
    let radius = 1;
    let { x, y, z } = block;

    for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - radius, z - radius), new BlockPos(x + radius, y + radius, z + radius))) {
        let scanPos = new BlockPos(pos.x, pos.y, pos.z);
        if (!level.isLoaded(scanPos)) continue;

        let scanBlock = level.getBlock(scanPos);
        if (scanBlock.hasTag("scp:card_clears")) {
            level.setBlock(scanPos, 'minecraft:air', 3);
        }
    }
}
BlockEvents.rightClicked(['scp:warehouse_lock_block', 'scp:verdant_hallway_lock_block', 'scp:verdant_containment_lock_block', 'scp:amber_hallway_lock_block', 'scp:amber_containment_lock_block', 'scp:maroon_hallway_lock_block', 'scp:maroon_containment_lock_block'], e => {
    let { level, block, hand, item, server, player } = e
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;

    let isContainment = block.id.includes("containment")
    let foundDirection = getBedrockDirection(block)
    if (foundDirection == null) {
        player.tell("§7There's already a room in this direction...")
        clearBlocks(level, block);
        return;
    }
    let structureData = structureMap.get(`${item.id}`);
    if (structureData.structurePool == null || (isContainment && !item.id.includes("containment")) || (!isContainment && item.id.includes("containment"))) {
        player.tell("§7You need an §6Expansion Card§7 to unlock this.")
        return;
    }
    if (!player.isCreative()) item.shrink(1);
    let directionData = directionMap.get(`${foundDirection.direction}`);
    let structure = global.rollArray(structureData.structurePool);
    let command;
    if (foundDirection.direction == "down" && item.id.includes("hallway")) {
        const match = item.id.match(/:(.*?)_/);
        command = `place template scp:${match ? match[1] : null}_center ${block.x + directionData.x} ${block.y - 13} ${block.z + directionData.z}`;
    } else if (item.id.includes("warehouse")) {
        if (foundDirection.direction == "up") {
            command = `place template scp:warehouse_center ${block.x + directionData.x} ${block.y - 13} ${block.z + directionData.z}`;
        } else {
            player.tell("§7This warehouse block is not yet implemented...")
            return;
        }
    } else {
        command = `place template scp:${structure} ${block.x + directionData.x} ${block.y - 2} ${block.z + directionData.z} ${directionData.rotation ? directionData.rotation : "none"}`;

        level.getBlock(block.getPos().below()).set("minecraft:air")
    }
    server.runCommandSilent(`playsound minecraft:entity.ender_dragon.hurt block @a ${block.x} ${block.y} ${block.z} 1 0.5`);
    server.runCommandSilent(`playsound industrialhellscape:metalpipefallingsoundeffect block @a ${block.x} ${block.y} ${block.z} 1 0.5`);
    server.runCommandSilent(command);
    block.set("minecraft:air")
    clearBlocks(level, block);

})


