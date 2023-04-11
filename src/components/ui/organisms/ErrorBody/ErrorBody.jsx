import { PAGE_ERROR_MESSAGE } from '../../../../constants';
import Text from '../../atoms/Text';

/**
 * Generic message to show to the user in case the url does not exists in router
 *
 * @returns JSX.Element the error body component
 */
const ErrorBody = () => {
  return (
    <div data-testid="errorBody">
      <Text message={PAGE_ERROR_MESSAGE} />
    </div>
  );
};

export default ErrorBody;
