import React from 'react';

/**
 * Defines the page skeleton of a standard page of the application
 *
 * @param {Object} props - props of the component
 * @param {JSX.Element} props.headerPage - the component to render as the header of the page
 * @param {JSX.Element} props.bodyPage - the component to render as the body of the page
 * @param {string} [props.variantClass] - Optional. Allows to inject css classes to the component.
 * @param {string} [props.testId] - Optional. For testing purposes only. Indicates the data-testid to be used.
 * @returns JSX.Element - the skeleton of the page
 */
const StandardPageTemplate = ({
  headerPage,
  bodyPage,
  variantClass,
  testId
}) => {
  return (
    <div className={variantClass} data-testid={testId}>
      {headerPage}
      {bodyPage}
    </div>
  );
};

StandardPageTemplate.defaultProps = {
  variantClass: '',
  testId: 'standardPageTemplate'
};

export default StandardPageTemplate;
