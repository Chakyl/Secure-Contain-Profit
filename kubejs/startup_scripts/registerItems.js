StartupEvents.registry("item", (e) => {
  e.create("scp:enkephalin");
  e.create("scp:abnormality_heart");

  const createLockCards = (type) => {
    e.create(`scp:${type}_hallway_expansion_card`).maxStackSize(4);
    e.create(`scp:${type}_containment_expansion_card`).maxStackSize(8);
  };

  [
    "verdant",
    "amber",
    "maroon",
    "indigo",
  ].forEach((color) => {
    createLockCards(color);
  });

  e.create(`scp:vent_expansion_card`).maxStackSize(4);

    [
    "verdant",
    "amber",
    "maroon",
    "indigo",
  ].forEach((color) => {
    e.create(`scp:${color}_research`);
  });
});
