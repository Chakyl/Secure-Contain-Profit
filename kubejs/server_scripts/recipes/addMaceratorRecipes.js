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

    macerate([{ item: "minecraft:redstone" }, { item: "scguns:niter_dust" }, { item: "minecraft:coal" }], "minecraft:glowstone_dust", 4);

    macerate([{ item: "create:brass_ingot" }, { item: "scguns:diamond_steel_blend" }, { item: "scguns:sheol" }], "scguns:treated_brass_ingot", 1);

    let ingredients = [];
    for (let index = 1; index <= 4; index++) {
        ingredients.push({ tag: "scguns:enchantable/gun" });
        macerate(ingredients, "minecraft:raw_iron", index, 1000 * index);
    }
    ingredients = [];
    for (let index = 1; index <= 4; index++) {
        ingredients.push({ tag: "industrialhellscape:rockrete_smeltable_item" });
        macerate(ingredients, "minecraft:cobblestone", index, 20 * index);
    }

    macerate('scguns:small_copper_casing', 'create:copper_nugget', 1);
    macerate('scguns:medium_copper_casing', 'create:copper_nugget', 2);

    macerate('scguns:small_iron_casing', 'minecraft:iron_nugget', 1);
    macerate('scguns:large_iron_casing', 'minecraft:iron_nugget', 3);

    macerate('scguns:small_diamond_steel_casing', 'scguns:diamond_steel_blend', 1);
    macerate('scguns:medium_diamond_steel_casing', 'scguns:diamond_steel_blend', 2);
    macerate('scguns:diamond_steel_flare', 'scguns:diamond_steel_blend', 5);

    macerate('scguns:small_brass_casing', 'create:brass_nugget', 1);
    macerate('scguns:medium_brass_casing', 'create:brass_nugget', 2);
    macerate('scguns:large_brass_casing', 'create:brass_nugget', 3);
})

