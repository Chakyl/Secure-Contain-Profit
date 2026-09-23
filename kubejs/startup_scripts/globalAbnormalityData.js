// Priority: 1000
/**
 * Breach types:
 *   - [x] DISSOLVE - Break nearby non-bedrock blocks
 *   - [x] NUKE - DISSOLVE, but 100% and larger area
 *   - [x] STEAMROLLER - Breaks blocks below and at the same level as it
 *   - [x] BEGONE - Teleports players to other entities
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
    ["creaturefeature:eeper", { class: "verdant", name: "Little Bit of Sleep", counter: 7, breachTypes: ["TELEPORT", "SLEEPING"] }],
    // Pathogen
    ["creaturefeature:pathogen", { class: "verdant", name: "Pathogen", counter: 3, breachTypes: ["TELEPORT"], evolutions: ["creaturefeature:minedflayer"] }],
    ["creaturefeature:minedflayer", { class: "verdant", name: "According to the Mind's Flayed Eye", counter: 10, breachTypes: ["NUKE"] }],
    // Goat
    ["minecraft:goat", { class: "verdant", name: "Go Goat", counter: 2, breachTypes: ["STEAMROLLER"], evolutions: ["creaturefeature:vertigo"] }],
    ["creaturefeature:vertigo", { class: "verdant", name: "Verti Goat", breachTypes: ["STEAMROLLER", "SAP"], counter: 8 }],
    // Chicken
    ["minecraft:chicken", { class: "verdant", name: "Popper", counter: 3, breachTypes: ["SAP"], evolutions: ["creaturefeature:stained_glass", "creaturefeature:mockingbird", "peaceless:harpy"] }],
    ["creaturefeature:stained_glass", { class: "verdant", name: "Whispershard", counter: 4, breachTypes: ["TELEPORT"] }],
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
    ["companions:cornelius", { class: "verdant", name: "Cornelius the Frog UNCHAINED", counter: 15, breachTypes: ["NOTHING"] }],
    /**
     *   AMBER ABNORMALITIES
     */
    // Bell
    ["netherman:statue_bossunit", { class: "amber", name: "For Whom the Bell Tolls", counter: 3, breachTypes: ["CHAOS"], evolutions: ["netherman:gilded_golem"] }],
    ["netherman:gilded_golem", { class: "amber", name: "Lawrence The Painful", counter: 3, breachTypes: ["SUPERCHAOS", "STEAMROLLER", "DISSOLVE"] }],
    // Machination
    ["creaturefeature:machination", { class: "amber", name: "Front Load", counter: 2, breachTypes: ["STEAMROLLER"], evolutions: ["creaturefeature:sinister"] }],
    ["creaturefeature:sinister", { class: "amber", name: "Portrait of a Lady on Fire", counter: 4, breachTypes: ["STEAMROLLER"] }],
    // Spider
    ["minecraft:spider", { class: "amber", name: "Dewpider", counter: 10, breachTypes: ["DISSOLVE"], evolutions: ["minecraft:cave_spider"] }],
    ["minecraft:cave_spider", { class: "amber", name: "Araquanid", counter: 10, breachTypes: ["DISSOLVE"], evolutions: ["creaturefeature:dreamweaver"] }],
    ["creaturefeature:dreamweaver", { class: "amber", name: "A I Alien Observer", counter: 10, breachTypes: ["DARKNESS", "DISSOLVE", "SLEEPING"] }],
    // Bear
    ["minecraft:polar_bear", { class: "amber", name: "Ice Peek", counter: 4, breachTypes: ["DISSOLVE"], evolutions: ["creaturefeature:saint_solis"] }],
    ["creaturefeature:saint_solis", { class: "amber", name: "Society Sunlit Bearly", counter: 6, breachTypes: ["NUKE"] }],
    // Breeze
    ["minecraft:breeze", { class: "amber", name: "Choke Enough", counter: 6, breachTypes: ["TELEPORT"], evolutions: ["creaturefeature:blitz",] }],
    ["creaturefeature:blitz", { class: "amber", name: "Endless", counter: 5, breachTypes: ["TELEPORT"] }],
    ["minecraft:blaze", { class: "amber", name: "Blaze Bird", counter: 6, breachTypes: ["TELEPORT"] }],
    // Turtle
    ["minecraft:turtle", { class: "amber", name: "EoO", counter: 6, breachTypes: ["NOTHING"], evolutions: ["peaceless:shrapin"] }],
    ["peaceless:shrapin", { class: "amber", name: "TURiSTA", counter: 5, breachTypes: ["STEAMROLLER"] }],
    // Beauty
    ["creaturefeature:beauty", { class: "amber", name: "Pagan Poetry", counter: 3, breachTypes: ["DISSOLVE"], evolutions: ["creaturefeature:fiend"] }],
    ["creaturefeature:fiend", { class: "amber", name: "All Neon Like", counter: 2, breachTypes: ["DISSOLVE", "DECOUNT"] }],
    // Dinamo
    ["companions:broken_dinamo", { class: "amber", name: "Baby Blue", counter: 8, breachTypes: ["NOTHING"], evolutions: ["companions:illager_golem"] }],
    ["companions:illager_golem", { class: "amber", name: "Slush Puppy", counter: 4, breachTypes: ["NUKE"] }],
    // Shade
    ["peaceless:shade", { class: "amber", name: "Rip The Slit", counter: 4, breachTypes: ["DARKNESS", "DECOUNT"], evolutions: ["creaturefeature:nothing"] }],
    ["creaturefeature:nothing", { class: "amber", name: "No Thing There", counter: 5, breachTypes: ["DARKNESS", "SAP", "DECOUNT"] }],
    // No evos
    ["netherman:statue_entity", { class: "amber", name: "Security!", counter: 3, breachTypes: ["DARKNESS", "TELEPORT"] }],
    ["companions:wild_antlion", { class: "amber", name: "Princess Guyana", counter: 6, breachTypes: ["TELEPORT"] }],
    ["companions:hostile_puppet_glove", { class: "amber", name: "Meteora Blues", counter: 8, breachTypes: ["CHAOS"] }],
    /**
     *   MAROON ABNORMALITIES
     */
    // Viventrum
    ["scguns:viventrum", { class: "maroon", name: "Mchngrl", counter: 8, breachTypes: ["NUKE"] }],
    ["creaturefeature:canary", { class: "maroon", name: "Bitten Twice", counter: 8, breachTypes: ["DISSOLVE", "NUKE", "STEAMROLLER"] }],
    // Manipulator
    ["netherman:manipulator", { class: "maroon", name: "Quavo", counter: 8, breachTypes: ["SLEEPING", "DARKNESS"] }],
    ["creaturefeature:coat_of_arms", { class: "maroon", name: "RAF", counter: 8, breachTypes: ["TELEPORT", "SUMMON", "SLEEPING"] }],
    // Rabbit
    ["minecraft:rabbit", { class: "maroon", name: "Cottagecore", counter: 8, breachTypes: ["BITE", "STEAMROLLER"] }],
    ["creaturefeature:friend", { class: "maroon", name: "Krizcore", counter: 8, breachTypes: ["CHAOS", "DISSOLVE", "STEAMROLLER", "SUMMON"] }],
    // Ghastly
    ["netherman:ghastly", { class: "maroon", name: "For I Am The Light (And Mine Is The Only Way)", counter: 8, breachTypes: ["DISSOLVE", "BLIND", "DECOUNT"] }],
    ["minecraft:ghast", { class: "maroon", name: "PENNSYLVANIA FURNACE", counter: 8, breachTypes: ["NUKE"] }],
    ["scguns:mother_ghast", { class: "maroon", name: "Big Autumn Ghastjam", counter: 8, breachTypes: ["NUKE", "CHAOS", "BEGONE"] }],
    // Dissident
    ["scguns:dissident", { class: "maroon", name: "Leroy", counter: 4, breachTypes: ["STEAMROLLER"] }],
    ["scguns:praetor", { class: "maroon", name: "Bart", counter: 6, breachTypes: ["DISSOLVE", "STEAMROLLER", "CHAOS"] }],
    // Swarm
    ["scguns:swarm", { class: "maroon", name: "Bugsnax", counter: 3, breachTypes: ["DISSOLVE", "SAP", "DECOUNT"] }],
    ["scguns:hive", { class: "maroon", name: "Only Acting", counter: 4, breachTypes: ["DARKNESS", "CHAOS"] }],
    // Allay
    ["minecraft:allay", { class: "maroon", name: "Silver Soul", counter: 10, breachTypes: ["CHAOS", "TELEPORT"] }],
    ["companions:golden_allay", { class: "maroon", name: "I Saw the Lemon Glow", counter: 20, breachTypes: ["SUPERCHAOS", "TELEPORT", "SUCK", "BEGONE"] }],
    // Mimic
    ["peaceless:mimic", { class: "maroon", name: "Playdate", counter: 3, breachTypes: ["SUCK", "DARKNESS", "DECOUNT", "SAP"] }],
    ["creaturefeature:runaway", { class: "maroon", name: "Days Go By", counter: 3, breachTypes: ["TELEPORT", "DARKNESS", "DISSOLVE", "SAP"] }],
    // No evos
    ["creaturefeature:detritus", { class: "maroon", name: "Walking Wake", counter: 14, breachTypes: ["GRANDIOSE", "SUPERCHAOS"] }],
    ["scguns:sulfurhead", { class: "maroon", name: "Head in the Clouds", counter: 1, breachTypes: ["DISSOLVE", "DARKNESS", "SULFUR"] }],
]);



