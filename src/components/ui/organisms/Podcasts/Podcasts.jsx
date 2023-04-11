import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  PODCASTID_PARAM,
  PODCAST_DETAIL_PAGE_ROUTER_PATH
} from '../../../../constants';
import PodcastFilter from '../../molecules/PodcastFilter';
import PodcastCardList from '../../molecules/PodcastCardList';
import usePodcasts from '../../../../hooks/usePodcasts';

/**
 * Renders the main page body with podcasts
 *
 * @returns JSX.Element the body of the main page
 */
const Podcasts = () => {
  const [filter, setFilter] = useState('');
  const { podcasts, isLoading } = usePodcasts();
  const navigate = useNavigate();

  const handleFilterChange = (e) => {
    e.stopPropagation();
    setFilter(e.target.value);
  };

  const navigateToPodcast = (podcastId) => {
    const podcastInfo = podcasts.find(
      (podcast) => podcast.podcastId === podcastId
    );

    const navigationUrl = PODCAST_DETAIL_PAGE_ROUTER_PATH.replace(
      PODCASTID_PARAM,
      podcastId
    );

    navigate(navigationUrl, { podcastInfo });
  };

  return (
    <div data-testid="podcasts">
      <PodcastFilter filterValue={filter} onFilterChange={handleFilterChange} />
      <PodcastCardList
        podcastList={podcasts}
        filterValue={filter}
        onPodcastCardClick={navigateToPodcast}
      />
    </div>
  );
};

export default Podcasts;
