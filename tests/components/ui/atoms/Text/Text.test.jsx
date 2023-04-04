import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import Text from '../../../../../src/components/ui/atoms/Text';

describe('Text component', () => {
  const TEST_MESSAGE = 'Test Message';
  const DEFAULT_TESTID = 'text';

  it('should render without crash with mandatory and default props', () => {
    render(<Text message={TEST_MESSAGE} />);

    const textComponent = screen.getByTestId(DEFAULT_TESTID);

    expect(textComponent.textContent).toEqual(TEST_MESSAGE);
    expect(textComponent).not.toHaveClass();
  });

  it('should render with a variant class', () => {
    const variantClass = 'MockClass';

    render(<Text message={TEST_MESSAGE} variantClass={variantClass} />);

    expect(screen.getByText(TEST_MESSAGE)).toHaveClass(variantClass);
  });

  it('should be accessible by prop testId', () => {
    const testId = 'MockText';

    render(<Text message={TEST_MESSAGE} testId={testId} />);

    expect(screen.getByTestId(testId)).toBeVisible();
  });
});
