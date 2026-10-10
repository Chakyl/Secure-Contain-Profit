BlockEvents.rightClicked('whimsy_deco:lucky_cat', (e) => {
    const { player, hand, level, block, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    server.runCommandSilent(`openshop ${player.username} unlucky_cat`);
    global.addChaos(server, block, 2);
    FieldGuide.unlock(player, `block:whimsy_deco/lucky_cat`);
    server.runCommandSilent(`playsound minecraft:entity.cat.stray_ambient block @a ${block.x} ${block.y} ${block.z} 2 1.5`);
    if (Math.random() < 0.01) {
        block.set('whimsy_deco:gold_lucky_cat')
    }
});

BlockEvents.rightClicked('whimsy_deco:gold_lucky_cat', (e) => {
    const { player, block, item, hand, level, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    server.runCommandSilent(`playsound minecraft:entity.cat.stray_ambient block @a ${block.x} ${block.y} ${block.z} 2 1.5`);
    if (item.id != 'scp:enkephalin') {
        player.tell("§7Right click with Enkephalin to sell to Fortunate Son.")
        return;
    }
    if (player.isCrouching()) {
        player.give(Item.of(`${item.count * 2}x numismatics:crown`))
        item.count = 0;
    } else {
        item.shrink(1)
        player.give(Item.of("2x numismatics:crown"))
    }
    server.runCommandSilent(`playsound opposing_force:laser_bolt_impact block @a ${block.x} ${block.y} ${block.z} 2 0.5`);
    if (Math.random() < 0.1) {
        block.set('whimsy_deco:lucky_cat')
        global.addChaos(server, block, 5);
        FieldGuide.unlock(player, `block:whimsy_deco/gold_lucky_cat`);
    }
});
