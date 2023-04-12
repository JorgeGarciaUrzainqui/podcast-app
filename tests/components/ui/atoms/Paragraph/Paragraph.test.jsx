import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Paragraph from '../../../../../src/components/ui/atoms/Paragraph';

describe('Paragraph component', () => {
  const TEST_MESSAGE = 'Mock Paragrah';
  const DEFAULT_TESTID = 'paragraph';

  it('should render without crash with mandatory and default props', () => {
    render(<Paragraph message={TEST_MESSAGE} />);

    const paragraphComponent = screen.getByTestId(DEFAULT_TESTID);

    expect(paragraphComponent).toBeVisible();
    expect(paragraphComponent).not.toHaveClass();
    expect(screen.getByText(TEST_MESSAGE)).toBeVisible();
  });

  it('should render with a variant class', () => {
    const variantClass = 'MockClass';

    render(<Paragraph message={TEST_MESSAGE} variantClass={variantClass} />);

    expect(screen.getByTestId(DEFAULT_TESTID)).toHaveClass(variantClass);
  });

  it('should be accessible by prop testId', () => {
    const testId = 'MockParagraph';

    render(<Paragraph message={TEST_MESSAGE} testId={testId} />);

    expect(screen.getByTestId(testId)).toBeVisible();
  });
});
