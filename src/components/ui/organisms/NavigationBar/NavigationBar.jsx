import ClickableText from '../../molecules/ClickableText/ClickableText';
import './NavigationBar.css';

/**
 * Renders the navigation bar of the app
 *
 * @returns JSX.Element - the navigation bar component
 */
const NavigationBar = () => {
  const handleNavigation = (destination) => {
    console.log({ destination });
  };

  return (
    <div data-testid="navigationBar" className="navigationBar">
      <ClickableText
        text="Podcaster"
        onClickText={() => handleNavigation('main')}
        variantClass="navigationBar-mainPage"
        testId="navigationBar-mainPage"
      />
    </div>
  );
};

export default NavigationBar;
