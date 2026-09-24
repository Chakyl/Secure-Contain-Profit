
ItemEvents.entityInteracted((e) => {
    const { hand, player, item, target, level, server } = e;
    if (!['companions:copper_coin', 'companions:nether_coin', 'companions:end_coin'].includes(item.id)) return;
    if (!target.persistentData.breaching || !target.persistentData.getBoolean("breaching")) return;
    let radius = 8;
    let { x, y, z } = target;

    for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - radius, z - radius), new BlockPos(x + radius, y + radius, z + radius))) {
        let scanPos = new BlockPos(pos.x, pos.y, pos.z);
        if (!level.isLoaded(scanPos)) continue;

        let scanBlock = level.getBlock(scanPos);
        if (scanBlock.id == "scp:containment_unit") {
            let nbt = scanBlock.getEntityData();
            if (!(!nbt || !nbt.data)) {
                if (target.uuid.toString() == nbt.data.abnormalityUUID) {
                    player.tell(Text.green("ABNORMALITY CALMED"))
                    item.shrink(1);
                    target.persistentData.breaching = false;
                    nbt.merge({
                        data: {
                            state: "NONE"
                        },
                    });
                    global.setBlockEntityData(scanBlock, nbt);
                    return;
                }
            }
        }
    }
});