import { Route, Routes } from "react-router-dom";
import Login from "../components/pages/Auth/Login";
import Signup from "../components/pages/Auth/SignUp";
import Products from "../components/pages/Products/Products";
import NotFound from "../components/pages/NotFound";
import MainLayout from "../layouts/MainLayout"; 
// import PrivateRoute from "../middleware/PrivateRoute";
import ProductDetails from "../components/pages/Products/ProductDetails";
import MyCart from "../components/pages/Cart/MyCart";
import MyOrders from "../components/pages/Orders/MyOrders";
import UserAddresses from "../components/pages/Addresses/UserAddresses";
import Home from "../components/pages/Home/Home";



function AppRoutes() {


  const images = [
    "https://img.freepik.com/free-photo/top-view-male-self-care-items_23-2150347081.jpg?t=st=1733483998~exp=1733487598~hmac=e8a5ea815705ed626e03dc162fc0f0b78b55345a78280ecbe7d1b418efe781b3&w=1380",
    "https://img.freepik.com/free-photo/top-view-male-self-care-items_23-2150347103.jpg?t=st=1733483886~exp=1733487486~hmac=c2c64df17e0e75eb249a75767fb04842526b5368efcb8bd3688b3da9a15dd751&w=1380",
    "https://img.freepik.com/free-photo/top-view-male-self-care-items_23-2150347141.jpg?t=st=1733483918~exp=1733487518~hmac=9dde63fdc3f92bd0d7d249d9cbbce92e6d52453c0abf321ee7903bc712e283f6&w=740",
    "https://img.freepik.com/free-photo/top-view-male-self-care-items_23-2150347087.jpg?t=st=1733484023~exp=1733487623~hmac=6a72c08c49a9cbfcf1163590e6f94d147574433222b01ff6958514f8428acab5&w=1380",
    "https://img.freepik.com/free-photo/top-view-male-self-care-items_23-2150347082.jpg?t=st=1733483846~exp=1733487446~hmac=dcd878dc5801067d4d22d717b569f959d9d5cd4259103bc704b350b298bb9a81&w=740",
  ];



  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<Login />} />

      {/* Protected Routes */}
      {/* <Route element={<PrivateRoute />}> */}
        <Route element={<MainLayout />}>
          {/* Protected Pages */}
          <Route path="/home" element = {<Home images = {images} interval={3000}/>} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/my-cart" element= {<MyCart/>}/>
          <Route path="/my-addresses" element = {<UserAddresses/>} />
          <Route path="/my-orders" element = {<MyOrders/>} />

        </Route>
      {/* </Route> */}
     

      {/* Catch-all Route (404) */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;



// TODO Private Route fix and Main Layout fix