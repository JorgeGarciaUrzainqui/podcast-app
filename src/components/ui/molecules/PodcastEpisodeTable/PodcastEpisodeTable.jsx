import Table from '../../atoms/Table/Table';
import PodcastEpisodeTableHeader from './PodcastEpisodeTableHeader';
import PodcastEpisodeTableRows from './PodcastEpisodeTableRows';
import './PodcastEpisodeTable.css';

/**
 * Renders a table with the episodes available for the podcast
 *
 * @param {Object} props - props of the component
 * @param {array} props.episodes - the list of episodes
 * @param {Function} props.onClickEpisodeRow - function to be executed when a row is clicked
 * @param {boolean} props.isLoading - indicates if the application is loading data
 * @returns JSX.Element a table with the episodes of the podcast
 */
const PodcastEpisodeTable = ({ episodes, onClickEpisodeRow, isLoading }) => {
  if (isLoading) {
    return null;
  }

  const episodeColumns = {
    episodeTitle: 'Title',
    episodeDate: 'Date',
    episodeDuration: 'Duration'
  };

  return (
    <Table testId="podcastEpisodeTable" variantClass="podcastEpisodeTable">
      <>
        <PodcastEpisodeTableHeader episodeColumns={episodeColumns} />
        <PodcastEpisodeTableRows
          episodeColumns={episodeColumns}
          episodeRows={episodes}
          onClickEpisodeRow={onClickEpisodeRow}
        />
      </>
    </Table>
  );
};

export default PodcastEpisodeTable;
