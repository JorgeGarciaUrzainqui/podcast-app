/**
 * Generates an div component to render html document
 *
 * @param {object} props - props of the component
 * @param {Document} props.document - the HTML document to render
 * @param {string} [props.variantClass] - Optional. Allows to inject css classes to the component.
 * @param {string} [props.testId] - Optional. For testing purposes only. Indicates the data-testid to be used.
 * @returns JSX Element - the div component with the html document
 */
const DocumentContainer = ({ document, variantClass, testId }) => {
  return (
    <div
      className={variantClass}
      data-testid={testId}
      dangerouslySetInnerHTML={{ __html: document }}
    />
  );
};

DocumentContainer.defaultProps = {
  variantClass: '',
  testId: 'documentContainer'
};

export default DocumentContainer;
