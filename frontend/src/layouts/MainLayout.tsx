import Navbar from "../components/common/Navbar"
import { Outlet } from "react-router-dom";
import '../styles/layouts/MainLayout.css'

const MainLayout = () => {

  return (
    <div className="container">
           <Navbar/>
      <main><Outlet/></main>   
    </div>
  )
}

export default MainLayout
