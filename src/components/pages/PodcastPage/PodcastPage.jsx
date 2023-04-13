import { useLocation, useParams } from 'react-router-dom';

import useEpisodes from '../../../hooks/useEpisodes';
import StandardPageTemplate from '../../templates/StandardPageTemplate';
import NavigationBar from '../../ui/organisms/NavigationBar/NavigationBar';
import PodcastDetails from '../../ui/organisms/PodcastDetails/PodcastDetails';
import './PodcastPage.css';

/**
 * Renders the podcast page of the application
 *
 * @returns JSX.Element - the podcast page component
 */
const PodcastPage = () => {
  const { podcastId } = useParams();
  const { state } = useLocation();
  const { episodes, isLoading } = useEpisodes(podcastId);

  const podcastInfo = state?.podcastInfo || {};

  return (
    <StandardPageTemplate
      headerPage={<NavigationBar isLoadingData={isLoading} />}
      bodyPage={
        <PodcastDetails
          episodes={episodes}
          podcastInfo={podcastInfo}
          isLoading={isLoading}
        />
      }
      variantClass="podcastPage"
      testId="podcastPage"
    />
  );
};

export default PodcastPage;
