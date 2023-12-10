import axios from "axios";
import Swal from 'sweetalert2'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const CreateAssignment = () => {

    const [startDate, setStartDate] = useState(new Date());

    const { user } = useContext(AuthContext);
    const createdBy = user?.email;

    const handleCreate = (e) => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const photoUrl = form.photoURL.value;
        const difficulty = form.difficulty.value;
        const marks = form.marks.value;
        const description = form.description.value;


        if (title.length < 5) {
            toast.error('Title must be 5 characters long or more!', {
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
        if (!/[0-9]/.test(marks)) {
            toast.error('Marks must be a number!', {
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
        if (!/^(100(\.0+)?|[1-9]\d{0,1}(\.\d+)?)$/.test(marks)) {
            toast.error('Marks must be between 1 to 100!', {
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
        if (description.length < 10) {
            toast.error('Description must be 10 characters long or more!', {
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




        var day = startDate.getDate();
        var month = startDate.getMonth() + 1;
        var year = startDate.getFullYear();
        var hours = startDate.getHours();
        var minutes = startDate.getMinutes();
        var amOrPm = hours >= 12 ? 'PM' : 'AM';
        // Adjust the hours for the 12-hour clock
        if (hours > 12) {
            hours -= 12;
        }
        const dueDate = `${day}/` + `${month}/` + `${year}, ` + `${hours}:` + `${minutes} ` + `${amOrPm}`;
        // console.log(date);


        const assignment = { createdBy, title, photoUrl, difficulty, marks, dueDate, description };
        // console.log(assignment);

        axios.post('https://online-group-study-server-three.vercel.app/createAssignment', assignment)
            .then(data => {
                // console.log(data.data);
                if (data.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment created successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    form.reset();
                }
            })
            .catch(error => {
                console.log(error);
            })
    }




    return (
        <div className="max-w-7xl mx-auto hero min-h-screen bg-base-200 lg:rounded-lg md:px-40">
            <div className="hero-content flex-col lg:flex-row lg:gap-20">
                <div className="text-center lg:text-left">
                    <img className="rounded-2xl" src="https://i.ibb.co/XXz015H/create-Assignment.jpg" alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                    <form onSubmit={handleCreate} className="card-body">
                        <h2 className="text-2xl font-bold text-center">Create Assignment</h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" name="title" placeholder="title" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" name="photoURL" placeholder="photo url" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Difficulty Level</span>
                            </label>
                            <select name="difficulty" className="select select-bordered" required>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Marks</span>
                            </label>
                            <input type="text" name="marks" placeholder="marks" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Due Date</span>
                            </label>
                            <DatePicker className="border-2 p-2 w-full rounded-lg"
                                selected={startDate}
                                onChange={(date) => setStartDate(date)}
                                dateFormat="dd/MM/yyyy h:mm aa"
                                showTimeInput
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea required className="border-2 rounded-lg p-2" name="description" placeholder="description"></textarea>
                        </div>

                        <div className="form-control mt-4">
                            <input className="btn btn-primary" type="submit" value="Create" />
                        </div>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default CreateAssignment;