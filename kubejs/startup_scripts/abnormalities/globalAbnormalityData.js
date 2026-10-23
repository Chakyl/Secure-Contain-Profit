// Priority: 1000
const AbnormalityRegistry = Java.loadClass('io.github.chakyl.securecontainprofit.data.AbnormalityDefinitionRegistry').INSTANCE;

global.ABNORMALITIES = {
    get: function(key) {
        if (!key) return null;
        return AbnormalityRegistry.getByStringId(key);
    },

    keys: function() {
        return Array.from(AbnormalityRegistry.getAllEntityIds());
    }
};

global.ABNORMALITY_LITTERS = new Map([
    ["companions:living_candle", { items: [{ item: "minecraft:coal", chance: 0.75 }] }],
    ["scguns:sulfurhead", { items: [{ item: 'scguns:sulfur_chunk', chance: 0.32 }] }],
    ["creaturefeature:blossom", { items: [{ item: "minecraft:oak_sapling", chance: 0.45 }] }],
    ["creaturefeature:beauty", { items: [{ item: "minecraft:oak_sapling", chance: 0.45 }] }],
])
