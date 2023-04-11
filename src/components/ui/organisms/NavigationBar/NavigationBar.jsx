import { useNavigate } from 'react-router-dom';

import { MAIN_PAGE_ROUTER_PATH } from '../../../../constants';
import ClickableText from '../../molecules/ClickableText/ClickableText';
import './NavigationBar.css';

/**
 * Renders the navigation bar of the app
 *
 * @returns JSX.Element - the navigation bar component
 */
const NavigationBar = () => {
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
    </div>
  );
};

export default NavigationBar;
