import { createBrowserRouter } from 'react-router-dom';

import { MAIN_PAGE_ROUTER_PATH } from './constants';
import MainPage from './components/pages/MainPage/MainPage';
import ErrorPage from './components/pages/ErrorPage';

export default function configureRouter() {
  const router = createBrowserRouter([
    {
      path: MAIN_PAGE_ROUTER_PATH,
      element: <MainPage />,
      errorElement: <ErrorPage />
    }
  ]);

  return router;
}
