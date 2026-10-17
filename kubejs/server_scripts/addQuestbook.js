PlayerEvents.loggedIn((e) => {
  const { player, level, server } = e;
  if (!player.stages.has("starting_items_up") && !player.stages.has("starting_items")) {
    player.tell(Text.translatable("messages.scp.general.intro").red())
    player.stages.add("starting_items_up")
    player.give("scp:manager_pda")
  }
  let teamName = global.getPlayerTeamName(level, player);
  if (server.persistentData[teamName] == null) {
    server.persistentData[teamName] = { chaos: 0 };
  }
});
