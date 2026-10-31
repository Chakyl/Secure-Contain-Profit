BlockEvents.blockEntityTick('scp:shelter', (e) => {
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
        let teamName = global.getPlayerTeamName(level, nearbyPlayers[0]);
        global.addChaos(server, block, teamName, 1);
        global.questCompleteForTeam(server, level, teamName, "questlog:chaos");
        FieldGuide.unlock(nearbyPlayers[0], `block:supplementaries/safe`);
    }
    nearbyPlayers.forEach((player) => {
        player.getFoodData().setFoodLevel(20)
        player.potionEffects.add('minecraft:regeneration', 21, 9);
        player.potionEffects.add('minecraft:absorption', 21, 9);
    })
})