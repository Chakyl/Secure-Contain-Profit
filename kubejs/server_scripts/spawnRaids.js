
let getRaidFromTier = (player, server) => {
    if (!server.persistentData.raidCount) server.persistentData.raidCount = 1;
    let raidNum = Number(server.persistentData.getInt("raidCount"));
    server.persistentData.raidCount = raidNum + 1;
    if (player.stages.has("amber_level") && raidNum > 3) {
        return `amber_raid_${Math.min(6, raidNum)}`
    } else if (player.stages.has("maroon_level") && raidNum > 6) {
        return `amber_raid_${Math.min(8, raidNum)}`
    }
    return `verdant_raid_${Math.min(3, raidNum)}`
}

ServerEvents.tick((e) => {
    const {  server } = e;
    if (server.players.length == 0) return;
    if (server.tickCount % 200 != 0) return;
    let level = server.players[0].level;
    if (level.dayTime() % 24000 < 6000) return;
    let day = global.getDay(level) - 1;
    if (!server.persistentData.dayLastRaided) server.persistentData.dayLastRaided = -1;
    if (!server.persistentData.dayLastWarned) server.persistentData.dayLastWarned = -1;
    if (day > 5 && (day + 1) % 10 == 0 && global.compareDay(day, server.persistentData.getInt("dayLastWarned"), 1)) {
        server.tell(Text.darkRed("WARNING: THE MOONLIT COMPANY HAS DETECTED TERRORIST ACTIVITY OUTSIDE YOUR FACILITY. INSURGENCY RAID OCCURRING IN 1 DAY."));
        server.persistentData.dayLastWarned = day;
    }
    if (day > 5 && day % 10 == 0 && global.compareDay(day, server.persistentData.getInt("dayLastRaided"), 1)) {
        let raid = getRaidFromTier(server.players[0], server);
        server.runCommandSilent(`open_gateway ${server.players[0].username} gateways:${raid}`)
        if (server.player.length >= 3) {
            server.runCommandSilent(`open_gateway ${server.players[1].username} gateways:${raid}`)
        }
        server.persistentData.dayLastRaided = day;
    }
})