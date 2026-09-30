
const $ResourceLocation = Java.loadClass("net.minecraft.resources.ResourceLocation");
const $LootParams = Java.loadClass("net.minecraft.world.level.storage.loot.LootParams");
const $LootContextParams = Java.loadClass("net.minecraft.world.level.storage.loot.parameters.LootContextParams");
const $LootContextParamSets = Java.loadClass("net.minecraft.world.level.storage.loot.parameters.LootContextParamSets");

const getMagicShearsOutput = (server, level, target) => {
    let splitTarget = target.type.split(":");
    let lootTable = server.reloadableRegistries().getLootTable($ResourceLocation.fromNamespaceAndPath(splitTarget[0], `entities/${splitTarget[1]}`));

    if (!lootTable) return -1;
    let droppedLoot = lootTable.getRandomItems(
        new $LootParams.Builder(level).withParameter($LootContextParams.THIS_ENTITY, target)
            .withParameter($LootContextParams.ORIGIN, target.position())
            .withParameter($LootContextParams.DAMAGE_SOURCE, level.damageSources().generic())
            .create($LootContextParamSets.ENTITY)
    );

    if (droppedLoot && droppedLoot.length > 0) {
        return droppedLoot;
    }
    return -1;
};
const handleMagicHarvest = (server, level, player, target) => {
    const droppedLoot = getMagicShearsOutput(server, level, target);
    server.runCommandSilent(`playsound minecraft:entity.sheep.shear block @a ${player.x} ${player.y} ${player.z}`);
    if (droppedLoot == -1 || droppedLoot.length < 1) {
        player.tell(Text.gray("This abnormality didn't drop anything..."))
        return -1;
    } else {
        for (let i = 0; i < droppedLoot.length; i++) {
            let specialItem = level.createEntity("minecraft:item");
            let dropItem = droppedLoot[i];
            specialItem.x = target.x;
            specialItem.y = target.y;
            specialItem.z = target.z;
            specialItem.item = dropItem;
            specialItem.spawn();
        }
    }
};


const handleDeathsDynamicShroud = (level, server, player, abnormality, radius) => {
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
                if (String(nbt.data.getString("state")).trim() != "BREACH" && abnormality.uuid.toString() == nbt.data.abnormalityUUID) {
                    if (handleMagicHarvest(server, level, player, abnormality) != -1) {
                        FieldGuide.unlock(player, `item:scp/deaths_dynamic_shroud`);
                        global.increaseUnitCounter(level, scanBlock, global.getFullAbnormalityName(nbt.data, "???"), nbt);
                    }
                    return true;
                }
            }
        }
    }
}



ItemEvents.entityInteracted((e) => {
    const { item, target, player, level, hand, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (item.id != 'scp:deaths_dynamic_shroud') return;
    if (!target.persistentData.abnormality || !target.persistentData.getBoolean("abnormality")) return;
    handleDeathsDynamicShroud(level, server, player, target, 8);
});