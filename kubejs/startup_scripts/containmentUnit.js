StartupEvents.registry("block", (e) => {
    e.create("scp:containment_unit")
        .tagBlock("minecraft:mineable/pickaxe")
        .tagBlock("minecraft:needs_stone_tool")
        .soundType("copper")
        .box(1, 0, 1, 15, 15, 15)
        .defaultCutout()
        .blockEntity((blockInfo) => {
            blockInfo.initialData({ tier: "verdant", boundPlayer: "", abnormalityType: "", abnormalityUUID: "", counter: 0, dayLastTriggered: 0, state: "", researchLevel: 0, researchTime: 0 });
            blockInfo.serverTicking()
            blockInfo.tickFrequency(20)
        });
});
