const shops = [
    {
        id: "facility",
        jeiCatalyst: "scp:verdant_hallway_expansion_card",
        trades: [
            { item: 'scguns:syringe', count: 4, numiCost: 1 },
            { item: 'abyssal_decor:cave_taco', count: 4, numiCost: 1 },
            { item: 'companions:wrench', count: 1, numiCost: 16 },
            { item: 'scguns:anthralite_paxel', count: 1, numiCost: 16 },
            { item: "scp:verdant_hallway_expansion_card", count: 1, itemCost1: { item: 'scp:enkephalin', count: 6 } },
            { item: "scp:verdant_containment_expansion_card", count: 1, itemCost1: { item: 'scp:enkephalin', count: 3 } },
            { item: "scp:amber_hallway_expansion_card", count: 1, itemCost1: { item: 'scp:enkephalin', count: 16 } },
            { item: "scp:amber_containment_expansion_card", count: 1, itemCost1: { item: 'scp:enkephalin', count: 8 } },
            { item: "scp:maroon_hallway_expansion_card", count: 1, itemCost1: { item: 'scp:enkephalin', count: 32 } },
            { item: "scp:maroon_containment_expansion_card", count: 1, itemCost1: { item: 'scp:enkephalin', count: 16 } },
            { item: "scp:indigo_hallway_expansion_card", count: 1, itemCost1: { item: 'scp:enkephalin', count: 64 } },
            { item: "scp:indigo_containment_expansion_card", count: 1, itemCost1: { item: 'scp:enkephalin', count: 32 } },
            { item: "scp:vent_expansion_card", count: 1, numiCost: 64 },
            { item: "numismatics:bank_terminal", count: 1, numiCost: 16 },
            { item: "numismaticsutils:portable_bank_terminal", count: 1, numiCost: 128 },
            { item: "numismaticsutils:bank_meter", count: 1, numiCost: 16 },
            { item: "scguns:anthralite_lamp", count: 1, itemCost1: { item: 'scp:enkephalin', count: 1 } }
        ]
    },
    {
        id: "blocks",
        jeiCatalyst: "industrialhellscape:metalworks",
        trades: [
            { item: 'industrialhellscape:inhell_haven_device', numiCost: 64 },
            { item: "industrialhellscape:gray_rockrete", count: 8, numiCost: 8 },
            { item: "industrialhellscape:duct", count: 8, numiCost: 16 },
            { item: "industrialhellscape:horizontal_vesselplate", count: 8, numiCost: 16 },
            { item: "industrialhellscape:truss", count: 8, numiCost: 16 },
            { item: "industrialhellscape:vesselglass", count: 8, numiCost: 16 },
            { item: "industrialhellscape:metalworks", count: 8, numiCost: 24 },
            { item: "industrialhellscape:pipeworks", count: 8, numiCost: 32 },
            { item: "industrialhellscape:ihea_furniture_kit", count: 8, numiCost: 32 },
            { item: 'industrialhellscape:stamped_metal_door', count: 1, numiCost: 8 },
            { item: 'industrialhellscape:bulkhead_door', count: 1, numiCost: 8 },
            { item: "industrially_plated:white_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:light_gray_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:gray_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:black_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:brown_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:maroon_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:rose_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:red_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:coral_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:ginger_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:orange_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:tan_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:beige_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:yellow_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:amber_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:olive_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:lime_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:forest_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:green_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:verdant_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:teal_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:cyan_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:mint_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:aqua_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:light_blue_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:blue_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:slate_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:navy_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:indigo_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:purple_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:magenta_plating_block", count: 8, numiCost: 16 },
            { item: "industrially_plated:pink_plating_block", count: 8, numiCost: 16 },
            { item: 'industrially_plated:hazard_stripe_block', count: 8, numiCost: 16 }
        ]
    },
    {
        id: "guns",
        jeiCatalyst: "scguns:defender_pistol",
        trades: [

            { item: "scguns:pax", numiCost: 1024, itemCost1: { item: 'scp:enkephalin', count: 1 } },
            { item: "scguns:mak_mkii", numiCost: 1024, itemCost1: { item: 'scp:enkephalin', count: 1 } },
            { item: "scguns:winnie", numiCost: 1024, itemCost1: { item: 'scp:enkephalin', count: 1 } },

            { item: "scguns:makeshift_rifle", numiCost: 4096, itemCost1: { item: 'scp:enkephalin', count: 4 } },
            { item: "scguns:birdfeeder", numiCost: 4096, itemCost1: { item: 'scp:enkephalin', count: 4 } },
            { item: "scguns:llr_director", numiCost: 4096, itemCost1: { item: 'scp:enkephalin', count: 4 } },

            { item: "scguns:defender_pistol", numiCost: 16384, itemCost1: { item: 'scp:enkephalin', count: 8 } },
            { item: "scguns:greaser_smg", numiCost: 16384, itemCost1: { item: 'scp:enkephalin', count: 8 } },
            { item: "scguns:grandle_og", numiCost: 16384, itemCost1: { item: 'scp:enkephalin', count: 8 } },

            { item: "scguns:callwell_terminal", numiCost: 65536, itemCost1: { item: 'scp:enkephalin', count: 16 } },
            { item: "scguns:combat_shotgun", numiCost: 65536, itemCost1: { item: 'scp:enkephalin', count: 16 } },
            { item: "scguns:jr_wristbreaker", numiCost: 65536, itemCost1: { item: 'scp:enkephalin', count: 16 } },

            { item: "scguns:lockewood", numiCost: 1024, itemCost1: { item: 'scp:enkephalin', count: 1 } },
            { item: "scguns:spirulida", numiCost: 4096, itemCost1: { item: 'scp:enkephalin', count: 4 } },
            { item: "scguns:iron_javelin", numiCost: 16384, itemCost1: { item: 'scp:enkephalin', count: 8 } }
        ]
    },
    {
        id: "ammunition",
        jeiCatalyst: "scguns:standard_copper_round",
        trades: [
            { item: "scguns:compact_copper_round", count: 8, numiCost: 4 },
            { item: "scguns:standard_copper_round", count: 8, numiCost: 16 },
            { item: "scguns:compact_advanced_round", count: 8, numiCost: 64 },
            { item: "scguns:advanced_round", count: 8, numiCost: 128 },
            { item: "scguns:shotgun_shell", count: 4, numiCost: 32 },
        ]
    },
    {
        id: "armor",
        jeiCatalyst: "scguns:anthralite_chestplate",
        trades: [
            { item: "scguns:anthralite_respirator", itemCost1: { item: 'scp:enkephalin', count: 1 } },
            { item: "scguns:anthralite_chestplate", itemCost1: { item: 'scp:enkephalin', count: 2 } },
            { item: "scguns:anthralite_leggings", itemCost1: { item: 'scp:enkephalin', count: 2 } },
            { item: "scguns:anthralite_boots", itemCost1: { item: 'scp:enkephalin', count: 1 } },
            { item: "scguns:diamond_steel_helmet", itemCost1: { item: 'scp:enkephalin', count: 2 } },
            { item: "scguns:diamond_steel_chestplate", itemCost1: { item: 'scp:enkephalin', count: 3 } },
            { item: "scguns:diamond_steel_leggings", itemCost1: { item: 'scp:enkephalin', count: 3 } },
            { item: "scguns:diamond_steel_boots", itemCost1: { item: 'scp:enkephalin', count: 2 } },
            { item: "scguns:treated_brass_helmet", itemCost1: { item: 'scp:enkephalin', count: 4 } },
            { item: "scguns:treated_brass_chestplate", itemCost1: { item: 'scp:enkephalin', count: 6 } },
            { item: "scguns:treated_brass_leggings", itemCost1: { item: 'scp:enkephalin', count: 6 } },
            { item: "scguns:treated_brass_boots", itemCost1: { item: 'scp:enkephalin', count: 4 } },
            { item: "scguns:exo_suit_helmet", itemCost1: { item: 'scp:enkephalin', count: 16 }, itemCost2: { item: 'creaturefeature:coat_scraps', count: 1 } },
            { item: "scguns:exo_suit_chestplate", itemCost1: { item: 'scp:enkephalin', count: 24 }, itemCost2: { item: 'creaturefeature:coat_scraps', count: 2 } },
            { item: "scguns:exo_suit_leggings", itemCost1: { item: 'scp:enkephalin', count: 24 }, itemCost2: { item: 'creaturefeature:coat_scraps', count: 2 } },
            { item: "scguns:exo_suit_boots", itemCost1: { item: 'scp:enkephalin', count: 16 }, itemCost2: { item: 'creaturefeature:coat_scraps', count: 1 } }
        ]
    },
]

