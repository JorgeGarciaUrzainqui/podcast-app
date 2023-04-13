import './LoadingDataImage.css';

/**
 * Renders a span component with an animation to indicate data is being loaded
 *
 * @param {Object} props - props of the component
 * @param {boolean} props.isLoadingData - indicates if data is being loaded
 * @param {string} [props.variantClass] - Optional. Allows to inject css classes to the component.
 * @param {string} [props.testId] - Optional. For testing purposes only. Indicates the data-testid to be used.
 * @returns JSX.Element a circular span to indicate data is being loaded
 */
const LoadingDataImage = ({ isLoadingData, variantClass, testId }) => {
  if (!isLoadingData) {
    return null;
  }

  return (
    <>
      <span
        className={`loadingDataImage ${variantClass}`}
        data-testid={testId}
      />
    </>
  );
};

LoadingDataImage.defaultProps = {
  variantClass: '',
  testId: 'loadingDataImage'
};

export default LoadingDataImage;
