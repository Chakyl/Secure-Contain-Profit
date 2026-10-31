// Priority: 200
const $SkyblockSavedData = Java.loadClass('de.melanx.skyblockbuilder.data.SkyblockSavedData')
if (!global.playerNotifSlots) {
    global.playerNotifSlots = {};
    global.notifCounter = 0;
}

global.paintAlert = (server, player, text, color) => {
    let uuid = player.uuid.toString();
    if (!global.playerNotifSlots[uuid]) {
        global.playerNotifSlots[uuid] = [];
    }

    let activeSlots = global.playerNotifSlots[uuid];
    let slotNum = 0;
    while (activeSlots.includes(slotNum)) {
        slotNum++;
    }
    activeSlots.push(slotNum);
    let notifKey = `${uuid}_notif_${global.notifCounter++}`;
    let translationText = text.getString();
    let paintAdd = {};
    paintAdd[notifKey] = {
        type: 'text',
        text: translationText,
        alignX: 'left',
        x: '2',
        y: `${34 + (slotNum * 8)} + sin(time * 5)`,
        color: color
    };

    Painter.paint(player, paintAdd);

    server.scheduleInTicks(200, ctx => {
        let paintRemove = {};
        paintRemove[notifKey] = { remove: true };

        Painter.paint(player, paintRemove);
        if (global.playerNotifSlots[uuid]) {
            global.playerNotifSlots[uuid] = global.playerNotifSlots[uuid].filter(slot => slot !== slotNum);
        }
    });
}

global.paintToServer = (server, text, color) => {
    server.players.forEach((player) => {
        global.paintAlert(server, player, text, color);
    });
}
global.getTeamFromName = (level, teamName) => $SkyblockSavedData.get(level)["getTeam(java.lang.String)"](teamName);

global.paintToTeam = (server, level, teamName, text, color) => {
    let team = global.getTeamFromName(level, teamName);
    if (team) {
        team.getPlayers().forEach((uuid) => {
            let player = server.getPlayer(uuid);
            if (player) {
                global.paintAlert(server, player, text, color);
            }
        });
    } else {
        server.players.forEach((player) => {
            if (global.getPlayerTeamName(level, player) == "NONE") {
                global.paintAlert(server, player, text, color);
            }
        });
    }
}

global.getPlayerTeam = (level, player) => {
    return $SkyblockSavedData.get(level).getTeamFromPlayer(player.uuid);
}

global.getPlayerTeamName = (level, player) => {
    let team = global.getPlayerTeam(level, player);
    if (team == null) return "NONE";
    return team.getName()
}

global.tellTeam = (server, level, teamName, text) => {
    let team = global.getTeamFromName(level, teamName);
    if (team) {
        team.getPlayers().forEach((uuid) => {
            let player = server.getPlayer(uuid);
            if (player) {
                player.tell(text)
            }
        });
    } else {
        server.players.forEach((player) => {
            if (global.getPlayerTeamName(level, player) == "NONE") {
                player.tell(text)
            }
        });
    }
}

global.getTeamMembers = (server, level, teamName) => {
    let team = global.getTeamFromName(level, teamName);
    if (team) {
        return team.getPlayers();
    } else {
        let unassignedPlayers = []
        server.players.forEach((player) => {
            if (global.getPlayerTeamName(level, player) == "NONE") {
                unassignedPlayers.push(player.uuid)
            }
        });
        return unassignedPlayers;
    }
}
global.questCompleteForTeam = (server, level, teamName, quest) => {
    let team = global.getTeamFromName(level, teamName);
    if (team) {
        team.getPlayers().forEach((uuid) => {
            let player = server.getPlayer(uuid);
            if (player) {
                server.runCommandSilent(`ql progress complete ${quest} ${player.username}`)
            }
        });
    } else {
        server.players.forEach((player) => {
            if (global.getPlayerTeamName(level, player) == "NONE") {
                server.runCommandSilent(`ql progress complete ${quest} ${player.username}`)
            }
        });
    }
}
global.notesForTeam = (server, level, teamName, noteId) => {
    let team = global.getTeamFromName(level, teamName);
    if (team) {
        team.getPlayers().forEach((uuid) => {
            let player = server.getPlayer(uuid);
            if (player) {
                FieldGuide.unlock(player, noteId)
            }
        });
    } else {
        server.players.forEach((player) => {
            if (global.getPlayerTeamName(level, player) == "NONE") {
                FieldGuide.unlock(player, noteId)
            }
        });
    }
}
global.breachAbnormality = (server, level, block, entity, abnormalityName, nbt) => {
    let breachMessage = Text.translatable("messages.scp.containment_unit.breach", abnormalityName, block.x, block.y, block.z);
    let teamName = String(nbt.data.getString("teamName")).trim();
    global.tellTeam(server, level, teamName, breachMessage.darkRed())
    global.paintToTeam(server, level, teamName, breachMessage, "#AA0000");
    nbt.merge({
        data: {
            state: "BREACH",
            counter: 0,
        }
    });
    global.setBlockEntityData(block, nbt);
    global.updateSignalers(level, block);
    let breachTypes = global.ABNORMALITIES.get(String(`${nbt.data.getString("abnormalityType")}`).trim()).breachTypes();
    if (breachTypes.contains("GRANDIOSE")) {
        global.addThreatLevel(server, teamName, 5);
        global.tellTeam(server, level, teamName, Text.translatable("messages.scp.general.threat_level_increased", Number(server.persistentData[teamName].getInt("threat_level")) / 5).darkRed());
        global.addChaos(server, block, teamName, Number(server.persistentData[teamName].getInt("threat_level")));
    } else if (breachTypes.contains("ESCAPEARTIST")) {
        global.escapeArtist(level, entity, [-1, 0, 1, 2, 3, 4], 8, 8);
    } else if (breachTypes.contains("INDIGO_ESCAPEARTIST")) {
        global.escapeArtist(level, entity, [-1, 0, 1, 2], 12, 24);
    }
}

