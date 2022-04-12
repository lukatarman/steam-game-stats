export function addImageLinks(gamesNoImg) {
  return gamesNoImg.map(addImageInfo);

  function addImageInfo(gameNoImg) {
    return {
      ...gameNoImg,
      imageUrl: `https://cdn.akamai.steamstatic.com/steam/apps/${gameNoImg.id}/header.jpg`,
    };
  }
}
