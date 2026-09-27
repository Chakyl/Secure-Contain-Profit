PlayerEvents.tick((e) => {
    const { level, player, server } = e;
    if (level.isClientSide()) return;
    if (player.tickCount % 200 != 0) return;
    if (level.dayTime() % 24000 < 6000) return;
    let day = global.getDay(level) - 1;
    if (!player.persistentData.dayLastRaided) player.persistentData.dayLastRaided = -1;
    if (day > 5 && day % 15 == 0 && global.compareDay(day, player.persistentData.getInt("dayLastRaided"), 1)) {
        server.runCommandSilent(`open_gateway ${player.username} gateways:verdant_raid`)
        player.persistentData.dayLastRaided = day;
    }
})