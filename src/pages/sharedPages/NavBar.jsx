import { NavLink, useNavigate } from "react-router-dom";
import { FaUserCircle } from 'react-icons/fa';
import { useContext } from "react";
import { AuthContext } from "../../providers/AuthProvider";


const NavBar = () => {

    const navigate = useNavigate();

    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut();
        navigate('/login');
    }
    const handleLogin = () => {
        navigate('/login');
    }


    return (
        <div className="mt-6 mb-10 md:mb-24 max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-2 md:gap-0">
            <div className="flex items-center">
                <NavLink to='/'><img className="w-28 h-24" src='https://i.ibb.co/PrbBJXT/1699131796310.png' alt="" /></NavLink>
                <div className="lg:hidden">
                    {
                        user ?
                            <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                                <label tabIndex={0} className="btn m-1 btn-lg shadow-xl"> {user?.photoURL ? <img className="w-12 h-12 rounded-full" src={user.photoURL}></img> : ''}</label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-slate-100 rounded-box w-40">
                                    <h2 className="text-center text-lg font-semibold mb-2">{user.displayName} </h2>
                                    <button className="btn btn-error" onClick={handleLogout}>LogOut</button>
                                </ul>
                            </div>
                            :
                            <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                                <label tabIndex={0} className="btn m-1 btn-lg shadow-xl"> <FaUserCircle className="w-8 h-8"></FaUserCircle> </label>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-slate-100 rounded-box w-40">
                                    <button className="btn btn-accent" onClick={handleLogin}>Login</button>
                                </ul>
                            </div>
                    }
                </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 text-center items-center gap-4 px-6 md:px-0 rounded-lg">
                <NavLink to='/' className="text-lg shadow-lg py-2 rounded-lg hover:bg-slate-200 aria-[current=page]:bg-slate-300 aria-[current=page]:text-stone-600 aria-[current=page]:font-bold">Home</NavLink>
                <NavLink to='/assignments' className="text-lg shadow-lg py-2 rounded-lg hover:bg-slate-200 aria-[current=page]:bg-slate-200 aria-[current=page]:text-stone-600 aria-[current=page]:font-bold">Assignments</NavLink>
                <NavLink to='/createAssignments' className="text-lg shadow-lg px-2 md:px-0 py-2 rounded-lg hover:bg-slate-200 aria-[current=page]:bg-slate-200 aria-[current=page]:text-stone-600 aria-[current=page]:font-bold">Create Assignment</NavLink>
                <NavLink to='/submittedAssignments' className="text-lg shadow-lg px-4 py-2 rounded-lg hover:bg-slate-200 aria-[current=page]:bg-slate-200 aria-[current=page]:text-stone-600 aria-[current=page]:font-bold">Submitted Assignments</NavLink>
                <NavLink to='/myAssignments' className="text-lg shadow-lg py-2 rounded-lg hover:bg-slate-200 aria-[current=page]:bg-slate-200 aria-[current=page]:text-stone-600 aria-[current=page]:font-bold">My Assignments</NavLink>
                <NavLink to='/login' className="text-lg shadow-lg py-2 rounded-lg hover:bg-slate-200 aria-[current=page]:bg-slate-200 aria-[current=page]:text-stone-600 aria-[current=page]:font-bold">Login</NavLink>
            </div>
            <div className="hidden lg:flex">
                {
                    user ?
                        <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                            <label tabIndex={0} className="btn m-1 btn-lg shadow-xl"> {user?.photoURL ? <img className="w-12 h-12 rounded-full" src={user.photoURL}></img> : ''}</label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-slate-100 rounded-box w-40">
                                <h2 className="text-center text-lg font-semibold mb-2">{user.displayName} </h2>
                                <button className="btn btn-outline btn-error" onClick={handleLogout}>LogOut</button>
                            </ul>
                        </div>
                        :
                        <div className="dropdown dropdown-bottom dropdown-end dropdown-hover">
                            <label tabIndex={0} className="btn m-1 btn-lg shadow-xl"> <FaUserCircle className="w-8 h-8"></FaUserCircle> </label>
                            <ul tabIndex={0} className="dropdown-content z-[1] menu p-4 shadow bg-slate-100 rounded-box w-40">
                                <button className="btn btn-outline btn-accent" onClick={handleLogin}>Login</button>
                            </ul>
                        </div>
                }
            </div>
        </div >
    );
};

export default NavBar;