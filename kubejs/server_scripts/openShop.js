BlockEvents.rightClicked(['industrialhellscape:retro_computer', 'industrialhellscape:retro_computer_2'], (e) => {
        const { player, block, server } = e;
        server.runCommandSilent( `openselector ${player.username}`);
    }
);
