import { createBrowserRouter } from 'react-router-dom';

import { MAIN_PAGE_ROUTER_PATH } from './constants';
import MainPage from './components/pages/MainPage/MainPage';

export default function configureRouter() {
  const router = createBrowserRouter([
    {
      path: MAIN_PAGE_ROUTER_PATH,
      element: <MainPage />
    }
  ]);

  return router;
}
