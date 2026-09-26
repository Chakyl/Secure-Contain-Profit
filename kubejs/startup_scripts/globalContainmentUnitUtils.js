// Priority: 200
let notifs = {}
global.paintAlert = (server, player, text, color) => {
    let notifNum = Object.keys(notifs).filter(key => (key).includes(player.username)).length;
    notifs[`${player.username}notif${notifNum}`] = {
        type: 'text',
        text: text,
        alignX: 'left',
        x: '2',
        y: `${34 + (notifNum * 8)} + sin(time * 5)`,
        color: color
    };
    Painter.paint(player, notifs);
    server.scheduleInTicks(200, ctx => {
        notifs[`${player.username}notif${notifNum}`] = { remove: true };
        Painter.paint(player, notifs);
        delete notifs[`${player.username}notif${notifNum}`];
    });
}

global.paintToServer = (server, text, color) => {
    server.players.forEach((player) => {
        global.paintAlert(server, player, text, color)
    });
}
global.breachAbnormality = (server, level, block, entity, abnormalityName, nbt) => {
    let breachMessage = `${abnormalityName} IS BREACHING AT [x:${block.x}/z:${block.z}]. SUPPRESS IMMEDIATELY.`
    server.tell(Text.darkRed(breachMessage))
    global.paintToServer(server, breachMessage, "#AA0000");
    nbt.merge({
        data: {
            state: "BREACH",
            counter: 0,
        }
    });
    global.setBlockEntityData(block, nbt);
    global.updateSignalers(level, block);
    let breachTypes = global.ABNORMALITIES.get(String(`${nbt.data.getString("abnormalityType")}`).trim()).breachTypes;
    if (breachTypes.includes("GRANDIOSE")) {
        global.addThreatLevel(server, 5);
        server.tell(Text.darkRed(`THREAT LEVEL INCREASED TO ${Math.floor(Number(server.persistentData.getInt("threat_level")) / 5)}`))
        global.addChaos(server, block, Number(server.persistentData.getInt("threat_level")));
    } else if (breachTypes.includes("ESCAPEARTIST")) {
        global.escapeArtist(level, entity);
    }
}
global.increaseUnitCounter = (level, block, abnormalityName, nbt) => {
    let { x, y, z } = block;
    if ((nbt.data.counter ? Number(nbt.data.getInt("counter")) + 1 : 0) < global.ABNORMALITIES.get(String(`${nbt.data.getString("abnormalityType")}`).trim()).counter) {
        nbt.merge({
            data: {
                counter: global.increaseStage(Number(nbt.data.getInt("counter")))
            }
        });
    } else {
        let foundEntity;
        let server = level.getServer();
        for (let entity of server.getEntities()) {
            if (entity.uuid.toString() == nbt.data.abnormalityUUID) {
                entity.persistentData.breaching = true;
                entity.setHealth(10000);
                foundEntity = entity;
                break;
            }
        }
        if (foundEntity) {
            global.breachAbnormality(server, level, block, foundEntity,  abnormalityName, nbt);
        } else {
            // Reset since the abnormality is probably dead TODO maybe not?
            global.paintToServer(server, `${abnormalityName} HAS EXPIRED AT [x:${x}/z:${z}].`, '#FF5555');
            nbt.merge({ data: { boundPlayer: "", abnormalityType: "", abnormalityUUID: "", counter: 0, dayLastTriggered: -1, state: "", researchLevel: 0, researchTime: 0 } });
            global.setBlockEntityData(block, nbt);
        }
    }
}
global.mainUiElementIds = [
    "containmentSummary",
    "workResult"
];
const clearUiPaint = (player, ids) => {
    let removedText = {};
    // Spawn and clear instance of paint element to prevent warnings that they don't exist
    ids.forEach((id) => {
        removedText[id] = { type: "text" };
    });
    Painter.paint(player, removedText);
    ids.forEach((id) => {
        removedText[id] = { remove: true };
    });
    Painter.paint(player, removedText);
};

global.renderUiText = (player, server, messages, clearedMessages) => {
    clearUiPaint(player, clearedMessages);
    Painter.paint(player, messages);
    player.persistentData.ageLastShownMessage = player.tickCount;
    server.scheduleInTicks(100, () => {
        if (player.tickCount - Number(player.persistentData.getInt("ageLastShownMessage")) >= 100)
            clearUiPaint(player, clearedMessages);
    });
};


global.printContainmentUnitInfo = (player, server, data) => {
    const { state } = data;
    global.renderUiText(
        player,
        server,
        {
            containmentSummary: {
                type: 'text',
                textLines: [global.getFullAbnormalityName(data, "REQUIRES RESEARCH LEVEL 2"), `State: ${state}`, `Qliphoth Counter: ${Number(data.getInt("researchLevel")) >= 1 ? `${data.getInt("counter")}/${global.ABNORMALITIES.get(String(`${data.getString("abnormalityType")}`).trim()).counter}` : "REQUIRES RESEARCH LEVEL 1"} ${Number(data.getInt("researchLevel")) ? ` | Research Level: ${Number(data.getInt("researchLevel"))}` : ""}`],
                alignX: 'center',
                alignY: 'bottom',
                shadow: true,
                centered: true,
                x: 2,
                y: -90,
                color: "#AA00AA"
            }
        },
        global.mainUiElementIds
    );
}

let yLevelsChecked = [-1, 0, 1, 2, 3, 4]
let maxAttempts = 30;
let minRange = 8;
let maxRange = 8;
global.escapeArtist = (level, entity) => {
    let { x, y, z } = entity;;
    let found = false
    let foundX = 0
    let foundY = 0
    let foundZ = 0
    let scannedPos
    let scannedBlockstate;
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        let distance = (Math.random() * minRange) + maxRange;
        let angle = Math.random() * Math.PI * 2
        let attemptX = Math.floor(x + Math.cos(angle) * distance)
        let attemptZ = Math.floor(z + Math.sin(angle) * distance)
        for (let i = 0; i < yLevelsChecked.length; i++) {
            let attemptY = Math.floor(y + yLevelsChecked[i]);
            scannedPos = BlockPos(attemptX, attemptY, attemptZ)
            scannedBlockstate = level.getBlockState(scannedPos)

            if (scannedBlockstate.isSolid() && scannedBlockstate.id !== 'minecraft:bedrock') {
                let above1 = level.getBlockState(scannedPos.above())
                let above2 = level.getBlockState(scannedPos.above(2))

                if (!above1.isSolid() && !above2.isSolid()) {
                    foundX = attemptX + 0.5
                    foundY = attemptY + 1.0
                    foundZ = attemptZ + 0.5
                    found = true
                    break
                }
            }
        }
        if (found) break
    }

    if (found) {
        entity.teleportTo(foundX, foundY, foundZ)
    }
}