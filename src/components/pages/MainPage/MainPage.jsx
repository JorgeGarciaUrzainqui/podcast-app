import usePodcasts from '../../../hooks/usePodcasts';
import StandardPageTemplate from '../../templates/StandardPageTemplate';
import NavigationBar from '../../ui/organisms/NavigationBar/NavigationBar';
import Podcasts from '../../ui/organisms/Podcasts/Podcasts';
import './MainPage.css';

/**
 * Renders the main page of the application
 *
 * @returns JSX.Element - the main page component
 */
const MainPage = () => {
  const { podcasts, isLoading } = usePodcasts();

  return (
    <StandardPageTemplate
      headerPage={<NavigationBar isLoadingData={isLoading} />}
      bodyPage={<Podcasts podcasts={podcasts} />}
      variantClass="mainPage"
      testId="mainPage"
    />
  );
};

export default MainPage;
