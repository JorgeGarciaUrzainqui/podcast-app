import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import DocumentContainer from '../../../../../src/components/ui/atoms/DocumentContainer';

describe('DocumentContainer component', () => {
  const TEST_MESSAGE = 'I am testing';
  const TEST_DOCUMENT = `<h1>${TEST_MESSAGE}</h1>`;
  const DEFAULT_TESTID = 'documentContainer';

  it('should render without crash with mandatory and default props', () => {
    render(<DocumentContainer document={TEST_DOCUMENT} />);

    const documentContainerComponent = screen.getByTestId(DEFAULT_TESTID);

    expect(documentContainerComponent).toBeVisible();
    expect(documentContainerComponent).not.toHaveClass();
    expect(screen.getByRole('heading', { 'aria-level': 1 })).toBeVisible();
    expect(screen.getByText(TEST_MESSAGE)).toBeVisible();
  });

  it('should render with a variant class', () => {
    const variantClass = 'MockClass';

    render(
      <DocumentContainer document={TEST_DOCUMENT} variantClass={variantClass} />
    );

    expect(screen.getByTestId(DEFAULT_TESTID)).toHaveClass(variantClass);
  });

  it('should be accessible by prop testId', () => {
    const testId = 'MockDocumentContainer';

    render(<DocumentContainer document={TEST_DOCUMENT} testId={testId} />);

    expect(screen.getByTestId(testId)).toBeVisible();
  });
});
