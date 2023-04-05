import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import PodcastCard from '../../../../../src/components/ui/molecules/PodcastCard/PodcastCard';
import { PODCASTCARD_AUTHOR_LABEL } from '../../../../../src/constants';

describe('Podcast Card component', () => {
  const podcastId = '1234';
  const podcastName = 'Podcast Name';
  const podcastImage = 'Podcast Image';
  const podcastAuthor = 'Podcast Author';
  const PODCAST_INFO = {
    podcastId,
    podcastName,
    podcastImage,
    podcastAuthor
  };
  const onClickFn = vi.fn();

  const DEFAULT_CONTAINER_TESTID = 'podcastCard';
  const DEFAULT_IMAGE_TESTID = 'podcastCard-image';
  const DEFAULT_NAME_TESTID = 'podcastCard-name';
  const DEFAULT_AUTHOR_TESTID = 'podcastCard-author';

  const DEFAULT_CONTAINER_CLASS = 'podcastCard';
  const DEFAULT_IMAGE_CLASS = 'podcastCard-image';
  const DEFAULT_NAME_CLASS = 'podcastCard-name';
  const DEFAULT_AUTHOR_CLASS = 'podcastCard-author';

  beforeEach(() => {
    onClickFn.mockClear();
  });

  it('should render without crash', () => {
    render(
      <PodcastCard podcastInfo={PODCAST_INFO} onPodcastCardClick={onClickFn} />
    );

    const { getByTestId } = screen;
    expect(getByTestId(DEFAULT_CONTAINER_TESTID)).toBeVisible();
    expect(getByTestId(DEFAULT_IMAGE_TESTID)).toBeVisible();
    expect(getByTestId(DEFAULT_NAME_TESTID)).toBeVisible();
    expect(getByTestId(DEFAULT_AUTHOR_TESTID)).toBeVisible();
  });

  it('should render with proper information', () => {
    render(
      <PodcastCard podcastInfo={PODCAST_INFO} onPodcastCardClick={onClickFn} />
    );

    const { getByTestId } = screen;
    expect(getByTestId(DEFAULT_IMAGE_TESTID)).toHaveAttribute(
      'src',
      podcastImage
    );
    expect(getByTestId(DEFAULT_NAME_TESTID).textContent).toEqual(
      podcastName.toUpperCase()
    );
    expect(getByTestId(DEFAULT_AUTHOR_TESTID).textContent).toEqual(
      `${PODCASTCARD_AUTHOR_LABEL} ${podcastAuthor}`
    );
  });

  it('should launch onClickFn when clicked', () => {
    let expectedResult;
    onClickFn.mockImplementation((value) => (expectedResult = value));
    render(
      <PodcastCard podcastInfo={PODCAST_INFO} onPodcastCardClick={onClickFn} />
    );

    fireEvent.click(screen.getByTestId(DEFAULT_CONTAINER_TESTID), {});

    expect(onClickFn).toHaveBeenCalledTimes(1);
    expect(expectedResult).toBe(podcastId);
  });

  it('should render with proper CSS class', () => {
    render(
      <PodcastCard podcastInfo={PODCAST_INFO} onPodcastCardClick={onClickFn} />
    );

    const { getByTestId } = screen;
    expect(getByTestId(DEFAULT_CONTAINER_TESTID)).toHaveClass(
      DEFAULT_CONTAINER_CLASS
    );
    expect(getByTestId(DEFAULT_IMAGE_TESTID)).toHaveClass(DEFAULT_IMAGE_CLASS);
    expect(getByTestId(DEFAULT_NAME_TESTID)).toHaveClass(DEFAULT_NAME_CLASS);
    expect(getByTestId(DEFAULT_AUTHOR_TESTID)).toHaveClass(
      DEFAULT_AUTHOR_CLASS
    );
  });
});
