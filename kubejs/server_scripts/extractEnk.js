
ItemEvents.entityInteracted((e) => {
    const { hand, player, item, target, level, server } = e;
    if (item.id != 'scguns:syringe') return;
    if (!target.persistentData.abnormality || !target.persistentData.getBoolean("abnormality")) return;
    let radius = 8;
    let { x, y, z } = target;

    for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - radius, z - radius), new BlockPos(x + radius, y + radius, z + radius))) {
        let scanPos = new BlockPos(pos.x, pos.y, pos.z);
        if (!level.isLoaded(scanPos)) continue;

        let scanBlock = level.getBlock(scanPos);
        if (scanBlock.id == "scp:containment_unit") {
            let nbt = scanBlock.getEntityData();
            if (!(!nbt || !nbt.data)) {
                if (String(nbt.data.getString("state")).trim() == "WORKABLE" && target.uuid.toString() == nbt.data.abnormalityUUID) {
                    item.shrink(1)
                    server.runCommandSilent(`playsound abyssal_decor:trashbag_break block @a ${x} ${y} ${z} 2 0.2`);
                    server.runCommandSilent(`playsound minecraft:entity.cow.milk block @a ${x} ${y} ${z} 2 0.2`);
                    level.spawnParticles("minecraft:happy_villager", true, x, y + 0.5, z, 0.2, 0.2, 0.2, 4, 1.01);
                    dropEnkephalin(scanBlock, x, y, z, (getClassEnkephalinCount(nbt.data.getString("tier"))));
                    nbt.merge({
                        data: {
                            state: "NONE"
                        },
                    });
                    global.setBlockEntityData(scanBlock, nbt)
                    return;
                }
            }
        }
    }
});