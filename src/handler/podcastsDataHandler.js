import {
  getAllPersistedPodcasts,
  persistAllPodcasts
} from '../persistance/podcasts/PodcastsPersistedData';
import { saveItemTimestamp, loadItemTimestamp } from '../persistance/util';
import { fetchPodcasts } from '../fetching/fetchPodcasts';

const LOCALSTORAGE_ITEM_PODCASTS = 'Podcasts';
const FETCH_DATA_TIME_LIMIT = 24 * 60 * 60 * 1000;

/**
 * Gets the podcast list to render and sets the loading process
 * The process excutes the following steps:
 *   1) If no data has been fetched previously, the function will try to fetch podcast list and will persist them
 *   2) If data has been fetched previously but more than a day ago, the function will try to fetch podcast list and will persist them
 *   3) If data has been fetched previously but within a day ago, the function willget podcast list from persisted data
 *
 *
 * @param {Function} setPodcasts - function to set the podcast list
 * @param {Function} setIsLoading - function to set the loading process
 * @returns void
 */
export async function podcastsDataHandler(setPodcasts, setIsLoading) {
  const currentTimestamp = new Date().getTime();

  setIsLoading(true);
  try {
    if (mustFetchPodcastData(currentTimestamp)) {
      await handlePodcastsDataFetching(setPodcasts, currentTimestamp);
      return;
    }

    await handlePodcastsDataPersisted(setPodcasts);
  } catch (e) {
    console.error(e.message);
    setPodcasts([]);
  } finally {
    setIsLoading(false);
  }
}

function mustFetchPodcastData(currentTimestamp) {
  const lastFetchTimestamp = loadItemTimestamp(LOCALSTORAGE_ITEM_PODCASTS);

  if (!lastFetchTimestamp) {
    return true;
  }

  return currentTimestamp > lastFetchTimestamp + FETCH_DATA_TIME_LIMIT;
}

async function handlePodcastsDataFetching(setPodcasts, fetchTimestamp) {
  const fetchedPodcasts = await fetchPodcasts();

  if (!fetchedPodcasts || fetchedPodcasts.length <= 0) {
    return;
  }

  setPodcasts(fetchedPodcasts);
  const persistResult = await persistAllPodcasts(fetchedPodcasts);

  if (!persistResult.error) {
    saveItemTimestamp(LOCALSTORAGE_ITEM_PODCASTS, fetchTimestamp);
  }
}

async function handlePodcastsDataPersisted(setPodcasts) {
  const persistedPodcasts = await getAllPersistedPodcasts();
  setPodcasts(persistedPodcasts);
}
