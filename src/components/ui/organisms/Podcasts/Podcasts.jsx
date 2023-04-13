import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  PODCASTID_PARAM,
  PODCAST_DETAIL_PAGE_ROUTER_PATH
} from '../../../../constants';
import PodcastFilter from '../../molecules/PodcastFilter';
import PodcastCardList from '../../molecules/PodcastCardList';
import './Podcasts.css';

/**
 * Renders the main page body with podcasts
 *
 * @param {array} podcasts - the list of podcast to render
 * @returns JSX.Element the body of the main page
 */
const Podcasts = ({ podcasts }) => {
  const [filter, setFilter] = useState('');
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

    navigate(navigationUrl, { state: { podcastInfo } });
  };

  return (
    <div data-testid="podcasts" className="podcasts">
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
