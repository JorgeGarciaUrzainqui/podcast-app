import React from 'react';

/**
 * Generates a div component which is clickable
 *
 * @param {Object} props - props of the component
 * @param {JSX.Element} props.children - the container children to be rendered
 * @param {Function} [props.onContainerClick] - Optional. The function that handles the container click
 * @param {string} [props.variantClass] - Optional. Allows to inject css classes to the component.
 * @param {string} [props.testId] - Optional. For testing purposes only. Indicates the data-testid to be used.
 * @returns JSX Element - the div component that is clickable
 */
const ClickableContainer = ({
  children,
  onContainerClick,
  variantClass,
  testId
}) => {
  return (
    <div
      data-testid={testId}
      onClick={onContainerClick}
      className={variantClass}
    >
      {children}
    </div>
  );
};

ClickableContainer.defaultProps = {
  onContainerClick: () => {},
  variantClass: '',
  testId: 'clickableContainer'
};

export default ClickableContainer;
