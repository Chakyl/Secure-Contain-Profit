
BlockEvents.rightClicked('whimsy_deco:horseshoe', (e) => {
    const { player, level, block, server, hand } = e;
    if (hand !== "MAIN_HAND") return;
    let { x, y, z } = block;
    let radius = 10
    let found = false;
    for (let pos of BlockPos.betweenClosed(new BlockPos(x - radius, y - 5, z - radius), new BlockPos(x + radius, y + 5, z + radius))) {
        if (!level.isLoaded(pos)) continue;
        let scanBlock = level.getBlock(pos);
        if (scanBlock.id == "scp:containment_unit") {

            let nbt = scanBlock.getEntityData();
            if (!(!nbt || !nbt.data)) {
                global.printContainmentUnitInfo(player, server, nbt.data)
                found = true;
                FieldGuide.unlock(player, `block:whimsy_deco/horseshoe`);
                break;
            }
        }
    }
    if (!found) player.tell(Text.gray("No nearby containment unit..."))
})