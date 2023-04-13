import DocumentContainer from '../../../atoms/DocumentContainer/DocumentContainer';
import Paragraph from '../../../atoms/Paragraph';

/**
 * Generates the episode description component.
 * Note: Description could be an HTMLString or a String
 *
 * @param {Object} props - props of the component
 * @param {string} props.episodeDescription - the episode description
 * @param {string} [props.testId] - Optional. For testing purposes only. Indicates the data-testid to be used.
 * @returns JSX.Element the episode description component
 */
const EpisodeDescription = ({ episodeDescription, testId }) => {
  if (!episodeDescription) {
    return null;
  }

  const document = new DOMParser().parseFromString(
    episodeDescription,
    'text/html'
  );
  const isHTMLDescription = Array.from(document.body.childNodes).some(
    (node) => node.nodeType === 1
  );

  if (isHTMLDescription) {
    return (
      <DocumentContainer document={document} testId={`${testId}-document`} />
    );
  }

  return (
    <Paragraph message={episodeDescription} testId={`${testId}-paragraph`} />
  );
};

EpisodeDescription.defaultProps = {
  testId: 'episodeDescription'
};

export default EpisodeDescription;
