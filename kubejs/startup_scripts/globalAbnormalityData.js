// Priority: 1000
/**
 * Breach types:
 *   - DISSOLVE - Break nearby non-bedrock blocks
 *   - NUKE - DISSOLVE, but 100% and larger area
 *   - TELEPORT - Teleports to nearby entities
 *   - DECOUNT - Gradually reduces the counter of nearby containment units
 *   - SAP - Reduces health of nearby entities
 *   - STEAMROLLER - Breaks blocks below and at the same level as it
 *   - NOTHING - Does nothing. Same as not including any breaching behaviors, just more 
 */
global.ABNORMALITIES = new Map([
    /**
     *   VERDANT ABNORMALITIES
     */
    // Pig line
    ["minecraft:pig", { class: "verdant", counter: 3, breachTypes: ["TELEPORT", "DECOUNT"], evolutions: ["minecraft:piglin", "minecraft:creeper"] }],
    ["minecraft:piglin", { class: "verdant", counter: 5, breachTypes: ["STEAMROLLER", "SAP"], evolutions: ["minecraft:piglin_brute", "minecraft:zombified_piglin"] }],
    ["minecraft:piglin_brute", { class: "verdant", counter: 6, breachTypes: ["STEAMROLLER", "SAP"], evolutions: ["minecraft:piglin_brute", "minecraft:zombified_piglin"] }],
    ["minecraft:zombified_piglin", { class: "verdant", counter: 3, breachTypes: ["STEAMROLLER", "SAP"] }],
    ["minecraft:creeper", { class: "verdant", counter: 14, breachTypes: ["STEAMROLLER"], evolutions: ["creaturefeature:eeper"] }],
    ["creaturefeature:eeper", { class: "verdant", counter: 10, breachTypes: ["TELEPORT"] }],
    // Pathogen
    ["creaturefeature:pathogen", { class: "verdant", counter: 7, breachTypes: ["TELEPORT"], evolutions: ["creaturefeature:minedflayer"] }],
    ["creaturefeature:minedflayer", { class: "verdant", counter: 10, breachTypes: ["NUKE"] }],
    // Goat
    ["minecraft:goat", { class: "verdant", counter: 5, breachTypes: ["STEAMROLLER"], evolutions: ["creaturefeature:vertigo"] }],
    ["creaturefeature:vertigo", { class: "verdant", breachTypes: ["STEAMROLLER", "SAP"], counter: 8 }],
    // Chicken
    ["minecraft:chicken", { class: "verdant", counter: 5, breachTypes: ["SAP"], evolutions: ["creaturefeature:stained_glass", "creaturefeature:mockingbird", "peaceless:harpy"] }],
    ["creaturefeature:stained_glass", { class: "verdant", counter: 6, breachTypes: ["DISSOLVE", "TELEPORT"] }],
    ["creaturefeature:mockingbird", { class: "verdant", counter: 6, breachTypes: ["DISSOLVE", "SAP"] }],
    ["peaceless:harpy", { class: "verdant", counter: 6, breachTypes: ["DISSOLVE", "DECOUNT"] }],
    // Villager
    ["minecraft:villager", { class: "verdant", counter: 14, breachTypes: ["DISSOLVE"], evolutions: ["minecraft:zombie_villager", "minecraft:zombie"] }],
    ["minecraft:zombie_villager", { class: "verdant", counter: 14, breachTypes: ["DISSOLVE"], evolutions: ["creaturefeature:blossom"] }],
    ["minecraft:zombie", { class: "verdant", counter: 14, breachTypes: ["SAP", "DISSOLVE"], evolutions: ["creaturefeature:minds"] }],
    ["creaturefeature:blossom", { class: "verdant", counter: 7, breachTypes: ["SAP", "STEAMROLLER"] }],
    ["creaturefeature:minds", { class: "verdant", counter: 14, breachTypes: ["SAP", "DISSOLVE"] }],
    // Frog
    ["minecraft:frog", { class: "verdant", counter: 99, breachTypes: ["NOTHING"], evolutions: ["companions:cornelius"] }],
    ["companions:cornelius", { class: "verdant", counter: 99, breachTypes: ["NOTHING"] }]
]);