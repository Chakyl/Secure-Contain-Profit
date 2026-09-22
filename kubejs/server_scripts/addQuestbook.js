PlayerEvents.loggedIn((e) => {
  const { player } = e;
  if (!player.stages.has("starting_items")) {
    player.tell(Text.red("Welcome to the facility. Summon your first abnormality and harvest Enkephalin using syringes."))
  }
});
