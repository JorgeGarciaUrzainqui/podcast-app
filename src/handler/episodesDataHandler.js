import {
  getAllPersistedEpisodesForPodcast,
  persistAllEpisodes
} from '../persistance/episodes/EpisodesPersistedData';
import { saveItemTimestamp, loadItemTimestamp } from '../persistance/util';
import { fetchEpisodesForPodcast } from '../fetching/fetchEpisodes';

const LOCALSTORAGE_ITEM_PODCAST = 'Podcast';
const FETCH_DATA_TIME_LIMIT = 24 * 60 * 60 * 1000;

/**
 * Gets the podcast's episode list to render and sets the loading process
 * The process excutes the following steps:
 *   1) If no data has been fetched previously, the function will try to fetch podcast's episode list and will persist them
 *   2) If data has been fetched previously but more than a day ago, the function will try to fetch podcast's episode list and will persist them
 *   3) If data has been fetched previously but within a day ago, the function will get episode list for a podcast from persisted data
 *
 * @param {string} podcastId - podcast id to fetch episodes
 * @param {Function} setEpisodes - function to set the episode list
 * @param {Function} setIsLoading - function to set the loading process
 * @returns void
 */
export async function episodesDataHandler(
  podcastId,
  setEpisodes,
  setIsLoading
) {
  if (!podcastId) {
    return;
  }

  const currentTimestamp = new Date().getTime();

  setIsLoading(true);
  try {
    if (mustFetchEpisodeData(podcastId, currentTimestamp)) {
      await handleEpisodesDataFetching(
        podcastId,
        setEpisodes,
        currentTimestamp
      );
      return;
    }

    await handleEpisodesDataPersisted(podcastId, setEpisodes);
  } catch (e) {
    console.error(e.message);
    setEpisodes([]);
  } finally {
    setIsLoading(false);
  }
}

function mustFetchEpisodeData(podcastId, currentTimestamp) {
  const lastFetchTimestamp = loadItemTimestamp(
    `${LOCALSTORAGE_ITEM_PODCAST}-${podcastId}`
  );

  if (!lastFetchTimestamp) {
    return true;
  }

  return currentTimestamp > lastFetchTimestamp + FETCH_DATA_TIME_LIMIT;
}

async function handleEpisodesDataFetching(
  podcastId,
  setEpisodes,
  fetchTimestamp
) {
  const fetchedEpisodes = await fetchEpisodesForPodcast(podcastId);

  if (!fetchedEpisodes || fetchedEpisodes.length <= 0) {
    return;
  }

  setEpisodes(fetchedEpisodes);
  const persistResult = await persistAllEpisodes(fetchedEpisodes);

  if (!persistResult.error) {
    saveItemTimestamp(
      `${LOCALSTORAGE_ITEM_PODCAST}-${podcastId}`,
      fetchTimestamp
    );
  }
}

async function handleEpisodesDataPersisted(podcastId, setEpisodes) {
  const persistedEpisodes = await getAllPersistedEpisodesForPodcast(podcastId);
  setEpisodes(persistedEpisodes);
}
