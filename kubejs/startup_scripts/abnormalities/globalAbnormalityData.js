// Priority: 1000
/**
 * Breach types:
 *   - [x] DISSOLVE - Break nearby non-bedrock blocks
 *   - [x] NUKE - DISSOLVE, but 100% and larger area
 *   - [x] STEAMROLLER - Breaks blocks below and at the same level as it
 *   - [x] BEGONE - Teleports players to other entities
 *   - [x] ESCAPEARTIST - Escapes containment unit upon breaching
 *   - [x] TELEPORT - Teleports to nearby entities
 *   - [x] SUMMMON - Teleports player to from anywhere
 *   - [x] SUCK - Teleports all nearby entities to it
 *   - [x] DECOUNT - Gradually reduces the counter of nearby containment units
 *   - [x] GRANDIOSE - Instantly adds 1 threat level upon breaching
 *   - [x] CHAOS - Adds CHAOS
 *   - [x] SUPERCHAOS - Adds a LOT of Chaos
 *   - [x] SAP - Reduces health of nearby entities
 *   - [x] BITE - Reduces health of nearby entities significantly at a lower range
 *   - [x] DARKNESS - Darknesses nearby entities
 *   - [x] BLIND - Blinds nearby entities
 *   - [x] SULFUR - Suflur poisons nearby entities
 *   - [x] SLEEPING - Sleeps nearby entities
 *   - [x] NOTHING - Does nothing. Same as not including any breaching behaviors, just more 
 */
/**
 * Difficulty. Higher = Need higher
 * - 0 - Very low
 * - 1 - Low
 * - 2 - Neutral
 * - 3 - High
 * - 4 - Very High
 */
