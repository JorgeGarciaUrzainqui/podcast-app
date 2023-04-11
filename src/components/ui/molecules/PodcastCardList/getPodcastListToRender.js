export function getPodcastListToRender(podcastList, filterValue) {
  if (!filterValue) {
    return sortPodCastList(podcastList);
  }

  return sortPodCastList(filterPodCastList(podcastList, filterValue));
}

function filterPodCastList(podcastList, filterValue) {
  return podcastList.filter((podcast) => filterPodCast(podcast, filterValue));
}

function filterPodCast(podcast, filterValue) {
  const name = podcast.podcastName.toLowerCase();
  const author = podcast.podcastAuthor.toLowerCase();
  const filterString = filterValue.toLowerCase();

  return name.includes(filterString) || author.includes(filterString);
}

function sortPodCastList(podcastList) {
  return podcastList.sort((PcA, PcB) => {
    if (PcA.podcastName < PcB.podcastName) {
      return -1;
    }
    if (PcA.podcastName > PcB.podcastName) {
      return 1;
    }

    return 0;
  });
}
