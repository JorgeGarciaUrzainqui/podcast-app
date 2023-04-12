import React from 'react';

/**
 * Generates a paragraph component
 *
 * @param {object} props - props of the component
 * @param {string} props.message - the text to be rendered
 * @param {string} [props.variantClass] - Optional. Allows to inject css classes to the component.
 * @param {string} [props.testId] - Optional. For testing purposes only. Indicates the data-testid to be used.
 * @returns JSX Element - the paragraph component
 */
const Paragraph = ({ message, variantClass, testId }) => {
  return (
    <p data-testid={testId} className={variantClass}>
      {message}
    </p>
  );
};

Paragraph.defaultProps = {
  variantClass: '',
  testId: 'paragraph'
};

export default Paragraph;
