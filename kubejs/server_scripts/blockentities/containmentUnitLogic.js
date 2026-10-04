const scpPool = new Map([
    ["verdant", ["companions:living_candle", "minecraft:pig", "creaturefeature:pathogen", "minecraft:villager", "minecraft:goat", "minecraft:frog", "minecraft:chicken"]],
    ["amber", ["antarchy:jerry", "antarchy:rolly_polly", "antarchy:stink_bug", "creaturefeature:sinister", "minecraft:spider", "minecraft:polar_bear", "minecraft:breeze", "minecraft:turtle", "creaturefeature:beauty", "companions:illager_golem", "peaceless:shade", "netherman:statue_entity", "companions:hostile_puppet_glove"]],
    ["maroon", ["antarchy:elka", "antarchy:mantis", "antarchy:worm", "antarchy:crawling_blight", "antarchy:flytrap", "antarchy:lucid", "antarchy:vortex", "netherman:statue_bossunit", "scguns:viventrum", "netherman:manipulator", "minecraft:rabbit", "netherman:ghastly", "scguns:dissident", "antarchy:wasp", "minecraft:allay", "peaceless:mimic", "creaturefeature:detritus", "scguns:sulfurhead"]]
])

const spawnAbnormality = (server, level, block, nbt, abnormalityId, tier) => {
    let { x, y, z } = block;
    server.runCommandSilent(`playsound scguns:entity.praetor.roar block @a ${x} ${y} ${z} 1 0.5`);
    server.runCommandSilent(`playsound scguns:item.jetpack.fire block @a ${x} ${y} ${z} 2 0.7`);
    level.spawnParticles("companions:teddy_transformation_cloud", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
    level.spawnParticles("scguns:sonic_blast", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
    level.spawnParticles("companions:blink", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
    let newAbnormalityEntity = level.createEntity(abnormalityId);
    newAbnormalityEntity.setPos(x + 0.5, y + 1.0, z + 0.5);
    newAbnormalityEntity.spawn();
    if (nbt.data.getInt("researchLevel") > 1) {
        newAbnormalityEntity.setCustomName(Text.of(global.getFullAbnormalityName(nbt.data)).red().bold());
    } else {
        newAbnormalityEntity.setCustomName(Text.of(`${global.getAbnormalityName(tier, abnormalityId)}`).red().bold());
    }
    newAbnormalityEntity.setPersistenceRequired();

    let newHealth = newAbnormalityEntity.getMaxHealth() * (getClassEnkephalinCount(tier) * 5);
    newAbnormalityEntity.setMaxHealth(newHealth);
    newAbnormalityEntity.setHealth(newHealth);
    newAbnormalityEntity.persistentData.abnormality = true;
    newAbnormalityEntity.persistentData.researchLevel = nbt.data.researchLevel ? nbt.data.getInt("researchLevel") : 0;
    nbt.merge({
        data: {
            abnormalityUUID: newAbnormalityEntity.uuid.toString()
        },
    });
    global.setBlockEntityData(block, nbt)
}



const getClassEnkephalinCount = (tier) => {
    switch (tier) {
        case "amber": return 2;
        case "maroon": return 4;
        case "indigo": return 8;
        default:
        case "verdant": return 1;
    }
}

const dropEnkephalin = (block, x, y, z, count) => {
    let itemEntity = block.createEntity('item')
    itemEntity.x = x
    itemEntity.y = y + 0.2
    itemEntity.z = z
    itemEntity.item = Item.of(`${count}x scp:enkephalin`);
    itemEntity.spawn()
};

BlockEvents.rightClicked('scp:containment_unit', e => {
    const { hand, player, item, level, server, block } = e;
    const { x, y, z } = block;
    if (!level || level.isClientside) return;
    if (hand !== "MAIN_HAND") return;
    let nbt = block.getEntityData();
    if (!nbt || !nbt.data) return;
    // nbt.merge({ data: { tier: "maroon" } });
    // global.setBlockEntityData(block, nbt)
    // return;
    let tier = String(nbt.data.getString("tier")).trim();
    const { abnormalityType, abnormalityUUID } = nbt.data;
    if (item.id == "scp:qliphoth_neutralizer") {
        if (String(nbt.data.getString("state")).trim() == "EXPIRED") {
            if (!player.isCreative()) item.shrink(1);
            nbt.merge({ data: { boundPlayer: "", abnormalityType: "", abnormalityUUID: "", counter: 0, dayLastTriggered: -1, state: "", researchLevel: 0, researchTime: 0 } });
            global.setBlockEntityData(block, nbt)
        } else {
            player.tell(Text.green("This only works on EXPIRED containment units."))
        }
    }
    if ((abnormalityType == null || abnormalityType == "") && nbt.data.getInt("timeUnleashed") + 200 < level.dayTime()) {
        let newAbnormality = global.rollArray(global.filterKnownAbnormalities(server, scpPool.get(tier)))
        if (!newAbnormality) {
            console.warn("[SCP] WARNING: FAILED TO ROLL SCP")
            return;
        }
        if (!player.stages.has("tutorial_abnormality")) {
            newAbnormality = "minecraft:chicken";
            player.stages.add("tutorial_abnormality")
        }
        nbt.merge({
            data: {
                timeUnleashed: level.dayTime()
            },
        });
        global.setBlockEntityData(block, nbt)
        player.tell(Text.red(`Unleashing Abnormality: ${global.getAbnormalityName(tier, newAbnormality)} in 10 seconds...`))
        server.runCommandSilent(`playsound scguns:item.pistol.reload block @a ${x} ${y} ${z} 2 0.5`);
        server.runCommandSilent(`playsound sinew:enter_nether block @a ${x} ${y} ${z} 2 0.5`);
        level.spawnParticles("creaturefeature:sleepy_explode", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
        global.addKnownAbnormalities(server, newAbnormality);
        server.scheduleInTicks(200, () => {
            nbt.merge({
                data: {
                    state: "WORKABLE",
                    abnormalityType: newAbnormality,
                    boundPlayer: player.getUuid().toString()
                },
            });
            global.setBlockEntityData(block, nbt)
            spawnAbnormality(server, level, block, nbt, newAbnormality, tier)
            global.addThreatLevel(server, 1);
            if (Number(server.persistentData.getInt("threat_level")) % 5 == 0) {
                server.tell(Text.darkRed(`THREAT LEVEL INCREASED TO ${Number(server.persistentData.getInt("threat_level")) / 5}`))
                global.addChaos(server, block, Number(server.persistentData.getInt("threat_level")));
            }
        });
    } else {
        let state = String(nbt.data.getString("state")).trim();
        let { radius, centerRadiusPos } = global.getClassRadii(tier, block);
        if (item.id == "scp:abnormality_heart") {
            if (global.getPossibleAbnormalities(level, centerRadiusPos, radius, abnormalityUUID).length == 0) {
                if (String(nbt.data.getString("abnormalityType")).trim().equals(String(item.getCustomData().get("entity_id")).trim().replace('\"', "").replace('\"', ""))) {
                    global.paintAlert(server, player, "ABNORMALITY RESTORED", '#55FF55');
                    if (!player.isCreative()) item.shrink(1);
                    spawnAbnormality(server, level, block, nbt, String(nbt.data.getString("abnormalityType")).trim(), tier)

                    nbt.merge({
                        data: {
                            state: "NONE"
                        },
                    });
                    global.setBlockEntityData(block, nbt);
                } else {
                    player.tell(Text.darkRed("THIS ABNORMALITY HEART DOES NOT MATCH THIS CONTAINMENT UNIT"))
                }
            } else {
                player.tell(Text.red("THIS CONTAINMENT UNIT HAS ITS ABNORMALITY ALREADY."))
            }
        } else if (state.equals("MAINTENANCE") && item.id == 'companions:wrench') {
            nbt.merge({
                data: {
                    state: "NONE"
                },
            });
            level.spawnParticles("minecraft:happy_villager", true, x, y + 0.5, z, 0.2, 0.2, 0.2, 4, 1.01);
            server.runCommandSilent(`playsound industrialhellscape:metal_box_closing block @a ${x} ${y} ${z} 2 0.5`);
            global.setBlockEntityData(block, nbt)
        } else if (tier == "verdant" && item.id == "scp:verdant_research") {
            if (Number(nbt.data.getInt("researchLevel")) < 4) {
                let nearbyPlayers = level.getEntitiesWithin(AABB.ofBlock(level.getBlock(centerRadiusPos)).inflate(radius)).filter((entity) => entity.isPlayer());
                if (nearbyPlayers.length >= 1) {
                    item.shrink(1)
                    player.addItemCooldown(item, 10);
                    incrementResearch(level, block, centerRadiusPos, radius, abnormalityUUID, nearbyPlayers, nbt, item)
                    nbt.merge({
                        data: {
                            state: state
                        },
                    });
                    global.setBlockEntityData(block, nbt);
                } else {
                    player.tell("You're not close enough...")
                }
            } else {
                player.tell("You can't use this now...")
            }
        } else {
            global.printContainmentUnitInfo(player, server, nbt.data)
        }
    }
    global.updateSignalers(level, block);
})
/**
 * States:
 * - RESEARCH - Player must be in containment unit for 30 seconds. Will always be the first state if researchLevel = 0. Increases counter if failed
 * - WORKABLE - Player must perform one of 3 work types by placing specific blocks in the cell. Carries no penalty if missed.
 * - MAINTENANCE - Player must right click containment unit with wrench. 20% chance to increase counter every day until done. State does not change daily
 * - BREACH - Abnormality breaches. This only occurs if the counter is maxed
 * - NONE - Does nothing
 */
const containmentChamberTickRate = 20;

const containmentChamberProgTime = 20;
BlockEvents.blockEntityTick('scp:containment_unit', e => {
    const { inventory, level, tick, block } = e;
    const { x, y, z } = block;
    if (!level || level.isClientside) return;

    let nbt = block.getEntityData();
    if (!nbt || !nbt.data) return;
    const { tier, player, abnormalityUUID, counter, researchTime } = nbt.data;
    if (abnormalityUUID == "") return;
    let { radius, centerRadiusPos } = global.getClassRadii(tier, block);
    // TODO: Make abnormality name show in messages
    // Daily logic
    let day = global.getDay(level);
    let state = String(nbt.data.getString("state")).trim();
    if (global.compareDay(day, nbt.data.getInt("dayLastTriggered"), 1) && state != "EXPIRED") {
        let abnormalityName = global.getFullAbnormalityName(nbt.data, "???");
        let increaseCounter = false;
        let scanForAb = global.getPossibleAbnormalities(level, centerRadiusPos, radius, abnormalityUUID);
        if (scanForAb.length == 0) {
            let foundEntity = false;
            for (let entity of level.getServer().getEntities()) {
                if (entity.uuid.toString() == abnormalityUUID) {
                    entity.persistentData.breaching = true;
                    foundEntity = entity;
                    break;
                }
            }
            if (foundEntity) {
                global.paintToServer(level.getServer(), `${abnormalityName} ESCAPED CONTAINMENT AT [x:${x}/z:${z}]. COUNTER INCREASED BY 1`, '#FF5555');
                increaseCounter = true;
                if (foundEntity.type == "creaturefeature:pathogen") {
                    foundEntity.teleportTo("minecraft:overworld", block.x, block.y + 1, block.z, 0, 0)
                    nbt.merge({
                        data: {
                            state: "NONE",
                            counter: 0,
                        }
                    });
                    global.setBlockEntityData(block, nbt);
                    global.updateSignalers(level, block);
                }
            } else {
                level.getServer().tell(Text.red(`ABNORMALITY ${abnormalityName} HAS EXPIRED AT [x:${x}/z:${z}].`))
                nbt.merge({
                    data: {
                        state: "EXPIRED",
                        dayLastTriggered: day
                    }
                });

                global.setBlockEntityData(block, nbt)
                return;
            }
        } else {
            scanForAb[0].setHealth(10000);
        }
        if (state == "MAINTENANCE") {
            if (Math.random() < 0.5) {
                increaseCounter = true;
            }
        } else if (state !== "BREACH") {
            if (state == "RESEARCH") increaseCounter = true;
            let dailyStates = ["WORKABLE", "WORKABLE"];
            if (Number(nbt.data.getInt("researchLevel")) < 4) dailyStates.push("RESEARCH");
            let newState = day < 2 ? "WORKABLE" : global.rollArray(dailyStates);
            if (level.getServer().persistentData.disrepair && level.getServer().persistentData.getInt("disrepair") >= 1) {
                level.getServer().persistentData.disrepair = level.getServer().persistentData.getInt("disrepair") - 1;
                newState = "MAINTENANCE"
            }
            nbt.merge({
                data: {
                    state: newState,
                    researchTime: 0
                }
            });

        }
        if (increaseCounter) {
            global.increaseUnitCounter(level, block, abnormalityName, nbt);
        }
        nbt.merge({
            data: {
                dayLastTriggered: day
            }
        });
        global.setBlockEntityData(block, nbt)
        global.updateSignalers(level, block);
    }
    // Validation logic
    let fullAbnormalityName = global.getFullAbnormalityName(nbt.data, "???");
    if (tick % 20 == 0 && state !== "BREACH") {
        if (level.getServer().persistentData.chaos && level.getServer().persistentData.getInt("chaos") >= 1) {
            level.getServer().persistentData.chaos = level.getServer().persistentData.getInt("chaos") - 1;
            global.increaseUnitCounter(level, block, fullAbnormalityName, nbt);
        }
    }
    if (tick % 100 == 0) {
        let validContainmentUnit = true;
        for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y, z - radius), new BlockPos(x + radius, y + (radius * 2), z + radius))) {
            if (!level.isLoaded(pos)) continue;
            let scanBlock = level.getBlock(pos);
            if (!["scp:containment_unit", "minecraft:air", "antarchy:mucus"].includes(scanBlock.id)) {
                validContainmentUnit = false;
                level.spawnParticles("minecraft:angry_villager", true, pos.x, pos.y + 0.5, pos.z, 0.2, 0.2, 0.2, 4, 1.01);
                break;
            }
        }
        if (!validContainmentUnit) {
            level.getServer().runCommandSilent(`playsound scguns:item.pistol.reload block @a ${x} ${y} ${z} 1 0.5`);
            if (Math.random() < 0.1) global.increaseUnitCounter(level, block, fullAbnormalityName, nbt);
        }

    }
    if (tick % 600 == 0) {
        centerRadiusPos = block.getPos().offset(0, radius, 0)
        let checkedAbs = global.getPossibleAbnormalities(level, centerRadiusPos, radius, abnormalityUUID);
        if (checkedAbs.length == 0) {
            level.getServer().runCommandSilent(`playsound scguns:item.pistol.reload block @a ${x} ${y} ${z} 1 0.5`);
            level.spawnParticles("minecraft:angry_villager", true, x, y + 0.5, z, 0.2, 0.2, 0.2, 4, 1.01);
            global.paintToServer(level.getServer(), `${global.getFullAbnormalityName(nbt.data, "???")} ESCAPED CONTAINMENT AT [x:${x}/z:${z}].`, '#FF5555');
        } else {
            if (checkedAbs[0].persistentData.respawned && checkedAbs[0].persistentData.getBoolean("respawned") && String(`${nbt.data.getString("abnormalityType")}`).trim() == checkedAbs[0].type) {
                nbt.merge({
                    data: {
                        abnormalityUUID: checkedAbs[0].uuid.toString()
                    },
                });
                checkedAbs[0].persistentData.respawned = false;
                global.setBlockEntityData(block, nbt)
            }
        }
    }
    if (state == "RESEARCH") {
        let nearbyPlayers = level.getEntitiesWithin(AABB.ofBlock(level.getBlock(centerRadiusPos)).inflate(radius)).filter((entity) => entity.isPlayer())
        if (nearbyPlayers.length > 0 && global.getPossibleAbnormalities(level, centerRadiusPos, radius, abnormalityUUID).length > 0) {
            if (Number(nbt.data.getInt("researchTime")) < 14) {
                nbt.merge({
                    data: {
                        researchTime: global.increaseStage(Number(nbt.data.getInt("researchTime")))
                    },
                });

                level.spawnParticles("companions:golden_allay_trail", true, x, y + 0.5, z, 0.2, 0.2, 0.2, 4, 1.01);
                level.getServer().runCommandSilent(`playsound scguns:item.grenade.pin block @a ${x} ${y} ${z} 2 0.5`);
            } else {
                incrementResearch(level, block, centerRadiusPos, radius, abnormalityUUID, nearbyPlayers, nbt)
                global.updateSignalers(level, block);
            }
            global.setBlockEntityData(block, nbt)
        }
    }
})

let incrementResearch = (level, block, centerRadiusPos, radius, abnormalityUUID, nearbyPlayers, nbt, item) => {
    let { x, y, z } = block;
    let server = level.getServer();
    let possibleAbnormality = global.getPossibleAbnormalities(level, centerRadiusPos, radius, abnormalityUUID);
    if (possibleAbnormality.length < 1) {
        global.paintAlert(server, nearbyPlayers[0], "FAILED TO APPLY RESEARCH! ABNORMALITY MISSING!", '#FF5555');
        if (item) nearbyPlayers[0].give(item.id)
        return;
    }
    global.paintAlert(server, nearbyPlayers[0], "ABNORMALITY RESEARCH LEVEL INCREASED BY 1.", '#55FF55');
    level.spawnParticles("minecraft:happy_villager", true, x, y + 0.5, z, 0.2, 0.2, 0.2, 4, 1.01);
    server.runCommandSilent(`playsound whimsy_deco:kaching block @a ${x} ${y} ${z} 1 0.5`);
    let researchLevel = Number(nbt.data.getInt("researchLevel"));
    let newLevel = global.increaseStage(researchLevel)
    let abnormalityId = String(`${nbt.data.getString("abnormalityType")}`).trim()
    if (researchLevel == 2) {
        nearbyPlayers.forEach((player) => {
            FieldGuide.unlock(player, `entity:${abnormalityId.replace(":", "/")}`)
        })
    }
    if (researchLevel >= 3) {
        let evolutions = global.ABNORMALITIES.get(abnormalityId).evolutions;
        if (evolutions && evolutions.length > 0) {
            evolutions = global.filterKnownAbnormalities(server, evolutions);
            global.paintToServer(server, `${global.getFullAbnormalityName(nbt.data, "???")} IS EVOLVING. EVACUATE THE CONTAINMENT UNIT IMMEDIATELY.`, '#55FF55');
            server.runCommandSilent(`playsound scguns:item.pistol.reload block @a ${x} ${y} ${z} 2 0.5`);
            server.runCommandSilent(`playsound sinew:enter_nether block @a ${x} ${y} ${z} 2 0.5`);
            level.spawnParticles("creaturefeature:sleepy_explode", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
            let evolution = global.rollArray(evolutions);
            server.scheduleInTicks(100, () => {
                possibleAbnormality[0].setRemoved("unloaded_to_chunk");
                spawnAbnormality(server, level, block, nbt, evolution, String(nbt.data.getString("tier")).trim())
            });
            dropEnkephalin(block, x, y, z, (getClassEnkephalinCount(nbt.data.getString("tier")) * 3));
            nbt.merge({
                data: {
                    researchLevel: 0,
                    researchTime: 0,
                    state: "NONE",
                    counter: 0,
                    abnormalityType: evolution
                },
            });
        } else {
            dropEnkephalin(block, x, y, z, (getClassEnkephalinCount(nbt.data.getString("tier")) * 2));
            possibleAbnormality[0].persistentData.researchLevel = newLevel;
            nbt.merge({
                data: {
                    researchTime: 0,
                    state: "NONE",
                    researchLevel: newLevel
                },
            });
        }
    } else {
        possibleAbnormality[0].persistentData.researchLevel = newLevel;
        nbt.merge({
            data: {
                researchTime: 0,
                state: "NONE",
                researchLevel: newLevel
            },
        });
    }
}