BlockEvents.rightClicked('whimsy_deco:red_phone', (e) => {
    const { player, level, hand, block, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    let day = global.getDay(level);
    if (player.persistentData.dayLastCalled && !global.compareDay(day, player.persistentData.getInt("dayLastCalled"), 1)) {
        player.tell("§7You've already called today...")
        return;
    }
    server.runCommandSilent(`execute as ${player.username} run dialog show red_phone_choice_dialog_choice_${Math.floor(Math.random() * 6) + 1}`);
    server.runCommandSilent(`playsound industrialhellscape:metal_box_opening block @a ${block.x} ${block.y} ${block.z} 2 0.5`);
    let teamName = global.getPlayerTeamName(level, player);
    global.addChaos(server, block, teamName, 2);
    global.questCompleteForTeam(server, level, teamName, "questlog:chaos");
    player.persistentData.dayLastCalled = day;
    FieldGuide.unlock(player, `block:whimsy_deco/red_phone`);
});
