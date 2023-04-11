import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import NavigationBar from '../../../../../src/components/ui/organisms/NavigationBar';

describe('Navigation Bar component', () => {
  const NAVIGATION_BAR_TESTID = 'navigationBar';
  const MAIN_PAGE_LINK_TESTID = 'navigationBar-mainPage';

  it('should render without crash', () => {
    render(<NavigationBar />);

    expect(screen.getByTestId(NAVIGATION_BAR_TESTID)).toBeVisible();
    expect(
      screen.getByTestId(`${MAIN_PAGE_LINK_TESTID}-container`)
    ).toBeVisible();
    expect(screen.getByTestId(`${MAIN_PAGE_LINK_TESTID}-text`)).toBeVisible();
  });
});
