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
  return (
    <StandardPageTemplate
      headerPage={<NavigationBar />}
      bodyPage={<PodcastDetails />}
      variantClass="podcastPage"
      testId="podcastPage"
    />
  );
};

export default PodcastPage;
