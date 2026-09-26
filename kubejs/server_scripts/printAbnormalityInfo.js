const handleInfo = (level, server, player, abnormality, radius) => {
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
                if (abnormality.uuid.toString() == nbt.data.abnormalityUUID) {
                    if (Number(nbt.data.getInt("researchLevel")) >= 2) {
                        abnormality.setCustomName(Text.of(global.getFullAbnormalityName(nbt.data)).red().bold());
                        if (Number(nbt.data.getInt("researchLevel")) >= 3) {
                            FieldGuide.unlock(player, `entity:${abnormality.type.replace(":", "/")}`)
                        }
                    }
                    global.printContainmentUnitInfo(player, server, nbt.data)
                    return true;
                }
            }
        }
    }
    return false;
}
ItemEvents.entityInteracted((e) => {
    const { hand, player, item, target, level, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (item.id != 'minecraft:air') return;
    if (!target.persistentData.abnormality || !target.persistentData.getBoolean("abnormality")) return;
    let result = handleInfo(level, server, player, target, 8)
    if (!result) {
        global.renderUiText(
            player,
            server,
            {
                containmentSummary: {
                    type: 'text',
                    text: "Abnormality too far from Containment Unit",
                    alignX: 'center',
                    alignY: 'bottom',
                    shadow: true,
                    centered: true,
                    x: 2,
                    y: -90,
                    color: "#AA00AA"
                }
            },
            global.mainUiElementIds
        );
    }
});