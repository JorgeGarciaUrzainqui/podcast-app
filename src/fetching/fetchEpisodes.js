import { fetchData } from './fetchData';

const PODCAST_EPISODE_KIND = 'podcast-episode';
const PODCASTID_PARAM = ':podcastId';
const EPISODES_URL = `https://itunes.apple.com/lookup?id=${PODCASTID_PARAM}&media=podcast&entity=podcastEpisode`;

/**
 * Fetchs podcast episode list from endpoint
 *
 * @param {string} podcastId - the podcast id to get its episodes
 * @returns {array} the episode list for podcast
 */
export async function fetchEpisodesForPodcast(podcastId) {
  const contents = await fetchData(
    EPISODES_URL.replace(PODCASTID_PARAM, podcastId)
  );

  return retriveEpisodesData(podcastId, contents);
}

function retriveEpisodesData(podcastId, contents) {
  const results = contents?.results || [];

  return results
    .filter((result) => isEpisode(result))
    .map((element) => {
      return {
        podcastId,
        episodeId: getElementId(element),
        episodeTitle: getElementTitle(element),
        episodeDate: getElementDate(element),
        episodeDuration: getElementDuration(element),
        episodeDescription: getElementDescription(element),
        episodeUrl: getElementUrl(element)
      };
    });
}

function isEpisode(result) {
  const resultKind = getResultKind(result);

  return resultKind === PODCAST_EPISODE_KIND;
}

function getResultKind(result) {
  return result.kind;
}

function getElementId(element) {
  return element.trackId;
}

function getElementTitle(element) {
  return element.trackName;
}

function getElementDate(element) {
  const date = new Date(element.releaseDate);

  return `${date.getDay()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}

function getElementDuration(element) {
  const durationInSeconds = element.trackTimeMillis / 1000;
  const minutesDuration = Math.floor(durationInSeconds / 60);
  const secondsDuration = Math.ceil(
    (durationInSeconds - minutesDuration * 60) / 1
  );

  return `${minutesDuration}:${secondsDuration}`;
}

function getElementDescription(element) {
  return element.description;
}

function getElementUrl(element) {
  return element.episodeUrl;
}
