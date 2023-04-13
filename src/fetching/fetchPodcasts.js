import { fetchData } from './fetchData';

const PODCASTS_URL =
  'https://itunes.apple.com/us/rss/toppodcasts/limit=100/genre=1310/json';

/**
 * Fetchs podcast list from endpoint
 *
 * @returns array the podcast list from the response
 */
export async function fetchPodcasts() {
  const contents = await fetchData(PODCASTS_URL);

  return retrivePodcastsData(contents);
}

function retrivePodcastsData(contents) {
  const entries = contents?.feed?.entry || [];

  return entries.map((entry) => {
    return {
      podcastId: getEntryId(entry),
      podcastName: getEntryName(entry),
      podcastImage: getEntryImage(entry),
      podcastAuthor: getEntryAuthor(entry),
      podcastSummary: getEntrySummary(entry)
    };
  });
}

function getEntryId(entry) {
  return entry.id.attributes['im:id'];
}

function getEntryName(entry) {
  return entry['im:name'].label;
}

function getEntryImage(entry) {
  const images = entry['im:image'];

  return images[images.length - 1].label;
}

function getEntryAuthor(entry) {
  return entry['im:artist'].label;
}

function getEntrySummary(entry) {
  return entry.summary.label;
}
