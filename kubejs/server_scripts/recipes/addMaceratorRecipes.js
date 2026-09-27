ServerEvents.recipes((e) => {
    e.custom({
        type: "scguns:macerating",
        processingTime: 100,
        ingredients: [
            {
                item: "minecraft:redstone"
            },
            {
                item: 'scguns:niter_dust'
            },
            {
                item: 'minecraft:coal'
            }
        ],
        result: {
            id: "minecraft:glowstone_dust",
            count: 4
        }
    })
    e.custom({
        type: "scguns:macerating",
        processingTime: 100,
        ingredients: [
            {
                item: "create:brass_ingot"
            },
            {
                item: 'scguns:diamond_steel_blend'
            },
            {
                item: 'scguns:sheol'
            }
        ],
        result: {
            id: "scguns:treated_brass_ingot",
            count: 1
        }
    })
    let macerating = (item, result, count) => {
        e.custom({
            type: "scguns:macerating",
            processingTime: 100,
            ingredients: [
                {
                    item: item
                }
            ],
            result: {
                id: result,
                count: count
            }
        })
    }

    let ingredients = []
    for (let index = 0; index < 4; index++) {
        ingredients.push({
            tag: "scguns:enchantable/gun"
        })
        e.custom({
            type: "scguns:macerating",
            processingTime: 1000 * ingredients.length,
            ingredients: ingredients,
            result: {
                id: "minecraft:raw_iron",
                count: ingredients.length
            }
        })
    }
    ingredients = []
    for (let index = 0; index < 4; index++) {
        ingredients.push({
            tag: "industrialhellscape:rockrete_smeltable_item"
        })
        e.custom({
            type: "scguns:macerating",
            processingTime: 20 * ingredients.length,
            ingredients: ingredients,
            result: {
                id: "minecraft:cobblestone",
                count: ingredients.length
            }
        })
    }
    macerating('scguns:small_copper_casing', 'create:copper_nugget', 1)
    macerating('scguns:medium_copper_casing', 'create:copper_nugget', 2)

    macerating('scguns:small_iron_casing', 'minecraft:iron_nugget', 1)
    macerating('scguns:large_iron_casing', 'minecraft:iron_nugget', 3)

    macerating('scguns:small_diamond_steel_casing', 'scguns:diamond_steel_blend', 1)
    macerating('scguns:medium_diamond_steel_casing', 'scguns:diamond_steel_blend', 2)


    macerating('scguns:small_brass_casing', 'create:brass_nugget', 1)
    macerating('scguns:medium_brass_casing', 'create:brass_nugget', 2)
    macerating('scguns:large_brass_casing', 'create:brass_nugget', 3)
})

