import { useLocation, useParams } from 'react-router-dom';

import StandardPageTemplate from '../../templates/StandardPageTemplate';
import NavigationBar from '../../ui/organisms/NavigationBar';
import PodcastEpisode from '../../ui/organisms/PodcastEpisode/PodcastEpisode';
import './EpisodePage.css';

/**
 * Renders the episode page of the application
 *
 * @returns JSX.Element - the episode page component
 */
const EpisodePage = () => {
  const { state } = useLocation();
  const { podcastId } = useParams();

  const podcastInfo = state?.podcastInfo || {};
  const episodeInfo = state?.episodeInfo || {};

  return (
    <StandardPageTemplate
      headerPage={<NavigationBar />}
      bodyPage={
        <PodcastEpisode
          podcastId={podcastId}
          podcastInfo={podcastInfo}
          episodeInfo={episodeInfo}
        />
      }
      variantClass="podcastPage"
      testId="podcastPage"
    />
  );
};

export default EpisodePage;
