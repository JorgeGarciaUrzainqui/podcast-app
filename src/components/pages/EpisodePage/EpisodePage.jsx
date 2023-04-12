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
  return (
    <StandardPageTemplate
      headerPage={<NavigationBar />}
      bodyPage={<PodcastEpisode />}
      variantClass="podcastPage"
      testId="podcastPage"
    />
  );
};

export default EpisodePage;
