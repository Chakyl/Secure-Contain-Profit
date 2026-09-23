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
global.breachAbnormality = (server, level, block, abnormalityName, nbt) => {
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
    if (global.ABNORMALITIES.get(String(`${nbt.data.getString("abnormalityType")}`).trim()).breachTypes.includes("GRANDIOSE")) {
        global.addThreatLevel(server, 5);
        server.tell(Text.darkRed(`THREAT LEVEL INCREASED TO ${Math.floor(Number(server.persistentData.getInt("threat_level")) / 5)}`))
        global.addChaos(server, block, Number(server.persistentData.getInt("threat_level")));
    }
}
global.increaseUnitCounter = (level, block, abnormalityName, abnormalityUUID, nbt) => {
    let { x, y, z } = block;
    if ((nbt.data.counter ? Number(nbt.data.getInt("counter")) + 1 : 0) < global.ABNORMALITIES.get(String(`${nbt.data.getString("abnormalityType")}`).trim()).counter) {
        nbt.merge({
            data: {
                counter: global.increaseStage(Number(nbt.data.getInt("counter")))
            }
        });
    } else {
        let foundEntity = false;
        let server = level.getServer();
        for (let entity of server.getEntities()) {
            if (entity.uuid.toString() == abnormalityUUID) {
                entity.persistentData.breaching = true;
                foundEntity = true;
                break;
            }
        }
        if (foundEntity) {
            global.breachAbnormality(server, level, block, abnormalityName, nbt);
        } else {
            // Reset since the abnormality is probably dead TODO maybe not?
            global.paintToServer(server, `${abnormalityName} HAS EXPIRED AT [x:${x}/z:${z}].`, '#FF5555');
            nbt.merge({ data: { boundPlayer: "", abnormalityType: "", abnormalityUUID: "", counter: 0, dayLastTriggered: -1, state: "", researchLevel: 0, researchTime: 0 } });
            global.setBlockEntityData(block, nbt);
        }
    }
}
