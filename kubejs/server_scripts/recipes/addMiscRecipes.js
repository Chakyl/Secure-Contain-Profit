ServerEvents.recipes((e) => {
    // ['companions:copper_coin', 'companions:nether_coin', 'companions:end_coin']
    e.shapeless('companions:end_coin', ['2x companions:nether_coin'])
    e.shapeless('companions:nether_coin', ['2x companions:copper_coin'])
    e.shapeless('companions:end_coin', ['4x companions:copper_coin'])
    e.shapeless('2x companions:nether_coin', ['companions:end_coin'])
    e.shapeless('2x companions:copper_coin', ['companions:nether_coin'])
})

