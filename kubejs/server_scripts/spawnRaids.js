
let getRaidFromTier = (player, server) => {
    let teamName = global.getPlayerTeamName(player.level, player);
    if (server.persistentData[teamName] == null) server.persistentData[teamName] = {};
    if (!server.persistentData[teamName].raidCount) server.persistentData[teamName].raidCount = 1;
    let raidNum = Number(server.persistentData[teamName].getInt("raidCount"));
    server.persistentData[teamName].raidCount = raidNum + 1;
    if (player.stages.has("amber_level") && raidNum > 3) {
        return `amber_raid_${Math.min(6, raidNum)}`
    } else if (player.stages.has("maroon_level") && raidNum > 6) {
        return `amber_raid_${Math.min(8, raidNum)}`
    }
    return `verdant_raid_${Math.min(3, raidNum)}`
}

ServerEvents.tick((e) => {
    const { server } = e;
    if (server.players.length == 0) return;
    if (server.tickCount % 200 != 0) return;
    let level = server.players[0].level;
    if (level.dayTime() % 24000 < 6000) return;
    let day = global.getDay(level) - 1;
    if (!server.persistentData.dayLastRaided) server.persistentData.dayLastRaided = -1;
    if (!server.persistentData.dayLastWarned) server.persistentData.dayLastWarned = -1;
    if (day > 5 && (day + 1) % 10 == 0 && global.compareDay(day, server.persistentData.getInt("dayLastWarned"), 1)) {
        server.tell(Text.translatable("messages.scp.general.raid.warning").darkRed());
        server.persistentData.dayLastWarned = day;
    }
    if (day > 5 && day % 10 == 0 && global.compareDay(day, server.persistentData.getInt("dayLastRaided"), 1)) {
        let spawnedRaid = false;
        Object.keys(server.persistentData).forEach((key) => {
            if (key.known_abnormalities != null) {
                let team = global.getTeamFromName(level, key);
                if (team) {
                    let summoned = 0;
                    team.getPlayers().forEach((uuid) => {
                        if (summoned < Math.floor(team.getPlayers() / 3)) {
                            let player = server.getPlayer(uuid);
                            if (player) {
                                let raid = getRaidFromTier(player, server);
                                server.runCommandSilent(`open_gateway ${player.username} gateways:${raid}`)
                                spawnedRaid = true;
                                summoned++;
                            }
                        }
                    });
                }
            }
        });
        if (!spawnedRaid) {
            let raid = getRaidFromTier(server.players[0], server);
            server.runCommandSilent(`open_gateway ${server.players[0].username} gateways:${raid}`)
            if (server.players.length >= 3) {
                server.runCommandSilent(`open_gateway ${server.players[1].username} gateways:${raid}`)
            }
        }
        server.persistentData.dayLastRaided = day;
    }
})
