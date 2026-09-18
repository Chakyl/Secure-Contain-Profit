global.handleAbnormality = (entity) => {
    const { level } = entity;
    if (level.isClientSide()) return;
    if (!entity.persistentData.breaching) return
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
    let abnormalityData = global.ABNORMALITIES.get(`${entity.type}`);
    if (!abnormalityData) return;

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
                if (Math.random() < chance && !scanBlock.hasTag("scp:sap_immune")) {
                    level.setBlock(scanPos, 'minecraft:air', 3);
                }
            }
            level.getServer().runCommandSilent(`playsound ${blockType == "NUKE" ? "minecraft:entity.generic.explode" : "minecraft:block.fire.extinguish"} block @a ${entity.x} ${entity.y} ${entity.z} 0.2 0.2`);
            level.spawnParticles("companions:ember_pole_explosion", true, entity.x, entity.y + 1.0, entity.z, 0.3, 1.0, 0.3, 1, 0.01);
        }
    }
    if (breachTypes.includes("STEAMROLLER")) {
        let abovePos = entity.getOnPos().above().offset(Math.random() < 0.5 ? 1 : -1, 0, Math.random() < 0.5 ? 1 : -1);
        let belowPos = entity.getOnPos();
        if (!level.getBlock(abovePos).hasTag("scp:sap_immune")) {
            level.setBlock(abovePos, 'minecraft:air', 3);
        }
        if (!level.getBlock(belowPos).hasTag("scp:sap_immune")) {
            level.setBlock(belowPos, 'minecraft:air', 3);
        }
    }
    let entities;
    if (Math.random() < 0.1 && breachTypes.includes("TELEPORT")) {
         entities = level.getEntitiesWithin(entity.boundingBox.inflate(10))
        if (entities.length > 1) {
            level.getServer().runCommandSilent(`playsound minecraft:entity.enderman.teleport block @a ${entity.x} ${entity.y} ${entity.z} 2 1.2`);
            level.spawnParticles("minecraft:glow", true, entity.x, entity.y, entity.z, 0.3, 1.0, 0.3, 1, 0.01);
            entity.teleportTo("minecraft:overworld", entities[1].x, entities[1].y, entities[1].z, 0, 0)
        }
    }
    if (Math.random() < 0.75 && breachTypes.includes("SAP")) {
        entities = level.getEntitiesWithin(entity.boundingBox.inflate(5))
        if (entities.length > 1) {
            level.getServer().runCommandSilent(`playsound abyssal_decor:silver_step block @a ${entity.x} ${entity.y} ${entity.z} 0.1 1.2`);
            level.spawnParticles("companions:blizzard_ice", true, entity.x, entity.y, entity.z, 0.3, 1.0, 0.3, 1, 1.01);
            entities.forEach((scanEnt) => {
                if (entity.type != scanEnt.type) scanEnt.attack(2)
            });
        }
    }
};

EntityJSEvents.modifyEntity((e) => {
    for (let abnormality of global.ABNORMALITIES.keys()) {
        e.modify(abnormality, (modifyBuilder) => {
            modifyBuilder.tick((entity) => {
                if (entity.level.time % 20 === 0) {
                    global.handleAbnormality(entity);
                }
            });
        });
    }
});