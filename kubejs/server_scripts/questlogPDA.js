
ItemEvents.rightClicked('scp:manager_pda', (e) => {
    e.server.runCommandSilent(`questlog open questlog:main ${e.player.username}`)
});
