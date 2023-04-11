import React, { useState } from 'react';

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

  const handleFilterChange = (e) => {
    e.stopPropagation();
    setFilter(e.target.value);
  };

  const navigateToPodcast = (podcastId) => {
    console.log({ podcastId });
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
