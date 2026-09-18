PlayerEvents.loggedIn((e) => {
  const { player } = e;
  if (!player.stages.has("starting_items")) {
    player.stages.add("starting_items");
    player.give('scguns:anthralite_lamp');
    player.give(Item.of('16x scguns:syringe'));
    player.give('2x scp:verdant_hallway_expansion_card');
    player.give('4x scp:verdant_containment_expansion_card');
    player.give('numismatics:bank_terminal');
    player.tell(Text.red("Welcome to the facility. Summon your first abnormality and harvest Enkephalin using syringes."))
  }
});
