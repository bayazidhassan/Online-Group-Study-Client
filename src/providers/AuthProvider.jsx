import { createContext, useEffect, useState } from "react";
import PropTypes from 'prop-types';
import auth from "../firebase/firebaseConfig";
import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import axios from "axios";



export const AuthContext = createContext();


const AuthProvider = ({ children }) => {

    const googleProvider = new GoogleAuthProvider();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);


    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signInUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const signInWithGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider)
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth)
            .then(() => {
                // console.log('Sign out successfully');
            })
            .catch(error => {
                console.error(error);
            })
    }


    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, currentUser => {
            const userEmail = currentUser?.email || user?.email;
            const loggedUser = { email: userEmail };
            setUser(currentUser);
            setLoading(false);
            if (currentUser) {
                axios.post('https://online-group-study-server-three.vercel.app/jwt', loggedUser, { withCredentials: true })
                // .then(data => {
                //     console.log('Token response: ', data.data);
                // })
                // .catch(error => {
                //     console.log(error);
                // })
            }
            else {
                axios.post('https://online-group-study-server-three.vercel.app/logout', loggedUser, { withCredentials: true })
                // .then(data => {
                //     console.log(data.data);
                // })
                // .catch(error => {
                //     console.log(error);
                // })
            }
        })

        return () => {
            return unSubscribe();
        }
    }, [user])


    const authInfo = { user, loading, createUser, signInUser, signInWithGoogle, logOut }

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

AuthProvider.propTypes = {
    children: PropTypes.node
};

export default AuthProvider;