const $REGISTRIES = Java.loadClass('net.minecraft.core.registries.Registries');

let hasDupe = (enchants, enchantmentKey, registry) => {
    let alreadyHas = false;
    enchants.entrySet().forEach((e) => {
        let key = registry.getKey(e.getKey().value());
        if (key && key.toString() === enchantmentKey.toString()) {
            alreadyHas = true;
        }
    });
    return alreadyHas;
}
BlockEvents.rightClicked('minecraft:enchanting_table', (e) => {
    const { player, level, server, item, hand, block } = e;
    if (hand !== "MAIN_HAND") return;
    let registry = level.registryAccess().registryOrThrow($REGISTRIES.ENCHANTMENT);
    let enchantments = registry.stream().filter(enchantment => enchantment.canEnchant(item)).toList();
    if (enchantments.length === 0) {
        player.tell(Text.darkRed("I can't do anything with that..."));
        e.cancel();
    }
    let currentEnchantments = item.getEnchantments();
    if (currentEnchantments.size() > 0 && Math.random() < 0.2) {
        global.addDisrepair(server, block, Number(currentEnchantments.size()));
    }
    if (enchantments.length > 0) {
        let randomEnchant = enchantments[Math.floor(Math.random() * enchantments.length)];
        let enchantmentKey = registry.getKey(randomEnchant);
        if (hasDupe(currentEnchantments, enchantmentKey, registry) && Math.random() < 0.5) {
            randomEnchant = enchantments[Math.floor(Math.random() * enchantments.length)];
            enchantmentKey = registry.getKey(randomEnchant);
        }

        if (hasDupe(currentEnchantments, enchantmentKey, registry)) {
            server.runCommandSilent(`playsound netherman:bell_beast_laugh block @a ${block.x} ${block.y} ${block.z} 2 0.2`);
            player.attack(666)
            let splitId = enchantmentKey.toString().split(":");
            player.tell(Text.translatable("messages.scp.eraserhead.death", Text.translatable(`enchantment.${splitId[0]}.${splitId[1]}`)).darkRed());
            FieldGuide.unlock(player, `block:minecraft/enchanting_table`);
            e.cancel();
        }

        server.runCommandSilent(`playsound minecraft:block.enchantment_table.use block @a ${block.x} ${block.y} ${block.z} 1 1`);

        player.setMainHandItem(item.enchant(enchantmentKey.toString(), Math.floor(Math.random() * randomEnchant.maxLevel) + 1));
    }
    e.cancel();
});