import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { ProtectedRoute } from './ProtectedRoute';
import paths from './paths';

import PageLoading from '../components/pageLoading/pageLoading.component';
import Footer from '../components/footer/footer.component';

const PageNotFound = lazy(() => import('../pages/page-not-found/PageNotFound'));
const Home = lazy(() => import('../pages/home/Home'));
const Login = lazy(() => import('../pages/login/Login'));
const SigIn = lazy(() => import('../pages/sigin/SigIn'));
const EsqueceuSenha = lazy(() => import('../pages/forgot-password/ForgotPassword'));
const TrocarSenha = lazy(() => import('../pages/reset-password/ResetPassword'));
const MyAccount = lazy(() => import("../pages/my-account/MyAccount"));
const Incomes = lazy(() => import("../pages/admin/incomes/Incomes"));
const Terms = lazy(() => import("../pages/admin/terms/Terms"));
const Users = lazy(() => import("../pages/admin/users/Users"));
const Chapters = lazy(() => import("../pages/admin/chapters/chapters"));

interface Routes {
  path: string;
  element: React.ReactNode;
}

const getRouteElement = (
  Component: React.ElementType,
  protectRoute = false,
  showOnlyIcons = false
): React.ReactNode => {
  return (
    <div className='container-fluid'>
      <Suspense fallback={<PageLoading />}>
        <ToastContainer position='top-center' autoClose={7000} />
        {protectRoute ? (
          <ProtectedRoute>
            <Component />
          </ProtectedRoute>
        ) : (
          <Component />
        )}
        <Footer showOnlyIcons={showOnlyIcons} />
      </Suspense>
    </div>
  );
};

const routes: Routes[] = [
  { path: paths.LOGIN, element: getRouteElement(Login, false, true) },
  { path: paths.SIGIN, element: getRouteElement(SigIn, false, true) },
  { path: paths.FORGOT_PASSWORD, element: getRouteElement(EsqueceuSenha) },
  { path: paths.RESET_PASSWORD, element: getRouteElement(TrocarSenha) },
  { path: paths.HOME, element: getRouteElement(Home) },
  { path: paths.NOT_FOUND, element: getRouteElement(PageNotFound) },
  { path: paths.MY_ACCOUNT, element: getRouteElement(MyAccount, true) },
  { path: paths.INCOMES, element: getRouteElement(Incomes, true) },
  { path: paths.TERMS, element: getRouteElement(Terms, true) },
  { path: paths.USERS, element: getRouteElement(Users, true) },
  { path: paths.CHAPTERS, element: getRouteElement(Chapters, true) },
];

export default createBrowserRouter(routes);
