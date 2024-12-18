import {createBrowserRouter} from 'react-router-dom'
import App from './client/src/App';
import About from './client/src/components/About';
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/about",
    element: <About />,
  }
  // Add more routes as needed
]);
export default router