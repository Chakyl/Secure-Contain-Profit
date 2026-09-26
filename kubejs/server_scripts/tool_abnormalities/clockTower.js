BlockEvents.rightClicked('supplementaries:clock_block', (e) => {
    const { player, item, level, hand, block, server } = e;
    if (hand !== "MAIN_HAND") return;
    if (level.isClientSide()) return;
    server.runCommandSilent(`time add 1000`);
    let hunger = player.getFoodData()
    let currentHunger = hunger.getFoodLevel()
    if (currentHunger == 0) {
        server.runCommandSilent(`playsound create:peculiar_bell_use block @a ${block.x} ${block.y} ${block.z} 2 0.2`);
        player.attack(15)
        FieldGuide.unlock(player, `block:supplementaries/clock_block`);
        server.scheduleInTicks(20, () => {
            server.runCommandSilent(`time add 24000`);
        });
        server.scheduleInTicks(40, () => {
            server.runCommandSilent(`time add 24000`);
        });
    } else {

        hunger.setFoodLevel(Math.max(0, currentHunger - 4))
        server.runCommandSilent(`playsound create:desk_bell block @a ${block.x} ${block.y} ${block.z} 2 0.2`);
    }
});
