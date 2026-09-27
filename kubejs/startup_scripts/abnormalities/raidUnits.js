

global.handleRaidUnit = (entity, breakers) => {
    const { level } = entity;
    if (level.isClientSide()) return;
    if (level.getBlock(entity.getOnPos()).id == "minecraft:bedrock") global.escapeArtist(level, entity, [-2, -3, -4, -5, -6, -7, -8, -9])

    if (entity.tickCount % 600 && breakers.includes(entity.type)) {
        let abovePos = entity.getOnPos().above().offset(Math.random() < 0.5 ? 1 : -1, 0, Math.random() < 0.5 ? 1 : -1);
        let aboveAbovePos = abovePos.above();
        let aboveAboveAbovePos = aboveAbovePos.above();
        if (!level.getBlock(abovePos).hasTag("scp:setblock_immune")) {
            level.destroyBlock(abovePos, true)
        }
        if (!level.getBlock(aboveAbovePos).hasTag("scp:setblock_immune")) {
            level.destroyBlock(aboveAbovePos, true)
        }
        if (!level.getBlock(aboveAboveAbovePos).hasTag("scp:setblock_immune")) {
            level.destroyBlock(aboveAboveAbovePos, true)
        }
    }
};

EntityJSEvents.modifyEntity((e) => {
    for (let abnormality of ["scguns:cog_knight", "scguns:trauma_unit", "scguns:redcoat", "scguns:cog_minion", "scguns:adjudicator", "scguns:subjugator"]) {
        e.modify(abnormality, (modifyBuilder) => {
            modifyBuilder.tick((entity) => {
                if (entity.tickCount % 20 === 0) {
                    global.handleRaidUnit(entity, ["scguns:cog_knight"]);
                }
            });
        });
    }
});