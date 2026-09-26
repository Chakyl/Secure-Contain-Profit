

global.handleRaidUnit = (entity) => {
    const { level } = entity;
    if (level.isClientSide()) return;
    let abovePos = entity.getOnPos().above().offset(Math.random() < 0.5 ? 1 : -1, 0, Math.random() < 0.5 ? 1 : -1);
    let aboveAbovePos = abovePos.above();
    if (!level.getBlock(abovePos).hasTag("scp:setblock_immune")) {
        level.destroyBlock(abovePos, true)
    }
    if (!level.getBlock(aboveAbovePos).hasTag("scp:setblock_immune")) {
        level.destroyBlock(aboveAbovePos, true)
    }
};

EntityJSEvents.modifyEntity((e) => {
    for (let abnormality of ["scguns:cog_knight", "scguns:trauma_unit", "scguns:redcoat", "scguns:cog_minion"]) {
        e.modify(abnormality, (modifyBuilder) => {
            modifyBuilder.tick((entity) => {
                if (entity.tickCount % 20 === 0) {
                    global.handleRaidUnit(entity);
                }
            });
        });
    }
});