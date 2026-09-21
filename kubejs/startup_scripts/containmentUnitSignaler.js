const $Block = Java.loadClass("net.minecraft.world.level.block.Block")
const $BlockItem = Java.loadClass("net.minecraft.world.item.BlockItem")
const $BlockBehaviourProperties = Java.loadClass("net.minecraft.world.level.block.state.BlockBehaviour$Properties")
const $SoundType = Java.loadClass("net.minecraft.world.level.block.SoundType")
const $Direction = Java.loadClass("net.minecraft.core.Direction")
const $IProperties = Java.loadClass("net.minecraft.world.item.Item$Properties")


const getSignalStrengthOfUnit = (state) => {
    switch (state) {
        case "BREACH": return 15;
        case "MAINTENANCE": return 12;
        case "RESEARCH": return 9;
        case "WORKABLE": return 5;
        default:
        case "NONE": return 0;
    }
}
global.getRedstoneSignal = (blockGetter, blockPos, direction) => {
    if (direction === $Direction.UP || direction === $Direction.DOWN) {
        return 0;
    }
    let block = blockGetter.getBlock(blockPos.above());

    if (block) {
        let nbt = block.getEntityData();
        if (nbt.data.getString("state")) {
            return getSignalStrengthOfUnit(nbt.data.getString("state"));
        }
    }

    return 0;
}
StartupEvents.registry('block', e => {
    e.createCustom("scp:containment_unit_signaler", () => new JavaAdapter($Block, {
        isSignalSource(blockState) {
            return true;
        },

        getSignal(blockState, blockGetter, blockPos, direction) {
            return global.getRedstoneSignal(blockGetter, blockPos, direction)
        }
    },
        $BlockBehaviourProperties.of()
            .isRedstoneConductor((blockState, blockGetter, blockPos) => false)
            .strength(3.0)
            .explosionResistance(3.0)
            .sound($SoundType.METAL)
    )).tag('minecraft:mineable/pickaxe')
})

StartupEvents.registry("item", event => {
    event.createCustom("scp:containment_unit_signaler", () => new $BlockItem(Block.getBlock("scp:containment_unit_signaler"), new $IProperties()))
})