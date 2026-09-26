BlockEvents.rightClicked('companions:porcelain_pottery', (e) => {
    const { player, item, level, hand, block, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;

    if (item.id !== 'numismatics:crown') {
        player.tell("§7The Pot of Greed only accepts Gold Coins")
        return;
    }
    if (Math.random() < 0.05) {
        server.runCommandSilent(`playsound netherman:whisper block @a ${block.x} ${block.y} ${block.z} 2 0.2`);
        block.set('companions:holy_porcelain_pottery');
        let itemEntity = block.createEntity('item')
        itemEntity.x = x
        itemEntity.y = y + 0.2
        itemEntity.z = z
        itemEntity.item = Item.of(`16x scp:enkephalin`);
        itemEntity.spawn()
        FieldGuide.unlock(player, `block:companions/porcelain_pottery`);
    } else {
        server.runCommandSilent(`playsound whimsy_deco:kaching block @a ${block.x} ${block.y} ${block.z} 2 0.2`);
    }
    item.shrink(1);
});
