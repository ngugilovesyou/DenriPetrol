import {createBrowserRouter} from 'react-router-dom'

import SignUp from './SignUp';
import App from './src/App';
import About from './src/components/About';
import Dashboard from './src/components/admin/Dashboard';
import Login from './Login';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "*",
    element: <h1>Page not found</h1>,
  },
  {
    path:'/register',
    element:<SignUp />
  },
  {
    path:'/dashboard',
    element:<Dashboard />
  },{
    path:'/login',
    element:<Login />
  }
  // Add more routes as needed
]);
export default router