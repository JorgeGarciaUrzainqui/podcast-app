import React from 'react';

import { PODCASTCARD_AUTHOR_LABEL } from '../../../../../constants';
import ClickableContainer from '../../../atoms/ClickableContainer';
import Image from '../../../atoms/Image';
import Text from '../../../atoms/Text';
import './PodcastCard.css';

/**
 * Generates the Podcast Card component
 *
 * @param {Object} props - props of the component
 * @param {Object} props.podcastInfo - information regarding the podcast
 * @param {string} props.podcastInfo.podcastId - information regarding the podcast
 * @param {string} props.podcastInfo.podcastName - information regarding the podcast
 * @param {string} props.podcastInfo.podcastImage - information regarding the podcast
 * @param {string} props.podcastInfo.podcastAuthor - information regarding the podcast
 * @param {Function} props.onPodcastCardClick - action executed when the podcast is clicked
 * @returns JSX.Element the podcast card component
 */
const PodcastCard = ({ podcastInfo, onPodcastCardClick }) => {
  const { podcastId, podcastName, podcastImage, podcastAuthor } = podcastInfo;

  const handleClick = (e) => {
    e.stopPropagation();
    onPodcastCardClick(podcastId);
  };

  return (
    <ClickableContainer
      onContainerClick={handleClick}
      variantClass="podcastCard"
      testId="podcastCard"
    >
      <>
        <Image
          imageSrc={podcastImage}
          altText={podcastName}
          variantClass="podcastCard-image"
          testId="podcastCard-image"
        />
        <Text
          message={podcastName.toUpperCase()}
          variantClass="podcastCard_text podcastCard-name"
          testId="podcastCard-name"
        />
        <Text
          message={`${PODCASTCARD_AUTHOR_LABEL} ${podcastAuthor}`}
          variantClass="podcastCard_text podcastCard-author"
          testId="podcastCard-author"
        />
      </>
    </ClickableContainer>
  );
};

export default PodcastCard;
