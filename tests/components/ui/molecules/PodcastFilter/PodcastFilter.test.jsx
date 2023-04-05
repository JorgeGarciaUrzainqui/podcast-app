import { describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';

import PodcastFilter from '../../../../../src/components/ui/molecules/PodcastFilter';
import {
  PODCAST_FILTER_PLACEHOLDER,
  PODCAST_FILTER_LABEL
} from '../../../../../src/constants';

describe('Podcast Filter component', () => {
  const TEST_FILTER_VALUE = 'Initial Value';
  const onChangeFn = vi.fn();

  const DEFAULT_CONTAINER_TESTID = 'podcastFilter';
  const DEFAULT_LABEL_TESTID = 'podcastFilter-text';
  const DEFAULT_FILTER_TESTID = 'podcastFilter-filter';

  const DEFAULT_CONTAINER_CLASS = 'podcastFilter';
  const DEFAULT_LABEL_CLASS = 'podcastFilter-text';
  const DEFAULT_FILTER_CLASS = 'podcastFilter-filter';

  beforeEach(() => {
    onChangeFn.mockClear();
  });

  it('should render without crash with mandatory props', () => {
    render(
      <PodcastFilter
        filerValue={TEST_FILTER_VALUE}
        onFilterChange={onChangeFn}
      />
    );

    expect(screen.getByTestId(DEFAULT_CONTAINER_TESTID)).toBeVisible();
    expect(screen.getByTestId(DEFAULT_LABEL_TESTID)).toBeVisible();
    expect(screen.getByTestId(DEFAULT_FILTER_TESTID)).toBeVisible();
  });

  it('should launch onFilterChange function', () => {
    const newValue = 'New Value';
    let expectedValue;
    onChangeFn.mockImplementation((e) => (expectedValue = e.target.value));

    render(
      <PodcastFilter
        filerValue={TEST_FILTER_VALUE}
        onFilterChange={onChangeFn}
      />
    );

    fireEvent.change(screen.getByTestId(DEFAULT_FILTER_TESTID), {
      target: { value: newValue }
    });

    expect(onChangeFn).toHaveBeenCalledTimes(1);
    expect(expectedValue).toEqual(newValue);
  });

  it('should render with proper information', () => {
    render(
      <PodcastFilter
        filerValue={TEST_FILTER_VALUE}
        onFilterChange={onChangeFn}
      />
    );

    expect(screen.getByTestId(DEFAULT_LABEL_TESTID).textContent).toEqual(
      PODCAST_FILTER_LABEL
    );
    expect(screen.getByTestId(DEFAULT_FILTER_TESTID).value).toEqual(
      TEST_FILTER_VALUE
    );
    expect(
      screen.getByPlaceholderText(PODCAST_FILTER_PLACEHOLDER)
    ).toBeVisible();
  });

  it('should render with proper CSS classes', () => {
    render(
      <PodcastFilter
        filerValue={TEST_FILTER_VALUE}
        onFilterChange={onChangeFn}
      />
    );

    expect(screen.getByTestId(DEFAULT_CONTAINER_TESTID)).toHaveClass(
      DEFAULT_CONTAINER_CLASS
    );
    expect(screen.getByTestId(DEFAULT_LABEL_TESTID)).toHaveClass(
      DEFAULT_LABEL_CLASS
    );
    expect(screen.getByTestId(DEFAULT_FILTER_TESTID)).toHaveClass(
      DEFAULT_FILTER_CLASS
    );
  });
});
