import React from 'react';

import PodcastCard from './PodcastCard';
import { getPodcastListToRender } from './getPodcastListToRender';
import './PodcastCardList.css';

/**
 * Generates the Podcast Card List component
 *
 * @param {Object} props - props of the component
 * @param {object[]} props.podcastList - information regarding the podcast
 * @param {Function} props.onPodcastCardClick - action executed when a postcastCard is clicked
 * @param {string} [props.filterValue] - Optional. Allows to filter the podcast list
 * @returns JSX.Element the podcast card list component
 */
const PodcastCardList = ({ podcastList, onPodcastCardClick, filterValue }) => {
  const renderPodcastList = getPodcastListToRender(podcastList, filterValue);

  return (
    <div data-testid="podcastCardList" className="podcastCardList">
      {renderPodcastList &&
        renderPodcastList.map((renderPodCast) => {
          return (
            <PodcastCard
              key={renderPodCast.podcastId}
              podcastInfo={renderPodCast}
              onPodcastCardClick={onPodcastCardClick}
            />
          );
        })}
    </div>
  );
};

PodcastCardList.defaultProps = {
  filterValue: ''
};

export default PodcastCardList;
