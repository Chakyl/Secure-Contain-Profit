BlockEvents.blockEntityTick('scp:living_room', (e) => {
    const { level, server, block } = e;
    const { x, y, z } = block;
    if (!level || level.isClientside) return;
    let radius = 3;
    let nearbyPlayers = level.getEntitiesWithin(AABB.ofBlock(level.getBlock(block.getPos().offset(0, radius, 0))).inflate(radius)).filter((entity) => entity.isPlayer());
    let nbt = block.getEntityData();
    if (!nbt || !nbt.data) return;
    if (nearbyPlayers.length == 0) {
        if (Number(nbt.data.getInt("enterTime")) > 0) {
            nbt.merge({
                data: {
                    enterTime: 0
                },
            });
            global.setBlockEntityData(block, nbt);

        }
        return;
    }
    if (Number(nbt.data.getInt("enterTime")) < 30) {
        nbt.merge({
            data: {
                enterTime: global.increaseStage(Number(nbt.data.getInt("enterTime")))
            },
        });
        global.setBlockEntityData(block, nbt);
    } else {
        nearbyPlayers.forEach((player) => {
            player.kill();
            FieldGuide.unlock(player, `block:whimsy_deco/moroccan_sofa`);
            level.getBlock(player.getOnPos().above()).set(global.rollArray(['whimsy_deco:dark_oak_desk_mirror', 'whimsy_deco:rattan_stool', 'industrialhellscape:toilet', 'whimsy_deco:spruce_desk_mirror', 'industrialhellscape:folding_chair', 'whimsy_deco:moroccan_sofa', 'whimsy_deco:recorder', 'whimsy_deco:rattan_stool', 'whimsy_deco:dark_oak_desk_mirror', 'whimsy_deco:spruce_desk_mirror', 'whimsy_deco:oak_desk_mirror', 'abyssal_decor:frosted_ceiling_lamp', 'abyssal_decor:jade_lamp_item', 'abyssal_decor:seaglass_lamp', 'industrialhellscape:folding_chair']))
        })
    }
    nearbyPlayers.forEach((player) => {
        player.teleportTo("minecraft:overworld", block.x, y + 1, block.z, 0, 0)
    })
});