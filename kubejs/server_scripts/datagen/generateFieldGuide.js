
if (true) {
    let formatName = (type) => type.charAt(0).toUpperCase() + type.slice(1);
    let getWorkPrefToString = (num) => {
        switch (num) {
            case 0: return "Loved"
            case 1: return "Liked"
            case 2: return "Neutral"
            case 3: return "Disliked"
            default:
            case 4: return "Hated"
        }
    }
    let getWorkPreferences = (preferences) => `Work preferences:\n- Violence: ${getWorkPrefToString(preferences.violence)}\n- Insight: ${getWorkPrefToString(preferences.insight)}\n- Harmony: ${getWorkPrefToString(preferences.harmony)}`
    let fieldGuideEntries = []
    let translationKeys = {}
    translationKeys["category.fieldguide.fieldguide.abnormalities"] = "Abnormalities";
    for (let abnormality of global.ABNORMALITIES.keys()) {
        fieldGuideEntries.push({
            type: "entry",
            id: abnormality
        });
        let data = global.ABNORMALITIES.get(`${abnormality}`);
        translationKeys[`fieldguide.name.${abnormality.replace(":", ".")}`] = `${data.name}`
        translationKeys[`fieldguide.${abnormality.replace(":", ".")}.description`] = `ID: ${global.getAbnormalityName(data.class, abnormality)}\nClass: ${formatName(data.class)}\nQliphoth Counter: ${data.counter}\nEvolutions: ${data.evolutions ? data.evolutions.length : "None"}${data.preferences ? `\n\n${getWorkPreferences(data.preferences)}` : ""}`
        translationKeys[`fieldguide.${abnormality.replace(":", ".")}.hint`] = `Requires research level 3`
    }
    let TOOL_ABNORMALITIES = new Map([
        ['supplementaries:clock_block', { num: 1, name: "Blood on the Clock Tower", hint: "Let the clock get a taste", summary: "It will only use its power of time travel with a living participant, drawing from their current energy pools to do so. \n\nIf Blood on the Clocktower is used on an empty stomach, it will draw directly from the user's soul energy, causing time related distortions." }],
        ["whimsy_deco:red_phone", { num: 2, name: "E-Mergent-C Phone", hint: "Make a call", summary: "The voice behind the phone is colloquially known as 'the tongue of the devil'. Making a request of it seems to whip up random abnormalities in the facility into a frenzy." }],
        ['whimsy_deco:horseshoe', { num: 3, name: "Horseshoe Theory", hint: "Place in front of a Containment Unit", summary: "Widely regarded as a safe abnormality, Horsehoe Theory resonates with nearby containment units, allowing the user to see the stats of them remotely." }],
        ["whimsy_deco:gatcha_machine", { num: 4, name: "Gotchya Machine", hint: "Gotchya!", summary: "The earliest user of the Gotchya Machine was driven to believe she was a soldier in the british infantry during the 18th century.\nIt seems to draw in unknowing users with the promise of toys, occasionally causing psychic distortions that disrupt abnormalities." }],
        ['abyssal_decor:bottomless_bag_of_dirt', { num: 5, name: "NIRVANA", hint: "Use it...", summary: "Careful usage of NIRVANA is advised, as spilling the bag may result in entombment. When handled carefully, an entirely safe abnormality." }],
        ['minecraft:enchanting_table', { num: 6, name: "Eraserhead", hint: "Erase your head", summary: "It is not known of 'Eraserhead' is a being inside the table, or the table itself. Regardless, it seems to have a disdain for greed, chopping off the head of the user if it gives an enchantment that the user already has on the item it offers." }],
        ["companions:frog_bonanza_block", { num: 7, name: "Gambledeath", hint: "Feed the beast", summary: "Gambledeath is a roguelike machine of froglike orgins that can be fed coins. It seems to be malevolent, heavily punishing users with 'permadeath' if their luck fails." }],
        ["scp:rubber_duck", { num: 9, name: "Rubber Duck", hint: "Get ducked", summary: "Promises of endless fortune are fortold by the Rubber Duck.\n The gold it drops seems to be at the expense of living abnormalities." }],
        ["scp:spoon_bender", { num: 10, name: "Spoon Bender", hint: "Get bent", summary: "Spoon Benders are incredibly fast, presenting as simple garden gnomes. They seem to love small objects left around, instantly grabbing items no matter where they are located.\n\n Enjoys messing around with the internals of containment units, occasionally damaging them." }],
        ['scguns:the_pact', { num: 11, name: "Devil Deeds Done Dirt Cheap", hint: "Make a deal", summary: "Not much is known about where the merchant that is summoned form Devil Deeds Done Dirt Cheap, or what happens to the abnormality when it is summoned. No adverse affects have been observed from usage in the last 45 years." }],
        ['netherman:maze_door', { num: 12, name: "Slitherman", hint: "Activate Slitherman", summary: "Not yet implemented" }],
        ["whimsy_deco:lucky_cat", { num: 13, name: "Unlucky Cat", hint: "Not yet implemented", summary: "Not yet implemented" }],
        ["whimsy_deco:singing_frog", { num: 14, name: "Jamming Frog", hint: "Not yet implemented", summary: "Not yet implemented" }],
        ["companions:empty_puppet_block", { num: 15, name: "Wooden Husk", hint: "Not yet implemented", summary: "Not yet implemented" }],
        ["companions:croissant_egg_block", { num: 16, name: "Cafe Crustacean", hint: "Not yet implemented", summary: "Not yet implemented" }],
        ['companions:soul_furnace_block', { num: 17, name: "Pulsewidth", hint: "Not yet implemented", summary: "Not yet implemented" }],
        ["companions:respawn_totem_block", { num: 20, name: "Statute of Limitations", hint: "Not yet implemented", summary: "Not yet implemented" }],
        ["companions:porcelain_pottery", { num: 25, name: "Pot of Greed", hint: "Feed the beast", summary: "The Pot of Greed is simple in its desire for money, and thus it is not dangerous." }],
        ["companions:holy_porcelain_pottery", { num: 30, name: "Pot of Lust", hint: "Not yet implemented", summary: "Not yet implemented" }],
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

