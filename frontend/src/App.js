/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import summaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {

  const dispatch = useDispatch()

  const fetchCurrentUserDetail = async(e) => {
    const dataResponse = await fetch(summaryApi.current_user.url, {
      method: summaryApi.current_user.method,
      credentials: "include"
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }

    // console.log("user_data", dataResponse)
  }


  useEffect(() => {
    fetchCurrentUserDetail()
  }, [])
  return (
    <>
    <Context.Provider value={{
      fetchCurrentUserDetail // fetch user detail
    }}>
      <ToastContainer 
        position='top-center'
      />
      <Header />
      <main className='min-h-[calc(100vh-177px)] md:min-h-[calc(100vh-120px)] md:pl-20 md:pr-20 pt-16'>
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
    </>
  );
}

export default App;
