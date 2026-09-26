ServerEvents.tags('item', (e) => {
    e.add('c:tools/wrench', "companions:wrench")
    e.add('minecraft:enchantable/mining', 'scguns:anthralite_paxel')
    e.add('minecraft:enchantable/durability', 'scguns:anthralite_paxel')
    e.add('minecraft:enchantable/mining_loot', 'scguns:anthralite_paxel')
})

ServerEvents.tags('block', (e) => {

    [
        "minecraft:bedrock",
        "scp:containment_unit",
        "scp:verdant_hallway_lock_block",
        "scp:verdant_containment_lock_block_1",
        "scp:verdant_containment_lock_block_2",
        "scp:amber_hallway_lock_block",
        "scp:amber_containment_lock_block_1",
        "scp:amber_containment_lock_block_2",
        "scp:maroon_hallway_lock_block",
        "scp:maroon_containment_lock_block_1",
        "scp:maroon_containment_lock_block_2",
        "scp:indigo_hallway_lock_block",
        "scp:indigo_containment_lock_block_1",
        "scp:indigo_containment_lock_block_2",
        "scp:vent_lock_block"
    ].forEach((item) => {
        e.add("scp:setblock_immune", item);
    });
})
