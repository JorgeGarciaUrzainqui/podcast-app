import React from 'react';

/**
 * Generates a text input component
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
const TextInput = ({
  inputValue,
  onInputChange,
  inputPlaceholder,
  isReadOnly,
  variantClass,
  testId
}) => {
  return (
    <input
      data-testid={testId}
      type="text"
      value={inputValue}
      onChange={onInputChange}
      placeholder={inputPlaceholder}
      readOnly={isReadOnly}
      className={variantClass}
    />
  );
};

TextInput.defaultProps = {
  onInputChange: () => {},
  inputPlaceholder: '',
  isReadOnly: false,
  variantClass: '',
  testId: 'textInput'
};

export default TextInput;
