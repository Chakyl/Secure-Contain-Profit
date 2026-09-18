ItemEvents.modifyTooltips((e) => {
    e.modify("scp:abnormality_heart", text => {
        text.dynamic("abnormality")
    })
});

ItemEvents.dynamicTooltips("abnormality", (e) => {
    const { item } = e;
    const customData = item.getCustomData()
    e.add(Text.red(customData.get("entity_id") ? `Abnormality: ${global.ABNORMALITIES.get(String(`${customData.getString("entity_id")}`).trim().replace('\"',"").replace('\"',"")).class.charAt(0).toUpperCase()}-${global.getSCPID(String(customData.get("entity_id")))}` : "Just a random heart. No abnormality"))
})
