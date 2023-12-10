import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../providers/AuthProvider";
import { updateProfile } from "firebase/auth";


const SignUp = () => {


    const { createUser, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegistration = (e) => {
        e.preventDefault();

        const form = e.target;
        const name = form.name.value;
        const photoUrl = form.photoURL.value;
        const email = form.email.value;
        const password = form.password.value;


        if (password.length < 6) {
            toast.error('Password must be 6 characters long!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        else if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain at least one capital letter!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }
        else if (!/[^a-zA-Z0-9]/.test(password)) {
            toast.error('Password must contain at least one special character!', {
                position: "top-center",
                autoClose: 1500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
            return;
        }


        //createUser
        createUser(email, password)
            .then(result => {

                //update profile
                updateProfile(result.user, {
                    displayName: name,
                    photoURL: photoUrl
                })
                    .then(() => {
                        // console.log('profile updated successfully');
                    })
                    .catch(error => {
                        console.error(error);
                    })

                // console.log('successfully register')
                // console.log(result.user);

                toast.success('Registration Successful!', {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

                logOut();
                navigate('/login');
            })
            .catch(error => {

                form.reset(); //form reset

                toast.error(`${error}`, {
                    position: "top-center",
                    autoClose: 1500,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });

            })
    }


    return (
        <div className="max-w-7xl mx-auto hero min-h-screen bg-base-200 lg:rounded-lg md:px-40">
            <div className="hero-content flex-col lg:flex-row lg:gap-20">
                <div className="text-center lg:text-left">
                    <img className="shadow-xl rounded-2xl" src="https://i.ibb.co/Q9Qn5M0/signup.jpg" alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                    <form onSubmit={handleRegistration} className="card-body">
                        <h2 className="text-2xl font-bold text-center">Please SignUp</h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input type="text" name="name" placeholder="name" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photoURL" placeholder="photo url" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="email" name="email" placeholder="email" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                        </div>
                        <h2 className="text-center">Already have an account? Please <Link className="text-red-500 font-bold hover:underline" to='/login'>Login</Link> </h2>
                        <div className="form-control mt-4">
                            <input className="btn btn-primary" type="submit" value="Sign Up" />
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default SignUp;