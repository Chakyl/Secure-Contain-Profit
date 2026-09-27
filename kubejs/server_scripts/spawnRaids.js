PlayerEvents.tick((e) => {
    const { level, player, server } = e;
    if (level.isClientSide()) return;
    if (player.tickCount % 200 != 0) return;
    if (level.dayTime() % 24000 < 6000) return;
    let day = global.getDay(level) - 1;
    if (!player.persistentData.dayLastRaided) player.persistentData.dayLastRaided = -1;
    if (!player.persistentData.dayLastWarned) player.persistentData.dayLastWarned = -1;
    if (day > 5 && (day + 1) % 10 == 0 && global.compareDay(day, player.persistentData.getInt("dayLastWarned"), 1)) {
        server.tell(Text.darkRed("WARNING: THE MOONLIT COMPANY HAS DETECTED TERRORIST ACTIVITY OUTSIDE YOUR FACILITY. INSURGENCY RAID OCCURRING IN 1 DAY."));
        player.persistentData.dayLastWarned = day;
    }
    if (day > 5 && day % 10 == 0 && global.compareDay(day, player.persistentData.getInt("dayLastRaided"), 1)) {
        if (player.stages.has("amber_level")) {
            server.runCommandSilent(`open_gateway ${player.username} gateways:amber_raid`)
        } else if (player.stages.has("maroon_level")) {
            server.runCommandSilent(`open_gateway ${player.username} gateways:maroon_raid`)
        } else {
            server.runCommandSilent(`open_gateway ${player.username} gateways:verdant_raid`)
        }
        player.persistentData.dayLastRaided = day;
    }
})