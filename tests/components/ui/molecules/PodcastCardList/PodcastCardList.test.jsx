import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import PodcastCardList from '../../../../../src/components/ui/molecules/PodcastCardList/PodcastCardList';
import { PODCAST_LIST } from './__mock__/PodcastList.mock';

describe('Podcast Card List component', () => {
  const onClickFn = vi.fn();

  const PODCAST_CARD_TESTID = 'podcastCard';

  beforeEach(() => {
    onClickFn.mockClear();
  });

  it('should render without crash with mandatory props and default props', () => {
    render(
      <PodcastCardList
        podcastList={PODCAST_LIST}
        onPodcastCardClick={onClickFn}
      />
    );

    expect(screen.getAllByTestId(PODCAST_CARD_TESTID)).toHaveLength(4);
  });

  it('should filter podcast list and render two elements', () => {
    const filterValue = 'J';
    render(
      <PodcastCardList
        podcastList={PODCAST_LIST}
        onPodcastCardClick={onClickFn}
        filterValue={filterValue}
      />
    );

    expect(screen.getAllByTestId(PODCAST_CARD_TESTID)).toHaveLength(2);
  });

  it('should filter podcast list by name and author and not rnder any element', () => {
    const filterValue = 'Jimmy';
    render(
      <PodcastCardList
        podcastList={PODCAST_LIST}
        onPodcastCardClick={onClickFn}
        filterValue={filterValue}
      />
    );

    expect(screen.queryAllByTestId(PODCAST_CARD_TESTID)).toHaveLength(0);
  });

  it('should execute onPodcastCardClick function', () => {
    let clickedPodcastId;
    onClickFn.mockImplementation((podcastId) => (clickedPodcastId = podcastId));

    render(
      <PodcastCardList
        podcastList={PODCAST_LIST}
        onPodcastCardClick={onClickFn}
      />
    );

    const postcarstCardElements = screen.getAllByTestId(PODCAST_CARD_TESTID);

    fireEvent.click(postcarstCardElements[0]);

    expect(onClickFn).toHaveBeenCalledTimes(1);
    expect(clickedPodcastId).toEqual('Id-01');
  });
});
