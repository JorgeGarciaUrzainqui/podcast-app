import React from 'react';

/**
 * Generates an span component
 *
 * @param {object} props - props of the component
 * @param {string} props.message - the text to be rendered
 * @param {string} [props.variantClass] - Optional. Allows to inject css classes to the component.
 * @param {string} [props.testId] - Optional. For testing purposes only. Indicates the data-testid to be used.
 * @returns JSX Element - the span component
 */
const Text = ({ message, variantClass, testId }) => {
  return (
    <span data-testid={testId} className={variantClass}>
      {message}
    </span>
  );
};

Text.defaultProps = {
  variantClass: '',
  testId: 'text'
};

export default Text;
