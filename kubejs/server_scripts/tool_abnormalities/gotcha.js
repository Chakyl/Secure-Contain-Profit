BlockEvents.rightClicked('whimsy_deco:gatcha_machine', (e) => {
    const { player, item, level, hand, block, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    if (item.id !== 'numismatics:cog') return;
    if (Math.random() < 0.25) {
        let teamName = global.getPlayerTeamName(level, player);
        global.addChaos(server, block, teamName, 1);
        global.questCompleteForTeam(server, level, teamName, "questlog:chaos");
        FieldGuide.unlock(player, `block:whimsy_deco/gatcha_machine`);
    }
});
