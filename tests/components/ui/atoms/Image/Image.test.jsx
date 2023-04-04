import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Image from '../../../../../src/components/ui/atoms/Image';


describe('Image component', () => {
  const TEST_IMG_SRC = 'TestURL';
  const TEST_ALT_TEXT = 'TestAltText';
  const DEFAULT_TESTID = 'image';

  it('should render without crash with mandatory and default props', () => {
    render(<Image imageSrc={TEST_IMG_SRC} altText={TEST_ALT_TEXT} />);

    const imageComponent = screen.getByTestId(DEFAULT_TESTID);

    expect(imageComponent).toBeVisible();
    expect(imageComponent).toHaveAttribute('src', TEST_IMG_SRC);
    expect(screen.getByAltText(TEST_ALT_TEXT)).toBeVisible();
    expect(imageComponent).not.toHaveClass();
    expect(screen.getAllByRole('img')).toHaveLength(1);
  });

  it('should render with a variant class', () => {
    const variantClass = 'MockClass';

    render(
      <Image
        imageSrc={TEST_IMG_SRC}
        altText={TEST_ALT_TEXT}
        variantClass={variantClass}
      />
    );

    expect(screen.getByRole('img')).toHaveClass(variantClass);
  });

  it('should be accessible by prop testId', () => {
    const testId = 'MockImage';

    render(
      <Image imageSrc={TEST_IMG_SRC} altText={TEST_ALT_TEXT} testId={testId} />
    );

    expect(screen.getByTestId(testId)).toBeVisible();
  });
});
