import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ProtectedRoute } from './protected-route';
import paths from './paths';

import PageLoading from '../components/pageLoading/pageLoading.component';
import Footer from '../components/footer/footer.component';

const PageNotFound = lazy(() => import('../pages/page-not-found/page-not-found'));
const Home = lazy(() => import('../pages/home/home'));
const Login = lazy(() => import('../pages/login/login'));
const SigIn = lazy(() => import('../pages/sigin/sigin'));
const EsqueceuSenha = lazy(() => import('../pages/forgot-password/forgot-password'));
const TrocarSenha = lazy(() => import('../pages/reset-password/reset-password'));
const MyAccount = lazy(() => import("../pages/my-account/my-account"));
const NewHistory = lazy(() => import("../pages/my-histories/new-history"));
const MyHistories = lazy(() => import("../pages/my-histories/my-histories"));
const Terms = lazy(() => import("../pages/admin/terms/terms"));
const Users = lazy(() => import("../pages/admin/users/users"));
const Chapters = lazy(() => import("../pages/admin/chapters/chapters"));
const Questions = lazy(() =>  import("../pages/admin/questions/questions"));
const Plans = lazy(()=>import("../pages/admin/plans/plans"));

interface Routes {
  path: string;
  element: React.ReactNode;
}

const getRouteElement = (
  Component: React.ElementType,
  protectRoute = false,
  footerShowOnlyIcons = false,
  footer = true
): React.ReactNode => {
  return (
    <Suspense fallback={<PageLoading />}>
      <ToastContainer position='top-center' autoClose={7000} />
      {protectRoute ? (
        <ProtectedRoute>
          <Component />
        </ProtectedRoute>
      ) : (
        <Component />
      )}
      {footer && <Footer showOnlyIcons={footerShowOnlyIcons} />}
    </Suspense>
  );
};

const routes: Routes[] = [
  { path: paths.LOGIN, element: getRouteElement(Login, false, true) },
  { path: paths.SIGIN, element: getRouteElement(SigIn, false, true) },
  { path: paths.FORGOT_PASSWORD, element: getRouteElement(EsqueceuSenha, false, true) },
  { path: paths.RESET_PASSWORD, element: getRouteElement(TrocarSenha) },
  { path: paths.NOT_FOUND, element: getRouteElement(PageNotFound) },
  { path: paths.HOME, element: getRouteElement(Home) },
  { path: paths.MY_ACCOUNT, element: getRouteElement(MyAccount, true, true, false) },
  { path: paths.MY_HISTORIES, element: getRouteElement(MyHistories, true, true, false) },
  { path: paths.NEW_HISTORY, element: getRouteElement(NewHistory, true, true, false) },
  { path: paths.TERMS, element: getRouteElement(Terms, true, true) },
  { path: paths.USERS, element: getRouteElement(Users, true, true) },
  { path: paths.CHAPTERS, element: getRouteElement(Chapters, true, true) },
  { path: paths.QUESTIONS, element: getRouteElement(Questions, true, true) },
  { path: paths.PLANS, element: getRouteElement(Plans, true, true) },
];

export default createBrowserRouter(routes);
