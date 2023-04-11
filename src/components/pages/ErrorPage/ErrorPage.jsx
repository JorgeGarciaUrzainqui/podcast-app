import StandardPageTemplate from '../../templates/StandardPageTemplate';
import NavigationBar from '../../ui/organisms/NavigationBar';
import ErrorBody from '../../ui/organisms/ErrorBody';

const ErrorPage = () => {
  return (
    <StandardPageTemplate
      headerPage={<NavigationBar />}
      bodyPage={<ErrorBody />}
      variantClass="errorPage"
      testId="errorPage"
    />
  );
};

export default ErrorPage;
