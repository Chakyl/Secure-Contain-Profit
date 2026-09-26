StartupEvents.registry("block", (e) => {
    let formatName = (type) => type.charAt(0).toUpperCase() + type.slice(1);
    const createLockBlocks = (type) => {
        e.create(`scp:${type}_hallway_lock_block`)
            .displayName(`${formatName(type)} Hallway Lock`)
            .soundType("metal")
            .soundType("stone")
            .resistance(3600000)
            .texture(`scp:block/${type}_hallway_lock_block`)
            .unbreakable()

        e.create(`scp:${type}_containment_lock_block_1`)
            .displayName(`${formatName(type)} Containment Lock`)
            .soundType("metal")
            .soundType("stone")
            .resistance(3600000)
            .texture(`scp:block/${type}_containment_lock_block`)
            .unbreakable()

        e.create(`scp:${type}_containment_lock_block_2`)
            .displayName(`${formatName(type)} Containment Lock`)
            .soundType("metal")
            .soundType("stone")
            .resistance(3600000)
            .texture(`scp:block/${type}_containment_lock_block`)
            .unbreakable()
    };

    [
        "verdant",
        "amber",
        "maroon",
        "indigo",
    ].forEach((color) => {
        createLockBlocks(color);
    });

    e.create(`scp:warehouse_lock_block`)
        .displayName("Warehouse Lock")
        .soundType("metal")
        .soundType("stone")
        .resistance(3600000)
        .texture(`scp:block/warehouse_lock_block`)
        .unbreakable()

    e.create("scp:containment_unit")
        .tagBlock("minecraft:mineable/pickaxe")
        .tagBlock("minecraft:needs_stone_tool")
        .soundType("copper")
        .resistance(3600000)
        .unbreakable()
        .defaultCutout()
        .blockEntity((blockInfo) => {
            blockInfo.initialData({ tier: "verdant", boundPlayer: "", abnormalityType: "", abnormalityUUID: "", counter: 0, dayLastTriggered: 0, state: "", researchLevel: 0, researchTime: 0 });
            blockInfo.serverTicking()
            blockInfo.tickFrequency(20)
        });

    e.create("scp:rubber_duck", "cardinal")
        .soundType("shroomlight")
        .parentModel("whimsy_deco:block/rubber_duck")
        .defaultCutout()
        .box(1, 0, 1, 15, 16, 15)
        .blockEntity((blockInfo) => {
            blockInfo.serverTicking()
            blockInfo.tickFrequency(1000)
        });

    e.create("scp:spoon_bender", "cardinal")
        .soundType("wood")
        .parentModel("whimsy_deco:block/gnome/display")
        .defaultCutout()
        .box(1, 0, 1, 15, 16, 15)
        .blockEntity((blockInfo) => {
            blockInfo.serverTicking()
            blockInfo.tickFrequency(100)
        });
});