const coinMap = [
    { coin: "numismatics:sun", value: 4096 },
    { coin: "numismatics:crown", value: 512 },
    { coin: "numismatics:cog", value: 64 },
    { coin: "numismatics:sprocket", value: 16 },
    { coin: "numismatics:bevel", value: 8 },
    { coin: "numismatics:spur", value: 1 },
];

const calculateCoinsFromValue = (price, output) => {
    for (let i = 0; i < coinMap.length; i++) {
        let { coin, value } = coinMap[i];
        if (value <= price) {
            if (price % value === 0) {
                output.push({ coin: coin, count: price / value });
                return output;
            } else {
                output.push({ coin: coin, count: Math.floor(price / value) });
                calculateCoinsFromValue(price % value, output, coinMap);
            }
            return output;
        }
    }
};


let getFrontMatter = (id, item, index) => {
    let splitId = id.split(":")
    return {
        shop_id: id,
        name: {
            "translate": `shop.scp.${id}`
        },
        texture: `${splitId[0]}:textures/item/${splitId[0]}`,
        display_type: "thin",
        jei_catalyst: {
            id: item
        },
        selector_weight: index,
        trades: []
    }
}

shops.forEach((shop, index) => {
    let shopJson = getFrontMatter(shop.id, shop.jeiCatalyst, index);
    let tradeJson = {}
    shop.trades.forEach((trade) => {
        tradeJson = {};
        tradeJson.offer = {
            id: trade.item,
            count: trade.count
        };
        if (trade.itemCost1) {
            tradeJson.request = {
                id: trade.itemCost1.item,
                count: trade.itemCost1.count
            }
        }
        if (trade.itemCost2) {
            tradeJson.second_request = {
                id: trade.itemCost2.item,
                count: trade.itemCost2.count
            }
        }
        if (trade.numiCost) {
            let coins = [];
            calculateCoinsFromValue(trade.numiCost, coins)
            if (coins.length > 2) console.error("[SOCIETY TRADING GEN] WARNING! numiCost divisible by 3 coins instead of 2! Item cost will not match bank account cost!")
            for (let i = 0; i < coins.length && i < 2; i++) {
                if (i == 0 && !trade.itemCost1) {
                    tradeJson.request = {
                        id: coins[i].coin,
                        count: coins[i].count
                    }
                } else {
                    tradeJson.second_request = {
                        id: coins[i].coin,
                        count: coins[i].count
                    }
                }

            }
            tradeJson.numismatics_cost = trade.numiCost
        }
        tradeJson.trade_id = `${shop.id}_${trade.item.replace(":", "_")}`
        shopJson.trades.push(tradeJson)
    })
    JsonIO.write(`kubejs/data/society_trading/shops/${shop.id}.json`, shopJson)
})
