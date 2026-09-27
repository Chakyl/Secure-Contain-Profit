PlayerEvents.loggedIn((e) => {
  const { player } = e;
  if (!player.stages.has("starting_items")) {
    player.tell(Text.red("Welcome Manager. Please refer to the Manager PDA for information on your facility."))
    player.stages.add("starting_items")
    player.give("scp:manager_pda")
  }
});
