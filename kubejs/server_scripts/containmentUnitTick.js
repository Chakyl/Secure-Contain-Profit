const scpPool = new Map([
    ["verdant", ["creaturefeature:minedflayer", "minecraft:pig", "creaturefeature:pathogen", "minecraft:villager", "minecraft:goat", "minecraft:chicken"]]
])


BlockEvents.rightClicked('scp:containment_unit', e => {
    const { inventory, hand, player, level, block } = e;
    const { x, y, z } = block;
    if (!level || level.isClientside) return;
    if (hand !== "MAIN_HAND") return;
    let nbt = block.getEntityData();
    if (!nbt || !nbt.data) return;

    const { boundPlayer, abnormalityUUID, counter, dayLastTriggered, state, researchLevel } = nbt.data;
    if (abnormalityUUID == "") {
        let tier = String(nbt.data.getString("tier")).trim();
        let newSCP = global.rollArray(scpPool.get(tier))
        if (!newSCP) {
            console.warn("[SCP] WARNING: FAILED TO ROLL SCP")
            return;
        }
        let newSCPEntity = level.createEntity(newSCP);
        newSCPEntity.setPos(block.x + 0.5, block.y + 1.0, block.z + 0.5);
        newSCPEntity.spawn();
        newSCPEntity.setCustomName(Text.of(`${tier.charAt(0).toUpperCase()}-${global.getSCPID(newSCP)}`).red().bold());
        newSCPEntity.setPersistenceRequired();

        let newHealth = newSCPEntity.getMaxHealth() * 50;
        player.tell(newSCPEntity.getMaxHealth() )
        player.tell(newHealth)
        newSCPEntity.setMaxHealth(newHealth);
        newSCPEntity.setHealth(newHealth);


        let attack = newSCPEntity.getAttribute('minecraft:attack_damage');
        if (attack) {
            attack.setBaseValue(attack.getBaseValue() * 3);
        }
        nbt.merge({
            data: {
                abnormalityUUID: newSCPEntity.uuid.toString(),
                boundPlayer: player.getUuid().toString()
            },
        });
        global.setBlockEntityData(block, nbt)
    }
})
BlockEvents.blockEntityTick('scp:containment_unit', e => {

    const { inventory, level, block } = e;
    const { x, y, z } = block;
    if (!level || level.isClientside) return;

    let nbt = block.getEntityData();
    if (!nbt || !nbt.data) return;

    const { tier, player, abnormalityUUID, counter, dayLastTriggered, state, researchLevel } = nbt.data;
    if (abnormalityUUID == "") {
        return;
    }
})