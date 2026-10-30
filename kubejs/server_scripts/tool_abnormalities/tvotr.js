BlockEvents.rightClicked('whimsy_deco:recorder', (e) => {
    const { player, level, hand, block, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    let day = global.getDay(level);
    if (player.persistentData.dayLastListened && !global.compareDay(day, player.persistentData.getInt("dayLastListened"), 1)) {
        player.tell("§7You've already listened today...")
        return;
    }
    server.runCommandSilent(`playsound industrialhellscape:metal_box_opening block @a ${block.x} ${block.y} ${block.z} 2 0.5`);
    let teamName = global.getPlayerTeamName(level, player);
    server.tell(Text.translatable("messages.scp.tvotr.death", player.username, server.persistentData[teamName].getInt("threat_level")).gold());
    FieldGuide.unlock(player, `block:whimsy_deco/recorder`);
});
