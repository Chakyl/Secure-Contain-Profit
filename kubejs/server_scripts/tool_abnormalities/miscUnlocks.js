BlockEvents.rightClicked('companions:frog_bonanza_block', (e) => {
    const { player, item, level, hand, block, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    if (!['numismatics:sprocket', 'numismatics:cog', 'numismatics:crown'].includes(item.id)) return;
    FieldGuide.unlock(player, `block:companions/frog_bonanza_block`);
});
BlockEvents.placed("scp:rubber_duck", (e) => {
    FieldGuide.unlock(e.player, `block:scp/rubber_duck`);
});

BlockEvents.placed("scp:spoon_bender", (e) => {
    FieldGuide.unlock(e.player, `block:scp/spoon_bender`);
});

ItemEvents.rightClicked('abyssal_decor:bottomless_bag_of_dirt', (e) => {
    FieldGuide.unlock(e.player, `item:abyssal_decor/bottomless_bag_of_dirt`);
});

ItemEvents.rightClicked('scguns:the_pact', (e) => {
    FieldGuide.unlock(e.player, `item:scguns/the_pact`);
});

ItemEvents.entityInteracted((e) => {
    const { item, hand} = e;
    if (hand !== "MAIN_HAND") return;
    if (item.id != 'companions:holy_porcelain_pottery') return;
    FieldGuide.unlock(e.player, `item:companions/holy_porcelain_pottery`);
});