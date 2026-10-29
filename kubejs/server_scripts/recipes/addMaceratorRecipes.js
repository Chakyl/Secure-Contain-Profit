ServerEvents.recipes((e) => {
    const macerate = (inputs, resultId, count, processingTime) => {
        let resolvedTime = processingTime ? processingTime : 100;
        let ingredientList = Array.isArray(inputs) ? inputs : [inputs];

        let formattedIngredients = ingredientList.map((ingredient) => {
            if (typeof ingredient === 'string') {
                return ingredient.startsWith('#') ? { tag: ingredient.substring(1) } : { item: ingredient };
            }
            return ingredient;
        });

        e.custom({
            type: "scguns:macerating",
            processingTime: resolvedTime,
            ingredients: formattedIngredients,
            result: {
                id: resultId,
                count: count
            }
        });

        e.custom({
            type: "scguns:powered_macerating",
            processingTime: resolvedTime,
            ingredients: formattedIngredients,
            result: {
                id: resultId,
                count: count
            }
        });
    };
    const bulkMacerate = (ingredient, output, time) => {
        let ingredients = [];
        for (let index = 1; index <= 4; index++) {
            ingredients.push(ingredient);
            macerate(ingredients, output, index, time * index);
        }
    }

    macerate([{ item: "minecraft:redstone" }, { item: "scguns:niter_dust" }, { item: "minecraft:coal" }], "minecraft:glowstone_dust", 4);
    macerate([{ item: "create:brass_ingot" }, { item: "scguns:diamond_steel_blend" }, { item: "scguns:sheol" }], "scguns:treated_brass_ingot", 1);
    macerate([{ item: "scguns:treated_iron_ingot" }, { item: 'minecraft:lapis_lazuli' }, { item: 'minecraft:diamond' }], "scguns:diamond_steel_blend", 1);
    macerate([{ item: 'scguns:anthralite_ingot' }, { item: 'minecraft:iron_ingot' }, { item: 'minecraft:coal' }, { item: 'minecraft:coal' }], "scguns:treated_iron_ingot", 2);
    macerate([{ item: 'scguns:anthralite_ingot' }, { item: 'minecraft:iron_ingot' }, { item: 'minecraft:coal' }, { item: 'minecraft:coal' }], "scguns:treated_iron_ingot", 2);
    macerate([{ item: 'scguns:weird_flesh' }, { item: 'scguns:sulfur_dust' }, { item: 'minecraft:blaze_powder' }], 'scguns:nitro_powder_dust', 4);
    
    bulkMacerate({ tag: "scguns:enchantable/gun" }, "minecraft:raw_iron", 1000);
    bulkMacerate({ tag: "industrialhellscape:rockrete_smeltable_item" }, "minecraft:cobblestone",20);
    bulkMacerate({ item: "minecraft:cobbled_deepslate" }, "minecraft:tuff",500);
    bulkMacerate({ item: "minecraft:deepslate" }, "minecraft:tuff", 500);
    bulkMacerate({ item: "minecraft:tuff" }, "scguns:anthralite_nugget",  250);

    macerate('scguns:small_copper_casing', 'create:copper_nugget', 1);
    macerate('scguns:medium_copper_casing', 'create:copper_nugget', 2);

    macerate('scguns:small_iron_casing', 'minecraft:iron_nugget', 1);
    macerate('scguns:large_iron_casing', 'minecraft:iron_nugget', 3);

    macerate('scguns:small_diamond_steel_casing', 'scguns:diamond_steel_blend', 1);
    macerate('scguns:medium_diamond_steel_casing', 'scguns:diamond_steel_blend', 2);
    macerate('scguns:diamond_steel_flare', 'scguns:diamond_steel_blend', 5);
    macerate('scguns:sculk_flare', 'scguns:peal', 8);

    macerate('scguns:small_brass_casing', 'create:brass_nugget', 1);
    macerate('scguns:medium_brass_casing', 'create:brass_nugget', 2);
    macerate('scguns:large_brass_casing', 'create:brass_nugget', 3);
})

