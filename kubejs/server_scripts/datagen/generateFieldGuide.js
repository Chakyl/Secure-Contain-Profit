
if (true) {
    let getClassColor = (tier) => {
        switch (tier) {
            case "amber": return 6;
            case "maroon": return 4;
            case "indigo": return 1;
            default:
            case "verdant": return 2;
        }
    }
    let formatName = (type) => type.charAt(0).toUpperCase() + type.slice(1);
    let getWorkPrefToString = (num) => {
        switch (num) {
            case -1: return "Always GOOD"
            case 0: return "Loved"
            case 1: return "Liked"
            case 2: return "Neutral"
            case 3: return "Disliked"
            case 4: return "Hated"
            default:
            case 5: return "Always BAD"
        }
    }
    let getWorkPreferences = (preferences) => `Work preferences:\n- Violence: ${getWorkPrefToString(preferences.violence)}\n- Insight: ${getWorkPrefToString(preferences.insight)}\n- Harmony: ${getWorkPrefToString(preferences.harmony)}`
    let fieldGuideEntries = []
    let translationKeys = {}
    translationKeys["category.fieldguide.fieldguide.abnormalities"] = "Abnormalities";
    let abnormalityDescs = new Map([
        /**
         *   VERDANT ABNORMALITIES
         */
        // Pig line
        ["minecraft:pig", { description: "It looks like a pig, acts like a pig. But it's not a pig." }],
        ["minecraft:piglin", { description: "WIP" }],
        ["minecraft:piglin_brute", { description: "WIP" }],
        ["minecraft:zombified_piglin", { description: "WIP" }],
        ["minecraft:creeper", { description: "Evolution has torn apart the DNA of the ZUSHI, causing it to only vaguely resemble itself. Its explosions are anomalous in nature, causing some other being to return it back from the dead. This seems to make abnormalities at the facility uncomfortable." }],
        ["creaturefeature:pathogen", { description: "Difficult to contain due to its ability to phase through solid matter and harbor inside living beings. Quick suppression is advised due to the ability for the Pathogen to entirely leave the facility at any time, though it will return to its containment unit the next day out of habit." }],
        ["creaturefeature:minedflayer", { description: "WIP" }],
        ["minecraft:goat", { description: "It looks like a goat, acts like a goat. But it's not a goat." }],
        ['antarchy:ouranwood_deer', { description: "Halcyon Digest has been called 'the harbinger of the black forest' as it often seeing fleeing in the peripheral of a person about to experience great agony.\n\nResearchers have noted that this phenomona only exists when Halcyon Digest is in distress, despite warned test subjects being in otherwise no harm whatsoever.\n\nIt has been observed that Halcyon Digest often winces in pain after a new abnormality is brought to the facility, as if something inside of it is agitated. The reclassification of Halcyon Digest to Indigo is pending after the advisory of T-999." }],
        ["creaturefeature:vertigo", { description: "Biological study has found Norton Commander to not contain any genetic material. It is observed to be 'soundlike' in nature, leading many to mythologize it as the sound blown from a goat horn.\n\nNorton Commander's propensity for violence implies that the horn it once came from did not get removed peacefully." }],
        ["minecraft:chicken", { description: "It looks like a chicken, acts like a chicken. But it's not a chicken." }],
        ["creaturefeature:stained_glass", { description: "WIP" }],
        ["creaturefeature:mockingbird", { description: "Manager 019 observed 'Crude Drawing of an Angel' plastered on the rockcrete floor 45 days before encountering the evolution in the facility." }],
        ["peaceless:harpy", { description: "Primarily nocturnal, it is advised that working procedures be done during the day to prevent the manager from being killed in the 'otherside' of the facility.\n\nTU AMIGO gets it name from its habit of dragging abnormalities out of containment units. Managers should suppress with the utmost speed, to avoid these 'AMIGOS'." }],
        ["minecraft:villager", { description: "Rumors say this abnormality was formed by the Moonlit company itself using T-493. It is the recommendation of the company that these rumors be met with extreme doubt." }],
        ["minecraft:zombie_villager", { description: "WIP" }],
        ["minecraft:zombie", { description: "WIP" }],
        ["creaturefeature:blossom", { description: "WIP" }],
        ["creaturefeature:minds", { description: "WIP" }],
        ["minecraft:frog", { description: "It looks like a frog, acts like a frog. But it's not a frog." }],
        ["companions:cornelius", { description: "Cornelius' UNCHAINED form is the only known evolved abnormality that does nothing when breaching. Manager 0093's experiments has found Cornelius to enjoy feasting upon wild bees, becoming friendly to the manager in the process.\n\nOnce friendly, Cornelius will play a crude form of blackjack with the manager for Frogcoins using sneak and right click.\n\nCornelius does nothing when breaching, and can be calmed down with any denomination of frogcoin." }],
        ["companions:living_candle", { description: "Manager 0029 discovered Friends of Coal during a power outage pertaining to Incident 00292313. It is unknown where the coal it drops comes from, as material studies have not found traces of it inside of its own body." }],
        /**
         *   AMBER ABNORMALITIES
         */
        ["creaturefeature:machination", { description: "WIP" }],
        ["creaturefeature:sinister", { description: "WIP" }],
        ["minecraft:spider", { description: "WIP" }],
        ["minecraft:cave_spider", { description: "WIP" }],
        ["creaturefeature:dreamweaver", { description: "WIP" }],
        ["minecraft:polar_bear", { description: "WIP" }],
        ["creaturefeature:saint_solis", { description: "WIP" }],
        ["minecraft:breeze", { description: "WIP" }],
        ["creaturefeature:blitz", { description: "WIP" }],
        ["minecraft:blaze", { description: "WIP" }],
        ["minecraft:turtle", { description: "WIP" }],
        ["peaceless:shrapin", { description: "WIP" }],
        ["creaturefeature:beauty", { description: "WIP" }],
        ["creaturefeature:fiend", { description: "WIP" }],
        ["companions:broken_dinamo", { description: "WIP" }],
        ["companions:illager_golem", { description: "WIP" }],
        ["peaceless:shade", { description: "WIP" }],
        ["antarchy:spit_bug", { description: "WIP" }],
        ["opposing_force:bewilder", { description: "WIP" }],
        ["creaturefeature:nothing", { description: "WIP" }],
        ["antarchy:rolly_polly", { description: "WIP" }],
        ["antarchy:red_ant", { description: "WIP" }],
        ["antarchy:stink_bug", { description: "WIP" }],
        ["antarchy:brown_ant", { description: "WIP" }],
        ["antarchy:jerry", { description: "WIP" }],
        ["netherman:statue_entity", { description: "WIP" }],
        ["companions:hostile_puppet_glove", { description: "WIP" }],
        ["opposing_force:scorcher", { description: "WIP" }],
        /**
         *   MAROON ABNORMALITIES
         */
        ["scguns:viventrum", { description: "WIP" }],
        ["creaturefeature:canary", { description: "WIP" }],
        ["netherman:manipulator", { description: "WIP" }],
        ["creaturefeature:coat_of_arms", { description: "WIP" }],
        ["minecraft:rabbit", { description: "WIP" }],
        ["creaturefeature:friend", { description: "WIP" }],
        ["antarchy:easter_bunny", { description: "WIP" }],
        ["netherman:ghastly", { description: "WIP" }],
        ["minecraft:ghast", { description: "WIP" }],
        ["scguns:mother_ghast", { description: "WIP" }],
        ["scguns:dissident", { description: "WIP" }],
        ["scguns:praetor", { description: "WIP" }],
        ["netherman:statue_bossunit", { description: "WIP" }],
        ["netherman:gilded_golem", { description: "WIP" }],
        ["antarchy:wasp", { description: "WIP" }],
        ["scguns:hive", { description: "WIP" }],
        ["minecraft:allay", { description: "WIP" }],
        ["companions:golden_allay", { description: "WIP" }],
        ["peaceless:mimic", { description: "WIP" }],
        ["creaturefeature:cannonball_crab", { description: "WIP" }],
        ["antarchy:crawling_blight", { description: "WIP" }],
        ["antarchy:skulking_fright", { description: "WIP" }],
        ["antarchy:termite", { description: "WIP" }],
        ["antarchy:elka", { description: "WIP" }],
        ["antarchy:manticore", { description: "WIP" }],
        ["antarchy:mantis", { description: "WIP" }],
        ["antarchy:alpha_mantis", { description: "WIP" }],
        ["antarchy:worm", { description: "WIP" }],
        ["antarchy:moleworm", { description: "WIP" }],
        ["antarchy:molevore", { description: "WIP" }],
        ["scguns:sulfurhead", { description: "WIP" }],
        ["antarchy:flytrap", { description: "WIP" }],
        ["antarchy:lucid", { description: "WIP" }],
        ["antarchy:vortex", { description: "Facility managers are advised to not enter Cowgirl Clue's containment unit under any circumstances. Those trapped in the vortex of this abnormalities wake often die slow and painful deaths, unless the containment unit is fitted with a way to vertically escape the containment unit." }],
        /**
         * INDIGO ABNORMALITIES
         */
        
        ["creaturefeature:detritus", { description: "WIP" }],
        ["antarchy:nightmare", { description: "Deerhunter is the hunter of the black forest, smuggled into your facility by the harbinger. There are no known containment methods." }],
    ]);
    for (let abnormality of global.ABNORMALITIES.keys()) {
        fieldGuideEntries.push({
            type: "entry",
            id: abnormality
        });
        let data = global.ABNORMALITIES.get(`${abnormality}`);
        translationKeys[`fieldguide.name.${abnormality.replace(":", ".")}`] = `§${getClassColor(data.class)}${data.name}`

        console.log(data)
        translationKeys[`fieldguide.${abnormality.replace(":", ".")}.description`] = `ID: ${global.getAbnormalityName(data.class, abnormality)} [${formatName(data.class)}]\nQliphoth Counter: ${data.counter}${data.evolutions ? `\nEvolutions: ${data.evolutions.length}` : ""}${data.preferences ? `\n\n${getWorkPreferences(data.preferences)}` : ""}\n\nKnown information:\n${abnormalityDescs.get(`${abnormality}`).description}`
        translationKeys[`fieldguide.${abnormality.replace(":", ".")}.hint`] = `Requires research level 3`
    }
    let TOOL_ABNORMALITIES = new Map([
        ['supplementaries:clock_block', { num: 1, name: "Blood on the Clock Tower", hint: "Let the clock get a taste", summary: "It will only use its power of time travel with a living participant, drawing from their current energy pools to do so. \n\nIf Blood on the Clocktower is used on an empty stomach, it will draw directly from the user's soul energy, causing time related distortions." }],
        ["whimsy_deco:red_phone", { num: 2, name: "E-Mergent-C Phone", hint: "Make a call", summary: "The voice behind the phone is colloquially known as 'the tongue of the devil'. Making a request of it seems to whip up random abnormalities in the facility into a frenzy." }],
        ['whimsy_deco:horseshoe', { num: 3, name: "Horseshoe Theory", hint: "Place in front of a Containment Unit", summary: "Widely regarded as a safe abnormality, Horsehoe Theory resonates with nearby containment units, allowing the user to see the stats of them remotely." }],
        ["whimsy_deco:gatcha_machine", { num: 4, name: "Gotchya Machine", hint: "Gotchya!", summary: "The earliest user of the Gotchya Machine was driven to believe she was a soldier in the british infantry during the 18th century.\nIt seems to draw in unknowing users with the promise of toys, occasionally causing psychic distortions that disrupt abnormalities." }],
        ['abyssal_decor:bottomless_bag_of_dirt', { num: 5, name: "NIRVANA", hint: "Use it...", summary: "Careful usage of NIRVANA is advised, as spilling the bag may result in entombment. When handled carefully, an entirely safe abnormality." }],
        ['minecraft:enchanting_table', { num: 6, name: "Eraserhead", hint: "Erase your head", summary: "It is not known if 'Eraserhead' is the being inside the table, or the table itself. Regardless, it seems to have a disdain for greed, chopping off the head of the user if it gives an enchantment that the user already has on the item it offers." }],
        ["companions:frog_bonanza_block", { num: 7, name: "Gambledeath", hint: "Feed the beast", summary: "Gambledeath is a roguelike machine of froglike origin that can be fed coins. It seems to be malevolent, heavily punishing users with 'permadeath' if their luck fails." }],
        ["scp:deaths_dynamic_shroud", { num: 8, name: "Death's Dynamic Shroud", hint: "Use on an abnormality", summary: "A farmer's tool that seems to magically rip apart organic matter from abnormalities. Doing so increases its Qliphoth Counter by 1." }],
        ["scp:rubber_duck", { num: 9, name: "Rubber Duck", hint: "Get ducked", summary: "Promises of endless fortune are fortold by the Rubber Duck.\n The gold it drops seems to be at the expense of living abnormalities." }],
        ["scp:spoon_bender", { num: 10, name: "Spoon Bender", hint: "Get bent", summary: "Spoon Benders are incredibly fast, presenting as simple garden gnomes. They seem to love small objects left around, instantly grabbing items no matter where they are located.\n\n Enjoys messing around with the internals of containment units, occasionally damaging them." }],
        ['scguns:the_pact', { num: 11, name: "Devil Deeds Done Dirt Cheap", hint: "Make a deal", summary: "Not much is known about where the merchant that is summoned from Devil Deeds Done Dirt Cheap, or what happens to the abnormality when it is summoned. No adverse affects have been observed from usage in the last 45 years." }],
        ['netherman:maze_door', { num: 12, name: "Slitherman", hint: "Activate Slitherman", summary: "When Slitherman was activated, a martyr for an unknown entity was summon from the gates of Slitherman's soul. After some study, this martyr was found to be harmless, so long as it was kept alive by facility management. Containment procedures require Slitherman's Martyr remain alive so long as there are abnormalities in the facility." }],
        ["whimsy_deco:lucky_cat", { num: 13, name: "Unlucky Cat", hint: "Offer to the cat", summary: "The Unlucky Cat is a living statue that seems to feed off the corpses of abnormalities you may encounter in your facility. It doesn't like to share its food, but it will do so if it is traded for a 'different flavor of equivalent value', according to the Unlucky Cat.\n\nBartering with the Unlucky Cat seems to make abnormalities uneasy and fearful that the Unlucky Cat will come after their taste." }],
        ["whimsy_deco:singing_frog", { num: 14, name: "Jamming Frog", hint: "Activate the Jamming Frog...", summary: "Normal containment procedures render the Jamming Frog as beneficial for facility management, as placing it down immediately fills the manager with wisdom. Unfortunately, this is a single use operation as the frog seems to lock itself in stasis until activated. UNDER NO CIRCUMSTANCES SHOULD A FACILITY MANAGER EVER ACTIVATE THE JAMMING FROG." }],
        ["companions:empty_puppet_block", { num: 15, name: "Wooden Husk", hint: "Not yet implemented", summary: "Not yet implemented" }],
        ["companions:croissant_egg_block", { num: 16, name: "Cafe Crustacean", hint: "Not yet implemented", summary: "Not yet implemented" }],
        ['companions:soul_furnace_block', { num: 17, name: "Pulsewidth", hint: "Not yet implemented", summary: "Not yet implemented" }],
        ['abyssal_decor:black_mold', { num: 18, name: "Wash My Hands", hint: "Place it down...", summary: "The Moonlit Company has yet to determine if 'Wash My Hands' has originated from this planet or another. It seems to be a conglomarate of living beings that rot solid materials into deepslate, and spreads onto softer materials such as dirt.\n\nCareful containment is required to prevent the swallowing up of all soil on earth by this abnormality." }],
        ["companions:respawn_totem_block", { num: 20, name: "Statute of Limitations", hint: "Not yet implemented", summary: "Not yet implemented" }],
        ["companions:porcelain_pottery", { num: 25, name: "Pot of Greed", hint: "Feed the beast", summary: "The Pot of Greed is simple in its desire for money, and thus it is not dangerous." }],
        ["companions:holy_porcelain_pottery", { num: 30, name: "Pot of Lust", hint: "Suck one up", summary: "Once thought to be a simple decoration, the Pot of Lust is an incredibly useful tool abnormality that can contain abnormalities inside of it. It has no known adverse effects" }],
        ["whimsy_deco:lucky_cat", { num: 45, name: "Fortunate Son", hint: "Get Unlucky", summary: "With enough nutrients, the Unlucky Cat seems to have transformed into a completely different abnormality. Dull to the taste of flesh and bone, Fortunate Son craves only Enkephalin, outcompeting the Moonlit Company on price. It is mandated that facility managers dispose of Fortunate Son instead of giving it valuable Enkephalin, cutting into production metrics. When Fortunate Son is satiated, it turns back into Unlucky Cat, causing abnormalities to be driven into a frenzy..." }],
    ])
    for (let abnormality of TOOL_ABNORMALITIES.keys()) {
        fieldGuideEntries.push({
            type: "entry",
            id: abnormality
        });
        let data = TOOL_ABNORMALITIES.get(`${abnormality}`);
        translationKeys[`fieldguide.name.${abnormality.replace(":", ".")}`] = `${data.name}`
        translationKeys[`fieldguide.${abnormality.replace(":", ".")}.description`] = `ID: T-${String(data.num).padStart(3, '0')}\nClass: Tool\n\nKnown information:\n${data.summary}`
        translationKeys[`fieldguide.${abnormality.replace(":", ".")}.hint`] = data.hint
    }
    JsonIO.write(`kubejs/assets/fieldguide/lang/en_us.json`, translationKeys);
    JsonIO.write(`kubejs/data/fieldguide/fieldguide/categories/abnormalities.json`, {
        sort_index: 2,
        icon: "fieldguide:textures/gui/icons/creeper.png",
        contents: fieldGuideEntries
    })
}