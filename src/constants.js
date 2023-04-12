export const PODCAST_FILTER_LABEL = '100';
export const PODCAST_FILTER_PLACEHOLDER = 'Filter podcasts...';

export const PODCASTCARD_AUTHOR_LABEL = 'Author:';
export const PODCASTDETAIL_AUTHOR_LABEL = 'by';
export const PODCASTDETAIL_DESCRIPTION_LABEL = 'Description: ';
export const PODCASTDETAIL_EPISODE_COUNT_LABEL = 'Episodes: ';

export const PODCASTID_PARAM = ':podcastId';
export const EPISODEID_PARAM = ':episodeId';

export const MAIN_PAGE_ROUTER_PATH = '/';
export const PODCAST_DETAIL_PAGE_ROUTER_PATH = `${MAIN_PAGE_ROUTER_PATH}podcast/${PODCASTID_PARAM}`;
export const PODCAST_EPISODE_PAGE_ROUTER_PATH = `${PODCAST_DETAIL_PAGE_ROUTER_PATH}/episode/${EPISODEID_PARAM}`;

export const EPISODE_AUDIO_FALLBACK_MSG =
  'Your browser does not support native audio. You can listen it at this URL:';

export const PAGE_ERROR_MESSAGE =
  'The page does not exists. Please go back to the main page';
