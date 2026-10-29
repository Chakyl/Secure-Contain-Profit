const handleEnk = (level, server, abnormality, radius, mult, item, type, workResultCounterImpact) => {
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
                    if (item && item.id == "scguns:syringe") {
                        item.shrink(1);
                        global.increaseUnitCounter(level, scanBlock, global.getFullAbnormalityName(nbt.data, "???"), nbt);
                    } else {
                        handleWorkResultCounters(level, scanBlock, global.getFullAbnormalityName(nbt.data, "???"), nbt, type, workResultCounterImpact);
                    }
                    server.runCommandSilent(`playsound abyssal_decor:trashbag_break block @a ${x} ${y} ${z} 2 0.5`);
                    server.runCommandSilent(`playsound minecraft:entity.cow.milk block @a ${x} ${y} ${z} 2 0.5`);
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

const handleWorkResultCounters = (level, block, nbt, type, workResultCounterImpact) => {
    let counterChange = getWorkResultCounterImpact(type, workResultCounterImpact)
    if (counterChange >= 1) {
        global.increaseUnitCounter(level, block, global.getFullAbnormalityName(nbt.data, "???"), nbt, counterChange);
    } else if (counterChange <= -1) {
        global.decreaseUnitCounter(nbt, Math.abs(counterChange));
    }
}

const getWorkResultCounterImpact = (type, workResultCounterImpact) => {
    if (type == "harmony") {
        return workResultCounterImpact.harmony();
    }
    if (type == "violence") {
        return workResultCounterImpact.violence();
    }
    if (type == "insight") {
        return workResultCounterImpact.insight();
    }
    return 0;
}

const handleBadWorkResult = (level, abnormality, radius, type, workResultCounterImpact) => {
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
                    handleWorkResultCounters(level, scanBlock, global.getFullAbnormalityName(nbt.data, "???"), nbt, type, workResultCounterImpact);
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

const handleResearchFromWork = (level, abnormality, radius) => {
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
                if (Number(nbt.data.getInt("researchLevel")) < 4 && abnormality.uuid.toString() == nbt.data.abnormalityUUID) {
                    let { radius, centerRadiusPos } = global.getClassRadii(nbt.data.getString("tier"), scanBlock);
                    let nearbyPlayers = level.getEntitiesWithin(AABB.ofBlock(level.getBlock(centerRadiusPos)).inflate(radius)).filter((entity) => entity.isPlayer());
                    incrementResearch(level, scanBlock, centerRadiusPos, radius, nbt.data.abnormalityUUID, nearbyPlayers, nbt)
                    return true;
                }
            }
        }
    }
}

const dropItem = (block, item) => {
    let itemEntity = block.createEntity('item')
    itemEntity.x = block.x
    itemEntity.y = block.y + 0.2
    itemEntity.z = block.z
    itemEntity.item = item;
    itemEntity.spawn()
};

const getTierDebuff = (abnormalityClass) => {
    switch (abnormalityClass) {
        case "amber": return 0.1
        case "maroon": return 0.2
        case "indigo": return 0.3
        default:
            return 0;
    }
}
const getResearchBuff = (researchLevel) => {
    switch (researchLevel) {
        case 1: return 0.05
        case 2: return 0.1
        case 3: return 0.15
        case 4: return 0.2
        default:
            return 0;
    }
}

