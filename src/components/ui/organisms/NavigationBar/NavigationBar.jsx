import { useNavigate } from 'react-router-dom';

import { MAIN_PAGE_ROUTER_PATH } from '../../../../constants';
import ClickableText from '../../molecules/ClickableText/ClickableText';
import LoadingDataImage from '../../molecules/LoadingDataImage';
import './NavigationBar.css';

/**
 * Renders the navigation bar of the app
 *
 * @param {boolean} isLoadingData - indicates if the page is loading some data
 * @returns JSX.Element - the navigation bar component
 */
const NavigationBar = ({ isLoadingData }) => {
  const navigate = useNavigate();

  const handleNavigation = (navigationUrl) => {
    navigate(navigationUrl);
  };

  return (
    <div data-testid="navigationBar" className="navigationBar">
      <ClickableText
        text="Podcaster"
        onClickText={() => handleNavigation(MAIN_PAGE_ROUTER_PATH)}
        variantClass="navigationBar-mainPage"
        testId="navigationBar-mainPage"
      />
      <LoadingDataImage
        isLoadingData={isLoadingData}
        testId="navigationBar-loadingImage"
      />
    </div>
  );
};

NavigationBar.defaultProps = {
  isLoadingData: false
};

export default NavigationBar;
