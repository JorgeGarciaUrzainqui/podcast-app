import React from 'react';

import ClickableContainer from '../../atoms/ClickableContainer';
import Text from '../../atoms/Text';

/**
 * Generates a clickable container with a text component
 *
 * @param {Object} props - props of the component
 * @param {string} props.inputValue - the current value of the input
 * @param {Function} [props.onInputChange] - Optional. The function that handles the input change
 * @param {string} [props.inputPlaceholder] - Optional. The placeholder of the input
 * @param {boolean} [props.isReadOnly] - Optional. Indicates fi the input is read only
 * @param {string} [props.variantClass] - Optional. Allows to inject css classes to the component.
 * @param {string} [props.testId] - Optional. For testing purposes only. Indicates the data-testid to be used.
 * @returns JSX Element - the text input component
 */
const ClickableText = ({ text, onClickText, variantClass, testId }) => {
  return (
    <>
      <ClickableContainer
        onContainerClick={onClickText}
        variantClass={variantClass}
        testId={`${testId}-container`}
      >
        <Text
          message={text}
          variantClass="clickableText-text"
          testId={`${testId}-text`}
        />
      </ClickableContainer>
    </>
  );
};

ClickableText.defaultProps = {
  variantClass: '',
  testId: 'clickableText'
};

export default ClickableText;
