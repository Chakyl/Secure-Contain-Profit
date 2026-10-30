// /**
//  * Breach types:
//  *   - [x] DISSOLVE - Break nearby non-bedrock blocks
//  *   - [x] NUKE - DISSOLVE, but 100% and larger area
//  *   - [x] STEAMROLLER - Breaks blocks below and at the same level as it
//  *   - [x] BEGONE - Teleports players to other entities
//  *   - [x] ESCAPEARTIST - Escapes containment unit upon breaching
//  *   - [x] TELEPORT - Teleports to nearby entities
//  *   - [x] SUMMMON - Teleports player to from anywhere
//  *   - [x] SUCK - Teleports all nearby entities to it
//  *   - [x] DECOUNT - Gradually reduces the counter of nearby containment units
//  *   - [x] GRANDIOSE - Instantly adds 1 threat level upon breaching
//  *   - [x] CHAOS - Adds CHAOS
//  *   - [x] SUPERCHAOS - Adds a LOT of Chaos
//  *   - [x] CLANKER - Adds disrepair
//  *   - [x] SAP - Reduces health of nearby entities
//  *   - [x] BITE - Reduces health of nearby entities significantly at a lower range
//  *   - [x] DARKNESS - Darknesses nearby entities
//  *   - [x] BLIND - Blinds nearby entities
//  *   - [x] POISON - Suflur poisons nearby entities
//  *   - [x] SULFUR - Suflur poisons nearby entities
//  *   - [x] SLEEPING - Sleeps nearby entities
//  *   - [x] SHRINKING - Shrinks nearby entities
// *    - [x] PATHETIC - Reduces max health temp
// *    - [x] LOST - Hides maps
// *    - [x] LIGHTNINING - Creates lightning nearby
// *    - [x] SPAWN_FEND - Spawns creaturefeature:fend periodically
// *    - [x] SPAWN_WITHER_SKELETON - Spawns minecraft:wither_skeleton periodically
//  *   - [x] NOTHING - Does nothing. Same as not including any breaching behaviors, just more 
//  */
// /**
//  * Difficulty. Higher = Need higher
//  * - -1 - Always GOOD
//  * - 0 - Very low
//  * - 1 - Low
//  * - 2 - Neutral
//  * - 3 - High
//  * - 4 - Very High
//  * - 5 - Always BAD
//  */
// const abnormalities = new Map([
//     /**
//      *   VERDANT ABNORMALITIES
//      */
//     // Pig line
//     ["minecraft:pig", { tier: "verdant", preferences: { violence: 0, insight: 2, harmony: 0 }, name: "ZUSHI", counter: 3, breachTypes: ["TELEPORT", "DECOUNT"], evolutions: ["minecraft:piglin", "minecraft:creeper"] }],
//     ["minecraft:piglin", { tier: "verdant", preferences: { violence: 0, insight: 3, harmony: 3 }, name: "Direct Line", counter: 5, breachTypes: ["ESCAPEARTIST"], evolutions: ["minecraft:piglin_brute", "minecraft:zombified_piglin"] }],
//     ["minecraft:piglin_brute", { tier: "verdant", preferences: { violence: 2, insight: 4, harmony: 4 }, name: "Direct Line 2", counter: 6, breachTypes: ["STEAMROLLER"], malformation: 'scguns:freyr' }],
//     ["minecraft:zombified_piglin", { tier: "verdant", preferences: { violence: 3, insight: 0, harmony: 2 }, name: "Coroner", counter: 3, breachTypes: ["STEAMROLLER"], malformation: 'scguns:trotters' }],
//     ["minecraft:creeper", { tier: "verdant", preferences: { violence: 4, insight: 3, harmony: 0 }, name: "Heaven Surrounds Us Like a Hood", counter: 12, breachTypes: ["ESCAPEARTIST"], malformation: 'netherman:chance_totem' }],
//     // Pathogen
//     ["creaturefeature:pathogen", { tier: "verdant", preferences: { violence: 3, insight: 0, harmony: 1 }, name: "Pathogen", counter: 3, breachTypes: ["TELEPORT"], evolutions: ["creaturefeature:minedflayer"] }],
//     ["creaturefeature:minedflayer", { tier: "verdant", preferences: { violence: 5, insight: 1, harmony: 2 }, name: "According to the Mind's Flayed Eye", counter: 10, breachTypes: ["NUKE"], malformation: 'scguns:target_tracker_module' }],
//     // Goat
//     ["minecraft:goat", { tier: "verdant", preferences: { violence: 0, insight: 3, harmony: 1 }, goodWorkCounterResults: { violence: -1, insight: 2, harmony: 0 }, neutralWorkCounterResults: { violence: -1, insight: 2, harmony: 0 }, badWorkCounterResults: { violence: 0, insight: 2, harmony: 1 }, name: "Tailwhip", counter: 2, breachTypes: ["ESCAPEARTIST", "BITE"], evolutions: ["creaturefeature:vertigo", 'antarchy:ouranwood_deer'] }],
//     ['antarchy:ouranwood_deer', { tier: "verdant", preferences: { violence: 5, insight: 3, harmony: 0 }, name: "Halcyon Digest", counter: 9, breachTypes: ["ESCAPEARTIST", "CHAOS"], malformation: 'scp:cornucopia' }],
//     ["creaturefeature:vertigo", { tier: "verdant", preferences: { violence: -1, insight: 3, harmony: 1 }, name: "Norton Commander", counter: 8, breachTypes: ["ESCAPEARTIST", "SUCK", "SAP"], malformation: 'creaturefeature:vertigo_horn' }],
//     // Chicken
//     ["minecraft:chicken", { tier: "verdant", preferences: { violence: -1, insight: -1, harmony: -1 }, name: "A Feast Before The Drought", counter: 3, breachTypes: ["ESCAPEARTIST", "SAP"], evolutions: ["creaturefeature:stained_glass", "creaturefeature:mockingbird", "peaceless:harpy"] }],
//     ["creaturefeature:stained_glass", { tier: "verdant", preferences: { violence: 3, insight: 2, harmony: 1 }, name: "Fragments Of A Lily", counter: 4, breachTypes: ["TELEPORT"], malformation: 'companions:book_ice_shard' }],
//     ["creaturefeature:mockingbird", { tier: "verdant", preferences: { violence: 1, insight: 2, harmony: 4 }, name: "Crude Drawing of an Angel", counter: 6, breachTypes: ["ESCAPEARTIST", "SAP"], malformation: 'opposing_force:relic_feather' }],
//     ["peaceless:harpy", { tier: "verdant", preferences: { violence: 3, insight: 0, harmony: 0 }, name: "TU AMIGO", counter: 7, breachTypes: ["ESCAPEARTIST", "DECOUNT"], malformation: 'opposing_force:thorny_bracelet' }],
//     // Villager
//     ["minecraft:villager", { tier: "verdant", preferences: { violence: 5, insight: -1, harmony: 0 }, name: "The Architect", counter: 3, breachTypes: ["ESCAPEARTIST", "CHAOS"], evolutions: ["minecraft:zombie_villager", "minecraft:zombie"] }],
//     ["minecraft:zombie_villager", { tier: "verdant", preferences: { violence: 0, insight: 1, harmony: 4 }, name: "The Painter", counter: 4, breachTypes: ["ESCAPEARTIST", "SUPERCHAOS"], evolutions: ["creaturefeature:blossom"] }],
//     ["minecraft:zombie", { tier: "verdant", preferences: { violence: 0, insight: 3, harmony: 3 }, name: "Live From Hell", counter: 4, breachTypes: ["ESCAPEARTIST", "SAP", "CHAOS"], evolutions: ["creaturefeature:minds"] }],
//     ["creaturefeature:blossom", { tier: "verdant", preferences: { violence: 3, insight: 3, harmony: 1 }, name: "Flatbush", counter: 4, breachTypes: ["SAP", "STEAMROLLER"], malformation: 'scguns:shard_culler' }],
//     ["creaturefeature:minds", { tier: "verdant", preferences: { violence: 3, insight: 1, harmony: 3 }, name: "Minehuck", counter: 2, breachTypes: ["CHAOS", "DISSOLVE"], malformation: 'opposing_force:lucky_tacklebox' }],
//     // Frog
//     ["minecraft:frog", { tier: "verdant", preferences: { violence: 3, insight: 0, harmony: 0 }, name: "Cornelius the Frog", goodWorkCounterResults: { violence: 0, insight: 0, harmony: -1 }, counter: 8, breachTypes: ["NOTHING"], evolutions: ["companions:cornelius"] }],
//     ["companions:cornelius", { tier: "verdant", preferences: { violence: 3, insight: 0, harmony: 0 }, name: "Cornelius the Frog UNCHAINED", goodWorkCounterResults: { violence: 0, insight: 0, harmony: -1 }, counter: 15, breachTypes: ["NOTHING"], malformation: "whimsy_deco:froggy_chair" }],
//     // Goph
//     ["hedges_bestiary:goph", { tier: "verdant", preferences: { violence: 1, insight: 2, harmony: 1 }, name: "Hollywood Baby", counter: 10, breachTypes: ["ESCAPEARTIST", "POISON"], evolutions: ["opposing_force:furball"] }],
//     ["opposing_force:furball", { tier: "verdant", preferences: { violence: 1, insight: 3, harmony: 0 }, name: "Money Machine", counter: 6, breachTypes: ["ESCAPEARTIST", "BITE"], malformation: 'opposing_force:sharpshooter_coin' }],
//     // No Evos
//     ["hedges_bestiary:skib", { tier: "verdant", preferences: { violence: 1, insight: 4, harmony: 4 }, name: "Critical", counter: 6, breachTypes: ["ESCAPEARTIST"], malformation: 'scguns:laser_musket' }],
//     ["opposing_force:mushy", { tier: "verdant", preferences: { violence: 2, insight: 2, harmony: 0 }, name: "Slowdive", counter: 5, breachTypes: ["ESCAPEARTIST", "SHRINKING"], malformation: 'antarchy:shrink_ray' }],
//     ["companions:living_candle", { tier: "verdant", preferences: { violence: 3, insight: 3, harmony: 0 }, name: "Friend of Coal", counter: 6, breachTypes: ["ESCAPEARTIST", "SULFUR", "DARKNESS"], malformation: 'scguns:vehement_coal_block' }],
//     /**
//      *   AMBER ABNORMALITIES
//      */
//     // Machination
//     ["creaturefeature:sinister", { tier: "amber", preferences: { violence: 4, insight: -1, harmony: 3 }, name: "Portrait of a Lady on Fire", counter: 4, breachTypes: ["ESCAPEARTIST"], evolutions: ["creaturefeature:machination"] }],
//     ["creaturefeature:machination", { tier: "amber", preferences: { violence: 0, insight: 4, harmony: 4 }, name: "Front Load", counter: 3, breachTypes: ["ESCAPEARTIST"], malformation: 'opposing_force:black_belt' }],
//     // Spider
//     ["minecraft:spider", { tier: "amber", preferences: { violence: 1, insight: 1, harmony: 1 }, name: "Dewpider", counter: 10, breachTypes: ["ESCAPEARTIST"], evolutions: ["minecraft:cave_spider"] }],
//     ["minecraft:cave_spider", { tier: "amber", preferences: { violence: 2, insight: 2, harmony: 2 }, name: "Araquanid", counter: 10, breachTypes: ["ESCAPEARTIST"], evolutions: ["creaturefeature:dreamweaver"] }],
//     ["creaturefeature:dreamweaver", { tier: "amber", preferences: { violence: 4, insight: 3, harmony: 0 }, name: "A I Alien Observer", counter: 10, breachTypes: ["DARKNESS", "ESCAPEARTIST", "SLEEPING"], malformation: 'opposing_force:moon_shoes' }],
//     // Bear
//     ["minecraft:polar_bear", { tier: "amber", preferences: { violence: 4, insight: 1, harmony: 1 }, name: "Ice Peek", counter: 4, breachTypes: ["ESCAPEARTIST"], evolutions: ["creaturefeature:saint_solis"] }],
//     ["creaturefeature:saint_solis", { tier: "amber", preferences: { violence: 4, insight: 2, harmony: 3 }, name: "Society Sunlit Bearly", counter: 6, breachTypes: ["NUKE"], malformation: 'scguns:spitfire' }],
//     // Breeze
//     ["minecraft:breeze", { tier: "amber", preferences: { violence: 2, insight: 4, harmony: 4 }, name: "Choke Enough", counter: 7, breachTypes: ["TELEPORT"], evolutions: ["creaturefeature:blitz", "minecraft:blaze"] }],
//     ["creaturefeature:blitz", { tier: "amber", preferences: { violence: 2, insight: 2, harmony: 4 }, name: "Endless", counter: 5, breachTypes: ["TELEPORT"], malformation: 'scguns:carapice' }],
//     ["minecraft:blaze", { tier: "amber", preferences: { violence: 3, insight: 3, harmony: 4 }, name: "Blaze Bird", counter: 6, breachTypes: ["TELEPORT"], malformation: "scguns:blasphemy" }],
//     // Turtle
//     ["minecraft:turtle", { tier: "amber", preferences: { violence: 4, insight: 0, harmony: 0 }, name: "EoO", counter: 6, breachTypes: ["NOTHING"], evolutions: ["peaceless:shrapin", "opposing_force:terror"] }],
//     ["peaceless:shrapin", { tier: "amber", preferences: { violence: 4, insight: 2, harmony: 1 }, name: "TURiSTA", counter: 5, breachTypes: ["SUCK"], malformation: 'opposing_force:pot_of_green' }],
//     ["opposing_force:terror", { tier: "amber", preferences: { violence: 4, insight: 2, harmony: 1 }, name: "BOKeTE", counter: 5, breachTypes: ["ESCAPEARTIST", "SUCK"], malformation: 'scguns:rg_jigsaw' }],
//     // Beauty
//     ["creaturefeature:beauty", { tier: "amber", preferences: { violence: 4, insight: 2, harmony: 0 }, name: "Pagan Poetry", counter: 3, breachTypes: ["ESCAPEARTIST", "DISSOLVE"], evolutions: ["creaturefeature:fiend"] }],
//     ["creaturefeature:fiend", { tier: "amber", preferences: { violence: 1, insight: 3, harmony: 4 }, name: "All Neon Like", counter: 2, breachTypes: ["ESCAPEARTIST", "DECOUNT"], malformation: 'scguns:prima_materia' }],
//     // Dinamo
//     ["companions:illager_golem", { tier: "amber", preferences: { violence: 4, insight: 1, harmony: 4 }, name: "Slush Puppy", counter: 4, breachTypes: ["CLANKER", "SUCK", "ESCAPEARTIST"], evolutions: ["companions:broken_dinamo"] }],
//     ["companions:broken_dinamo", { tier: "amber", preferences: { violence: -1, insight: -1, harmony: -1 }, name: "Baby Blue", counter: 8, breachTypes: ["NOTHING"], malformation: 'scguns:advanced_exo_suit_core' }],
//     // Shade
//     ["peaceless:shade", { tier: "amber", preferences: { violence: 3, insight: 2, harmony: 0 }, name: "Rip The Slit", counter: 4, breachTypes: ["DARKNESS", "LOST", "ESCAPEARTIST"], evolutions: ["creaturefeature:nothing"] }],
//     ["creaturefeature:nothing", { tier: "amber", preferences: { violence: 4, insight: 2, harmony: 0 }, name: "No Thing There", counter: 5, breachTypes: ["DARKNESS", "ESCAPEARTIST", "SAP", "LOST"], malformation: 'opposing_force:stalker_gloves' }],
//     // Spit bug
//     ["antarchy:spit_bug", { tier: "amber", preferences: { violence: 4, insight: 4, harmony: 2 }, name: "Bugsnax", counter: 5, breachTypes: ["POISON", "ESCAPEARTIST", "DISSOLVE"], evolutions: ["opposing_force:bewilder"] }],
//     ["opposing_force:bewilder", { tier: "amber", preferences: { violence: 2, insight: 2, harmony: 2 }, name: "Only Acting", counter: 5, breachTypes: ["POISON", "ESCAPEARTIST", "DISSOLVE"], malformation: 'antarchy:corn_seeds' }],
//     // [Red Ant] Rolly Polly
//     ["antarchy:rolly_polly", { tier: "amber", preferences: { violence: 1, insight: 4, harmony: 4 }, name: "Little Dragon", counter: 5, breachTypes: ["ESCAPEARTIST", "SAP"], evolutions: ["antarchy:red_ant"] }],
//     ["antarchy:red_ant", { tier: "amber", preferences: { violence: 3, insight: 5, harmony: 3 }, name: "Empire Ant", counter: 10, breachTypes: ["DARKNESS", "ESCAPEARTIST", "BEGONE", "CHAOS"], malformation: 'scguns:pyroclastic_flow' }],
//     // [Brown Ant] Stink bug
//     ["antarchy:stink_bug", { tier: "amber", preferences: { violence: 2, insight: 4, harmony: 2 }, badWorkCounterResults: { violence: 0, insight: 0, harmony: 0 }, name: "Crust Punk", counter: 1, breachTypes: ["DARKNESS", "SULFUR", "DISSOLVE", "ESCAPEARTIST"], evolutions: ["antarchy:brown_ant"] }],
//     ["antarchy:brown_ant", { tier: "amber", preferences: { violence: 3, insight: 5, harmony: 3 }, name: "Exapunk", counter: 10, breachTypes: ["DARKNESS", "ESCAPEARTIST", "BEGONE", "CHAOS"], malformation: 'scguns:nailer' }],
//     // Ravager
//     ["minecraft:ravager", { tier: "amber", preferences: { violence: 1, insight: 5, harmony: 0 }, name: "Decked Out", counter: 2, breachTypes: ["ESCAPEARTIST"], evolutions: ["hedges_bestiary:burodon", "hedges_bestiary:plombo"] }],
//     ["hedges_bestiary:burodon", { tier: "amber", preferences: { violence: 3, insight: 5, harmony: 3 }, name: "Wyclef Jean", counter: 10, breachTypes: ["ESCAPEARTIST"], malformation: 'opposing_force:tear_of_aquarius' }],
//     ["hedges_bestiary:plombo", { tier: "amber", preferences: { violence: 3, insight: 5, harmony: 3 }, name: "Problem", counter: 10, breachTypes: ["ESCAPEARTIST", "BITE"], malformation: 'scguns:inertial' }],
//     // No evos
//     ["antarchy:jerry", { tier: "amber", preferences: { violence: 2, insight: 4, harmony: 4 }, name: "Jerry", counter: 8, breachTypes: ["ESCAPEARTIST", "BITE", "SUCK"], malformation: 'opposing_force:blood_amulet' }],
//     ["netherman:statue_entity", { tier: "amber", preferences: { violence: 3, insight: 1, harmony: 4 }, name: "Security!", counter: 3, breachTypes: ["DARKNESS", "ESCAPEARTIST"], malformation: 'opposing_force:enchanted_chisel' }],
//     ["companions:hostile_puppet_glove", { tier: "amber", preferences: { violence: 4, insight: 1, harmony: 2 }, name: "Meteora Blues", counter: 8, breachTypes: ["NONE"], malformation: 'opposing_force:momentum_gauntlet' }],
//     ["opposing_force:scorcher", { tier: "amber", preferences: { violence: 1, insight: 3, harmony: 3 }, name: "Paprika Pony", counter: 2, breachTypes: ["DARKNESS", "SUCK", "ESCAPEARTIST"], malformation: 'opposing_force:fiery_carapace' }],
//     /**
//      *   MAROON ABNORMALITIES
//      */
//     // Viventrum
//     ["scguns:viventrum", { tier: "maroon", preferences: { violence: 3, insight: 3, harmony: 4 }, name: "Mchngrl", counter: 8, breachTypes: ["NUKE"], evolutions: ["creaturefeature:canary"] }],
//     ["creaturefeature:canary", { tier: "maroon", preferences: { violence: 3, insight: 2, harmony: 5 }, name: "Bitten Twice", counter: 8, breachTypes: ["DISSOLVE", "NUKE", "STEAMROLLER"], malformation: 'antarchy:hoverboard' }],
//     // Manipulator
//     ["netherman:manipulator", { tier: "maroon", preferences: { violence: 4, insight: 1, harmony: 4 }, name: "Quavo", counter: 8, breachTypes: ["SLEEPING", "DARKNESS"], evolutions: ["creaturefeature:coat_of_arms"] }],
//     ["creaturefeature:coat_of_arms", { tier: "maroon", preferences: { violence: 5, insight: 2, harmony: 3 }, name: "RAF", counter: 8, breachTypes: ["TELEPORT", "SUMMON", "SLEEPING"], malformation: 'scguns:earths_corpse' }],
//     // Rabbit
//     ["minecraft:rabbit", { tier: "maroon", preferences: { violence: 4, insight: 4, harmony: 1 }, name: "Cottagecore", counter: 8, breachTypes: ["BITE", "STEAMROLLER"], evolutions: ["creaturefeature:friend"] }],
//     ["creaturefeature:friend", { tier: "maroon", preferences: { violence: 5, insight: 3, harmony: 2 }, name: "Krizcore", counter: 8, breachTypes: ["CHAOS", "NUKE", "STEAMROLLER", "SUMMON"], malformation: 'scguns:weevil' }],
//     // Ghastly
//     ["netherman:ghastly", { tier: "maroon", preferences: { violence: 4, insight: 2, harmony: 2 }, name: "For I Am The Light (And Mine Is The Only Way)", counter: 8, breachTypes: ["DISSOLVE", "BLIND", "DECOUNT"], evolutions: ["minecraft:ghast"] }],
//     ["minecraft:ghast", { tier: "maroon", preferences: { violence: 1, insight: 4, harmony: 4 }, name: "PENNSYLVANIA FURNACE", counter: 8, breachTypes: ["NUKE"], evolutions: ["scguns:mother_ghast"] }],
//     ["scguns:mother_ghast", { tier: "maroon", preferences: { violence: 2, insight: 3, harmony: 2 }, name: "Big Autumn Ghastjam", counter: 8, breachTypes: ["NUKE", "CHAOS", "BEGONE"], malformation: 'scguns:bomb_lance' }],
//     // Dissident
//     ["scguns:dissident", { tier: "maroon", preferences: { violence: 0, insight: 4, harmony: 4 }, name: "Leroy", counter: 4, breachTypes: ["ESCAPEARTIST"], evolutions: ["scguns:praetor"] }],
//     ["scguns:praetor", { tier: "maroon", preferences: { violence: 1, insight: 4, harmony: 4 }, name: "Bart", counter: 6, breachTypes: ["ESCAPEARTIST", "CHAOS"], malformation: 'scguns:newborn_cyst' }],
//     // Bell
//     ["netherman:statue_bossunit", { tier: "maroon", preferences: { violence: 3, insight: 4, harmony: 1 }, name: "For Whom the Bell Tolls", counter: 3, breachTypes: ["CHAOS"], evolutions: ["netherman:gilded_golem"] }],
//     ["netherman:gilded_golem", { tier: "maroon", preferences: { violence: 4, insight: 2, harmony: 3 }, name: "Lawrence The Painful", counter: 3, breachTypes: ["SUPERCHAOS", "STEAMROLLER", "DISSOLVE"], malformation: 'scguns:terra_incognita' }],
//     // Swarm
//     ["antarchy:wasp", { tier: "maroon", preferences: { violence: 3, insight: 4, harmony: 4 }, name: "Big Fig Wasp", counter: 7, breachTypes: ["SULFUR", "SAP", "CHAOS", "ESCAPEARTIST"], evolutions: ["scguns:hive"] }],
//     ["scguns:hive", { tier: "maroon", preferences: { violence: 3, insight: 4, harmony: 4 }, name: "People-Vulture", counter: 4, breachTypes: ["DARKNESS", "CHAOS", "ESCAPEARTIST"], malformation: 'scguns:locust' }],
//     // Allay
//     ["minecraft:allay", { tier: "maroon", preferences: { violence: 4, insight: 4, harmony: 0 }, name: "Silver Soul", counter: 10, breachTypes: ["SPAWN_FEND", "CHAOS", "TELEPORT"], evolutions: ["companions:golden_allay"] }],
//     ["companions:golden_allay", { tier: "maroon", preferences: { violence: 4, insight: 4, harmony: 0 }, name: "I Saw the Lemon Glow", counter: 20, breachTypes: ["SPAWN_FEND", "SUPERCHAOS", "TELEPORT", "SUCK", "BEGONE"], malformation: 'scguns:nervepinch' }],
//     // Mimic
//     ["peaceless:mimic", { tier: "maroon", preferences: { violence: 2, insight: 4, harmony: 3 }, name: "Melos", counter: 3, breachTypes: ["SUCK", "DARKNESS", "DECOUNT", "SAP", "ESCAPEARTIST"], evolutions: ["creaturefeature:cannonball_crab"] }],
//     ["creaturefeature:cannonball_crab", { tier: "maroon", preferences: { violence: 3, insight: 2, harmony: 3 }, name: "Days Go By", counter: 3, breachTypes: ["ESCAPEARTIST", "TELEPORT", "DARKNESS", "DISSOLVE", "SAP"], malformation: 'opposing_force:crystallized_heart' }],
//     // [Termite] Crawling Blight
//     ["antarchy:crawling_blight", { tier: "maroon", preferences: { violence: 3, insight: 1, harmony: 4 }, name: "YMTHLYFYMBIKWHRLYFIYBNLSPH", counter: 3, breachTypes: ["DARKNESS", "ESCAPEARTIST"], evolutions: ["antarchy:skulking_fright"] }],
//     ["antarchy:skulking_fright", { tier: "maroon", preferences: { violence: 3, insight: 1, harmony: 4 }, name: "Inanimate Sensation", counter: 3, breachTypes: ["DARKNESS", "ESCAPEARTIST"], evolutions: ["antarchy:termite"] }],
//     ["antarchy:termite", { tier: "maroon", preferences: { violence: 4, insight: 4, harmony: 1 }, name: "Artificial Death in the West", counter: 3, breachTypes: ["DARKNESS", "ESCAPEARTIST"], malformation: 'scguns:super_shotgun' }],
//     // Elka
//     ["antarchy:elka", { tier: "maroon", preferences: { violence: 4, insight: 3, harmony: 1 }, name: "BOA", counter: 3, breachTypes: ["SUPERCHAOS", "STEAMROLLER", "DECOUNT"], evolutions: ["antarchy:manticore"] }],
//     ["antarchy:manticore", { tier: "maroon", preferences: { violence: 2, insight: 3, harmony: 3 }, name: "Figueroa", counter: 3, breachTypes: ["BEGONE", "ESCAPEARTIST", "GRANDIOSE"], malformation: 'antarchy:manticore_wings' }],
//     // Mantis 
//     ["antarchy:mantis", { tier: "maroon", preferences: { violence: 2, insight: 4, harmony: 4 }, name: "Killer Queen", counter: 5, breachTypes: ["DARKNESS", "ESCAPEARTIST"], evolutions: ["antarchy:alpha_mantis"] }],
//     ["antarchy:alpha_mantis", { tier: "maroon", preferences: { violence: 3, insight: 4, harmony: 4 }, name: "Bites the Dust", counter: 3, breachTypes: ["DARKNESS", "NUKE", "ESCAPEARTIST"], malformation: 'opposing_force:uranium_knuckles' }],
//     // Worm
//     ["antarchy:worm", { tier: "maroon", preferences: { violence: 0, insight: 0, harmony: 0 }, name: "Eartheater", counter: 13, breachTypes: ["NONE"], evolutions: ["antarchy:moleworm"] }],
//     ["antarchy:moleworm", { tier: "maroon", preferences: { violence: 3, insight: 2, harmony: 3 }, name: "Crushing", counter: 7, breachTypes: ["DARKNESS", "ESCAPEARTIST"], evolutions: ["antarchy:molevore"] }],
//     ["antarchy:molevore", { tier: "maroon", preferences: { violence: 3, insight: 2, harmony: 3 }, name: "Fast Asleep", counter: 4, breachTypes: ["DARKNESS", "ESCAPEARTIST", "SLEEPING"], malformation: 'antarchy:ultimate_pickaxe' }],
//     // Basilisk
//     ["antarchy:basilisk", { tier: "maroon", preferences: { violence: 3, insight: 2, harmony: 3 }, name: "Debold", counter: 4, breachTypes: ["DARKNESS", "ESCAPEARTIST", "SLEEPING"], evolutions: ["opposing_force:gusher"] }],
//     ["opposing_force:gusher", { tier: "maroon", preferences: { violence: 3, insight: 2, harmony: 3 }, name: "Yeet 3ZeroK [126 BPM]", counter: 4, breachTypes: ["ESCAPEARTIST", "PATHETIC"], malformation: 'opposing_force:slimy_shield' }],
//     // No evos
//     ["scguns:sulfurhead", { tier: "maroon", preferences: { violence: 3, insight: 2, harmony: 3 }, name: "Head in the Clouds", counter: 3, breachTypes: ["DISSOLVE", "DARKNESS", "SULFUR"], malformation: 'scguns:lone_wonder' }],
//     ["antarchy:flytrap", { tier: "maroon", preferences: { violence: 3, insight: 3, harmony: 2 }, name: "The Garden", counter: 10, breachTypes: ["SUPERCHAOS", "SUMMON"], malformation: 'antarchy:growth_ray' }],
//     /**
//      *   Indigo ABNORMALITIES
//      */
//     ["netherman:doctor", { tier: "indigo", preferences: { violence: 1, insight: 0, harmony: 1 }, name: "Plague Doctor", counter: 666, breachTypes: ["INDIGO_ESCAPEARTIST"], evolutions: ["netherman:azazel"], increment_hidden_counter: true }],
//     ["netherman:azazel", { tier: "indigo", preferences: { violence: 1, insight: 3, harmony: 3 }, name: "Cathedral of Shadows", counter: 7, breachTypes: ["GRANDIOSE", "INDIGO_ESCAPEARTIST"], malformation: 'netherman:azazel_trophy' }],
//     // Stratoshark
//     ["antarchy:stratoshark", { tier: "indigo", preferences: { violence: 5, insight: 2, harmony: 2 }, name: "Shark Smile", counter: 14, breachTypes: ["LIGHTNING", "INDIGO_ESCAPEARTIST"], evolutions: ["hedges_bestiary:endgel"] }],
//     ["hedges_bestiary:endgel", { tier: "indigo", preferences: { violence: 1, insight: 3, harmony: 3 }, name: "Mythological Beauty", counter: 14, breachTypes: ["LIGHTNING", "INDIGO_ESCAPEARTIST"], malformation: 'scguns:lone_wonder' }],
//     // Witch
//     ["minecraft:witch", { tier: "indigo", preferences: { violence: 4, insight: 2, harmony: 3 }, name: "Belispeak", counter: 8, breachTypes: ["GRANDIOSE", "INDIGO_ESCAPEARTIST"], goodWorkCounterResults: { violence: 1, insight: 1, harmony: 1 }, neutralWorkCounterResults: { violence: 1, insight: 1, harmony: 1 }, badWorkCounterResults: { violence: -1, insight: -1, harmony: -1 }, evolutions: ["companions:sacred_pontiff"] }],
//     ["companions:sacred_pontiff", { tier: "indigo", preferences: { violence: 4, insight: 2, harmony: 3 }, name: "Fineshrine", counter: 14, breachTypes: ["INDIGO_ESCAPEARTIST"], malformation: 'netherman:manipulator_stick' }],
//     // Special
//     ["antarchy:nightmare", { tier: "indigo", preferences: { violence: 3, insight: 4, harmony: 4 }, name: "Deerhunter", counter: 8, breachTypes: ["GRANDIOSE", "BITE", "SUPERCHAOS", "SLEEP", "DARKNESS", "NUKE"], malformation: 'antarchy:nightmare_sword' }],
//     // No evos
//     ["creaturefeature:detritus", { tier: "indigo", preferences: { violence: 5, insight: 3, harmony: 2 }, name: "Walking Wake", counter: 14, breachTypes: ["INDIGO_ESCAPEARTIST"], malformation: 'minecraft:totem_of_undying' }],
//     ["opposing_force:dicer", { tier: "indigo", preferences: { violence: 2, insight: 3, harmony: 5 }, name: "Dancer in the Dark", counter: 14, breachTypes: ["INDIGO_ESCAPEARTIST", "BITE", "DARKNESS"], malformation: 'scguns:rat_king_and_queen' }],
//     ["netherman:guardian", { tier: "indigo", preferences: { violence: 1, insight: 2, harmony: 5 }, name: "PANIC!!!", counter: 4, breachTypes: ["GRANDIOSE", "SUPERCHAOS", "INDIGO_ESCAPEARTIST", "SPAWN_FEND"], malformation: 'netherman:azazel_spear' }],
//     ["antarchy:lucid", { tier: "indigo", preferences: { violence: 4, insight: 2, harmony: 3 }, name: "Rhinestone Eye", counter: 6, breachTypes: ["SLEEP", "BLIND", "INDIGO_ESCAPEARTIST"], malformation: 'scguns:astella' }],
//     ["antarchy:vortex", { tier: "indigo", preferences: { violence: 4, insight: 3, harmony: 2 }, name: "Cowgirl Clue", counter: 6, breachTypes: ["SUCK", "DECOUNT", "INDIGO_ESCAPEARTIST"], malformation: 'scguns:shellurker' }],
// ]);


