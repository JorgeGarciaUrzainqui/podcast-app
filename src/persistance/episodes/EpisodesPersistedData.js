import { EpisodesPersistClass } from './EpisodesPersistClass';
import { IDB_DATABASES } from '../../configureIDB';

const { name, version, keyPath, podcastIndex } = IDB_DATABASES.Episodes;
const episodesPersistance = new EpisodesPersistClass(name, version, keyPath);

/**
 * Retrieve all persisted episodes for a podcast in client side
 *
 * @param {string} podcastId - the id of the podcast
 * @returns array - the episode list  for podcast stored in client side
 */
export async function getAllPersistedEpisodesForPodcast(podcastId) {
  return episodesPersistance.getDataByProperty(podcastIndex, podcastId);
}

/**
 * Persist a list of episodes into client side storage
 *
 * @param {object[]} episodeList - the list of episodes to be stored in client side
 * @returns
 */
export async function persistAllEpisodes(episodeList) {
  return episodesPersistance.saveData(episodeList);
}