const getPrefNum = (preferences, workType) => {
    switch (workType) {
        case "insight": return preferences.insight();
        case "violence": return preferences.violence();
        case "harmony": return preferences.harmony();
        default:
            return 0;
    }
}
const getWorkResult = (abnormalityData, workType, workLevel, researchLevel) => {
    if (!abnormalityData) return { result: "BAD", efficiency: -1 };
    let abnormalityPref = getPrefNum(abnormalityData.preferences(), workType);
    if (abnormalityPref == -1) return { result: "GOOD", efficiency: 1 };
    if (abnormalityPref == 5) return { result: "BAD", efficiency: 0 };
    let eff = workLevel / (abnormalityPref + 1);
    eff -= getTierDebuff(abnormalityData.tier());
    eff += getResearchBuff(researchLevel);
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

const spawnDancer = (level, player) => {
    let { x, y, z } = player;
    level.spawnParticles("companions:teddy_transformation_cloud", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
    level.spawnParticles("scguns:sonic_blast", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
    level.spawnParticles("companions:blink", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
    let newAbnormalityEntity = level.createEntity("opposing_force:dicer");
    newAbnormalityEntity.setPos(x + 0.5, y + 0.5, z + 0.5);
    newAbnormalityEntity.spawn();
    newAbnormalityEntity.setCustomName(Text.of("Dancing Twin").red().bold());
    newAbnormalityEntity.setPersistenceRequired();

    newAbnormalityEntity.setMaxHealth(999);
    newAbnormalityEntity.setHealth(999);
    newAbnormalityEntity.persistentData.abnormality = true;
    newAbnormalityEntity.persistentData.breaching = true;
}

const processWork = (level, server, player, abnormality, radius, workType, workLevel, item, dropOverride) => {
    let abnormalityData = global.ABNORMALITIES.get(`${abnormality.type}`);
    let workResult = getWorkResult(abnormalityData, workType, workLevel, abnormality.persistentData.getInt("researchLevel"))
    let processed = false;
    if (workResult.result == "GOOD") {
        processed = handleEnk(level, server, abnormality, radius, 2, item, workType, abnormalityData.goodResultCounterImpact());
        if (processed) {
            if (workType == "violence") {
                dropItem(level.getBlock(abnormality.getOnPos()), dropOverride ? dropOverride : 'reliable_requiem:crystal_shard');
            } else if (workType == "insight") {
                player.giveExperienceLevels(item == "scp:architects_digest" ? 5 : 1)

                if (dropOverride) dropItem(level.getBlock(abnormality.getOnPos()), dropOverride);
            } else {
                dropItem(level.getBlock(abnormality.getOnPos()), dropOverride ? dropOverride : 'numismatics:cog');
            }
        }
    } else if (workResult.result == "NEUTRAL") {
        processed = handleEnk(level, server, abnormality, radius, 1, item, workType, abnormalityData.neutralResultCounterImpact());
    } else {
        processed = handleBadWorkResult(level, abnormality, radius, workType, abnormalityData.badResultCounterImpact());
        if (player.persistentData.dicer_flag && player.persistentData.getBoolean("dicer_flag") == true) {
            player.persistentData.dicer_flag = false;
            player.tell(Text.translatable("messages.scp.dancer_in_the_dark.elimination").darkRed());
            server.runCommandSilent(`playsound abyssal_decor:door_knock_funnyblock @a ${player.x} ${player.y} ${player} 2 0.75`);
            server.scheduleInTicks(100, () => {
                server.runCommandSilent(`playsound opposing_force:dicer_dash_warn block @a ${player.x} ${player.y} ${player} 2 1`);
                spawnDancer(level, player)
                spawnDancer(level, player)
            });
        }
        if (abnormality.type == "opposing_force:dicer") {
            player.persistentData.dicer_flag = true;
            player.tell(Text.translatable("messages.scp.dancer_in_the_dark.marked").darkRed());
        }
    }
    if (processed) {
        printWorkResult(player, server, workResult)
        if (workResult.result != "BAD" && Math.random() < .25) {
            handleResearchFromWork(level, abnormality, radius);
        }
    }
}


ItemEvents.entityInteracted((e) => {
    const { item, target, level, hand, server } = e;
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
    if (item.id != 'scp:architects_digest') return;
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

ItemEvents.entityInteracted((e) => {
    const { item, target, player, level, hand, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (item.id != 'scguns:sculk_tome') return;
    if (!target.persistentData.abnormality || !target.persistentData.getBoolean("abnormality")) return;
    processWork(level, server, player, target, 8, "insight", 3);
});

const getBlackOpalInsight = (experienceLevel) => {
    if (experienceLevel > 10) return 2;
    if (experienceLevel > 20) return 3;
    if (experienceLevel > 30) return 4;
    return 1;
}

ItemEvents.entityInteracted((e) => {
    const { item, target, player, level, hand, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (item.id != 'scp:black_opal') return;
    if (!target.persistentData.abnormality || !target.persistentData.getBoolean("abnormality")) return;
    processWork(level, server, player, target, 8, "insight", getBlackOpalInsight(player.experienceLevel));
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

ItemEvents.rightClicked('scp:cornucopia', (e) => {
    const { player, level, server } = e;
    let nearestAb = global.getNearestAbnormalities(level, player.getOnPos(), 8);
    if (nearestAb && nearestAb.length > 0) {
        processWork(level, server, player, nearestAb[0], 8, "harmony", 2, "nuimismatics:crown");
    }
})

ItemEvents.rightClicked('creaturefeature:vertigo_horn', (e) => {
    const { player, level, server } = e;
    let nearestAb = global.getNearestAbnormalities(level, player.getOnPos(), 8);
    if (nearestAb && nearestAb.length > 0) {
        processWork(level, server, player, nearestAb[0], 8, "harmony", 3);
    }
})

let rnd = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
ItemEvents.rightClicked('scp:tubasmoke_stick', (e) => {
    const { player, level, item, server } = e;
    let nearestAb = global.getNearestAbnormalities(level, player.getOnPos(), 8);
    if (nearestAb && nearestAb.length > 0) {
        server.runCommandSilent(
            `playsound minecraft:item.flintandsteel.use block @a ${player.x} ${player.y} ${player.z}`
        );
        item.count--;
        level.spawnParticles(
            "supplementaries:bomb_smoke",
            true,
            player.x,
            player.y + 1,
            player.z,
            0.1 * rnd(1, 6),
            0.1 * rnd(1, 4),
            0.1 * rnd(1, 4),
            22,
            0.001
        );
        processWork(level, server, player, nearestAb[0], 8, "harmony", 3);
    } else {
        player.tell(Text.translatable("messages.scp.working.not_nearby").gray())
    }
});

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

EntityEvents.afterHurt((e) => {
    const { level, server, entity, source } = e;
    if (!source.player) return;
    if (source.player.getHeldItem("main_hand").id != 'antarchy:basilisk_dagger') return;
    if (!entity.persistentData.abnormality || !entity.persistentData.getBoolean("abnormality")) return;
    processWork(level, server, source.player, entity, 8, "violence", 3);
});

const getSoulNeedleViolence = (health) => {
    if (health <= 10) return 4;
    if (health <= 20) return 3;
    if (health <= 30) return 2;
    return 1;
}
EntityEvents.afterHurt((e) => {
    const { level, server, entity, source } = e;
    if (!source.player) return;
    if (source.player.getHeldItem("main_hand").id != 'scp:soul_needle') return;
    if (!entity.persistentData.abnormality || !entity.persistentData.getBoolean("abnormality")) return;
    processWork(level, server, source.player, entity, 8, "violence", getSoulNeedleViolence(source.player.getHealth()));
});

