// Priority: 1000
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


global.getPossibleAbnormalities = (level, pos, radius, uuid) => level.getEntitiesWithin(AABB.ofBlock(level.getBlock(pos)).inflate(radius)).filter((entity) => entity.uuid.toString() == uuid);

global.addChaos = (server, block, chaosCount) => {
  server.persistentData.chaos = server.persistentData.chaos ? Number(server.persistentData.getInt("chaos")) + chaosCount : chaosCount;
  server.runCommandSilent(`playsound abyssal_decor:thehorrors4 block @a ${block.x} ${block.y} ${block.z} 2 1`);
};

global.addThreatLevel = (server, threatLevelCount) => server.persistentData.threat_level = server.persistentData.threat_level ? Number(server.persistentData.getInt("threat_level")) + threatLevelCount : threatLevelCount;

global.updateSignalers = (level, block) => {
  let belowBlock = level.getBlock(block.getPos().below());
  if (belowBlock.id == "scp:containment_unit_signaler") {
    belowBlock.set("minecraft:air")
    belowBlock.set("scp:containment_unit_signaler")
  }
}