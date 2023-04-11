import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import Podcasts from '../../../../../src/components/ui/organisms/Podcasts/Podcasts';
import {
  PODCASTID_PARAM,
  PODCAST_DETAIL_PAGE_ROUTER_PATH
} from '../../../../../src/constants';

describe('Podcasts component', () => {
  vi.mock('../../../../../src/hooks/usePodcasts', () => {
    return {
      default: () => ({
        podcasts: [
          {
            podcastId: 'Podcast01',
            podcastName: ' Podcast 01',
            podcastAuthor: 'Author 01'
          }
        ],
        isLoading: false
      })
    };
  });

  vi.mock('react-router-dom', () => ({
    ...vi.importActual('react-router-dom'),
    useNavigate: () => vi.fn()
  }));

  it('should render without crash', () => {
    render(<Podcasts />);

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

    const expectedURL = PODCAST_DETAIL_PAGE_ROUTER_PATH.replace(
      PODCASTID_PARAM,
      'Podcast01'
    );
    const expectedPayload = {
      podcastId: 'Podcast01',
      podcastName: ' Podcast 01',
      podcastAuthor: 'Author 01'
    };

    render(<Podcasts />);

    const postcastCardList = screen.getAllByTestId('podcastCard');

    fireEvent.click(postcastCardList[0]);

    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(expectedURL, {
      podcastInfo: expectedPayload
    });
  });
});