// if (true) {
//     let translationKeys = {};
//     let badWorkDefaults = { violence: 1, insight: 1, harmony: 1 };
//     let goodWorkDefaults = { violence: 0, insight: 0, harmony: 0 };
//     let neutralWorkDefaults = { violence: 0, insight: 0, harmony: 0 };
//     abnormalities.forEach((data, abnormality) => {
//         let [namespace, path] = abnormality.split(":");
//         let langKey = `abnormality.${abnormality.replace(":", ".")}.name`;
//         translationKeys[langKey] = data.name;
//         let abnormalityJson = {
//             name: {
//                 translate: langKey
//             },
//             tier: data.tier,
//             preferences: data.preferences,
//             bad_result_counter_impact: data.badWorkCounterResults ? data.badWorkCounterResults : badWorkDefaults,
//             neutral_result_counter_impact: data.neutralWorkCounterResults ? data.neutralWorkCounterResults : neutralWorkDefaults,
//             good_result_counter_impact: data.goodWorkCounterResults ? data.goodWorkCounterResults : goodWorkDefaults,
//             counter: data.counter,
//             breach_types: data.breachTypes,
//             evolutions: data.evolutions ? data.evolutions : []
//         };
//         if(data.increment_hidden_counter) abnormalityJson.increment_hidden_counter = true;
//         if(data.malformation) abnormalityJson.malformation = data.malformation;
//         JsonIO.write(`kubejs/data/scp/abnormalities/${namespace}_${path}.json`, abnormalityJson);
//     });

