BlockEvents.rightClicked(['industrialhellscape:retro_computer', 'industrialhellscape:retro_computer_2', 'industrialhellscape:monitor_and_keyboard'], (e) => {
    const { player, block, server } = e;
    server.runCommandSilent(`openselector ${player.username}`);
});

BlockEvents.rightClicked('scguns:felix_memorial', (e) => {
    const { player, block, server } = e;
    server.runCommandSilent(`openshop ${player.username} felix_offering`);
});
