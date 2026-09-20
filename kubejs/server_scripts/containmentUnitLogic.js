const scpPool = new Map([
    ["verdant", ["minecraft:pig", "creaturefeature:pathogen", "minecraft:villager", "minecraft:goat", "minecraft:frog", "minecraft:chicken"]]
])
const printContainmentUnitInfo = (player, data) => {
    const { state } = data;
    player.tell(Text.darkPurple(`Abnormality: ${global.getAbnormalityName(String(data.getString("tier")).trim(), String(data.getString("abnormalityType")).trim())}: ${Number(data.getInt("researchLevel")) >= 2 ? `${global.ABNORMALITIES.get(String(`${data.getString("abnormalityType")}`).trim()).name}` : "REQUIRES RESEARCH LEVEL 2"}`));
    player.tell(Text.darkPurple(`State: ${state} | Qliphoth Counter: ${Number(data.getInt("researchLevel")) >= 1 ? `${data.getInt("counter")}/${global.ABNORMALITIES.get(String(`${data.getString("abnormalityType")}`).trim()).counter}` : "REQUIRES RESEARCH LEVEL 1"} ${Number(data.getInt("researchLevel")) ? ` | Research Level: ${Number(data.getInt("researchLevel"))}` : ""}`))
}
const spawnAbnormality = (server, level, block, nbt, abnormalityId, tier) => {
    let { x, y, z } = block;
    server.runCommandSilent(`playsound scguns:entity.praetor.roar block @a ${x} ${y} ${z} 1 0.2`);
    server.runCommandSilent(`playsound scguns:item.jetpack.fire block @a ${x} ${y} ${z} 2 0.7`);
    level.spawnParticles("companions:teddy_transformation_cloud", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
    level.spawnParticles("scguns:sonic_blast", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
    level.spawnParticles("companions:blink", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
    let newAbnormalityEntity = level.createEntity(abnormalityId);
    newAbnormalityEntity.setPos(x + 0.5, y + 1.0, z + 0.5);
    newAbnormalityEntity.spawn();
    newAbnormalityEntity.setCustomName(Text.of(`${global.getAbnormalityName(tier, abnormalityId)}`).red().bold());
    newAbnormalityEntity.setPersistenceRequired();

    let newHealth = newAbnormalityEntity.getMaxHealth() * 20;
    newAbnormalityEntity.setMaxHealth(newHealth);
    newAbnormalityEntity.setHealth(newHealth);
    nbt.merge({
        data: {
            abnormalityUUID: newAbnormalityEntity.uuid.toString()
        },
    });
    global.setBlockEntityData(block, nbt)
}
const dropEnkephalin = (block, x, y, z) => {
    let itemEntity = block.createEntity('item')
    itemEntity.x = x
    itemEntity.y = y + 0.2
    itemEntity.z = z
    itemEntity.item = 'scp:enkephalin'
    itemEntity.spawn()
};
BlockEvents.rightClicked('scp:containment_unit', e => {
    const { inventory, hand, player, item, level, server, block } = e;
    const { x, y, z } = block;
    if (!level || level.isClientside) return;
    if (hand !== "MAIN_HAND") return;
    let nbt = block.getEntityData();
    if (!nbt || !nbt.data) return;

    let tier = String(nbt.data.getString("tier")).trim();
    const { abnormalityType, abnormalityUUID } = nbt.data;
    if (abnormalityType == null || abnormalityType == "") {
        let newAbnormality = global.rollArray(scpPool.get(tier))
        if (!newAbnormality) {
            console.warn("[SCP] WARNING: FAILED TO ROLL SCP")
            return;
        }
        player.tell(Text.red(`Unleashing Abnormality: ${global.getAbnormalityName(tier, newAbnormality)} in 10 seconds...`))
        server.runCommandSilent(`playsound scguns:item.pistol.reload block @a ${x} ${y} ${z} 2 0.2`);
        server.runCommandSilent(`playsound sinew:enter_nether block @a ${x} ${y} ${z} 2 0.2`);
        level.spawnParticles("creaturefeature:sleepy_explode", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
        nbt.merge({
            data: {
                state: "WORKABLE",
                abnormalityType: newAbnormality,
                boundPlayer: player.getUuid().toString()
            },
        });
        global.setBlockEntityData(block, nbt)
        server.scheduleInTicks(200, () => {
            spawnAbnormality(server, level, block, nbt, newAbnormality, tier)
        });
    } else {
        let state = String(nbt.data.getString("state")).trim();
        let radius = getClassRadius(tier);
        let centerRadiusPos = block.getPos().offset(0, radius, 0)
        if (item.id == "scp:abnormality_heart") {
            if (global.getPossibleAbnormalities(level, centerRadiusPos, radius, abnormalityUUID).length == 0) {
                if (String(nbt.data.getString("abnormalityType")).trim().equals(String(item.getCustomData().get("entity_id")).trim().replace('\"', "").replace('\"', ""))) {
                    player.tell(Text.green("ABNORMALITY RESTORED"))
                    item.shrink(1);
                    spawnAbnormality(server, level, block, nbt, String(nbt.data.getString("abnormalityType")).trim(), tier)
                    global.addThreatLevel(server, 1);
                    if (server.persistentData.threat_level % 5 == 0) {
                        server.tell(Text.darkRed(`THREAT LEVEL INCREASED TO ${server.persistentData.threat_level / 5}`))
                        global.addThreatLevel(server, server.persistentData.threat_level);
                    }
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
        } else if (state.equals("WORKABLE") && item.id == 'scguns:syringe') {
            item.shrink(1)
            server.runCommandSilent(`playsound abyssal_decor:trashbag_break block @a ${x} ${y} ${z} 2 0.2`);
            server.runCommandSilent(`playsound minecraft:entity.cow.milk block @a ${x} ${y} ${z} 2 0.2`);
            level.spawnParticles("minecraft:happy_villager", true, x, y + 0.5, z, 0.2, 0.2, 0.2, 4, 1.01);
            dropEnkephalin(block, x, y, z);
            nbt.merge({
                data: {
                    state: "NONE"
                },
            });
        } else if (state.equals("MAINTENANCE") && item.id == 'companions:wrench') {
            nbt.merge({
                data: {
                    state: "NONE"
                },
            });
            level.spawnParticles("minecraft:happy_villager", true, x, y + 0.5, z, 0.2, 0.2, 0.2, 4, 1.01);
            server.runCommandSilent(`playsound industrialhellscape:metal_box_closing block @a ${x} ${y} ${z} 2 0.2`);
            global.setBlockEntityData(block, nbt)
        } else if (tier == "verdant" && item.id == "scp:verdant_research") {
            if (Number(nbt.data.getInt("researchLevel")) < 3) {
                let nearbyPlayers = level.getEntitiesWithin(AABB.ofBlock(level.getBlock(centerRadiusPos)).inflate(radius)).filter((entity) => entity.isPlayer());
                if (nearbyPlayers.length >= 1) {
                    item.shrink(1)
                    player.addItemCooldown(item, 10);
                    incrementResearch(level, block, x, y, z, centerRadiusPos, radius, abnormalityUUID, nearbyPlayers, nbt, item)
                } else {
                    player.tell("You're not close enough...")
                }
            } else {
                player.tell("You can't use this now...")
            }
        } else {
            printContainmentUnitInfo(player, nbt.data)

        }
    }
})
const getClassRadius = (tier) => {
    switch (tier) {
        case "amber": return 3;
        case "maroon": return 4;
        case "indigo": return 5;
        default:
        case "verdant": return 2;
    }
}

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

    const { tier, player, state, abnormalityUUID, counter, researchTime } = nbt.data;
    if (abnormalityUUID == "") return;
    let radius = getClassRadius(tier);
    let centerRadiusPos = block.getPos().offset(0, radius, 0)
    // TODO: Make abnormality name show in messages
    // Daily logic
    let day = global.getDay(level);
    if (global.compareDay(day, nbt.data.getInt("dayLastTriggered"), 1)) {
        let abnormalityName = global.getAbnormalityName(String(nbt.data.getString("tier")).trim(), String(nbt.data.getString("abnormalityType")).trim());
        let state = String(nbt.data.getString("state")).trim();
        let increaseCounter = false;
        // TODO: Share method
        if (global.getPossibleAbnormalities(level, centerRadiusPos, radius, abnormalityUUID).length == 0) {
            level.getServer().tell(Text.red(`ABNORMALITY ${abnormalityName} HAS ESCAPED CONTAINMENT AT [x: ${x} z: ${z}]. COUNTER INCREASED.`))
            increaseCounter = true;
        }
        if (state == "MAINTENANCE") {
            if (Math.random() < 0.5) {
                increaseCounter = true;
            }
        } else if (state !== "BREACH") {
            if (state == "RESEARCH") increaseCounter = true;
            let dailyStates = ["WORKABLE", "WORKABLE", "MAINTENANCE"];
            if (Number(nbt.data.getInt("researchLevel")) < 3) dailyStates.push("RESEARCH");
            nbt.merge({
                data: {
                    state: day < 2 ? "WORKABLE" : global.rollArray(dailyStates),
                    researchTime: 0
                }
            });
        }
        if (increaseCounter) {
            increaseCounter(level, block, abnormalityName, abnormalityUUID, nbt);
        }
        nbt.merge({
            data: {
                dayLastTriggered: day
            }
        });
        global.setBlockEntityData(block, nbt)
    }
    // Validation logic
    if (tick % 20 == 0) {
        if (level.getServer().persistentData.chaos && level.getServer().persistentData.getInt("chaos") >= 1) {
            level.getServer().persistentData.chaos = level.getServer().persistentData.getInt("chaos") - 1;
            increaseCounter(level, block, global.getAbnormalityName(String(nbt.data.getString("tier")).trim(), String(nbt.data.getString("abnormalityType")).trim()), abnormalityUUID, nbt);
        }
    }
    if (tick % 100 == 0) {
        let validContainmentUnit = true;
        for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y, z - radius), new BlockPos(x + radius, y + (radius * 2), z + radius))) {
            if (!level.isLoaded(pos)) continue;
            let scanBlock = level.getBlock(pos);
            if (!["scp:containment_unit", "minecraft:air"].includes(scanBlock.id)) {
                validContainmentUnit = false;
                level.spawnParticles("minecraft:angry_villager", true, pos.x, pos.y + 0.5, pos.z, 0.2, 0.2, 0.2, 4, 1.01);
                break;
            }
        }
        if (!validContainmentUnit) {
            level.getServer().runCommandSilent(`playsound scguns:item.pistol.reload block @a ${x} ${y} ${z} 2 0.1`);
        }

    }
    // .filter((entity) => global.checkEntityTag(entity, "society:husbandry_animal"));
    if (tick % 600 == 0) {
        centerRadiusPos = block.getPos().offset(0, radius, 0)
        if (global.getPossibleAbnormalities(level, centerRadiusPos, radius, abnormalityUUID).length == 0) {
            level.getServer().runCommandSilent(`playsound scguns:item.pistol.reload block @a ${x} ${y} ${z} 2 0.1`);
            level.spawnParticles("minecraft:angry_villager", true, x, y + 0.5, z, 0.2, 0.2, 0.2, 4, 1.01);
            level.getServer().tell(Text.red(`ABNORMALITY ${global.getAbnormalityName(String(nbt.data.getString("tier")).trim(), String(nbt.data.getString("abnormalityType")).trim())} HAS ESCAPED CONTAINMENT AT [x: ${x} z: ${z}]. RETURN IMMEDIATELY.`))
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
                level.getServer().runCommandSilent(`playsound scguns:item.grenade.pin block @a ${x} ${y} ${z} 2 0.2`);
            } else {
                incrementResearch(level, block, x, y, z, centerRadiusPos, radius, abnormalityUUID, nearbyPlayers, nbt)
            }
            global.setBlockEntityData(block, nbt)
        }
    }
})
let increaseCounter = (level, block, abnormalityName, abnormalityUUID, nbt) => {
    let { x, y, z } = block;
    if (Number(nbt.data.getInt("counter")) + 1 < global.ABNORMALITIES.get(String(`${nbt.data.getString("abnormalityType")}`).trim()).counter) {
        nbt.merge({
            data: {
                counter: global.increaseStage(Number(nbt.data.getInt("counter")))
            }
        });
    } else {
        let foundEntity = false;
        for (let entity of level.getServer().getEntities()) {
            if (entity.uuid.toString() == abnormalityUUID) {
                entity.persistentData.breaching = true;
                foundEntity = true;
                break;
            }
        }
        if (foundEntity) {
            level.getServer().tell(Text.red(`ABNORMALITY ${abnormalityName} IS BREACHING AT [x: ${x} z: ${z}]. SUPPRESS IMMEDIATELY.`))
            nbt.merge({
                data: {
                    state: "BREACH",
                    counter: 0,
                }
            });
        } else {
            // Reset since the abnormality is probably dead TODO maybe not?
            level.getServer().tell(Text.red(`ABNORMALITY ${abnormalityName} HAS EXPIRED AT [x: ${x} z: ${z}].`))
            nbt.merge({ data: { tier: "verdant", boundPlayer: "", abnormalityType: "", abnormalityUUID: "", counter: 0, dayLastTriggered: -1, state: "", researchLevel: 0, researchTime: 0 } });
            global.setBlockEntityData(block, nbt)
            return;
        }
    }
}
let incrementResearch = (level, block, x, y, z, centerRadiusPos, radius, abnormalityUUID, nearbyPlayers, nbt, item) => {
    let server = level.getServer();
    let possibleAbnormality = global.getPossibleAbnormalities(level, centerRadiusPos, radius, abnormalityUUID);
    if (possibleAbnormality.length < 1) {
        nearbyPlayers[0].tell(Text.red("FAILED TO APPLY RESEARCH! ABNORMALITY MISSING!"));
        if (item) nearbyPlayers[0].give(item.id)
        return;
    }
    nearbyPlayers[0].tell(Text.green("ABNORMALITY RESEARCH LEVEL INCREASED BY 1."));
    level.spawnParticles("minecraft:happy_villager", true, x, y + 0.5, z, 0.2, 0.2, 0.2, 4, 1.01);
    server.runCommandSilent(`playsound whimsy_deco:kaching block @a ${x} ${y} ${z} 1 0.2`);
    if (Number(nbt.data.getInt("researchLevel")) >= 2) {

        let evolutions = global.ABNORMALITIES.get(String(`${nbt.data.getString("abnormalityType")}`).trim()).evolutions;
        if (evolutions && evolutions.length > 0) {
            server.tell(Text.green(`ABNORMALITY ${global.getAbnormalityName(String(nbt.data.getString("tier")).trim(), String(nbt.data.getString("abnormalityType")).trim())} IS EVOLVING. EVACUATE THE CONTAINMENT UNIT IMMEDIATELY.`))
            server.runCommandSilent(`playsound scguns:item.pistol.reload block @a ${x} ${y} ${z} 2 0.2`);
            server.runCommandSilent(`playsound sinew:enter_nether block @a ${x} ${y} ${z} 2 0.2`);
            level.spawnParticles("creaturefeature:sleepy_explode", true, x, y + 1.0, z, 0, 0, 0, 1, 0.01);
            let evolution = global.rollArray(evolutions);
            server.scheduleInTicks(100, () => {
                possibleAbnormality[0].setRemoved("unloaded_to_chunk");
                global.addThreatLevel(server, -1);
                spawnAbnormality(server, level, block, nbt, evolution, String(nbt.data.getString("tier")).trim())
            });

            dropEnkephalin(block, x, y, z);
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
            dropEnkephalin(block, x, y, z);
            nbt.merge({
                data: {
                    researchTime: 0,
                    state: "NONE",
                    researchLevel: global.increaseStage(Number(nbt.data.getInt("researchLevel")))
                },
            });
        }

    } else {
        nbt.merge({
            data: {
                researchTime: 0,
                state: "NONE",
                researchLevel: global.increaseStage(Number(nbt.data.getInt("researchLevel")))
            },
        });
    }
}