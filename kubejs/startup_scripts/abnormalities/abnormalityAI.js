const setEffectByTrait = (entity, traits) => {
    if (traits.includes("DARKNESS")) {
        entity.potionEffects.add('minecraft:darkness', 200, 1)
    }
    if (Math.random() < 0.1 && traits.includes("BLIND")) {
        entity.potionEffects.add('scguns:blinded', 100, 1)
    }
    if (traits.includes("SULFUR")) {
        entity.potionEffects.add('scguns:sulfur_poisoning', 400, 1)
    }
    if (Math.random() < 0.25 && traits.includes("SLEEPING")) {
        entity.potionEffects.add('creaturefeature:sleepy', 100, 1)
    }
}
const dropLitter = (block, x, y, z, item) => {
    let itemEntity = block.createEntity('item')
    itemEntity.x = x
    itemEntity.y = y + 0.2
    itemEntity.z = z
    itemEntity.item = item;
    itemEntity.spawn()
};

global.handleAbnormality = (entity, abnormalityData) => {
    const { level } = entity;
    if (level.isClientSide()) return;
    if (!entity.persistentData.breaching || !entity.persistentData.getBoolean("breaching")) return
    level.spawnParticles(
        "companions:shade_summon",
        true,
        entity.x,
        entity.y + 1.0,
        entity.z,
        0.3,
        0.3,
        0.3,
        5,
        0.01
    );
    if (!abnormalityData) return;
    let server = level.getServer();
    /**
     * Littering
     */
    if (entity.tickCount % 1000 == 0) {
        let litters = global.ABNORMALITY_LITTERS.get(`${entity.type}`)
        if (litters) {
            litters.items.forEach((itemDef) => {
                if (Math.random() < itemDef.chance) {
                    dropLitter(level.getBlock(entity.getOnPos()), entity.x, entity.y, entity.z, itemDef.item);
                }
            })
        }
    }
    /**
     * Breaching
     */
    let breachTypes = abnormalityData.breachTypes;
    if (breachTypes.includes("DISSOLVE") || breachTypes.includes("NUKE")) {
        let blockType = breachTypes.includes("NUKE") ? "NUKE" : "DISSOLVE";
        let triggerChance = blockType == "NUKE" ? 0.05 : 0.5;
        if (Math.random() < triggerChance) {
            let radius = blockType == "NUKE" ? 3 : 2;
            let chance = blockType == "NUKE" ? 1 : 0.05;
            let { x, y, z } = entity;

            for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - radius, z - radius), new BlockPos(x + radius, y + radius, z + radius))) {
                let scanPos = new BlockPos(pos.x, pos.y, pos.z);
                if (!level.isLoaded(scanPos)) continue;

                let scanBlock = level.getBlock(scanPos);
                if (Math.random() < chance && !scanBlock.hasTag("scp:setblock_immune")) {
                    level.setBlock(scanPos, 'minecraft:air', 3);
                }
            }
            server.runCommandSilent(`playsound ${blockType == "NUKE" ? "minecraft:entity.generic.explode" : "minecraft:block.fire.extinguish"} block @a ${entity.x} ${entity.y} ${entity.z} 0.2 0.2`);
            level.spawnParticles("companions:ember_pole_explosion", true, entity.x, entity.y + 1.0, entity.z, 0.3, 1.0, 0.3, 1, 0.01);
        }
    }
    if (breachTypes.includes("STEAMROLLER")) {
        let abovePos = entity.getOnPos().above().offset(Math.random() < 0.5 ? 1 : -1, 0, Math.random() < 0.5 ? 1 : -1);
        let aboveAbovePos = abovePos.above();
        if (!level.getBlock(abovePos).hasTag("scp:setblock_immune")) {
            level.setBlock(abovePos, 'minecraft:air', 3);
        }
        if (!level.getBlock(aboveAbovePos).hasTag("scp:setblock_immune")) {
            level.setBlock(aboveAbovePos, 'minecraft:air', 3);
        }
    }
    // Teleportation
    let entities;
    if (Math.random() < 0.1 && breachTypes.includes("TELEPORT")) {
        entities = level.getEntitiesWithin(entity.boundingBox.inflate(10)).filter((foundEntity) => foundEntity.type != entity.type);
        if (entities.length > 1) {
            server.runCommandSilent(`playsound minecraft:entity.enderman.teleport block @a ${entity.x} ${entity.y} ${entity.z} 2 1.2`);
            level.spawnParticles("minecraft:glow", true, entity.x, entity.y, entity.z, 0.3, 1.0, 0.3, 1, 0.01);
            entity.teleportTo("minecraft:overworld", entities[1].x, entities[1].y + 1, entities[1].z, 0, 0)
        }
    }
    if (Math.random() < 0.01 && breachTypes.includes("BEGONE")) {
        entities = level.getEntitiesWithin(entity.boundingBox.inflate(14)).filter((foundEntity) => foundEntity.type != entity.type);
        let closeEntities = level.getEntitiesWithin(entity.boundingBox.inflate(5)).filter((foundEntity) => foundEntity.type != entity.type);
        if (entities.length > 1 && closeEntities.length > 1) {
            server.runCommandSilent(`playsound minecraft:entity.enderman.teleport block @a ${entity.x} ${entity.y} ${entity.z} 2 1.2`);
            level.spawnParticles("minecraft:glow", true, entity.x, entity.y, entity.z, 0.3, 1.0, 0.3, 1, 0.01);
            closeEntities[0].teleportTo("minecraft:overworld", entities[1].x, entities[1].y + 1, entities[1].z, 0, 0)
        }
    }
    if (Math.random() < 0.1 && breachTypes.includes("SUCK")) {
        entities = level.getEntitiesWithin(entity.boundingBox.inflate(6)).filter((foundEntity) => foundEntity.type != entity.type);
        if (entities.length > 1) {
            server.runCommandSilent(`playsound minecraft:entity.enderman.teleport block @a ${entity.x} ${entity.y} ${entity.z} 2 1.2`);
            level.spawnParticles("minecraft:glow", true, entity.x, entity.y, entity.z, 0.3, 1.0, 0.3, 1, 0.01);
            entities.forEach((arrEntity) => {
                arrEntity.teleportTo("minecraft:overworld", entity.x, entity.y, entity.z, 0, 0)
            })
        }
    }
    if (Math.random() < 0.05 && breachTypes.includes("SUMMON")) {
        if (server.players.length > 1) {
            server.runCommandSilent(`playsound minecraft:entity.enderman.teleport block @a ${entity.x} ${entity.y} ${entity.z} 2 1.2`);
            level.spawnParticles("minecraft:glow", true, entity.x, entity.y, entity.z, 0.3, 1.0, 0.3, 1, 0.01);
            server.players[0].teleportTo("minecraft:overworld", entity.x, entity.y, entity.z, 0, 0)
        }
    }

    // Effects/damage
    if (Math.random() < 0.75 && breachTypes.includes("SAP") || breachTypes.includes("BITE")) {
        let bite = breachTypes.includes("BITE")
        entities = level.getEntitiesWithin(entity.boundingBox.inflate(bite ? 2 : 5))
        if (entities.length > 1) {
            server.runCommandSilent(`playsound abyssal_decor:silver_step block @a ${entity.x} ${entity.y} ${entity.z} 0.1 1.2`);
            level.spawnParticles("companions:blizzard_ice", true, entity.x, entity.y, entity.z, 0.3, 1.0, 0.3, 1, 1.01);
            entities.forEach((scanEnt) => {
                if (entity.type != scanEnt.type) scanEnt.attack(bite ? 10 : 2)
            });
        }
    }
    if (breachTypes.includes("DARKNESS") || breachTypes.includes("BLIND") || breachTypes.includes("SULFUR") || breachTypes.includes("SLEEPING")) {
        let bite = breachTypes.includes("BITE")
        entities = level.getEntitiesWithin(entity.boundingBox.inflate(bite ? 2 : 5))
        if (entities.length > 1) {
            server.runCommandSilent(`playsound vista:block.television.static block @a ${entity.x} ${entity.y} ${entity.z} 0.1 1.2`);
            level.spawnParticles("scguns:sulfur_smoke", true, entity.x, entity.y, entity.z, 0.3, 1.0, 0.3, 4, 1.01);
            entities.forEach((scanEnt) => {
                if (scanEnt != entity) setEffectByTrait(scanEnt, breachTypes);
            });
        }
    }
    // Facility Disasters
    if (entity.tickCount % 600 == 0 && (breachTypes.includes("SUPER") || breachTypes.includes("CHAOS"))) {
        global.addChaos(server, level.getBlock(entity.getOnPos()), breachTypes.includes("CHAOS") ? 1 : 3);
    }
    if (Math.random() < 0.15 && breachTypes.includes("DECOUNT")) {
        let radius = 4;
        let { x, y, z } = entity;

        for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - radius, z - radius), new BlockPos(x + radius, y + radius, z + radius))) {
            let scanPos = new BlockPos(pos.x, pos.y, pos.z);
            if (!level.isLoaded(scanPos)) continue;

            let scanBlock = level.getBlock(scanPos);
            if (scanBlock.id == "scp:containment_unit") {
                let nbt = scanBlock.getEntityData();
                if (!(!nbt || !nbt.data)) {
                    if (target.uuid.toString() == nbt.data.abnormalityUUID) {
                        global.increaseUnitCounter(level, scanBlock, global.getFullAbnormalityName(nbt.data, "???"), nbt);
                        return;
                    }
                }
            }
        }
        server.runCommandSilent(`playsound ${blockType == "NUKE" ? "minecraft:entity.generic.explode" : "minecraft:block.fire.extinguish"} block @a ${entity.x} ${entity.y} ${entity.z} 0.2 0.2`);
        level.spawnParticles("companions:ember_pole_explosion", true, entity.x, entity.y + 1.0, entity.z, 0.3, 1.0, 0.3, 1, 0.01);

    }
};

EntityJSEvents.modifyEntity((e) => {
    for (let abnormality of global.ABNORMALITIES.keys()) {
        e.modify(abnormality, (modifyBuilder) => {
            modifyBuilder.tick((entity) => {
                if (entity.tickCount % 20 === 0) {
                    global.handleAbnormality(entity, global.ABNORMALITIES.get(`${entity.type}`));
                }
            });
        });
    }
});