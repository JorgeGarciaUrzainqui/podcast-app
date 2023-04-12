/**
 * Generates a audio component
 *
 * @param {Object} props - props of the component
 * @param {string} props.audioSrc - the source of the audio to play
 * @param {JSX.Element} props.children - the container children to be rendered as fallback of the audio tag
 * @param {boolean} [props.audioControls] - Optional. Indicates if the audio should render the controls
 * @param {string} [props.preloadAudio] - Optional. Indicates if the audio should be preloaded
 * @param {string} [props.variantClass] - Optional. Allows to inject css classes to the component.
 * @param {string} [props.testId] - Optional. For testing purposes only. Indicates the data-testid to be used.
 * @returns JSX Element - the audio component
 */
const AudioPlayer = ({
  audioSrc,
  children,
  audioControls,
  preloadAudio,
  variantClass,
  testId
}) => {
  return (
    <audio
      src={audioSrc}
      controls={audioControls}
      preload={preloadAudio}
      className={variantClass}
      data-testid={testId}
    >
      {children}
    </audio>
  );
};

AudioPlayer.defaultProps = {
  audioControls: true,
  preloadAudio: 'auto',
  variantClass: '',
  testId: 'audioPlayer'
};

export default AudioPlayer;
