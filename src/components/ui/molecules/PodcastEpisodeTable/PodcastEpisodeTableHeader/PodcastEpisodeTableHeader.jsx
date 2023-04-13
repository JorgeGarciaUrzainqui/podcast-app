import './PodcastEpisodeTableHeader.css';

/**
 * Renders the table header for episodes table
 *
 * @param {Object} props - the props of the component
 * @param {Object} props.episodeColumns - a key pair object with the rendered name and the episode property that defines it
 * @returns JS.Elememt the table header for episodes
 */
const PodcastEpisodeTableHeader = ({ episodeColumns }) => {
  const episodeColumnKeys = Object.keys(episodeColumns);
  const episodeColumnValue = Object.values(episodeColumns);

  return (
    <thead className="podcastEpisodeTableHeader">
      <tr>
        {episodeColumnKeys.map((episodeColumnKey, index) => (
          <th key={episodeColumnKey}>{episodeColumnValue[index]}</th>
        ))}
      </tr>
    </thead>
  );
};

export default PodcastEpisodeTableHeader;
