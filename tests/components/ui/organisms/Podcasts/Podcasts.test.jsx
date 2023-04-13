import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Podcasts from '../../../../../src/components/ui/organisms/Podcasts/Podcasts';
import {
  PODCASTID_PARAM,
  PODCAST_DETAIL_PAGE_ROUTER_PATH
} from '../../../../../src/constants';

describe('Podcasts component', () => {
  const TEST_PODCAST = {
    podcastId: 'Podcast01',
    podcastName: ' Podcast 01',
    podcastAuthor: 'Author 01'
  };

  vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => vi.fn()
  }));

  it('should render without crash', () => {
    render(<Podcasts podcasts={[TEST_PODCAST]} />);

    expect(screen.getByTestId('podcastFilter')).toBeVisible();
    expect(screen.getByTestId('podcastCardList')).toBeVisible();

    const postcastCardList = screen.getAllByTestId('podcastCard');

    expect(postcastCardList).toHaveLength(1);
  });

  it('should navigate when a podcast card is clicked', async () => {
    const reactRouterDOM = await import('react-router-dom');
    const mockNavigate = vi.fn();
    vi.spyOn(reactRouterDOM, 'useNavigate').mockImplementation(
      () => mockNavigate
    );

    render(<Podcasts podcasts={[TEST_PODCAST]} />);

    const postcastCardList = screen.getAllByTestId('podcastCard');

    fireEvent.click(postcastCardList[0]);

    const expectedURL = PODCAST_DETAIL_PAGE_ROUTER_PATH.replace(
      PODCASTID_PARAM,
      'Podcast01'
    );

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(expectedURL, {
      state: { podcastInfo: TEST_PODCAST }
    });
  });
});
