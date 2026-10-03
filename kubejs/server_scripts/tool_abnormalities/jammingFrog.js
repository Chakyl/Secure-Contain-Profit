BlockEvents.rightClicked('whimsy_deco:singing_frog', (e) => {
    const { player, item, level, hand, block, pos, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (server.persistentData.getBoolean("jamming")) {
        let newProperties = block.getProperties();
        newProperties.singing = true;
        block.set(block.id, newProperties);
        e.cancel()
    } else {
        server.persistentData.jamming = true;
    }
    if (level.isClientSide()) return;
    FieldGuide.unlock(player, `block:whimsy_deco/singing_frog`);
    // let seconds = 115 / 4 = 28;
    let iterations = 29
    server.runCommandSilent(`playsound opposing_force:slayser_disc block @a ${block.x} ${block.y} ${block.z} 2 1`);
    server.scheduleInTicks(iterations * 20 * 4, () => {
        server.persistentData.jamming = false;
        block.set("minecraft:air")
        server.runCommandSilent(`playsound netherman:bell_beast5 block @a ${block.x} ${block.y} ${block.z} 2 1`);

    });
    for (let index = 1; index < iterations; index++) {
        server.scheduleInTicks(index * (20 * 4), () => {
            global.addChaos(server, block, 1);
        });
    }
});

BlockEvents.placed('whimsy_deco:singing_frog', (e) => {
    e.player.giveExperienceLevels(100)
});

BlockEvents.broken('whimsy_deco:singing_frog', (e) => {
    e.cancel()
});