
const shops = [
    {
        id: "facility",
        jeiCatalyst: "scp:verdant_hallway_expansion_card",
        trades: [
            { item: 'scguns:syringe', count: 4, numiCost: 1 },
            { item: 'abyssal_decor:cave_taco', count: 1, numiCost: 8 },
            { item: 'reliable_requiem:crystal_heart', count: 1, itemCost1: { item: 'scp:enkephalin', count: 4 } },
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
            { item: 'abyssal_decor:deepbronze_block', count: 8, numiCost: 8 },
            { item: 'abyssal_decor:raw_marble', count: 8, numiCost: 8 },
            { item: 'abyssal_decor:cobbled_talcrock', count: 8, numiCost: 8 },
            { item: 'abyssal_decor:bellmetal_block', count: 8, numiCost: 8 },
            { item: 'abyssal_decor:rough_jade', count: 8, numiCost: 8 },
            { item: 'abyssal_decor:block_of_pearl', count: 8, numiCost: 8 },
            { item: 'abyssal_decor:block_of_black_pearl', count: 8, numiCost: 8 },
            { item: 'abyssal_decor:seabrass_block', count: 8, numiCost: 8 },
            { item: 'abyssal_decor:filthcrete', count: 8, numiCost: 8 },
            { item: 'abyssal_decor:serpent_scales', count: 8, numiCost: 8 },
            { item: 'abyssal_decor:rough_blood_coral', count: 8, numiCost: 8 },
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

            { item: "scguns:lockewood", numiCost: 65536, itemCost1: { item: 'scp:enkephalin', count: 16 } },
            { item: "scguns:spirulida", numiCost: 65536, itemCost1: { item: 'scp:enkephalin', count: 16 } },
            { item: "scguns:iron_javelin", numiCost: 65536, itemCost1: { item: 'scp:enkephalin', count: 16 } },

            { item: "scguns:callwell_terminal", numiCost: 1024, itemCost1: { item: 'scp:enkephalin', count: 1 } },
            { item: "scguns:combat_shotgun", numiCost: 4096, itemCost1: { item: 'scp:enkephalin', count: 4 } },
            { item: "scguns:jr_wristbreaker", numiCost: 16384, itemCost1: { item: 'scp:enkephalin', count: 8 } },
            { item: 'scguns:gun_shelf', numiCost: 16 },
            { item: "scguns:reflex_sight", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:laser_sight", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:medium_scope", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:long_scope", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:light_stock", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:weighted_stock", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:wooden_stock", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:bump_stock", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:silencer", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:advanced_silencer", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 2 } },
            { item: "scguns:extended_barrel", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:muzzle_brake", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:light_grip", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:vertical_grip", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:iron_bayonet", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 1 } },
            { item: "scguns:anthralite_bayonet", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 2 } },
            { item: "scguns:diamond_bayonet", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 3 } },
            { item: "scguns:netherite_bayonet", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 4 } },
            { item: "scguns:extended_mag", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 2 } },
            { item: "scguns:speed_mag", count: 1, itemCost1: { item: 'minecraft:netherite_scrap', count: 2 } }

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
            { item: "scguns:powder_and_ball", count: 4, numiCost: 8 },
            { item: 'scguns:sculk_cell', count: 4, numiCost: 256 }
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
    {
        id: "tool_abnormalities",
        jeiCatalyst: "companions:frog_bonanza_block",
        trades: [
            { item: 'supplementaries:clock_block', count: 1, numiCost: 512 },
            { item: "whimsy_deco:red_phone", count: 1, numiCost: 1024 },
            { item: "whimsy_deco:gatcha_machine", count: 1, numiCost: 1024 },
            { item: "companions:frog_bonanza_block", count: 1, numiCost: 2048 },
            { item: "companions:porcelain_pottery", count: 1, numiCost: 2048 },
            { item: "scp:rubber_duck", count: 1, numiCost: 4096 },
            { item: "scp:spoon_bender", count: 1, numiCost: 4096 },
            { item: "whimsy_deco:lucky_cat", count: 1, numiCost: 8192 },
            { item: "whimsy_deco:singing_frog", count: 1, numiCost: 8192 },
            { item: "companions:empty_puppet_block", count: 1, numiCost: 16384 },
            { item: "companions:croissant_egg_block", count: 1, numiCost: 16384 },
            { item: 'companions:soul_furnace_block', count: 1, numiCost: 32768 },
            { item: "companions:respawn_totem_block", count: 1, numiCost: 32768 },
        ]
    },
    {
        id: "electrical_control",
        jeiCatalyst: "minecraft:redstone",
        trades: [
            { item: 'scp:containment_unit_signaler', count: 1, numiCost: 16 },
            { item: "minecraft:redstone", count: 8, numiCost: 8 },
            { item: "supplementaries:cog_block", count: 8, numiCost: 16 },
            { item: "minecraft:redstone_torch", count: 8, numiCost: 8 },
            { item: "minecraft:comparator", count: 4, numiCost: 8 },
            { item: "minecraft:repeater", count: 4, numiCost: 8 },
            { item: "create:redstone_link", count: 2, numiCost: 8 },
            { item: "create:pulse_repeater", count: 1, numiCost: 128 },
            { item: "create:pulse_extender", count: 1, numiCost: 128 },
            { item: "create:pulse_timer", count: 1, numiCost: 128 },
            { item: "create:powered_latch", count: 1, numiCost: 128 },
            { item: "create:powered_toggle_latch", count: 1, numiCost: 128 },
            { item: "create:analog_lever", count: 1, numiCost: 4 },
            { item: "create:placard", count: 4, numiCost: 8 },
            { item: "create:linked_controller", count: 1, numiCost: 256 },
            { item: "abyssal_decor:indicator_light", count: 1, numiCost: 4 },
            { item: "minecraft:redstone_lamp", count: 1, numiCost: 4 },
            { item: "create:rose_quartz_lamp", count: 1, numiCost: 16 },
            { item: "create:nixie_tube", count: 1, numiCost: 32 },
            { item: 'supplementaries:speaker_block', count: 1, numiCost: 128 },
            { item: "dashpanels:control_panel", count: 1, numiCost: 32 },
            { item: "dashpanels:wall_control_panel", count: 1, numiCost: 32 },
            { item: "dashpanels:ceiling_control_panel", count: 1, numiCost: 32 },
            { item: "dashpanels:cable", count: 8, numiCost: 8 },
            { item: "dashpanels:panel_link", count: 1, numiCost: 8 },
            { item: "dashpanels:cable_stripper", count: 1, numiCost: 8 },
            { item: "dashpanels:wrench", count: 1, numiCost: 8 },
            { item: "dashpanels:paint_brush", count: 1, numiCost: 8 },
            { item: "dashpanels:key", count: 1, numiCost: 8 },
            { item: "dashpanels:control_lever", count: 1, numiCost: 8 },
            { item: "dashpanels:indicator_bulb", count: 1, numiCost: 8 },
            { item: "dashpanels:joystick", count: 1, numiCost: 8 },
            { item: "dashpanels:key_switch", count: 1, numiCost: 8 },
            { item: "dashpanels:knob", count: 1, numiCost: 8 },
            { item: "dashpanels:label", count: 1, numiCost: 8 },
            { item: "dashpanels:momentary_switch", count: 1, numiCost: 8 },
            { item: "dashpanels:push_button", count: 1, numiCost: 8 },
            { item: "dashpanels:seven_segment", count: 1, numiCost: 8 },
            { item: "dashpanels:switch", count: 1, numiCost: 8 },
        ]
    },
    {
        id: "equipment",
        jeiCatalyst: "create:brown_toolbox",
        trades: [
            { item: "create:brown_toolbox", count: 1, numiCost: 64 },
            { item: "scguns:rifle_ammo_box", count: 1, numiCost: 128 },
            { item: "scguns:shotgun_ammo_box", count: 1, numiCost: 128 },
            { item: "scguns:magnum_ammo_box", count: 1, numiCost: 128 },
            { item: "scguns:energy_ammo_box", count: 1, numiCost: 128 },
            { item: "scguns:rocket_ammo_box", count: 1, numiCost: 128 },
            { item: "scguns:special_ammo_box", count: 1, numiCost: 128 },
            { item: "scguns:empty_casing_pouch", count: 1, numiCost: 128 },
            { item: "scguns:rock_pouch", count: 1, numiCost: 128 },
            { item: "scguns:dishes_pouch", count: 1, numiCost: 128 },
            { item: "scguns:grenade", count: 1, numiCost: 256 },
            { item: "scguns:stun_grenade", count: 1, numiCost: 256 },
            { item: "scguns:gas_grenade", count: 1, numiCost: 256 },
        ]
    },
    {
        id: "security",
        jeiCatalyst: "supplementaries:cannon",
        stageRequired: "amber_level",
        trades: [
            { item: "supplementaries:bamboo_spikes", count: 1, numiCost: 128 },
            { item: "supplementaries:cannon", count: 1, numiCost: 2048 },
            { item: "supplementaries:cannonball", count: 4, numiCost: 32 },
            { item: "scguns:mine_unit", count: 1, numiCost: 256 },
            { item: "scguns:basic_turret", count: 1, numiCost: 4096, itemCost1: { item: 'scp:enkephalin', count: 4 } },
            { item: "scguns:auto_turret", count: 1, numiCost: 4096, itemCost1: { item: 'scp:enkephalin', count: 8 } },
            { item: "scguns:shotgun_turret", numiCost: 4096, itemCost1: { item: 'scp:enkephalin', count: 12 } },
            { item: "scguns:sniper_turret", numiCost: 4096, itemCost1: { item: 'scp:enkephalin', count: 26 } },
            { item: "scguns:hostile_turret_targeting_module", count: 1, numiCost: 64 },
            { item: "scguns:turret_targeting_module", count: 1, numiCost: 64 },
            { item: "scguns:player_turret_targeting_module", count: 1, numiCost: 64 },
            { item: "scguns:damage_turret_module", count: 1, itemCost1: { item: 'scp:enkephalin', count: 4 }, itemCost2: { item: 'peaceless:shrapin_scute', count: 4 } },
            { item: "scguns:range_turret_module", count: 1, itemCost1: { item: 'scp:enkephalin', count: 4 }, itemCost2: { item: 'creaturefeature:blighted_brain', count: 1 } },
            { item: "scguns:shell_catcher_turret_module", count: 1, itemCost1: { item: 'scp:enkephalin', count: 4 }, itemCost2: { item: 'minecraft:blaze_rod', count: 1 } },
            { item: "scguns:ammo_turret_module", count: 1, itemCost1: { item: 'scp:enkephalin', count: 4 }, itemCost2: { item: 'creaturefeature:fiendish_essence', count: 1 } },
            { item: "scguns:fire_rate_turret_module", count: 1, itemCost1: { item: 'scp:enkephalin', count: 4 }, itemCost2: { item: 'creaturefeature:thingamabob', count: 1 } },
            { item: "scguns:enemy_log", count: 1, numiCost: 4 },
            { item: "scguns:team_log", count: 1, numiCost: 4 },
            { item: "vista:television", count: 1, numiCost: 2048 },
            { item: "vista:hollow_cassette", count: 1, numiCost: 128 },
            { item: "vista:viewfinder", count: 1, numiCost: 128, itemCost1: { item: 'creaturefeature:living_glass_shards', count: 1 } },
            { item: "vista:picture_tape", count: 1, numiCost: 64 },
            { item: "vista:wave_gate", count: 1, numiCost: 64, itemCost1: { item: 'creaturefeature:blitz_rod', count: 4 } },
            { item: "vista:mirror", count: 1, numiCost: 64, itemCost1: { item: 'creaturefeature:living_glass_shards', count: 1 } }
        ]
    },
    {
        id: "technology",
        jeiCatalyst: "scguns:polar_generator",
        stageRequired: "amber_level",
        trades: [
            { item: "scguns:polar_generator", count: 1, numiCost: 1024 },
            { item: "scguns:lightning_battery", count: 1, numiCost: 512 },
            { item: "createaddition:copper_spool", count: 1, numiCost: 32 },
            { item: "createaddition:connector", count: 2, numiCost: 4 },
            { item: "createaddition:small_light_connector", count: 2, numiCost: 24 },
            { item: "createaddition:gold_spool", count: 1, numiCost: 64 },
            { item: "createaddition:large_connector", count: 2, numiCost: 16 },
            { item: "createaddition:electric_motor", count: 1, numiCost: 2048, itemCost1: { item: 'scp:enkephalin', count: 1 } },
            { item: "createaddition:redstone_relay", count: 1, numiCost: 64 },
            { item: "create:wrench", count: 1, numiCost: 16 },
            { item: "create:goggles", count: 1, numiCost: 16 },
            { item: "create:shaft", count: 1, numiCost: 4 },
            { item: "create:cogwheel", count: 1, numiCost: 4 },
            { item: "create:gearbox", count: 1, numiCost: 4 },
            { item: "create:clutch", count: 1, numiCost: 16 },
            { item: "create:gearshift", count: 1, numiCost: 16 },
            { item: "create:adjustable_chain_gearshift", count: 1, numiCost: 32 },
            { item: "create:encased_chain_drive", count: 1, numiCost: 8 },
            { item: "minecraft:hopper", count: 1, numiCost: 32 },
            { item: "create:chute", count: 1, numiCost: 32 },
            { item: "create:smart_chute", count: 1, numiCost: 128 },
            { item: "create:andesite_funnel", count: 1, numiCost: 32 },
            { item: "create:brass_funnel", count: 1, numiCost: 128 },
            { item: "create:mechanical_arm", count: 1, numiCost: 512 },
            { item: "create:rotation_speed_controller", count: 1, numiCost: 1024, itemCost1: { item: 'scp:enkephalin', count: 1 } },
            { item: "create:mechanical_crafter", count: 1, numiCost: 64 },
            { item: "create:chain_conveyor", count: 1, numiCost: 16 },
            { item: "minecraft:chain", count: 1, numiCost: 4 },
            { item: "create:item_vault", count: 1, numiCost: 32 },
            { item: "create:packager", count: 1, numiCost: 64 },
            { item: "create:repackager", count: 1, numiCost: 64 },
            { item: "create:package_frogport", count: 1, numiCost: 4, itemCost1: { item: 'companions:nether_coin', count: 4 } },
            { item: "create:stock_link", count: 1, numiCost: 32 },
            { item: "create:stock_ticker", count: 1, numiCost: 32 },
            { item: "create:factory_gauge", count: 1, numiCost: 64 },
            { item: "create_hypertube:hypertube_entrance", count: 1, numiCost: 1024, itemCost1: { item: 'scp:enkephalin', count: 1 } },
            { item: "create_hypertube:hypertube", count: 1, numiCost: 256 },
            { item: "create_hypertube:hypertube_junction", count: 1, numiCost: 256 },
            { item: "create_hypertube:hypertube_accelerator", count: 1, itemCost1: { item: 'creaturefeature:blitz_rod', count: 1 } },
            { item: "create_hypertube:hypertube_funnel", count: 1, numiCost: 128 },
            { item: "create_hypertube:redstone_detector_tube_attachment", count: 1, numiCost: 256 },
            { item: "create_hypertube:tube_scanner_attachment", count: 1, numiCost: 256 }
        ]
    },
    {
        id: "dye_depot",
        jeiCatalyst: "dye_depot:ginger_dye",
        stageRequired: "amber_level",
        trades: [
            { item: "minecraft:white_dye", count: 1, numiCost: 1 },
            { item: "minecraft:light_gray_dye", count: 1, numiCost: 1 },
            { item: "minecraft:gray_dye", count: 1, numiCost: 1 },
            { item: "minecraft:black_dye", count: 1, numiCost: 1 },
            { item: "minecraft:brown_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:maroon_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:rose_dye", count: 1, numiCost: 1 },
            { item: "minecraft:red_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:coral_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:ginger_dye", count: 1, numiCost: 1 },
            { item: "minecraft:orange_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:tan_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:beige_dye", count: 1, numiCost: 1 },
            { item: "minecraft:yellow_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:olive_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:amber_dye", count: 1, numiCost: 1 },
            { item: "minecraft:lime_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:forest_dye", count: 1, numiCost: 1 },
            { item: "minecraft:green_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:verdant_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:teal_dye", count: 1, numiCost: 1 },
            { item: "minecraft:cyan_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:aqua_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:mint_dye", count: 1, numiCost: 1 },
            { item: "minecraft:light_blue_dye", count: 1, numiCost: 1 },
            { item: "minecraft:blue_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:navy_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:slate_dye", count: 1, numiCost: 1 },
            { item: "dye_depot:indigo_dye", count: 1, numiCost: 1 },
            { item: "minecraft:purple_dye", count: 1, numiCost: 1 },
            { item: "minecraft:magenta_dye", count: 1, numiCost: 1 },
            { item: "minecraft:pink_dye", count: 1, numiCost: 1 }
        ]
    },
    {
        id: "felix_offering",
        jeiCatalyst: "scguns:felix_memorial",
        hiddenFromSelector: true,
        trades: [
            { item: "minecraft:cat_spawn_egg", itemCost1: { item: 'companions:end_coin', count: 1 } },
            { item: "scguns:hyperbaria", itemCost1: { item: 'companions:nether_coin', count: 4 }, itemCost2: { item: 'companions:end_coin', count: 16 } },
            { item: "scguns:zilk_45", itemCost1: { item: 'companions:nether_coin', count: 4 }, itemCost2: { item: 'companions:end_coin', count: 16 } },
            { item: "scguns:bomb_lance", itemCost1: { item: 'companions:nether_coin', count: 4 }, itemCost2: { item: 'companions:end_coin', count: 16 } },
            { item: "scguns:frog_dart", count: 4, itemCost1: { item: 'companions:copper_coin', count: 2 } },
            { item: "creaturefeature:scroll_pride", itemCost1: { item: 'companions:nether_coin', count: 4 } },
            { item: "creaturefeature:scroll_bi", itemCost1: { item: 'companions:nether_coin', count: 4 } },
            { item: "creaturefeature:scroll_trans", itemCost1: { item: 'companions:nether_coin', count: 4 } },
            { item: "creaturefeature:scroll_pan", itemCost1: { item: 'companions:nether_coin', count: 4 } },
            { item: "companions:relic_gold", itemCost1: { item: 'companions:end_coin', count: 64 }, itemCost2: { item: 'companions:end_coin', count: 64 } },
            { item: "companions:book_ice_shard", itemCost1: { item: 'companions:nether_coin', count: 16 }, itemCost2: { item: 'companions:end_coin', count: 32 } },
            { item: "companions:book_ice_tornado", itemCost1: { item: 'companions:nether_coin', count: 16 }, itemCost2: { item: 'companions:end_coin', count: 32 } },
            { item: "companions:book_fire_mark", itemCost1: { item: 'companions:nether_coin', count: 16 }, itemCost2: { item: 'companions:end_coin', count: 32 } },
            { item: "companions:book_brace", itemCost1: { item: 'companions:nether_coin', count: 16 }, itemCost2: { item: 'companions:end_coin', count: 32 } },
            { item: "companions:book_heal_ring", itemCost1: { item: 'companions:nether_coin', count: 16 }, itemCost2: { item: 'companions:end_coin', count: 32 } },
            { item: "companions:book_stone_spikes", itemCost1: { item: 'companions:nether_coin', count: 16 }, itemCost2: { item: 'companions:end_coin', count: 32 } },
            { item: "companions:book_magic_ray", itemCost1: { item: 'companions:nether_coin', count: 16 }, itemCost2: { item: 'companions:end_coin', count: 32 } },
            { item: "companions:book_black_hole", itemCost1: { item: 'companions:nether_coin', count: 16 }, itemCost2: { item: 'companions:end_coin', count: 32 } },
            { item: "companions:book_naginata", itemCost1: { item: 'companions:relic_gold', count: 4 }, itemCost2: { item: 'companions:end_coin', count: 64 } }
        ]
    }
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


let getFrontMatter = (id, item, hiddenFromSelector, stageRequired, index) => {
    let splitId = id.split(":")
    let shopData = {
        shop_id: id,
        name: {
            "translate": `shop.scp.${id}`
        },
        texture: `${splitId[0]}:textures/item/${splitId[0]}`,
        display_type: "thin",
        hidden_from_selector: hiddenFromSelector ? true : false,
        jei_catalyst: {
            id: item
        },
        selector_weight: index
    }
    if (stageRequired) shopData.stage_required = stageRequired;
    shopData.trades = [];
    return shopData;
}

shops.forEach((shop, index) => {
    let shopJson = getFrontMatter(shop.id, shop.jeiCatalyst, shop.hiddenFromSelector, shop.stageRequired, index);
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

