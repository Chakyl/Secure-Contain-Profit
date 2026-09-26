const handleEnk = (level, server, abnormality, radius, mult, item) => {
    let x = abnormality.x;
    let y = abnormality.y;
    let z = abnormality.z;
    for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - radius, z - radius), new BlockPos(x + radius, y + radius, z + radius))) {
        let scanPos = new BlockPos(pos.x, pos.y, pos.z);
        if (!level.isLoaded(scanPos)) continue;

        let scanBlock = level.getBlock(scanPos);
        if (scanBlock.id == "scp:containment_unit") {
            let nbt = scanBlock.getEntityData();
            if (!(!nbt || !nbt.data)) {
                if (String(nbt.data.getString("state")).trim() == "WORKABLE" && abnormality.uuid.toString() == nbt.data.abnormalityUUID) {
                    // Syringe
                    if (item) {
                        item.shrink(1);
                        global.increaseUnitCounter(level, scanBlock, global.getFullAbnormalityName(nbt.data, "???"), nbt);
                    }
                    server.runCommandSilent(`playsound abyssal_decor:trashbag_break block @a ${x} ${y} ${z} 2 0.2`);
                    server.runCommandSilent(`playsound minecraft:entity.cow.milk block @a ${x} ${y} ${z} 2 0.2`);
                    level.spawnParticles("minecraft:happy_villager", true, x, y + 0.5, z, 0.2, 0.2, 0.2, 4, 1.01);
                    dropEnkephalin(scanBlock, x, y, z, (getClassEnkephalinCount(nbt.data.getString("tier")) * mult));
                    nbt.merge({
                        data: {
                            state: "NONE"
                        },
                    });
                    global.setBlockEntityData(scanBlock, nbt)
                    global.updateSignalers(level, scanBlock);
                    return true;
                }
            }
        }
    }
}

const handleBadWorkResult = (level, abnormality, radius) => {
    let x = abnormality.x;
    let y = abnormality.y;
    let z = abnormality.z;
    for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - radius, z - radius), new BlockPos(x + radius, y + radius, z + radius))) {
        let scanPos = new BlockPos(pos.x, pos.y, pos.z);
        if (!level.isLoaded(scanPos)) continue;
        let scanBlock = level.getBlock(scanPos);
        if (scanBlock.id == "scp:containment_unit") {
            let nbt = scanBlock.getEntityData();
            if (!(!nbt || !nbt.data)) {
                if (String(nbt.data.getString("state")).trim() == "WORKABLE" && abnormality.uuid.toString() == nbt.data.abnormalityUUID) {
                    global.increaseUnitCounter(level, scanBlock, global.getFullAbnormalityName(nbt.data, "???"), nbt);
                    nbt.merge({
                        data: {
                            state: "NONE"
                        },
                    });
                    global.setBlockEntityData(scanBlock, nbt)
                    global.updateSignalers(level, scanBlock);
                    return true;
                }
            }
        }
    }
}

const getWorkResult = (abnormalityData, workType, workLevel) => {
    if (!abnormalityData) return { result: "BAD", efficiency: -1 };
    let abnormalityPref = abnormalityData.preferences[workType];
    if (abnormalityPref == 0) return { result: "GOOD", efficiency: 1 };
    let eff = workLevel / abnormalityPref;
    if (eff > 0.75) return { result: "GOOD", efficiency: eff };
    if (eff < 0.25) return { result: "BAD", efficiency: eff };
    if (Math.random() < eff) return { result: "BAD", efficiency: eff };
    else return { result: "NEUTRAL", efficiency: eff };
}
const getWorkResultColor = (result) => {
    switch (result) {
        case "GOOD": return "#55FF55";
        case "NEUTRAL": return "#AAAAAA";
        default:
        case "BAD": return "#FF5555";
    }
}
const printWorkResult = (player, server, workResult) => {
    global.renderUiText(
        player,
        server,
        {
            workResult: {
                type: 'text',
                text: `Work Result: ${workResult.result} (${Number((workResult.efficiency * 100).toFixed(1))}%)`,
                alignX: 'center',
                alignY: 'bottom',
                shadow: true,
                centered: true,
                x: 2,
                y: -100,
                color: getWorkResultColor(workResult.result)
            }
        },
        global.mainUiElementIds
    );
}

const processWork = (level, server, player, abnormality, radius, workType, workLevel, item) => {
    let abnormalityData = global.ABNORMALITIES.get(`${abnormality.type}`);
    let workResult = getWorkResult(abnormalityData, workType, workLevel)
    let processed = false;
    // TODO: Sounds, effects
    if (workResult.result == "GOOD") {
        processed = handleEnk(level, server, abnormality, radius, 2, item);
    } else if (workResult.result == "NEUTRAL") {
        processed = handleEnk(level, server, abnormality, radius, 1, item);
    } else {
        processed = handleBadWorkResult(level, abnormality, radius)
    }
    if (processed) printWorkResult(player, server, workResult)
}



ItemEvents.entityInteracted((e) => {
    const { item,  target, level, hand, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (item.id != 'scguns:syringe') return;
    if (!target.persistentData.abnormality || !target.persistentData.getBoolean("abnormality")) return;
    handleEnk(level, server, target, 8, 1, item);
});
/**
 * Insight
 */
ItemEvents.entityInteracted((e) => {
    const { item, target, player, level, hand, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (item.id != 'minecraft:book') return;
    if (!target.persistentData.abnormality || !target.persistentData.getBoolean("abnormality")) return;
    processWork(level, server, player, target, 8, "insight", 1);
});

ItemEvents.entityInteracted((e) => {
    const { item, target, player, level, hand, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (item.id != 'scp:spiritual_book') return;
    if (!target.persistentData.abnormality || !target.persistentData.getBoolean("abnormality")) return;
    processWork(level, server, player, target, 8, "insight", 2);
});
/**
 * Harmony
 */
ItemEvents.rightClicked('supplementaries:flute', (e) => {
    const { player, level, server } = e;
    server.scheduleInTicks(140, () => {
        if (player && player.getMainHandItem().id === 'supplementaries:flute') {
            level.spawnParticles("supplementaries:sparkle", true, player.x, player.y + 0.5, player.z, 0.2, 0.2, 0.2, 20, 0.31);

            let nearestAb = global.getNearestAbnormalities(level, player.getOnPos(), 8);
            if (nearestAb && nearestAb.length > 0) {
                processWork(level, server, player, nearestAb[0], 8, "harmony", 1);
            }
        }
    })
})


ItemEvents.rightClicked('minecraft:goat_horn', (e) => {
    const { player, level, server } = e;
    let nearestAb = global.getNearestAbnormalities(level, player.getOnPos(), 8);
    if (nearestAb && nearestAb.length > 0) {
        processWork(level, server, player, nearestAb[0], 8, "harmony", 2);
    }
})

/**
 * Violence
 */
EntityEvents.afterHurt((e) => {
    const { level, server, entity, source } = e;
    if (!source.player) return;
    if (source.player.getHeldItem("main_hand").id != "scguns:needle") return;
    if (!entity.persistentData.abnormality || !entity.persistentData.getBoolean("abnormality")) return;
    processWork(level, server, source.player, entity, 8, "violence", 1);
});
EntityEvents.afterHurt((e) => {
    const { level, server, entity, source } = e;
    if (!source.player) return;
    if (source.player.getHeldItem("main_hand").id != 'companions:netherite_dagger') return;
    if (!entity.persistentData.abnormality || !entity.persistentData.getBoolean("abnormality")) return;
    processWork(level, server, source.player, entity, 8, "violence", 2);
});
