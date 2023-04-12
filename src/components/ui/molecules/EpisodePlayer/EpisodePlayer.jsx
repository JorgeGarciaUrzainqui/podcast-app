import { EPISODE_AUDIO_FALLBACK_MSG } from '../../../../constants';
import AudioPlayer from '../../atoms/AudioPlayer';
import Paragraph from '../../atoms/Paragraph';
import Text from '../../atoms/Text';
import EpisodeDescription from './EpisodeDescription';

/**
 * Generates the episode player component
 *
 * @param {Object} props - props of the component
 * @param {Object} props.episodeInfo - information about the episode
 * @param {string} props.episodeInfo.episodeTitle - the title of the episode
 * @param {string} props.episodeInfo.episodeDescription - the description of the episode
 * @param {string} props.episodeInfo.episodeUrl - the url of the episode
 * @returns JSX.Element the episode player component
 */
const EpisodePlayer = ({ episodeInfo }) => {
  if (!episodeInfo || Object.keys(episodeInfo).length === 0) {
    return null;
  }

  const { episodeTitle, episodeDescription, episodeUrl } = episodeInfo;

  const fallbackMessage = `${EPISODE_AUDIO_FALLBACK_MSG} ${episodeUrl}`;

  return (
    <div className="episodePlayer" data-testid="episodePlayer">
      <Text message={episodeTitle} testId="episodePlayer-title" />
      <EpisodeDescription
        episodeDescription={episodeDescription}
        testId="episodePlayer-description"
      />
      <AudioPlayer
        audioSrc={episodeUrl}
        preloadAudio="none"
        testId="episodePlayer-player"
      >
        <Paragraph message={fallbackMessage} testId="episodePlayer-fallback" />
      </AudioPlayer>
    </div>
  );
};

export default EpisodePlayer;
