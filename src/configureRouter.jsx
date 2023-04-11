import { createBrowserRouter } from 'react-router-dom';

import {
  MAIN_PAGE_ROUTER_PATH,
  PODCAST_DETAIL_PAGE_ROUTER_PATH,
  PODCAST_EPISODE_PAGE_ROUTER_PATH
} from './constants';
import MainPage from './components/pages/MainPage/MainPage';
import ErrorPage from './components/pages/ErrorPage';

export default function configureRouter() {
  const router = createBrowserRouter([
    {
      path: MAIN_PAGE_ROUTER_PATH,
      element: <MainPage />,
      errorElement: <ErrorPage />
    },
    {
      path: PODCAST_DETAIL_PAGE_ROUTER_PATH,
      element: <h1>Podcast Detail Page</h1>,
      errorElement: <ErrorPage />
    },
    {
      path: PODCAST_EPISODE_PAGE_ROUTER_PATH,
      element: <h1>Podcast Episode Page</h1>,
      errorElement: <ErrorPage />
    }
  ]);

  return router;
}
