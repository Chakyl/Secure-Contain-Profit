BlockEvents.rightClicked('whimsy_deco:red_phone', (e) => {
    const { player, item, level, hand, block, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    let day = global.getDay(level);
    if (player.persistentData.dayLastCalled && !global.compareDay(day, player.persistentData.getInt("dayLastCalled"), 1)) {
        player.tell("§7You've already called today...")
        return;
    }
    server.runCommandSilent(`execute as ${player.username} run dialog show red_phone_choice_dialog_choice_${Math.floor(Math.random() * 6) + 1}`);
    server.runCommandSilent(`playsound industrialhellscape:metal_box_opening block @a ${block.x} ${block.y} ${block.z} 2 0.2`);
    server.persistentData.clank = 2;
    player.persistentData.dayLastCalled = day;
});
