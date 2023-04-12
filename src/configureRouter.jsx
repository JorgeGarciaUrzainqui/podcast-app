import { createBrowserRouter } from 'react-router-dom';

import {
  MAIN_PAGE_ROUTER_PATH,
  PODCAST_DETAIL_PAGE_ROUTER_PATH,
  PODCAST_EPISODE_PAGE_ROUTER_PATH
} from './constants';
import ErrorPage from './components/pages/ErrorPage';
import MainPage from './components/pages/MainPage/MainPage';
import PodcastPage from './components/pages/PodcastPage';
import EpisodePage from './components/pages/EpisodePage';

export default function configureRouter() {
  const router = createBrowserRouter([
    {
      path: MAIN_PAGE_ROUTER_PATH,
      element: <MainPage />,
      errorElement: <ErrorPage />
    },
    {
      path: PODCAST_DETAIL_PAGE_ROUTER_PATH,
      element: <PodcastPage />,
      errorElement: <ErrorPage />
    },
    {
      path: PODCAST_EPISODE_PAGE_ROUTER_PATH,
      element: <EpisodePage />,
      errorElement: <ErrorPage />
    }
  ]);

  return router;
}
