import { useEffect, useState } from 'react';

import { episodesDataHandler } from '../handler/episodesDataHandler';

/**
 * Custom React Hook to get podcast's episode list to render
 *
 * @param {string} podcastId - the id of the podcast to get episodes
 * @returns Object - returns the podcast episode list information and also indicates if data is being loaded
 */
export default function useEpisodes(podcastId) {
  const [episodes, setEpisodes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    episodesDataHandler(podcastId, setEpisodes, setIsLoading);
  }, [podcastId]);

  return {
    episodes,
    isLoading
  };
}
