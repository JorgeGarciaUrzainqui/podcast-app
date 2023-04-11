import { describe, expect, it } from 'vitest';

import { getPodcastListToRender } from '../../../../../src/components/ui/molecules/PodcastCardList/getPodcastListToRender';
import { PODCAST_LIST } from './__mock__/PodcastList.mock';

describe('getPodcastListToRender function', () => {
  it.each([
    {
      podcastList: PODCAST_LIST,
      filter: undefined,
      expected: ['Podcast 01', 'Podcast 02', 'Podcast 03', 'Podcast 04']
    },
    {
      podcastList: PODCAST_LIST,
      filter: '',
      expected: ['Podcast 01', 'Podcast 02', 'Podcast 03', 'Podcast 04']
    },
    {
      podcastList: PODCAST_LIST,
      filter: 'Pod',
      expected: ['Podcast 01', 'Podcast 02', 'Podcast 03', 'Podcast 04']
    },
    {
      podcastList: PODCAST_LIST,
      filter: 'Podcast 02',
      expected: ['Podcast 02']
    },
    {
      podcastList: PODCAST_LIST,
      filter: 'James',
      expected: ['Podcast 01']
    },
    {
      podcastList: PODCAST_LIST,
      filter: 'J',
      expected: ['Podcast 01', 'Podcast 03']
    },
    {
      podcastList: PODCAST_LIST,
      filter: 'Jimmy',
      expected: []
    }
  ])(
    'getPodcastListToRender filtering by name and author by $filter and sorted by name',
    ({ podcastList, filter, expected }) => {
      const listToRender = getPodcastListToRender(podcastList, filter);

      const podcastNameList = listToRender.map(
        (elementToRender) => elementToRender.podcastName
      );

      expect(podcastNameList).toEqual(expected);
    }
  );
});
