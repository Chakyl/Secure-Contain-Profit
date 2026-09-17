BlockEvents.rightClicked('scguns:anthralite_lamp', (e) => {
    const { player, item, level, hand, block, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    if (item.id != 'scp:enkephalin') {
        player.tell("§7Right click with Enkephalin to sell to the Moonlit Company.")
        return;
    }
    item.shrink(1)
    player.give("numismatics:crown")
    server.runCommandSilent(`playsound opposing_force:laser_bolt_impact block @a ${block.x} ${block.y} ${block.z} 2 0.2`);
}
);
