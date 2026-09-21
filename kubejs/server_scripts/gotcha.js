BlockEvents.rightClicked('whimsy_deco:gatcha_machine', (e) => {
    const { player, item, level, hand, block, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    if (item.id !== 'numismatics:cog') return;
    if (Math.random() < 0.25) global.addChaos(server, block, 1);
});
