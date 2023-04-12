import { useLocation, useNavigate, useParams } from 'react-router-dom';

import {
  EPISODEID_PARAM,
  PODCASTID_PARAM,
  PODCAST_EPISODE_PAGE_ROUTER_PATH
} from '../../../../constants';
import useEpisodes from '../../../../hooks/useEpisodes';
import PodcastEpisodeCount from '../../molecules/PodcastEpisodeCount';
import PodcastEpisodeTable from '../../molecules/PodcastEpisodeTable/PodcastEpisodeTable';
import PodcastSideBar from '../../molecules/PodcastSideBar';

/**
 * Renders the podcast page body with podcast information an episode list
 *
 * @returns JSX.Element the body of the podcast page
 */
const PodcastDetails = () => {
  const navigate = useNavigate();
  const { podcastId } = useParams();
  const { state } = useLocation();
  const { episodes, isLoading } = useEpisodes(podcastId);

  const podcastInfo = state?.podcastInfo || {};

  const onClickEpisodeRow = (episodeId) => {
    const episodeInfo = episodes.find(
      (episode) => episode.episodeId === episodeId
    );

    const navigationURL = PODCAST_EPISODE_PAGE_ROUTER_PATH.replace(
      PODCASTID_PARAM,
      podcastInfo.podcastId
    ).replace(EPISODEID_PARAM, episodeId);

    navigate(navigationURL, {
      state: { podcastInfo, episodeInfo }
    });
  };

  return (
    <div className="podcastDetails">
      <PodcastSideBar podcastInfo={podcastInfo} />
      <PodcastEpisodeCount
        episodeCount={episodes.length}
        isLoading={isLoading}
      />
      <PodcastEpisodeTable
        episodes={episodes}
        onClickEpisodeRow={onClickEpisodeRow}
        isLoading={isLoading}
      />
    </div>
  );
};

export default PodcastDetails;
