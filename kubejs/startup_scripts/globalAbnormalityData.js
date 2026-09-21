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
    ["minecraft:pig", { class: "verdant", name: "Hog Ham", counter: 3, breachTypes: ["TELEPORT", "DECOUNT"], evolutions: ["minecraft:piglin", "minecraft:creeper"] }],
    ["minecraft:piglin", { class: "verdant", name: "Human Hog", counter: 5, breachTypes: ["STEAMROLLER", "SAP"], evolutions: ["minecraft:piglin_brute", "minecraft:zombified_piglin"] }],
    ["minecraft:piglin_brute", { class: "verdant", name: "Hog Cultist", counter: 6, breachTypes: ["STEAMROLLER", "SAP"], evolutions: ["minecraft:piglin_brute", "minecraft:zombified_piglin"] }],
    ["minecraft:zombified_piglin", { class: "verdant", name: "Corrupted Hog", counter: 3, breachTypes: ["STEAMROLLER", "SAP"] }],
    ["minecraft:creeper", { class: "verdant", name: "Little Bit of Spark", counter: 12, breachTypes: ["STEAMROLLER"], evolutions: ["creaturefeature:eeper"] }],
    ["creaturefeature:eeper", { class: "verdant", name: "Little Bit of Sleep", counter: 7, breachTypes: ["TELEPORT"] }],
    // Pathogen
    ["creaturefeature:pathogen", { class: "verdant", name: "Pathogen", counter: 7, breachTypes: ["TELEPORT"], evolutions: ["creaturefeature:minedflayer"] }],
    ["creaturefeature:minedflayer", { class: "verdant", name: "According to the Mind's Flayed Eye", counter: 10, breachTypes: ["NUKE"] }],
    // Goat
    ["minecraft:goat", { class: "verdant", name: "Go Goat", counter: 5, breachTypes: ["STEAMROLLER"], evolutions: ["creaturefeature:vertigo"] }],
    ["creaturefeature:vertigo", { class: "verdant", name: "Verti Goat", breachTypes: ["STEAMROLLER", "SAP"], counter: 8 }],
    // Chicken
    ["minecraft:chicken", { class: "verdant", name: "Popper", counter: 5, breachTypes: ["SAP"], evolutions: ["creaturefeature:stained_glass", "creaturefeature:mockingbird", "peaceless:harpy"] }],
    ["creaturefeature:stained_glass", { class: "verdant", name: "Whispershard", counter: 4, breachTypes: ["DISSOLVE", "TELEPORT"] }],
    ["creaturefeature:mockingbird", { class: "verdant", name: "Crude Drawing of an Angel", counter: 6, breachTypes: ["DISSOLVE", "SAP"] }],
    ["peaceless:harpy", { class: "verdant", name: "TU AMIGO", counter: 7, breachTypes: ["DISSOLVE", "DECOUNT"] }],
    // Villager
    ["minecraft:villager", { class: "verdant", name: "The Architect", counter: 3, breachTypes: ["DISSOLVE"], evolutions: ["minecraft:zombie_villager", "minecraft:zombie"] }],
    ["minecraft:zombie_villager", { class: "verdant", name: "The Painter", counter: 4, breachTypes: ["DISSOLVE"], evolutions: ["creaturefeature:blossom"] }],
    ["minecraft:zombie", { class: "verdant", name: "Live From Hell", counter: 4, breachTypes: ["SAP", "DISSOLVE"], evolutions: ["creaturefeature:minds"] }],
    ["creaturefeature:blossom", { class: "verdant", name: "Flatbush", counter: 4, breachTypes: ["SAP", "STEAMROLLER"] }],
    ["creaturefeature:minds", { class: "verdant", name: "Minehuck", counter: 2, breachTypes: ["SAP", "DISSOLVE"] }],
    // Frog
    ["minecraft:frog", { class: "verdant", name: "Cornelius the Frog", counter: 8, breachTypes: ["NOTHING"], evolutions: ["companions:cornelius"] }],
    ["companions:cornelius", { class: "verdant", name: "Cornelius the Frog UNCHAINED", counter: 15, breachTypes: ["NOTHING"] }]
]);