global.increaseUnitCounter = (level, block, abnormalityName, nbt, amount) => {
    let resolvedAmount = amount ? amount : 1;
    let { x, y, z } = block;
    let state = String(nbt.data.getString("state")).trim();
    if (state == "BREACH") return;
    if ((nbt.data.counter ? Number(nbt.data.getInt("counter")) + resolvedAmount : 0) < global.ABNORMALITIES.get(String(`${nbt.data.getString("abnormalityType")}`).trim()).counter()) {
        nbt.merge({
            data: {
                counter: global.increaseStage(Number(nbt.data.getInt("counter")), resolvedAmount)
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
            global.breachAbnormality(server, level, block, foundEntity, abnormalityName, nbt);
        } else {
            // Reset since the abnormality is probably dead TODO maybe not?
            // TODO: Translation string
            let teamName = String(nbt.data.getString("teamName")).trim();
            global.paintToTeam(server, level, teamName, `${abnormalityName} HAS EXPIRED AT [x:${x}/z:${z}].`, '#FF5555');
            nbt.merge({ data: { boundPlayer: "", abnormalityType: "", abnormalityUUID: "", counter: 0, dayLastTriggered: -1, state: "", researchLevel: 0, researchTime: 0 } });
            global.setBlockEntityData(block, nbt);
        }
    }
}

global.decreaseUnitCounter = (nbt, amount) => {
    if ((nbt.data.counter ? Number(nbt.data.getInt("counter")) : 0) > 0) {
        nbt.merge({
            data: {
                counter: global.decreaseStage(Number(nbt.data.getInt("counter")), amount)
            }
        });
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

let getClassHexColor = (tier) => {
    switch (tier) {
        case "AMBER": return "#ca8f0b";
        case "MAROON": return "#c53c23";
        case "INDIGO": return "#623f8e";
        default:
        case "VERDANT": return "#398e36";
    }
}

global.printContainmentUnitInfo = (player, server, data) => {
    const { state } = data;
    let abnomalityData = global.ABNORMALITIES.get(String(`${data.getString("abnormalityType")}`).trim());
    global.renderUiText(
        player,
        server,
        {
            containmentSummary: {
                type: 'text',
                textLines: [global.getFullAbnormalityName(data, "REQUIRES RESEARCH LEVEL 2"), `State: ${state}`, `Qliphoth Counter: ${Number(data.getInt("researchLevel")) >= 1 ? `${data.getInt("counter")}/${abnomalityData.counter()}` : "REQUIRES RESEARCH LEVEL 1"} ${Number(data.getInt("researchLevel")) ? ` | Research Level: ${Number(data.getInt("researchLevel"))}` : ""}`],
                alignX: 'center',
                alignY: 'bottom',
                shadow: true,
                centered: true,
                x: 2,
                y: -110,
                color: getClassHexColor(abnomalityData.tier())
            }
        },
        global.mainUiElementIds
    );
}

const getClassRadius = (tier) => {
    switch (tier) {
        case "amber": return 3;
        case "maroon": return 4;
        case "indigo": return 5;
        default:
        case "verdant": return 2;
    }
}

global.getClassRadii = (tier, block) => {
    let radius = getClassRadius(tier);
    return { radius: radius, centerRadiusPos: block.getPos().offset(0, radius, 0) };
}

let maxAttempts = 30;

global.escapeArtist = (level, entity, possibleYLevels, minRange, maxRange) => {
    let { x, y, z } = entity.getOnPos();
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
        for (let i = 0; i < possibleYLevels.length; i++) {
            let attemptY = Math.floor(y + possibleYLevels[i]);
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