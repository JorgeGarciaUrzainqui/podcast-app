import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  PODCASTID_PARAM,
  PODCAST_DETAIL_PAGE_ROUTER_PATH
} from '../../../../constants';
import PodcastSideBar from '../../molecules/PodcastSideBar';
import EpisodePlayer from '../../molecules/EpisodePlayer';

/**
 * Renders the episode page body with podcast information an episode player
 *
 * @returns JSX.Element the body of the episode page
 */
const PodcastEpisode = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { podcastId } = useParams();

  const podcastInfo = state?.podcastInfo || {};
  const episodeInfo = state?.episodeInfo || {};

  const handlePodcastSideBarClick = () => {
    const navigationUrl = PODCAST_DETAIL_PAGE_ROUTER_PATH.replace(
      PODCASTID_PARAM,
      podcastId
    );

    navigate(navigationUrl, { state: { podcastInfo } });
  };

  return (
    <div className="podcastEpisode">
      <PodcastSideBar
        podcastInfo={podcastInfo}
        onPodcastSideBarClick={handlePodcastSideBarClick}
      />
      <EpisodePlayer episodeInfo={episodeInfo} />
    </div>
  );
};

export default PodcastEpisode;
