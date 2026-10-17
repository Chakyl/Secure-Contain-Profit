NativeEvents.onEvent('de.melanx.skyblockbuilder.events.SkyblockManageTeamEvent$Leave', (e) => {
    const { player } = e;
    let server = player.level.getServer();
    server.runCommandSilent(`kjs stages clear ${player.username}`);
    server.runCommandSilent(`ql progress reset all ${player.username}`);
    server.runCommandSilent(`fieldguide revoke ${player.username} everything`);
    player.setMaxHealth(20);
});