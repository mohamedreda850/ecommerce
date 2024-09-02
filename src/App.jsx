
import './App.css'
import { createBrowserRouter, createHashRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Products from './Components/Products/Products';
import Category from './Components/Category/Category';
import Brand from './Components/Brand/Brand';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/Notfound/Notfound';
import { Toaster } from 'react-hot-toast';
import AuthContextProvider from './Context/AuthContext';
import ProtecteRoute from './Components/ProtectedRoute/ProtecteRoute';
import { QueryClient, QueryClientProvider } from 'react-query';
import ProductsDetails from './Components/ProductsDetails/ProductsDetails';
import CartContextProvider from './Context/CartContextt';
import Cart from './Components/Cart/Cart';
import Payment from './Components/Payment/Payment';
import AllOrders from './Components/AllOrders/AllOrders';
import WishList from './Components/WishList/WishList';
import WishListContextProvider from './Context/WishListContext';
import ForgotPassword from './Components/ForgotPassword/ForgotPassword';
import VerifyCode from './Components/VerifyCode/VerifyCode';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import { PasswordResetProvider } from './Context/usePasswordReset';


function App() {
  const x =new QueryClient() 
const router =  createHashRouter([
    {
      path :'/',
      element :<Layout />,
      children :[
        {
          index : true,
          element :<ProtecteRoute><Products/></ProtecteRoute>
        },
        {
          path :'/category',
          element : <ProtecteRoute><Category/></ProtecteRoute>
        },
        {
          path :'/brand',
          element :<ProtecteRoute><Brand/></ProtecteRoute>
        },
        {
          path :'/productDetails/:id',
          element :<ProtecteRoute><ProductsDetails/></ProtecteRoute>
        },
        {
          path :'/cart',
          element :<ProtecteRoute><Cart/></ProtecteRoute>
        },
        {
          path :'/payment',
          element :<ProtecteRoute><Payment/></ProtecteRoute>
        },
        {
          path :'/allorders',
          element :<ProtecteRoute><AllOrders/></ProtecteRoute>
        },
        {
          path :'/wishlist',
          element :<ProtecteRoute><WishList/></ProtecteRoute>
        },
        
        {
          path :'/login',
          element :<Login/>
        },
        {
          path :'/register',
          element :<Register/>
        },
        {
          path :'/forgotpassword',
          element :<ForgotPassword/>
        },
        {
          path :'/verifycode',
          element :<VerifyCode/>
        },
        {
          path :'/resetpassword',
          element :<ResetPassword/>
        },
        {
          path :'*',
          element :<Notfound/>
        },
      ]
    }
  ])
  return (
    <QueryClientProvider client={x}>
    <AuthContextProvider>
      <WishListContextProvider>
      <CartContextProvider>
        <PasswordResetProvider>
    <Toaster />
      <RouterProvider router={router}></RouterProvider>
      </PasswordResetProvider>
      </CartContextProvider>
      </WishListContextProvider>
    </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App
