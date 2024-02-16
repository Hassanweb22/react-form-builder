import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import CreateForm from './pages/CreateForm';
import BaseLayout from './layouts/BaseLayout';

const router = createBrowserRouter([
  {
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <CreateForm />,
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
