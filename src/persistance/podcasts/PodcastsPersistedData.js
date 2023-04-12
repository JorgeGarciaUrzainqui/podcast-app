import { PodcastsPersistClass } from './PodcastsPersistClass';
import { IDB_DATABASES } from '../../configureIDB';

const { name, version, keyPath } = IDB_DATABASES.Podcasts;
const podcastsPersistance = new PodcastsPersistClass(name, version, keyPath);

/**
 * Retrieve all persisted Podcast list in client side
 *
 * @returns array - the podcast list stored in client side
 */
export async function getAllPersistedPodcasts() {
  return podcastsPersistance.getData();
}

/**
 * Persist a list of podcast into client side storage
 *
 * @param {object[]} podcastList - the list of podcast to be stored in client side
 * @returns
 */
export async function persistAllPodcasts(podcastList) {
  return podcastsPersistance.saveData(podcastList);
}
