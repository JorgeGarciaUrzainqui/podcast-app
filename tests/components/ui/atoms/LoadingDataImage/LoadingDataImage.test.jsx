import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import LoadingDataImage from '../../../../../src/components/ui/molecules/LoadingDataImage';

describe('Loading Data Image component', () => {
  const DEFAULT_TESTID = 'loadingDataImage';
  const DEFAULT_CLASS = 'loadingDataImage';

  it('should render without crash with mandatory and default props', () => {
    render(<LoadingDataImage isLoadingData />);

    const loadingDataImageComponent = screen.getByTestId(DEFAULT_TESTID);

    expect(loadingDataImageComponent).toBeVisible();
    expect(loadingDataImageComponent).toHaveClass(DEFAULT_CLASS);
  });

  it('should render nothing if data is not being loaded without crash with mandatory and default props', () => {
    render(<LoadingDataImage />);

    expect(screen.queryByTestId(DEFAULT_TESTID)).not.toBeInTheDocument();
  });

  it('should render with a variant class', () => {
    const variantClass = 'MockClass';

    render(<LoadingDataImage isLoadingData variantClass={variantClass} />);

    expect(screen.queryByTestId(DEFAULT_TESTID)).toHaveClass(variantClass);
  });

  it('should be accessible by prop testId', () => {
    const testId = 'MockLoadingDataImage';

    render(<LoadingDataImage isLoadingData testId={testId} />);

    expect(screen.getByTestId(testId)).toBeVisible();
  });
});
