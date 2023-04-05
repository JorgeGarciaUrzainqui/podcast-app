import React from 'react';

import {
  PODCAST_FILTER_LABEL,
  PODCAST_FILTER_PLACEHOLDER
} from '../../../../constants';
import Text from '../../atoms/Text';
import TextInput from '../../atoms/TextInput/TextInput';
import './PodcastFilter.css';

/**
 * Generates the podcast filter component
 *
 * @param {Object} props - props of the component
 * @param {string} props.filerValue - the current filter value
 * @param {Function} props.onFilterChange - the function that handles the filter change
 * @returns JSX Element - the podcast filter component
 */
const PodcastFilter = ({ filerValue, onFilterChange }) => {
  return (
    <div className="podcastFilter" data-testid="podcastFilter">
      <Text
        message={PODCAST_FILTER_LABEL}
        variantClass="podcastFilter-text"
        testId="podcastFilter-text"
      />
      <TextInput
        inputValue={filerValue}
        onInputChange={onFilterChange}
        inputPlaceholder={PODCAST_FILTER_PLACEHOLDER}
        variantClass="podcastFilter-filter"
        testId="podcastFilter-filter"
      />
    </div>
  );
};

export default PodcastFilter;
