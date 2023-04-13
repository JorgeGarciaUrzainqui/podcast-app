import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import NavigationBar from '../../../../../src/components/ui/organisms/NavigationBar';
import { MAIN_PAGE_ROUTER_PATH } from '../../../../../src/constants';

describe('Navigation Bar component', () => {
  const NAVIGATION_BAR_TESTID = 'navigationBar';
  const MAIN_PAGE_LINK_TESTID = 'navigationBar-mainPage';

  vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => vi.fn()
  }));

  it('should render without crash with default props', () => {
    render(<NavigationBar />);

    expect(screen.getByTestId(NAVIGATION_BAR_TESTID)).toBeVisible();
    expect(
      screen.getByTestId(`${MAIN_PAGE_LINK_TESTID}-container`)
    ).toBeVisible();
    expect(screen.getByTestId(`${MAIN_PAGE_LINK_TESTID}-text`)).toBeVisible();
    expect(
      screen.queryByTestId(`${MAIN_PAGE_LINK_TESTID}-loadingImage`)
    ).not.toBeInTheDocument();
  });

  it('should launch navigation to main page url path', async () => {
    const reactRouterDOM = await import('react-router-dom');

    const mockNavigate = vi.fn();
    vi.spyOn(reactRouterDOM, 'useNavigate').mockImplementation(
      () => mockNavigate
    );

    render(<NavigationBar />);

    fireEvent.click(screen.getByTestId(`${MAIN_PAGE_LINK_TESTID}-container`));

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(MAIN_PAGE_ROUTER_PATH);
  });

  it('should render loading image when loading', () => {
    render(<NavigationBar isLoadingData />);

    expect(
      screen.getByTestId(`${NAVIGATION_BAR_TESTID}-loadingImage`)
    ).toBeVisible();
  });
});
