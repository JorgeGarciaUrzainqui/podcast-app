import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';

import { PAGE_ERROR_MESSAGE } from '../../../../../src/constants';
import ErrorBody from '../../../../../src/components/ui/organisms/ErrorBody';

describe('Error Body component', () => {
  const ERROR_BODY_TESTID = 'errorBody';

  it('should render without crash', () => {
    render(<ErrorBody />);

    expect(screen.getByTestId(ERROR_BODY_TESTID)).toBeVisible();
    expect(screen.getByText(PAGE_ERROR_MESSAGE)).toBeVisible();
  });
});
