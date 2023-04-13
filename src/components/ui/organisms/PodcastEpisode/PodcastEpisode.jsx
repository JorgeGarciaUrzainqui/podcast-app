import { useNavigate } from 'react-router-dom';

import {
  PODCASTID_PARAM,
  PODCAST_DETAIL_PAGE_ROUTER_PATH
} from '../../../../constants';
import PodcastSideBar from '../../molecules/PodcastSideBar';
import EpisodePlayer from '../../molecules/EpisodePlayer';

/**
 * Renders the episode page body with podcast information an episode player
 *
 * @param {string} podcastId - the podcast id
 * @param {Object} podcastInfo - the podcast selected information
 * @param {Object} episodeInfo - the episode selected information
 * @returns JSX.Element the body of the episode page
 */
const PodcastEpisode = ({ podcastId, podcastInfo, episodeInfo }) => {
  const navigate = useNavigate();

  const handlePodcastSideBarClick = () => {
    const navigationUrl = PODCAST_DETAIL_PAGE_ROUTER_PATH.replace(
      PODCASTID_PARAM,
      podcastId
    );

    navigate(navigationUrl, { state: { podcastInfo } });
  };

  return (
    <div className="podcastEpisode" data-testid="podcastEpisode">
      <PodcastSideBar
        podcastInfo={podcastInfo}
        onPodcastSideBarClick={handlePodcastSideBarClick}
      />
      <EpisodePlayer episodeInfo={episodeInfo} />
    </div>
  );
};

export default PodcastEpisode;
