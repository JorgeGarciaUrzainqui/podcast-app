import React from 'react';

/**
 * Generates an img component
 *
 * @param {Object} props - props of the component
 * @param {string} props.imageSrc - image source to render the image
 * @param {string} props.altText - image alternative text to show in case the image src is not found/render
 * @param {string} [props.variantClass] - Optional. Allows to inject css classes to the component.
 * @param {string} [props.testId] - Optional. For testing purposes only. Indicates the data-testid to be used.
 * @returns {JSX.Element} the image component
 */
const Image = ({ imageSrc, altText, variantClass, testId }) => {
  return (
    <img
      data-testid={testId}
      src={imageSrc}
      alt={altText}
      className={variantClass}
    />
  );
};

Image.defaultProps = {
  variantClass: '',
  testId: 'image'
};

export default Image;