//     JsonIO.write(`kubejs/assets/scp_abnormalities/lang/en_us.json`, translationKeys);
// }


// if (true) {
//     let getClassColor = (tier) => {
//         switch (tier) {
//             case "amber": return 6;
//             case "maroon": return 4;
//             case "indigo": return 1;
//             default:
//             case "verdant": return 2;
//         }
//     }
//     let formatName = (type) => type.charAt(0).toUpperCase() + type.slice(1);
//     let getWorkPrefToString = (num) => {
//         switch (num) {
//             case -1: return "Always GOOD"
//             case 0: return "Loved"
//             case 1: return "Liked"
//             case 2: return "Neutral"
//             case 3: return "Disliked"
//             case 4: return "Hated"
//             default:
//             case 5: return "Always BAD"
//         }
//     }
//     let getWorkPreferences = (preferences) => `Work preferences:\n- Violence: ${getWorkPrefToString(preferences.violence)}\n- Insight: ${getWorkPrefToString(preferences.insight)}\n- Harmony: ${getWorkPrefToString(preferences.harmony)}`
//     let fieldGuideEntries = []
//     let translationKeys = {}
//     translationKeys["category.fieldguide.fieldguide.abnormalities"] = "Abnormalities";
//     translationKeys["category.fieldguide.fieldguide.tool_abnormalities"] = "Tool Abnormalities";
//     translationKeys["category.fieldguide.fieldguide.room_abnormalities"] = "Room Abnormalities";
//     let abnormalityDescs = new Map([
//         /**
//          *   VERDANT ABNORMALITIES
//          */
//         // Pig line
//         ["minecraft:pig", { description: "It looks like a pig, acts like a pig. But it's not a pig." }],
//         ["minecraft:piglin", { description: "WIP" }],
//         ["minecraft:piglin_brute", { description: "WIP" }],
//         ["minecraft:zombified_piglin", { description: "WIP" }],
//         ["minecraft:creeper", { description: "Evolution has torn apart the DNA of the ZUSHI, causing it to only vaguely resemble itself. Its explosions are anomalous in nature, causing some other being to return it back from the dead. This seems to make abnormalities at the facility uncomfortable." }],
//         ["creaturefeature:pathogen", { description: "Difficult to contain due to its ability to phase through solid matter and harbor inside living beings. Quick suppression is advised due to the ability for the Pathogen to entirely leave the facility at any time, though it will return to its containment unit the next day out of habit." }],
//         ["creaturefeature:minedflayer", { description: "The chemical composition of According to the Mind's Flayed Eye is yet to be discovered, but it is observed to be primarily inorganic matter.\n\nThis abnormality is particularly docile, though it causes strange hallucinations in nearby workers.\n\nWhen breaching, According to the Mind's Flayed Eye will cause spacial distortions around it, voiding the facility in a large area." }],
//         ["minecraft:goat", { description: "Tailwhip was rescued from a Moonlit Company associated factory farm after causing massive rolling blackouts in the local area.\n\nIt reacts strongly to rational thought, breaching whenever insight work is performed." }],
//         ['antarchy:ouranwood_deer', { description: "Halcyon Digest has been called 'the harbinger of the black forest' as it often seeing fleeing in the peripheral of a person about to experience great agony.\n\nResearchers have noted that this phenomona only exists when Halcyon Digest is in distress, despite warned test subjects being in otherwise no harm whatsoever.\n\nIt has been observed that Halcyon Digest often winces in pain after a new abnormality is brought to the facility, as if something inside of it is agitated. The reclassification of Halcyon Digest to Indigo is pending after the advisory of T-999." }],
//         ["creaturefeature:vertigo", { description: "Biological study has found Norton Commander to not contain any genetic material. It is observed to be 'soundlike' in nature, leading many to mythologize it as the sound blown from a goat horn.\n\nNorton Commander's propensity for violence implies that the horn it once came from did not get removed peacefully." }],
//         ["minecraft:chicken", { description: "Containment procedures dictate that all personnel should make a reasonable effort to enter and leave A Feast Before The Drought unit swiftly. Lingering too long causes a gradual increasing longing for nourishment.\n\nDuring Incident 00007348, the manager on site allowed the abnormality to breach, causing a hunger so ravenous that the abnormality was ripped apart using the manager's bare hands. The manager immediately felt a sense of bloating and satisfaction wash over them, despite not consuming any parts of the abnormality." }],
//         ["creaturefeature:stained_glass", { description: "WIP" }],
//         ["creaturefeature:mockingbird", { description: "Manager 019 observed 'Crude Drawing of an Angel' plastered on the rockcrete floor 45 days before encountering the evolution in the facility." }],
//         ["peaceless:harpy", { description: "Primarily nocturnal, it is advised that working procedures be done during the day to prevent the manager from being killed in the 'otherside' of the facility.\n\nTU AMIGO gets it name from its habit of dragging abnormalities out of containment units. Managers should suppress with the utmost speed, to avoid these 'AMIGOS'." }],
//         ["minecraft:villager", { description: "Rumors say this abnormality was formed by the Moonlit company itself using T-493. It is the recommendation of the company that these rumors be met with extreme doubt." }],
//         ["minecraft:zombie_villager", { description: "WIP" }],
//         ["minecraft:zombie", { description: "WIP" }],
//         ["creaturefeature:blossom", { description: "WIP" }],
//         ["creaturefeature:minds", { description: "WIP" }],
//         ["minecraft:frog", { description: "It looks like a frog, acts like a frog. But it's not a frog." }],
//         ["companions:cornelius", { description: "Cornelius' UNCHAINED form is the only known evolved abnormality that does nothing when breaching. Manager 0093's experiments has found Cornelius to enjoy feasting upon wild bees, becoming friendly to the manager in the process.\n\nOnce friendly, Cornelius will play a crude form of blackjack with the manager for Frogcoins using sneak and right click.\n\nCornelius does nothing when breaching, and can be calmed down with any denomination of frogcoin." }],
//         ["hedges_bestiary:goph", { description: "WIP" }],
//         ["opposing_force:furball", { description: "WIP" }],
//         ["hedges_bestiary:skib", { description: "WIP" }],
//         ["opposing_force:mushy", { description: "WIP" }],
//         ["companions:living_candle", { description: "Manager 0029 discovered Friends of Coal during a power outage pertaining to Incident 00292313. It is unknown where the coal it drops comes from, as material studies have not found traces of it inside of its own body." }],
//         /**
//          *   AMBER ABNORMALITIES
//          */
//         ["creaturefeature:machination", { description: "WIP" }],
//         ["creaturefeature:sinister", { description: "WIP" }],
//         ["minecraft:spider", { description: "WIP" }],
//         ["minecraft:cave_spider", { description: "WIP" }],
//         ["creaturefeature:dreamweaver", { description: "WIP" }],
//         ["minecraft:polar_bear", { description: "WIP" }],
//         ["creaturefeature:saint_solis", { description: "WIP" }],
//         ["minecraft:breeze", { description: "WIP" }],
//         ["creaturefeature:blitz", { description: "WIP" }],
//         ["minecraft:blaze", { description: "WIP" }],
//         ["minecraft:turtle", { description: "WIP" }],
//         ["peaceless:shrapin", { description: "WIP" }],
//         ["opposing_force:terror", { description: "WIP" }],
//         ["creaturefeature:beauty", { description: "WIP" }],
//         ["creaturefeature:fiend", { description: "WIP" }],
//         ["companions:broken_dinamo", { description: "WIP" }],
//         ["companions:illager_golem", { description: "WIP" }],
//         ["peaceless:shade", { description: "WIP" }],
//         ["antarchy:spit_bug", { description: "WIP" }],
//         ["opposing_force:bewilder", { description: "WIP" }],
//         ["creaturefeature:nothing", { description: "WIP" }],
//         ["antarchy:rolly_polly", { description: "WIP" }],
//         ["antarchy:red_ant", { description: "Empire Ant is one of three known insects the facility manager can enter. It's terrain is colloquially known as 'Thoraxis', an extremely harsh and hostile landscape filled with violent and distorting entities. Staying inside of Empire Ant is not recommended as it remains largely unexplored, and is considered manager abandonment.\n\nEscaping Empire Ant can be done through death or finding a paradoxal 'Red Ant'." }],
//         ["antarchy:stink_bug", { description: "Crust Punk is considered an extreme threat to your facility, and it's classification is only considered low due to the scale of its impact.\n\nImmediate suppression is recommended before it crawls into tiny holes and melts the facility with its odor." }],
//         ["antarchy:brown_ant", { description: "Exapunk is one of three known insects the facility manager can enter. It's terrain is colloquially known as 'Elythia', and is largely a peaceful and lush place with various threats sprinkled about. Staying inside of Exapunk is not recommended as it remains largely unexplored, and is considered manager abandonment.\n\nEscaping Exapunk can be done through death or finding a paradoxal 'Brown Ant'." }],
//         ["minecraft:ravager", { description: "WIP" }],
//         ["hedges_bestiary:burodon", { description: "WIP" }],
//         ["hedges_bestiary:plombo", { description: "WIP" }],
//         ["antarchy:jerry", { description: "Managerial guidelines for Jerry strictly advise the immediate isolation of the abnormality during its external gestation period.\n\nShould Jerry latch on to the head of a facility employee, it is directly advised to do a non-breaching suppression.\n\nThe Moonlit Company advises a strict no-research policy until Jerry has lost the ability to latch." }],
//         ["netherman:statue_entity", { description: "Managers must maintain eye conteact with Security! at all times when either in the containment unit or outside of it. It is seeminly unable to move when inside the physical visibility of a human.\n\nSecurity! is threatening when breaching primarily due to decreased managerial visibility and increased damage." }],
//         ["companions:hostile_puppet_glove", { description: "Meteora Blues is known to enjoy playing a high stakes game of rock-paper-scissors. Managers may use representative items if they are able to acquire them. Winning a few games will cause Meteora Blues to take a liking to the manager, permanently unbinding it from the Containment Unit. It can them merge with T-015 to become a useful asset to the company.\n\nWhen breaching, Meteora Blues is not hostile on its own. Suppression is encouraged as it has a tendency to throw nearby abnormalities from other Containment Units at facility managers." }],
//         ["opposing_force:scorcher", { description: "WIP" }],
//         ["creaturefeature:fend", { description: "WIP" }],
//         /**
//          *   MAROON ABNORMALITIES
//          */
//         ["scguns:viventrum", { description: "WIP" }],
//         ["creaturefeature:canary", { description: "WIP" }],
//         ["netherman:manipulator", { description: "WIP" }],
//         ["creaturefeature:coat_of_arms", { description: "WIP" }],
//         ["minecraft:rabbit", { description: "WIP" }],
//         ["creaturefeature:friend", { description: "WIP" }],
//         ["netherman:ghastly", { description: "WIP" }],
//         ["minecraft:ghast", { description: "WIP" }],
//         ["scguns:mother_ghast", { description: "WIP" }],
//         ["scguns:dissident", { description: "WIP" }],
//         ["scguns:praetor", { description: "Bart has been observed to prey on the week and feeble-minded employees that managers may attempt to assign to its Containment Unit. It is advised that none may enter or even get close to its containment unit.\n\nWhen breaching, Bart riles up abnormalities into breaching as well." }],
//         ["netherman:statue_bossunit", { description: "WIP" }],
//         ["netherman:gilded_golem", { description: "WIP" }],
//         ["antarchy:wasp", { description: "WIP" }],
//         ["scguns:hive", { description: "WIP" }],
//         ["minecraft:allay", { description: "WIP" }],
//         ["companions:golden_allay", { description: "WIP" }],
//         ["peaceless:mimic", { description: "WIP" }],
//         ["creaturefeature:cannonball_crab", { description: "WIP" }],
//         ["antarchy:crawling_blight", { description: "WIP" }],
//         ["antarchy:skulking_fright", { description: "WIP" }],
//         ["antarchy:termite", { description: "Artificial Death in the West is one of three known insects the facility manager can enter. It's terrain is colloquially known as 'Cavaryn', an underground cave infested with insectoid life forms.\nIt is imperative that any managers protect and preserve any life found in Cavaryn to avoid becoming a target by the hive mind.\n\n.Staying inside of 'Artificial Death in the West' is not recommended as it remains largely unexplored, and is considered manager abandonment.\n\nEscaping 'Artificial Death in the West' can be done through death or finding a paradoxal 'Termite'." }],
//         ["antarchy:elka", { description: "WIP" }],
//         ["antarchy:manticore", { description: "WIP" }],
//         ["antarchy:mantis", { description: "WIP" }],
//         ["antarchy:alpha_mantis", { description: "WIP" }],
//         ["antarchy:worm", { description: "WIP" }],
//         ["antarchy:moleworm", { description: "WIP" }],
//         ["antarchy:molevore", { description: "WIP" }],
//         ["scguns:sulfurhead", { description: "WIP" }],
//         ["antarchy:basilisk", { description: "WIP" }],
//         ["opposing_force:gusher", { description: "WIP" }],
//         ["antarchy:flytrap", { description: "WIP" }],
//         /**
//          * INDIGO ABNORMALITIES
//          */
//         ["netherman:doctor", { description: "Plague Doctor is an abnormal humanoid that came to the Moonlit Company willingly. It refuses any work done by managers, preferring the 'humble and meek' employees.\n\nPlague Doctor has been observed to be generally stable, though the company still has yet to determine why it came to the facility in the first place.\n\nIt has also been observed that employees working on Plague Doctor have elevated levels of dopamine. Researchers are unsure what Plague Doctor is doing to these Employees." }],
//         ["netherman:azazel", { description: "The Lord is my shepherd; I shall not want. I shall not seek that which has not been earned." }],
//         ["antarchy:stratoshark", { description: "Shark Smile has took down a collective 27 military and commercial flights in existence in the field.\nIts breaches are considered extremely due to Shark Smile's ability to peirce the heavens with its lightning, striking and killing everything in its holy light." }],
//         ["hedges_bestiary:endgel", { description: "Mythological Beauty swims through the space between the stars. It is the dark and the light, the life and death. It is a beauty to the eyes, and will instantly raise the threat level of your facility when it breaches." }],
//         ["minecraft:witch", { description: "Belispeak is a backwater witch discovered by field agent [REDACTED] in XXXX. Unlike most witches, Belispeak seemed to react strongly to the agent's Qliphoth meter, crying out in agony and attempting to perform a ritual before being suppressed in the field.\n\nWhen Belispeak's counter reaches 4, it will perform its ritual to force its own evolution.\n\nAny good or neutral work result will cause Qliphoth anomalies that irritate Belispeak, while bad work results calm it." }],
//         ["companions:sacred_pontiff", { description: "Fineshrine is the ascended Belispeak, and is the only known abnormality to devolve. When killed, it's heart is unbound from the ritual, and return back to its base humanoid form." }],
//         ["antarchy:nightmare", { description: "Deerhunter is the hunter of the black forest, smuggled into your facility by the harbinger. There are no known containment methods." }],
//         ["creaturefeature:detritus", { description: "Walking Wake was reclassified as Indigo after Incident 1021944. Once Walking Wake has begun its march towards death, little can stop it. Its waves of Detritus will wash over everything in its path, infesting your facility in a ceaseless fashion.\n\nYou are a pathetic creature of meat and bone, panting and sweating as you run through the corridors of your overtaken facility. How can you challenge a perfect, immortal army?\n\nDo not engage with Walking Wake. Do not enter its Containment Unit. Do not let it breach. There's nothing you really can do. " }],
//         ["opposing_force:dicer", { description: "Dancer in the Dark is part of a set of twin automatons corrupted by T-459. Its desire to dance has been bent towards violence, demanding the perfect performance. Its heart is enormous lake, black with potion. You are blind, and will drown in its ocean.\n\nBad work results will trigger Dancer in the Dark's autonomous elimination system, marking the manager for death. The next time a bad work result is performed by the manager, two autonomous Dancing Twins will be sent to kill the manager. The Moonlit Company recommends turning the dancer's propensitiy for violence on each of the dancers, using a diplomatic approach." }],
//         ["netherman:guardian", { description: "WIP" }],
//         ["antarchy:lucid", { description: "Rhinestone Eye's ability to transform the reality of a being has designated it an Indigo class abnormality. When gravity is inverted, it has been observed that Rhinestone Eye implants a center of mass significantly larger on the feet of humanoids. This causes strange phenomena, such as projectile weapons ceasing to do any damage.\n\nWhen breaching, Rhinestone Eye's gravity inversions become so intense that they periodically blind those nearby." }],
//         ["antarchy:vortex", { description: "Facility managers are advised to not enter Cowgirl Clue's containment unit under any circumstances. Those trapped in the vortex of this abnormalities wake often die slow and painful deaths, unless the containment unit is fitted with a way to vertically escape the containment unit.\n\nWhen breaching, Cowgirl Clue will cause nearby containment units to go in a frenzy, and use its strong vortexes to instantly suck up nearby managers." }],

