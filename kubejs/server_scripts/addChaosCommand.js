ServerEvents.commandRegistry((e) => {
    const { commands, arguments: argumentsNoTSError } = e
    e.register(commands.literal('addfacilitychaos').then(
        commands
            .argument('amount', argumentsNoTSError.INTEGER.create(e))
            .executes((ctx) => {
                // TODO: Figure out wtf to do here
                // global.addChaos(ctx.source.server, undefined, argumentsNoTSError.INTEGER.getResult(ctx, 'amount'))
                return 1
            })
    )
    )
})