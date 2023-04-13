import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import PodcastSideBar from '../../../../../src/components/ui/molecules/PodcastSideBar';

describe('Podcast Side Bar component', () => {
  const TEST_PODCAST_INFO = {
    podcastId: 'PodCast01',
    podcastName: 'PodCast 01',
    podcastImage: 'PodCastImage',
    podcastAuthor: 'Author 01',
    podcastSummary: 'This is the summary of the podcast'
  };

  const DEFAULT_PODCAST_SIDEBAR_TESTID = 'podcastSideBar';
  const DEFAULT_PODCAST_SIDEBAR_IMAGE_TESTID = `${DEFAULT_PODCAST_SIDEBAR_TESTID}-image`;
  const DEFAULT_PODCAST_SIDEBAR_INFO_TESTID = `${DEFAULT_PODCAST_SIDEBAR_TESTID}-podcastInfo`;
  const DEFAULT_PODCAST_SIDEBAR_DESCRIPTION_TESTID = `${DEFAULT_PODCAST_SIDEBAR_TESTID}-description`;

  it('should render without crash with mandatory and default props', () => {
    render(<PodcastSideBar podcastInfo={TEST_PODCAST_INFO} />);

    expect(screen.getByTestId(DEFAULT_PODCAST_SIDEBAR_TESTID)).toBeVisible();
    expect(
      screen.getByTestId(DEFAULT_PODCAST_SIDEBAR_IMAGE_TESTID)
    ).toBeVisible();
    expect(
      screen.getByTestId(DEFAULT_PODCAST_SIDEBAR_INFO_TESTID)
    ).toBeVisible();
    expect(
      screen.getByTestId(DEFAULT_PODCAST_SIDEBAR_DESCRIPTION_TESTID)
    ).toBeVisible();
  });

  it('should launch onPodcastSideBarClick when clicking image', () => {
    const onClickFn = vi.fn();
    render(
      <PodcastSideBar
        podcastInfo={TEST_PODCAST_INFO}
        onPodcastSideBarClick={onClickFn}
      />
    );

    fireEvent.click(screen.getByTestId(DEFAULT_PODCAST_SIDEBAR_IMAGE_TESTID));
    expect(onClickFn).toHaveBeenCalledTimes(1);
    expect(onClickFn).toHaveBeenCalledWith(TEST_PODCAST_INFO.podcastId);
  });

  it('should launch onPodcastSideBarClick when clicking podcastInfo', () => {
    const onClickFn = vi.fn();
    render(
      <PodcastSideBar
        podcastInfo={TEST_PODCAST_INFO}
        onPodcastSideBarClick={onClickFn}
      />
    );

    fireEvent.click(screen.getByTestId(DEFAULT_PODCAST_SIDEBAR_INFO_TESTID));
    expect(onClickFn).toHaveBeenCalledTimes(1);
    expect(onClickFn).toHaveBeenCalledWith(TEST_PODCAST_INFO.podcastId);
  });
});
