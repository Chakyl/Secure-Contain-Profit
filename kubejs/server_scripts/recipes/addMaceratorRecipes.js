ServerEvents.recipes((e) => {
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

})
