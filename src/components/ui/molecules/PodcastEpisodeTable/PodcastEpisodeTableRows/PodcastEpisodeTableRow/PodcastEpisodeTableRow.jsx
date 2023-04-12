/**
 * Renders an episode table row
 *
 * @param {Object} props - the props of the component
 * @param {array} props.episodeColumnKeys - the properties to render in the table
 * @param {Object} props.episodeRow - the list of episodes to render
 * @param {Function} props.onClickEpisodeRow - the function to be executed when the title is clicked
 * @returns JS.Elememt the table row for a episode
 */

const PodcastEpisodeTableRow = ({
  episodeColumnKeys,
  episodeRow,
  onClickEpisodeRow
}) => {
  const EPISODE_TITLE_PROPERTY = 'episodeTitle';
  const { episodeId } = episodeRow;

  const handleClick = (e) => {
    e.stopPropagation();
    onClickEpisodeRow(episodeId);
  };

  return (
    <tr>
      {episodeColumnKeys.map((episodeColumnKey) => {
        const episodeRowInfo = episodeRow[episodeColumnKey] || '';

        if (episodeColumnKey === EPISODE_TITLE_PROPERTY) {
          return (
            <td key={`${episodeId}-${episodeColumnKey}`} onClick={handleClick}>
              {episodeRowInfo}
            </td>
          );
        }

        return (
          <td key={`${episodeId}-${episodeColumnKey}`}>{episodeRowInfo}</td>
        );
      })}
    </tr>
  );
};

export default PodcastEpisodeTableRow;
