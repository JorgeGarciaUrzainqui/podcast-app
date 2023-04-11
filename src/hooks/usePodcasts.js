import { useEffect, useState } from 'react';
import { podcastsDataHandler } from '../handler/podcastsDataHandler';

/**
 * Custom React Hook to get podcast list to render
 *
 * @returns Object - returns the podcasts and also indicates if data is being loaded
 */
export default function usePodcasts() {
  const [podcasts, setPodcasts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    podcastsDataHandler(setPodcasts, setIsLoading);
  }, []);

  return {
    podcasts,
    isLoading
  };
}
