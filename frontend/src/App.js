/* eslint-disable react-hooks/exhaustive-deps */
import { Outlet } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import summaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';

function App() {

  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0)

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

  const fetchAddToCartCount = async() => {
    const response = await fetch(summaryApi.cartCountUpdate.url, {
      method: summaryApi.cartCountUpdate.method,
      credentials: "include",
    })

    const responseData = await response.json()

    setCartProductCount(responseData?.data?.data)
  }

  useEffect(() => {
    fetchCurrentUserDetail()
    fetchAddToCartCount()
  }, [])
  return (
    <>
    <Context.Provider value={{
      fetchCurrentUserDetail, // fetch user detail
      cartProductCount,
      fetchAddToCartCount
    }}>
      <ToastContainer 
        position='top-center'
      />
      <Header />
      <main className='min-h-[calc(100vh-177px)] md:min-h-[calc(100vh-120px)] pt-16'>
        <Outlet />
      </main>
      <Footer />
    </Context.Provider>
    </>
  );
}

export default App;
