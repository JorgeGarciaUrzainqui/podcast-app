import PodcastEpisodeTableRow from './PodcastEpisodeTableRow/PodcastEpisodeTableRow';

/**
 * Renders the table body for episodes table
 *
 * @param {Object} props - the props of the component
 * @param {Object} props.episodeColumns - a key pair object with the rendered name and the episode property that defines it
 * @param {array} props.episodeRows - the list of episodes to render
 * @param {Function} props.onClickEpisodeRow - the function to be executed when a table row is clicked
 * @returns JS.Elememt the table body for episodes
 */
const PodcastEpisodeTableRows = ({
  episodeColumns,
  episodeRows,
  onClickEpisodeRow
}) => {
  const episodeColumnKeys = Object.keys(episodeColumns);

  return (
    <tbody>
      {episodeRows.map((episodeRow) => (
        <PodcastEpisodeTableRow
          key={episodeRow.episodeId}
          episodeColumnKeys={episodeColumnKeys}
          episodeRow={episodeRow}
          onClickEpisodeRow={onClickEpisodeRow}
        />
      ))}
    </tbody>
  );
};

export default PodcastEpisodeTableRows;
