import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <Header />
      <main className='min-h-[calc(100vh-177px)] md:min-h-[calc(100vh-120px)]'>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export default App;
