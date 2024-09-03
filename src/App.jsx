import { RouterProvider } from 'react-router-dom';
import './App.css';
import { router } from './routes/Route';
import { Toaster } from 'react-hot-toast';

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster />
    </>
  )
}

export default App;
