import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import PodcastEpisodeTableRow from '../../../../../../../src/components/ui/molecules/PodcastEpisodeTable/PodcastEpisodeTableRows/PodcastEpisodeTableRow';

describe('Podcast Episode Table Row component', () => {
  const TEST_EPISODE_COLUMN_KEYS = ['episodeTitle', 'episodeDuration'];
  const TEST_EPISODE_ROW = {
    episodeId: 'Episode01',
    episodeTitle: 'My title',
    episodeDuration: '01:20'
  };

  it('should render without crash with mandatory props', () => {
    const onClickFn = vi.fn();

    render(
      <table>
        <tbody>
          <PodcastEpisodeTableRow
            episodeColumnKeys={TEST_EPISODE_COLUMN_KEYS}
            episodeRow={TEST_EPISODE_ROW}
            onClickEpisodeRow={onClickFn}
          />
        </tbody>
      </table>
    );

    expect(screen.getAllByRole('row')).toHaveLength(1);

    const rowColumns = screen.getAllByRole('cell');

    expect(rowColumns).toHaveLength(2);
    expect(rowColumns[0].textContent).toEqual(TEST_EPISODE_ROW.episodeTitle);
    expect(rowColumns[1].textContent).toEqual(TEST_EPISODE_ROW.episodeDuration);
  });

  it('should launch click function when title is clicked', () => {
    const onClickFn = vi.fn();

    render(
      <table>
        <tbody>
          <PodcastEpisodeTableRow
            episodeColumnKeys={TEST_EPISODE_COLUMN_KEYS}
            episodeRow={TEST_EPISODE_ROW}
            onClickEpisodeRow={onClickFn}
          />
        </tbody>
      </table>
    );

    expect(screen.getAllByRole('row')).toHaveLength(1);

    const rowColumns = screen.getAllByRole('cell');

    fireEvent.click(rowColumns[0]);

    expect(onClickFn).toHaveBeenCalledTimes(1);
    expect(onClickFn).toHaveBeenCalledWith(TEST_EPISODE_ROW.episodeId);
  });
});
