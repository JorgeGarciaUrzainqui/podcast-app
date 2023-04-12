import { PODCASTDETAIL_EPISODE_COUNT_LABEL } from '../../../../constants';
import Text from '../../atoms/Text';

/**
 * Renders the number of episodes for a podcast
 *
 * @param {Object} props - props of the component
 * @param {number} props.episodeCount - the number of episodes of the podcast
 * @param {boolean} props.isLoading - indicates if the application is loading data
 * @returns JSX.Element the episode count component
 */
const PodcastEpisodeCount = ({ episodeCount, isLoading }) => {
  if (isLoading) {
    return null;
  }

  return (
    <div>
      <Text message={`${PODCASTDETAIL_EPISODE_COUNT_LABEL} ${episodeCount}`} />
    </div>
  );
};

export default PodcastEpisodeCount;