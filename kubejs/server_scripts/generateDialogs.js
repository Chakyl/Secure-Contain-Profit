let translationKeys = {};
const generateDialogEntries = (npcId, dialogType, dialogIndex, dialogLines, portraitPath, isChatter, customOptions) => {
  let entries = [];
  let resolvedDialogLines = Array.isArray(dialogLines) ? dialogLines : [dialogLines];
  resolvedDialogLines.forEach((entry, index) => {
    let lineTranslationKey = `dialog.npc.${npcId}.${dialogType}${dialogIndex == -1 ? "" : `.${dialogIndex}`}.line_${index}`;
    translationKeys[lineTranslationKey] = entry;
    let queuedEntry = {
      id: index == 0 ? "start" : index == resolvedDialogLines.length - 1 ? "end" : index,
    }
    if (portraitPath) {
      queuedEntry.speaker = { translate: `dialog.npc.${npcId}.name`, color: "white" };
      queuedEntry.text = [{ translate: lineTranslationKey }];
      queuedEntry.portraits = [
        {
          path: `${portraitPath}.png`,
          position: "INLINE",
          brightness: 1.0
        },
      ];
    } else {
      queuedEntry.text = [{ translate: lineTranslationKey }];
    }
    if (customOptions && resolvedDialogLines.length - 1 == index) {
      queuedEntry.options = customOptions.map((option, optIndex) => {
        let optionKey = `dialog.npc.${npcId}.${dialogType}.option_${optIndex}`;
        translationKeys[optionKey] = option.text;
        return {
          text: {
            translate: optionKey
          },
          target: option.target || "end",
          commands: Array.isArray(option.commands) ? option.commands : [option.commands]
        };
      });
    }

    entries.push(queuedEntry);
  });
  if (isChatter && npcId == "carpenter" || customOptions) {
    entries.push({
      id: "end",
      speaker: { translate: `dialog.npc.${npcId}.name`, color: "white" },
      portraits: [
        {
          path: `${portraitPath}.png`,
          position: "INLINE",
          brightness: 1.0
        },
      ],
      text: {
        translate: `dialog.npc.${npcId}.end`
      },
    })
  }
  return entries;
};

const runNpcDatagen = (npcId, npcDef) => {
  let nameTranslationKey = `dialog.npc.${npcId}.name`;
  let resolvedPortraitPath = npcDef.noPortrait ? null : (npcDef.portraitPath ? npcDef.portraitPath : npcId);
  translationKeys[nameTranslationKey] = npcDef.name || npcId;
  translationKeys[
    `dialog.npc.${npcId}.chatter.description`
  ] = `Chatting with ${npcDef.name || npcId}`;
  translationKeys[`dialog.npc.${npcId}.end`] = `Wish granted...`;
  if (npcDef.choiceDialogs) {
    npcDef.choiceDialogs.forEach((dialog) => {
      JsonIO.write(
        `kubejs/data/dialog/dialogs/${npcId}_dialog_${dialog.name}.json`,
        {
          id: `${npcId}_choice_dialog_${dialog.name}`,
          title: `${npcId} ${dialog.name}`,
          description: `dialog.npc.${npcId}.dialog.${dialog.name}`,
          entries: generateDialogEntries(
            npcId,
            `dialog.${dialog.name}`,
            -1,
            dialog.text,
            resolvedPortraitPath,
            false,
            dialog.options
          ),
        }
      );
    });
  }

  JsonIO.write(`kubejs/assets/dialog/lang/en_us.json`, translationKeys);
};


// Priority: -100
runNpcDatagen("red_phone", {
  name: "T-001",
  portraitPath: "abyssal_decor:textures/item/ironskull",
  choiceDialogs: [
    {
      name: "choice_1",
      text: ["What is it you desire today?"],
      options: [
        { text: "I desire wealth", commands: "give @p numismatics:crown" },
        { text: "I desire power", commands: "give @p scp:enkephalin" },
        { text: "I desire knowledge", commands: "give @p scp:verdant_research" }
      ]
    },
    {
      name: "choice_1",
      text: ["What is it you desire today?"],
      options: [
        { text: "I desire wealth", commands: "give @p numismatics:crown" },
        { text: "I desire power", commands: "give @p minecraft:redstone_torch" },
        { text: "I desire knowledge", commands: "give @p scp:verdant_research" }
      ]
    },
    {
      name: "choice_2",
      text: ["What is it you desire today?"],
      options: [
        { text: "I desire blood", commands: "give @p scguns:grenade" },
        { text: "I desire energy", commands: "give @p scp:enkephalin" },
        { text: "I fear knowledge", commands: "give @p scp:verdant_research" }
      ]
    },
    {
      name: "choice_3",
      text: ["What is it you desire today?"],
      options: [
        { text: "I desire nothing", commands: "give @p numismatics:sun" },
        { text: "I desire energy", commands: "give @p scguns:grenade" },
        { text: "I desire knowledge", commands: "give @p scp:verdant_research" }
      ]
    },
    {
      name: "choice_4",
      text: ["What is it you desire today?"],
      options: [
        { text: "I desire nothing", commands: "give @p minecraft:air" },
        { text: "I fear protection", commands: "give @p scguns:grenade" },
        { text: "I desire power", commands: "give @p scp:verdant_research" }
      ]
    },
    {
      name: "choice_5",
      text: ["What is it you desire today?"],
      options: [
        { text: "I fear love", commands: "give @p abyssal_decor:cave_taco" },
        { text: "I desire sleep", commands: "give @p minecraft:white_bed" },
        { text: "I desire power", commands: "give @p numismatics:crown" }
      ]
    },
    {
      name: "choice_6",
      text: ["What is it you desire today?"],
      options: [
        { text: "I fear war", commands: "give @p scguns:saketini" },
        { text: "I desire war", commands: "give @p scguns:war_axe" },
        { text: "I desire peace", commands: "give @p scp:verdant_research" }
      ]
    }
  ]
});