import { Outlet } from "react-router-dom";
import NavBar from "../pages/sharedPages/NavBar";
import Footer from "../pages/sharedPages/Footer";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Main = () => {
    return (
        <div>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
            <ToastContainer />
        </div>
    );
};

export default Main;