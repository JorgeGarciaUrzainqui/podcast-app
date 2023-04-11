import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import NavigationBar from '../../../../../src/components/ui/organisms/NavigationBar';
import { MAIN_PAGE_ROUTER_PATH } from '../../../../../src/constants';

describe('Navigation Bar component', () => {
  const NAVIGATION_BAR_TESTID = 'navigationBar';
  const MAIN_PAGE_LINK_TESTID = 'navigationBar-mainPage';

  vi.mock('react-router-dom', () => {
    return {
      redirect: vi.fn()
    };
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render without crash', () => {
    render(<NavigationBar />);

    expect(screen.getByTestId(NAVIGATION_BAR_TESTID)).toBeVisible();
    expect(
      screen.getByTestId(`${MAIN_PAGE_LINK_TESTID}-container`)
    ).toBeVisible();
    expect(screen.getByTestId(`${MAIN_PAGE_LINK_TESTID}-text`)).toBeVisible();
  });

  it('should launch navigation to main page url path', async () => {
    const reactRouterDomMocked = await import('react-router-dom');

    const mockRedirect = vi.spyOn(reactRouterDomMocked, 'redirect');

    render(<NavigationBar />);

    fireEvent.click(screen.getByTestId(`${MAIN_PAGE_LINK_TESTID}-container`));

    expect(mockRedirect).toHaveBeenCalledTimes(1);
    expect(mockRedirect).toHaveBeenCalledWith(MAIN_PAGE_ROUTER_PATH);
  });
});