global.ABNORMALITIES = new Map([
    /**
     *   VERDANT ABNORMALITIES
     */
    // Pig line
    ["minecraft:pig", { class: "verdant", preferences: { violence: 0, insight: 2, harmony: 0 }, name: "Hog Ham", counter: 3, breachTypes: ["TELEPORT", "DECOUNT"], evolutions: ["minecraft:piglin", "minecraft:creeper"] }],
    ["minecraft:piglin", { class: "verdant", preferences: { violence: 0, insight: 3, harmony: 3 }, name: "Human Hog", counter: 5, breachTypes: ["ESCAPEARTIST"], evolutions: ["minecraft:piglin_brute", "minecraft:zombified_piglin"] }],
    ["minecraft:piglin_brute", { class: "verdant", preferences: { violence: 2, insight: 4, harmony: 4 }, name: "Hog Cultist", counter: 6, breachTypes: ["STEAMROLLER"], evolutions: ["minecraft:piglin_brute", "minecraft:zombified_piglin"] }],
    ["minecraft:zombified_piglin", { class: "verdant", preferences: { violence: 3, insight: 0, harmony: 2 }, name: "Corrupted Hog", counter: 3, breachTypes: ["STEAMROLLER"] }],
    ["minecraft:creeper", { class: "verdant", preferences: { violence: 4, insight: 3, harmony: 0 }, name: "Little Bit of Spark", counter: 12, breachTypes: ["ESCAPEARTIST"], evolutions: ["creaturefeature:eeper"] }],
    ["creaturefeature:eeper", { class: "verdant", preferences: { violence: 4, insight: 3, harmony: 1 }, name: "Little Bit of Sleep", counter: 7, breachTypes: [ "SLEEPING"] }],
    // Pathogen
    ["creaturefeature:pathogen", { class: "verdant", preferences: { violence: 3, insight: 0, harmony: 1 }, name: "Pathogen", counter: 3, breachTypes: ["TELEPORT"], evolutions: ["creaturefeature:minedflayer"] }],
    ["creaturefeature:minedflayer", { class: "verdant", preferences: { violence: 4, insight: 1, harmony: 2 }, name: "According to the Mind's Flayed Eye", counter: 10, breachTypes: ["NUKE"] }],
    // Goat
    ["minecraft:goat", { class: "verdant", preferences: { violence: 1, insight: 1, harmony: 1 }, name: "Go Goat", counter: 2, breachTypes: ["ESCAPEARTIST", "BITE"], evolutions: ["creaturefeature:vertigo"] }],
    ["creaturefeature:vertigo", { class: "verdant", preferences: { violence: 2, insight: 1, harmony: 1 }, name: "Verti Goat", breachTypes: ["ESCAPEARTIST", "SUCK", "SAP"], counter: 8 }],
    // Chicken
    ["minecraft:chicken", { class: "verdant", preferences: { violence: 0, insight: 0, harmony: 0 }, name: "Popper", counter: 3, breachTypes: ["ESCAPEARTIST", "SAP"], evolutions: ["creaturefeature:stained_glass", "creaturefeature:mockingbird", "peaceless:harpy"] }],
    ["creaturefeature:stained_glass", { class: "verdant", preferences: { violence: 3, insight: 2, harmony: 1 }, name: "Whispershard", counter: 4, breachTypes: ["TELEPORT"] }],
    ["creaturefeature:mockingbird", { class: "verdant", preferences: { violence: 1, insight: 2, harmony: 4 }, name: "Crude Drawing of an Angel", counter: 6, breachTypes: ["ESCAPEARTIST", "SAP"] }],
    ["peaceless:harpy", { class: "verdant", preferences: { violence: 3, insight: 0, harmony: 0 }, name: "TU AMIGO", counter: 7, breachTypes: ["ESCAPEARTIST", "DECOUNT"] }],
    // Villager
    ["minecraft:villager", { class: "verdant", preferences: { violence: 4, insight: 0, harmony: 0 }, name: "The Architect", counter: 3, breachTypes: ["ESCAPEARTIST", "CHAOS"], evolutions: ["minecraft:zombie_villager", "minecraft:zombie"] }],
    ["minecraft:zombie_villager", { class: "verdant", preferences: { violence: 0, insight: 1, harmony: 4 }, name: "The Painter", counter: 4, breachTypes: ["ESCAPEARTIST","SUPERCHAOS"], evolutions: ["creaturefeature:blossom"] }],
    ["minecraft:zombie", { class: "verdant", preferences: { violence: 0, insight: 3, harmony: 3 }, name: "Live From Hell", counter: 4, breachTypes: ["ESCAPEARTIST", "SAP", "CHAOS"], evolutions: ["creaturefeature:minds"] }],
    ["creaturefeature:blossom", { class: "verdant", preferences: { violence: 3, insight: 3, harmony: 1 }, name: "Flatbush", counter: 4, breachTypes: ["SAP", "STEAMROLLER"] }],
    ["creaturefeature:minds", { class: "verdant", preferences: { violence: 3, insight: 1, harmony: 3 }, name: "Minehuck", counter: 2, breachTypes: ["CHAOS", "DISSOLVE"] }],
    // Frog
    ["minecraft:frog", { class: "verdant", preferences: { violence: 3, insight: 0, harmony: 0 }, name: "Cornelius the Frog", counter: 8, breachTypes: ["NOTHING"], evolutions: ["companions:cornelius"] }],
    ["companions:cornelius", { class: "verdant", preferences: { violence: 3, insight: 0, harmony: 0 }, name: "Cornelius the Frog UNCHAINED", counter: 15, breachTypes: ["NOTHING"] }],
    // No Evos
    ["companions:living_candle", { class: "verdant", preferences: { violence: 3, insight: 3, harmony: 0 }, name: "Friend of Coal", counter: 6, breachTypes: ["ESCAPEARTIST", "SULFUR", "DARKNESS"] }],
    /**
     *   AMBER ABNORMALITIES
     */
    // Bell
    ["netherman:statue_bossunit", { class: "amber", preferences: { violence: 3, insight: 4, harmony: 2 }, name: "For Whom the Bell Tolls", counter: 3, breachTypes: ["CHAOS"], evolutions: ["netherman:gilded_golem"] }],
    ["netherman:gilded_golem", { class: "amber", preferences: { violence: 4, insight: 3, harmony: 3 }, name: "Lawrence The Painful", counter: 3, breachTypes: ["SUPERCHAOS", "STEAMROLLER", "DISSOLVE"] }],
    // Machination
    ["creaturefeature:machination", { class: "amber", preferences: { violence: 0, insight: 4, harmony: 4 }, name: "Front Load", counter: 2, breachTypes: ["ESCAPEARTIST"], evolutions: ["creaturefeature:sinister"] }],
    ["creaturefeature:sinister", { class: "amber", preferences: { violence: 4, insight: 0, harmony: 3 }, name: "Portrait of a Lady on Fire", counter: 4, breachTypes: ["ESCAPEARTIST"] }],
    // Spider
    ["minecraft:spider", { class: "amber", preferences: { violence: 1, insight: 1, harmony: 1 }, name: "Dewpider", counter: 10, breachTypes: ["ESCAPEARTIST"], evolutions: ["minecraft:cave_spider"] }],
    ["minecraft:cave_spider", { class: "amber", preferences: { violence: 2, insight: 2, harmony: 2 }, name: "Araquanid", counter: 10, breachTypes: ["ESCAPEARTIST"], evolutions: ["creaturefeature:dreamweaver"] }],
    ["creaturefeature:dreamweaver", { class: "amber", preferences: { violence: 4, insight: 3, harmony: 0 }, name: "A I Alien Observer", counter: 10, breachTypes: ["DARKNESS", "ESCAPEARTIST", "SLEEPING"] }],
    // Bear
    ["minecraft:polar_bear", { class: "amber", preferences: { violence: 4, insight: 1, harmony: 1 }, name: "Ice Peek", counter: 4, breachTypes: ["ESCAPEARTIST"], evolutions: ["creaturefeature:saint_solis"] }],
    ["creaturefeature:saint_solis", { class: "amber", preferences: { violence: 4, insight: 2, harmony: 3 }, name: "Society Sunlit Bearly", counter: 6, breachTypes: ["NUKE"] }],
    // Breeze
    ["minecraft:breeze", { class: "amber", preferences: { violence: 2, insight: 4, harmony: 4 }, name: "Choke Enough", counter: 7, breachTypes: ["TELEPORT"], evolutions: ["creaturefeature:blitz",] }],
    ["creaturefeature:blitz", { class: "amber", preferences: { violence: 2, insight: 2, harmony: 4 }, name: "Endless", counter: 5, breachTypes: ["TELEPORT"] }],
    ["minecraft:blaze", { class: "amber", preferences: { violence: 3, insight: 3, harmony: 4 }, name: "Blaze Bird", counter: 6, breachTypes: ["TELEPORT"] }],
    // Turtle
    ["minecraft:turtle", { class: "amber", preferences: { violence: 4, insight: 0, harmony: 0 }, name: "EoO", counter: 6, breachTypes: ["NOTHING"], evolutions: ["peaceless:shrapin"] }],
    ["peaceless:shrapin", { class: "amber", preferences: { violence: 4, insight: 2, harmony: 1 }, name: "TURiSTA", counter: 5, breachTypes: ["STEAMROLLER"] }],
    // Beauty
    ["creaturefeature:beauty", { class: "amber", preferences: { violence: 4, insight: 2, harmony: 0 }, name: "Pagan Poetry", counter: 3, breachTypes: ["ESCAPEARTIST", "DISSOLVE"], evolutions: ["creaturefeature:fiend"] }],
    ["creaturefeature:fiend", { class: "amber", preferences: { violence: 1, insight: 1, harmony: 3 }, name: "All Neon Like", counter: 2, breachTypes: ["ESCAPEARTIST", "DECOUNT"] }],
    // Dinamo
    ["companions:broken_dinamo", { class: "amber", preferences: { violence: 0, insight: 0, harmony: 0 }, name: "Baby Blue", counter: 8, breachTypes: ["NOTHING"], evolutions: ["companions:illager_golem"] }],
    ["companions:illager_golem", { class: "amber", preferences: { violence: 4, insight: 1, harmony: 4 }, name: "Slush Puppy", counter: 4, breachTypes: ["NUKE"] }],
    // Shade
    ["peaceless:shade", { class: "amber", preferences: { violence: 3, insight: 2, harmony: 0 }, name: "Rip The Slit", counter: 4, breachTypes: ["DARKNESS", "DECOUNT", "ESCAPEARTIST"], evolutions: ["creaturefeature:nothing"] }],
    ["creaturefeature:nothing", { class: "amber", preferences: { violence: 4, insight: 2, harmony: 0 }, name: "No Thing There", counter: 5, breachTypes: ["DARKNESS","ESCAPEARTIST", "SAP", "DECOUNT"] }],
    // No evos
    ["netherman:statue_entity", { class: "amber", preferences: { violence: 3, insight: 1, harmony: 4 }, name: "Security!", counter: 3, breachTypes: ["DARKNESS", "ESCAPEARTIST"] }],
    ["companions:hostile_puppet_glove", { class: "amber", preferences: { violence: 4, insight: 1, harmony: 2 }, name: "Meteora Blues", counter: 8, breachTypes: ["CHAOS"] }],
    /**
     *   MAROON ABNORMALITIES
     */
    // Viventrum
    ["scguns:viventrum", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Mchngrl", counter: 8, breachTypes: ["NUKE"] }],
    ["creaturefeature:canary", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Bitten Twice", counter: 8, breachTypes: ["DISSOLVE", "NUKE", "STEAMROLLER"] }],
    // Manipulator
    ["netherman:manipulator", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Quavo", counter: 8, breachTypes: ["SLEEPING", "DARKNESS"] }],
    ["creaturefeature:coat_of_arms", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "RAF", counter: 8, breachTypes: ["TELEPORT", "SUMMON", "SLEEPING"] }],
    // Rabbit
    ["minecraft:rabbit", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Cottagecore", counter: 8, breachTypes: ["BITE", "STEAMROLLER"] }],
    ["creaturefeature:friend", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Krizcore", counter: 8, breachTypes: ["CHAOS", "DISSOLVE", "STEAMROLLER", "SUMMON"] }],
    // Ghastly
    ["netherman:ghastly", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "For I Am The Light (And Mine Is The Only Way)", counter: 8, breachTypes: ["DISSOLVE", "BLIND", "DECOUNT"] }],
    ["minecraft:ghast", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "PENNSYLVANIA FURNACE", counter: 8, breachTypes: ["NUKE"] }],
    ["scguns:mother_ghast", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Big Autumn Ghastjam", counter: 8, breachTypes: ["NUKE", "CHAOS", "BEGONE"] }],
    // Dissident
    ["scguns:dissident", { class: "maroon", preferences: { violence: 0, insight: 4, harmony: 4 }, name: "Leroy", counter: 4, breachTypes: ["ESCAPEARTIST"] }],
    ["scguns:praetor", { class: "maroon", preferences: { violence: 1, insight: 4, harmony: 4 }, name: "Bart", counter: 6, breachTypes: ["ESCAPEARTIST", "CHAOS"] }],
    // Swarm
    ["scguns:swarm", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Bugsnax", counter: 3, breachTypes: ["DISSOLVE", "SAP", "DECOUNT", "ESCAPEARTIST"] }],
    ["scguns:hive", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Only Acting", counter: 4, breachTypes: ["DARKNESS", "CHAOS", "ESCAPEARTIST"] }],
    // Allay
    ["minecraft:allay", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Silver Soul", counter: 10, breachTypes: ["CHAOS", "TELEPORT"] }],
    ["companions:golden_allay", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "I Saw the Lemon Glow", counter: 20, breachTypes: ["SUPERCHAOS", "TELEPORT", "SUCK", "BEGONE"] }],
    // Mimic
    ["peaceless:mimic", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Playdate", counter: 3, breachTypes: ["SUCK", "DARKNESS", "DECOUNT", "SAP", "ESCAPEARTIST"] }],
    ["creaturefeature:runaway", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Days Go By", counter: 3, breachTypes: ["ESCAPEARTIST", "TELEPORT", "DARKNESS", "DISSOLVE", "SAP"] }],
    // No evos
    ["creaturefeature:detritus", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Walking Wake", counter: 14, breachTypes: ["GRANDIOSE", "ESCAPEARTIST", "SUPERCHAOS"] }],
    ["scguns:sulfurhead", { class: "maroon", preferences: { violence: 3, insight: 3, harmony: 3 }, name: "Head in the Clouds", counter: 1, breachTypes: ["DISSOLVE", "DARKNESS", "SULFUR"] }],
]);




global.ABNORMALITY_LITTERS = new Map([
    ["companions:living_candle", { items: [{ item: "minecraft:coal", chance: 0.75 }] }],
    ["scguns:sulfurhead", { items: [{ item: 'scguns:sulfur_chunk', chance: 0.2 }] }],
    ["creaturefeature:blossom", { items: [{ item: "minecraft:oak_sapling", chance: 0.5 }] }],
    ["creaturefeature:beauty", { items: [{ item: "minecraft:oak_sapling", chance: 0.5 }] }],
])
