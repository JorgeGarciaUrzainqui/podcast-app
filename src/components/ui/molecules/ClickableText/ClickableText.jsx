import React from 'react';

import ClickableContainer from '../../atoms/ClickableContainer';
import Text from '../../atoms/Text';

/**
 * Generates a clickable container with a text component
 *
 * @param {Object} props - props of the component
 * @param {string} props.text - the text to render
 * @param {Function} props.onClickTex - The function that handles the click
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
