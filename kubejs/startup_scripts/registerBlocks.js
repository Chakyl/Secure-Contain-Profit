StartupEvents.registry("block", (e) => {

    const createLockBlocks = (type) => {
        e.create(`scp:${type}_hallway_lock_block`)
            .displayName("Verdant Hallway Lock")
            .soundType("metal")
            .soundType("stone")
            .resistance(3600000)
            .texture(`scp:block/${type}_hallway_lock_block`)
            .unbreakable()

        e.create(`scp:${type}_containment_lock_block_1`)
            .displayName("Verdant Containment Lock")
            .soundType("metal")
            .soundType("stone")
            .resistance(3600000)
            .texture(`scp:block/${type}_containment_lock_block`)
            .unbreakable()

        e.create(`scp:${type}_containment_lock_block_2`)
            .displayName("Verdant Containment Lock")
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
    e.create(`scp:vent_lock_block`)
        .displayName("Vent Lock")
        .soundType("metal")
        .soundType("stone")
        .resistance(3600000)
        .texture(`scp:block/vent_lock_block`)
        .unbreakable()
});
