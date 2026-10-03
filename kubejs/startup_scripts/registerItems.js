StartupEvents.registry("item", (e) => {
  e.create("scp:manager_pda").displayName("Manager PDA");
  e.create("scp:enkephalin");
  e.create("scp:abnormality_heart");
  e.create("scp:spiritual_book");
  e.create("scp:soul_needle");
  e.create("scp:black_opal");
  e.create("scp:tubasmoke_stick");

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

  e.create(`scp:warehouse_expansion_card`).maxStackSize(4);

  [
    "verdant",
    "amber",
    "maroon",
    "indigo",
  ].forEach((color) => {
    e.create(`scp:${color}_research`);
  });

  e.create("scp:deaths_dynamic_shroud");
  e.create("scp:qliphoth_neutralizer");
});
