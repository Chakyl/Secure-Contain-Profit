BlockEvents.rightClicked('companions:frog_bonanza_block', (e) => {
    const { player, item, level, hand, block, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    if (!['numismatics:sprocket', 'numismatics:cog', 'numismatics:crown', 'companions:copper_coin', 'companions:nether_coin', 'companions:end_coin'].includes(item.id)) return;
    if (Math.random() < 0.01) {
        player.give(global.rollArray(['scguns:laser_musket', 'scguns:minksy']))
        server.runCommandSilent(`playsound scp:playgamblethbygcat101 block @a ${block.x} ${block.y} ${block.z} 2 0.7`);
        global.addChaos(server, block, 25);
    }
    FieldGuide.unlock(player, `block:companions/frog_bonanza_block`);
});