//     ]);
//     for (let abnormality of abnormalities.keys()) {
//         fieldGuideEntries.push({
//             type: "entry",
//             id: abnormality
//         });
//         let data = abnormalities.get(`${abnormality}`);
//         translationKeys[`fieldguide.name.${abnormality.replace(":", ".")}`] = `§${getClassColor(data.tier)}${data.name}`

//         console.log(data)
//         translationKeys[`fieldguide.${abnormality.replace(":", ".")}.description`] = `ID: ${global.getAbnormalityName(data.tier, abnormality)} [${formatName(data.tier)}]\nQliphoth Counter: ${data.counter}${data.evolutions ? `\nEvolutions: ${data.evolutions.length}` : ""}${data.preferences ? `\n\n${getWorkPreferences(data.preferences)}` : ""}\n\nKnown information:\n${abnormalityDescs.get(`${abnormality}`).description}`
//         translationKeys[`fieldguide.${abnormality.replace(":", ".")}.hint`] = `Requires research level 3`
//     }
//     JsonIO.write(`kubejs/data/fieldguide/fieldguide/categories/abnormalities.json`, {
//         sort_index: 2,
//         icon: "fieldguide:textures/gui/icons/creeper.png",
//         contents: fieldGuideEntries
//     })
//     fieldGuideEntries = []
//     let TOOL_ABNORMALITIES = new Map([
//         ['supplementaries:clock_block', { num: 1, name: "Blood on the Clock Tower", hint: "Let the clock get a taste", summary: "It will only use its power of time travel with a living participant, drawing from their current energy pools to do so. \n\nIf Blood on the Clocktower is used on an empty stomach, it will draw directly from the user's soul energy, causing time related distortions." }],
//         ["whimsy_deco:red_phone", { num: 2, name: "E-Mergent-C Phone", hint: "Make a call", summary: "The voice behind the phone is colloquially known as 'the tongue of the devil'. Making a request of it seems to whip up random abnormalities in the facility into a frenzy." }],
//         ['whimsy_deco:horseshoe', { num: 3, name: "Horseshoe Theory", hint: "Place in front of a Containment Unit", summary: "Widely regarded as a safe abnormality, Horsehoe Theory resonates with nearby containment units, allowing the user to see the stats of them remotely." }],
//         ["whimsy_deco:gatcha_machine", { num: 4, name: "Gotchya Machine", hint: "Gotchya!", summary: "The earliest user of the Gotchya Machine was driven to believe she was a soldier in the british infantry during the 18th century.\nIt seems to draw in unknowing users with the promise of toys, occasionally causing psychic distortions that disrupt abnormalities." }],
//         ['abyssal_decor:bottomless_bag_of_dirt', { num: 5, name: "NIRVANA", hint: "Use it...", summary: "Careful usage of NIRVANA is advised, as spilling the bag may result in entombment. When handled carefully, an entirely safe abnormality." }],
//         ['minecraft:enchanting_table', { num: 6, name: "Eraserhead", hint: "Erase your head", summary: "It is not known if 'Eraserhead' is the being inside the table, or the table itself. Regardless, it seems to have a disdain for greed, chopping off the head of the user if it gives an enchantment that the user already has on the item it offers." }],
//         ["companions:frog_bonanza_block", { num: 7, name: "Gambledeath", hint: "Feed the beast", summary: "Gambledeath is a roguelike machine of froglike origin that can be fed coins. It seems to be malevolent, heavily punishing users with 'permadeath' if their luck fails." }],
//         ["scp:deaths_dynamic_shroud", { num: 8, name: "Death's Dynamic Shroud", hint: "Use on an abnormality", summary: "A farmer's tool that seems to magically rip apart organic matter from abnormalities. Doing so increases its Qliphoth Counter by 1." }],
//         ["scp:rubber_duck", { num: 9, name: "Rubber Duck", hint: "Get ducked", summary: "Promises of endless fortune are fortold by the Rubber Duck.\n The gold it drops seems to be at the expense of living abnormalities." }],
//         ["scp:spoon_bender", { num: 10, name: "Spoon Bender", hint: "Get bent", summary: "Spoon Benders are incredibly fast, presenting as simple garden gnomes. They seem to love small objects left around, instantly grabbing items no matter where they are located.\n\n Enjoys messing around with the internals of containment units, occasionally damaging them." }],
//         ['scguns:the_pact', { num: 11, name: "Devil Deeds Done Dirt Cheap", hint: "Make a deal", summary: "Not much is known about where the merchant that is summoned from Devil Deeds Done Dirt Cheap, or what happens to the abnormality when it is summoned. No adverse affects have been observed from usage in the last 45 years." }],
//         ['netherman:maze_door', { num: 12, name: "Slitherman", hint: "Activate Slitherman", summary: "When Slitherman was activated, a martyr for an unknown entity was summon from the gates of Slitherman's soul. After some study, this martyr was found to be harmless, so long as it was kept alive by facility management. Containment procedures require Slitherman's Martyr remain alive so long as there are abnormalities in the facility." }],
//         ["whimsy_deco:lucky_cat", { num: 13, name: "Unlucky Cat", hint: "Offer to the cat", summary: "The Unlucky Cat is a living statue that seems to feed off the corpses of abnormalities you may encounter in your facility. It doesn't like to share its food, but it will do so if it is traded for a 'different flavor of equivalent value', according to the Unlucky Cat.\n\nBartering with the Unlucky Cat seems to make abnormalities uneasy and fearful that the Unlucky Cat will come after their taste." }],
//         ["whimsy_deco:singing_frog", { num: 14, name: "Jamming Frog", hint: "Activate the Jamming Frog...", summary: "Normal containment procedures render the Jamming Frog as beneficial for facility management, as placing it down immediately fills the manager with wisdom. Unfortunately, this is a single use operation as the frog seems to lock itself in stasis until activated. UNDER NO CIRCUMSTANCES SHOULD A FACILITY MANAGER EVER ACTIVATE THE JAMMING FROG." }],
//         ["companions:empty_puppet_block", { num: 15, name: "Wooden Husk", hint: "Not yet implemented", summary: "Not yet implemented" }],
//         ["companions:croissant_egg_block", { num: 16, name: "Cafe Crustacean", hint: "Not yet implemented", summary: "Not yet implemented" }],
//         ['companions:soul_furnace_block', { num: 17, name: "Pulsewidth", hint: "Not yet implemented", summary: "Not yet implemented" }],
//         ['abyssal_decor:black_mold', { num: 18, name: "Wash My Hands", hint: "Place it down...", summary: "The Moonlit Company has yet to determine if 'Wash My Hands' has originated from this planet or another. It seems to be a conglomarate of living beings that rot solid materials into deepslate, and spreads onto softer materials such as dirt.\n\nCareful containment is required to prevent the swallowing up of all soil on earth by this abnormality." }],
//         ['whimsy_deco:recorder', {num: 19, name: "TV On the Radio", hint: "Take a message", summary: "TV On The Radio very simply tells the user how close they are to death, paralyzing them with fear. In your case, as the facility manager it tells you your facility's threat level.\nNo long term adverse effects have been recorded."}],
//         ["companions:respawn_totem_block", { num: 20, name: "Statute of Limitations", hint: "Not yet implemented", summary: "Not yet implemented" }],
//         ["companions:porcelain_pottery", { num: 25, name: "Pot of Greed", hint: "Feed the beast", summary: "The Pot of Greed is simple in its desire for money, and thus it is not dangerous." }],
//         ["companions:holy_porcelain_pottery", { num: 30, name: "Pot of Lust", hint: "Suck one up", summary: "Once thought to be a simple decoration, the Pot of Lust is an incredibly useful tool abnormality that can contain abnormalities inside of it. It has no known adverse effects" }],
//         ["whimsy_deco:lucky_cat", { num: 45, name: "Fortunate Son", hint: "Get Unlucky", summary: "With enough nutrients, the Unlucky Cat seems to have transformed into a completely different abnormality. Dull to the taste of flesh and bone, Fortunate Son craves only Enkephalin, outcompeting the Moonlit Company on price. It is mandated that facility managers dispose of Fortunate Son instead of giving it valuable Enkephalin, cutting into production metrics. When Fortunate Son is satiated, it turns back into Unlucky Cat, causing abnormalities to be driven into a frenzy..." }],
//         ["csr:clay_soldier", { num: 131, name: "Clay Soldier", hint: "Find R-131", summary: "Sentient mounds of clay can be found in an abnormal room of the facility. They appear to have a violent hatred of Clay Soldiers of a different color, though otherwise are safe to keep around.\n\nWhen a Clay Soldier picks up a Gold Inogt or Diamond, it will become the leader of the color. Gifting the leader a Clay Cookie will ally the team with the manager.\n\nThe Moonlit Company authorizes the usage of allied soldiers throughout the facility.\n- Assign a soldier to a Hamster Wheel using POI mode by left clicking the wheel and right clicking the Soldier (Currently bugged to only work in creaitve mode. Sorry!). Redstone Dust can be used on the wheel to turn it into a power generator.\n- Crop harvesting & planting, item pickup, and digging jobs can be assigned using POI and work mode.\m- Abnormality suprression using T-131 is possible but not advised due to the weakness of the abnormality." }]
//     ])
//     for (let abnormality of TOOL_ABNORMALITIES.keys()) {
//         fieldGuideEntries.push({
//             type: "entry",
//             id: abnormality
//         });
//         let data = TOOL_ABNORMALITIES.get(`${abnormality}`);
//         translationKeys[`fieldguide.name.${abnormality.replace(":", ".")}`] = `${data.name}`
//         translationKeys[`fieldguide.${abnormality.replace(":", ".")}.description`] = `ID: T-${String(data.num).padStart(3, '0')}\nClass: Tool\n\nKnown information:\n${data.summary}`
//         translationKeys[`fieldguide.${abnormality.replace(":", ".")}.hint`] = data.hint
//     }
//     JsonIO.write(`kubejs/data/fieldguide/fieldguide/categories/tool_abnormalities.json`, {
//         sort_index: 3,
//         icon: "fieldguide:textures/gui/icons/ore.png",
//         contents: fieldGuideEntries
//     })
//     fieldGuideEntries = []
//     let ROOM_ABNORMALITIES = new Map([
//         ['whimsy_deco:moroccan_sofa', { num: 2, name: "The Living Womb", hint: "Rest a bit", summary: "The inside of the Living Womb past its Sacred Veil is warm and inviting, causing those inside to not want to escape. A strange cassette plays on its tv, and the outer shell of the room is a solid wall of bone. Any personnel inside of the Living Womb may find themselves to peacefully pass, as the womb births fresh furniture in its place." }],
//         ['echoes:portal', { num: 3, name: "Timeless Echo", hint: "Enter the room", summary: "R-003 was created due to the improper use of T-001's time distorting properties by the Starlit Company. It contains nominial levels of Sculk infestation, but most importantly a Timeless Portal that takes personnel who enter it into a parallel dimension. Curiously, only items designated with the 'timeless' attribute can be taken out of the dimension, which is otherwise an encapsulated area." }],
//         ['scguns:sulfur_vent', { num: 5, name: "The Nutty Putty Cave", hint: "Enter the cave", summary: "Like R-006, the intern assigned to room transportation in the Moonlit Company seems to have mistaken a natural wonder of the world for an Abnormality. Given the fact that abnormalities can not become re-classified as normal, the Moonlit Company advises managers to make use of this room Vent Collectors for Sulfur." }],
//         ['scguns:geothermal_vent', { num: 6, name: "The Camuy Cave", hint: "Enter the cave", summary: "Like R-005, the intern assigned to room transportation in the Moonlit Company seems to have mistaken a natural wonder of the world for an Abnormality. Given the fact that abnormalities can not become re-classified as normal, the Moonlit Company advises managers to make use of this room Vent Collectors for Niter." }],
//         ['supplementaries:safe', { num: 9, name: "Shelter from the 27th of March", hint: "Stay inside...", summary: "The Starlit Company constructed the shelter at the request of the Moonlit Company after Incident 00593411 with the intent of creating the 'safest place on earth'. It has everything a human needs to survive, filling inhabitants with nutrients and life while they exist in the shelter. After the forced divestment of the two companies, the shelter seems to have corrupted from the broken will of the Starlit Company, causing chaos in the facility it was placed in. After investigation, it was found that shelter was perfectly functional for its intended purpose, but its definition of the 'safest place on earth' had shifted. If it was not the safest place, it would surely become it." }],
//         ['minecraft:chiseled_tuff_bricks', { num: 131, name: "Castle in the Clay", hint: "Enter the room", summary: "There is nothing particularly interesting or abnormal about the Castle in the Clay other then the fact that the abnormality T-131 arose from it suddenly during the inhabitants normal play hours. Said inhabitant was found alone in the room after their parents were flagged missing, ripped apart by a rabid group of T-131s commanded by the inhabitant." }],
//         ['abyssal_decor:rough_blood_coral', { num: 354, name: "Blood Pond", hint: "Enter the room", summary: "R-354 is a small sample from a larger body of water located in an undisclosed location. It consists entirely of human blood, and abnormal beings occasionally will rise from the pool. The Moonlit Company recommends automated suppression of abnormal beings though the use of turrets." }],
//     ])
//     for (let abnormality of ROOM_ABNORMALITIES.keys()) {
//         fieldGuideEntries.push({
//             type: "entry",
//             id: abnormality
//         });
//         let data = ROOM_ABNORMALITIES.get(`${abnormality}`);
//         translationKeys[`fieldguide.name.${abnormality.replace(":", ".")}`] = `${data.name}`
//         translationKeys[`fieldguide.${abnormality.replace(":", ".")}.description`] = `ID: R-${String(data.num).padStart(3, '0')}\nClass: Room\n\nKnown information:\n${data.summary}`
//         translationKeys[`fieldguide.${abnormality.replace(":", ".")}.hint`] = data.hint
//     }
//     JsonIO.write(`kubejs/data/fieldguide/fieldguide/categories/room_abnormalities.json`, {
//         sort_index: 4,
//         icon: "fieldguide:textures/gui/icons/book.png",
//         contents: fieldGuideEntries
//     })
//     JsonIO.write(`kubejs/assets/fieldguide/lang/en_us.json`, translationKeys);
// }