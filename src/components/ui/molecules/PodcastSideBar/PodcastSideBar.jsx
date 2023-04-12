import {
  PODCASTDETAIL_AUTHOR_LABEL,
  PODCASTDETAIL_DESCRIPTION_LABEL
} from '../../../../constants';
import ClickableContainer from '../../atoms/ClickableContainer';
import Image from '../../atoms/Image';
import Text from '../../atoms/Text';
import './PodcastSideBar.css';

/**
 * Generates a side bar component to show podcast information
 *
 * @param {Object} props - props of the component
 * @param {Object} props.podcastInfo - the information of the podcast
 * @param {string} props.podcastInfo.podcastId - the id of the podcast
 * @param {string} props.podcastInfo.podcastName - the name of the podcast
 * @param {string} props.podcastInfo.podcastImage - the image url of the podcast
 * @param {string} props.podcastInfo.podcastAuthor - the author of the podcast
 * @param {string} props.podcastInfo.podcastSummary - the summary of the podcast
 * @param {Function} [props.onPodcastSideBarClick] - Optional. The function to be executed when the podcast sidebar is clicked
 * @returns JSX.Element the podcast side bar component
 */
const PodcastSideBar = ({ podcastInfo, onPodcastSideBarClick }) => {
  const {
    podcastId,
    podcastName,
    podcastImage,
    podcastAuthor,
    podcastSummary
  } = podcastInfo;

  const handleClick = (e) => {
    e.stopPropagation();
    onPodcastSideBarClick(podcastId);
  };

  return (
    <div data-testid="podcastDetail">
      <ClickableContainer
        onContainerClick={handleClick}
        testId="podcastDetail-image"
      >
        <Image imageSrc={podcastImage} altText={podcastName} />
      </ClickableContainer>
      <ClickableContainer
        onContainerClick={handleClick}
        testId="podcastDetail-podcastInfo"
      >
        <Text message={podcastName} />
        <Text message={`${PODCASTDETAIL_AUTHOR_LABEL} ${podcastAuthor}`} />
      </ClickableContainer>
      <div data-testid="podcastDetail-description">
        <Text message={PODCASTDETAIL_DESCRIPTION_LABEL} />
        <Text message={podcastSummary} />
      </div>
    </div>
  );
};

PodcastSideBar.defaultProps = {
  onPodcastSideBarClick: () => {}
};

export default PodcastSideBar;
