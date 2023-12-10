import Swal from 'sweetalert2'
import PropTypes from 'prop-types';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";



const AssignmentsShow = ({ assignment, assignments, setAssignments }) => {

    const navigate = useNavigate();

    const { _id, createdBy, title, photoUrl, difficulty, marks } = assignment;
    const { user } = useContext(AuthContext);

    const handleDelete = () => {
        if (user) {
            if (user?.email === createdBy) {
                Swal.fire({
                    title: 'Are you want to delete??',
                    text: "You won't be able to revert this!",
                    icon: 'warning',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Yes, delete it!'
                }).then((result) => {
                    if (result.isConfirmed) {
                        axios.delete(`https://online-group-study-server-three.vercel.app/deleteAssignment/${_id}`)
                            .then(data => {
                                console.log(data.data);
                                if (data.data.deletedCount > 0) {
                                    Swal.fire(
                                        'Deleted!',
                                        'Assignment deleted Successfully.',
                                        'success'
                                    )
                                    const remaining = assignments.filter(a => a._id !== _id)
                                    setAssignments(remaining);
                                }
                            })
                            .catch(error => {
                                console.log(error);
                            })
                    }
                })
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You are not eligible to delete this assignment!",
                });
            }
        }
        else {
            navigate('/login');
        }
    }


    const handleUpdate = () => {

        if (user) {
            if (user?.email === createdBy) {
                navigate(`/updateAssignment/${_id}`);
            }
            else {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "You are not eligible to update this assignment!",
                });
            }
        }
        else {
            navigate('/login');
        }


    }

    const handleView = () => {
        navigate(`/assignmentDetails/${_id}`);
    }



    return (

        <div className="card card-compact bg-base-200 shadow-lg lg:shadow-xl">
            <figure><img className='h-56 w-full' src={photoUrl} alt="photo" /></figure>
            <div className="card-body rounded-b-2xl bg-slate-100">
                <motion.h2 animate={{ x: [50, 150, 50], opacity: 1, scale: 1 }}
                    transition={{
                        duration: 5,
                        delay: 0.3,
                        ease: [0.5, 0.71, 1, 1.5],
                    }}
                    initial={{ opacity: 0, scale: 0.5, x: 0, y: 0}}
                    whileHover={{ scale: 1.2 }} className="card-title text-2xl">

                    {title}

                </motion.h2>
                <motion.h2 animate={{ x: [50, 150, 50], opacity: 1, scale: 1 }}
                    transition={{
                        duration: 5,
                        delay: 0.3,
                        ease: [0.5, 0.71, 1, 1.5],
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ scale: 1.2 }} className='text-lg'>
                    Marks: {marks}
                </motion.h2>
                <motion.h2 animate={{ x: [50, 150, 50], opacity: 1, scale: 1 }}
                    transition={{
                        duration: 5,
                        delay: 0.3,
                        ease: [0.5, 0.71, 1, 1.5],
                    }}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileHover={{ scale: 1.2 }} className='text-lg'>
                    Difficulty Level: {
                        difficulty === 'Easy' ? <span className='text-green-500'>{difficulty}</span> : (
                            difficulty === 'Medium' ? <span className='text-amber-500'>{difficulty}</span> :
                                <span className='text-red-600'>{difficulty}</span>
                        )
                    }
                </motion.h2>
                <div className="card-actions flex justify-center mt-4">
                    <button onClick={handleView} className="btn md:btn-outline btn-success">View</button>
                    <button onClick={handleUpdate} className="btn md:btn-outline btn-info">Update</button>
                    <button onClick={handleDelete} className="btn md:btn-outline btn-secondary">Delete</button>
                </div>
            </div>
        </div>
    );
};

AssignmentsShow.propTypes = {
    assignment: PropTypes.object,
    assignments: PropTypes.array,
    setAssignments: PropTypes.func
};

export default AssignmentsShow;