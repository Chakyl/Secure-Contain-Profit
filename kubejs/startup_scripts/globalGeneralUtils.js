// Priority: 1000
global.FLOOR_Y_LEVELS = [63, 50, 37];

global.getDay = (level) => Number((Math.floor(Number(level.dayTime() / 24000)) + 1).toFixed());

/**
 * I hate this function.
 * 
 * Expected:
 *  day: 10 | checkedDay: 11 | amount: 1 = true. Day in the past (time commands used)
 *  day: 11 | checkedDay: 10 | amount: 1 = true. 
 *  day: 12 | checkedDay: 10 | amount: 1 = false. 
 * 
 * @param {*} day Current world day, usually gotten from global.getDay()
 * @param {*} checkedDay day to compare to current day
 * @param {*} amount Amount of days to get the difference of
 * @returns If the amount is greater than or equal to the amount of days have passed
 */
global.compareDay = (day, checkedDay, amount) => Number(day) < Number(checkedDay) || Number(day) - Number(checkedDay) >= amount;

global.formatName = (name) => {
  if (name.length === 0) return "";
  return name.charAt(0).toUpperCase() + name.slice(1);
};

global.getFacingPlusOffset = (facing, pos, offset) => {
  switch (facing) {
    case "north":
      return pos.offset(0, 0, -offset);
    case "south":
      return pos.offset(0, 0, offset);
    case "west":
      return pos.offset(-offset, 0, 0);
    case "east":
      return pos.offset(offset, 0, 0);
  }
};

global.formatPriceTruncated = (number) => {
  let stringNumber = number.toString();
  if (stringNumber.length < 4) return number;
  if (stringNumber.length > 9) {
    let output = stringNumber.slice(0, stringNumber.length - 9);
    if (stringNumber.length === 10 && stringNumber.charAt(1) != "0") {
      output += '.' + stringNumber.charAt(1);
    }
    return output + "B";
  }
  if (stringNumber.length > 6) {
    let output = stringNumber.slice(0, stringNumber.length - 6);
    if (stringNumber.length === 7 && stringNumber.charAt(1) != "0") {
      output += '.' + stringNumber.charAt(1);
    }
    return output + "M";
  }

  return global.formatPrice(number);
};

global.rollArray = (array) => {
  if (!array || array.length === 0) return;
  return array[Math.floor(Math.random() * array.length)];
}


global.setBlockEntityData = (block, nbt) => {
  block.setEntityData(nbt);
  block.getEntity().setChanged();
};

global.getSCPID = (entity) => {
  let entityId = entity.replace(/:/g, "").replace(/"/g, "");
  let hash = 3434343434;
  for (let i = 0; i < entityId.length; i++) {
    hash ^= entityId.codePointAt(i);
    hash = Math.imul(hash, 67676767);
  }

  return String((Math.abs(hash) % 999) + 1).padStart(3, '0');
};

global.increaseStage = (input, count) => {
  let num = Number(input);
  num += count || 1;
  return num;
};

global.getAbnormalityName = (tier, id) => `${tier.charAt(0).toUpperCase()}-${global.getSCPID(id)}`

global.getFullAbnormalityName = (data, fallback) => `${global.getAbnormalityName(String(data.getString("tier")).trim(), String(data.getString("abnormalityType")).trim())}: ${Number(data.getInt("researchLevel")) >= 2 ? `${global.ABNORMALITIES.get(String(`${data.getString("abnormalityType")}`).trim()).name().getString()}` : fallback}`

global.getPossibleAbnormalities = (level, pos, radius, uuid) => level.getEntitiesWithin(AABB.ofBlock(level.getBlock(pos)).inflate(radius)).filter((entity) => entity.uuid.toString() == uuid || (entity.persistentData.respawned != null && entity.persistentData.getBoolean("respawned")));

global.getNearestAbnormalities = (level, pos, radius) => Array.from(level.getEntitiesWithin(AABB.ofBlock(level.getBlock(pos)).inflate(radius)).toArray()).filter((entity) => entity && entity.persistentData && entity.persistentData.getBoolean("abnormality")).sort((a, b) => a.distanceToSqr(pos) - b.distanceToSqr(pos));

global.addDisrepair = (server, block, teamName, disrepairCount) => {
  server.persistentData[teamName].disrepair = server.persistentData[teamName].disrepair ? Number(server.persistentData[teamName].getInt("disrepair")) + disrepairCount : disrepairCount;
  if (block) server.runCommandSilent(`playsound minecraft:entity.iron_golem.death block @a ${block.x} ${block.y} ${block.z} 0.5 0.2`);
};

global.addChaos = (server, block, teamName, chaosCount) => {
  server.persistentData[teamName].chaos = server.persistentData[teamName].chaos ? Number(server.persistentData[teamName].getInt("chaos")) + chaosCount : chaosCount;
  if (block) server.runCommandSilent(`playsound abyssal_decor:thehorrors4 block @a ${block.x} ${block.y} ${block.z} 2 1`);
};

global.addThreatLevel = (server, teamName, threatLevelCount) => server.persistentData[teamName].threat_level = server.persistentData[teamName].threat_level ? Number(server.persistentData[teamName].getInt("threat_level")) + threatLevelCount : threatLevelCount;

global.addKnownAbnormalities = (server, teamName, id) => {
  let known = server.persistentData[teamName].known_abnormalities ? JSON.parse(server.persistentData[teamName].getString("known_abnormalities")) : [];
  if (!known.includes(id)) known.push(id);
  server.persistentData[teamName].known_abnormalities = JSON.stringify(known);
}

global.updateSignalers = (level, block) => {
  let belowBlock = level.getBlock(block.getPos().below());
  if (belowBlock.id == "scp:containment_unit_signaler") {
    belowBlock.set("minecraft:air")
    belowBlock.set("scp:containment_unit_signaler")
  }
}

global.filterKnownAbnormalities = (server, teamName, abnormalitiesNext) => {
  if (!server.persistentData[teamName].known_abnormalities) return abnormalitiesNext;
  let known = JSON.parse(server.persistentData[teamName].getString("known_abnormalities"));
  let filteredAbnormalities = abnormalitiesNext.filter(item => known.indexOf(item) === -1);
  if (filteredAbnormalities.length == 0) {
    server.persistentData[teamName].known_abnormalities = JSON.stringify(known.filter((ab) => !abnormalitiesNext.includes(ab)));
    return abnormalitiesNext;
  }
  else return filteredAbnormalities
}

global.getFacing = (facing, pos) => {
  switch (facing) {
    case "north":
      return pos.offset(0, 0, -1);
    case "south":
      return pos.offset(0, 0, 1);
    case "west":
      return pos.offset(-1, 0, 0);
    case "east":
      return pos.offset(1, 0, 0);
  }
};
