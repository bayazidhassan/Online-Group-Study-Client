import { useLoaderData, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import Swal from 'sweetalert2'
import axios from "axios";


const UpdateAssignment = () => {

    const assignment = useLoaderData();
    const { _id, title, photoUrl, difficulty, marks, dueDate, description } = assignment[0];

    const [startDate, setStartDate] = useState(null);

    const navigate = useNavigate();



    const handleUpdate = (e) => {
        e.preventDefault();
        const form = e.target;

        const title = form.title.value;
        const photoUrl = form.photoURL.value;
        const difficulty = form.difficulty.value;
        const marks = form.marks.value;
        const description = form.description.value;


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
        const updatedDueDate = `${day}/` + `${month}/` + `${year}, ` + `${hours}:` + `${minutes} ` + `${amOrPm}`;
        // console.log(updatedDueDate);

        const updatedAssignment = { title, photoUrl, difficulty, marks, updatedDueDate, description };


        Swal.fire({
            title: 'Are you want to update?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, update it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.put(`https://online-group-study-server-three.vercel.app/updateAssignment/${_id}`, updatedAssignment)
                    .then(data => {
                        // console.log(data.data)
                        if (data.data.modifiedCount > 0) {
                            Swal.fire({
                                title: 'Success!',
                                text: 'Assignment updated successfully.',
                                icon: 'success',
                                confirmButtonText: 'OK'
                            })
                            navigate('/assignments');
                        }
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
        })
    }


    return (
        <div className="max-w-7xl mx-auto hero min-h-screen bg-base-200 md:px-40 lg:rounded-lg">
            <div className="hero-content flex-col lg:flex-row md:gap-10 lg:gap-28">
                <div className="text-center lg:text-left">
                    <img className="rounded-2xl" src={photoUrl} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">

                    <form onSubmit={handleUpdate} className="card-body">
                        <h2 className="text-2xl font-bold text-center">Update Assignment</h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Title</span>
                            </label>
                            <input type="text" defaultValue={title} name="title" placeholder="title" className="input input-bordered" required />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Photo URL</span>
                            </label>
                            <input type="text" defaultValue={photoUrl} name="photoURL" placeholder="photo url" className="input input-bordered" required />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Difficulty Level</span>
                            </label>
                            <select name="difficulty" defaultValue={difficulty} className="select select-bordered" required>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Marks</span>
                            </label>
                            <input type="text" defaultValue={marks} name="marks" placeholder="marks" className="input input-bordered" required />
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
                                placeholderText={dueDate}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <textarea required defaultValue={description} className="border-2 rounded-lg p-2" name="description" placeholder="description"></textarea>
                        </div>

                        <div className="form-control mt-4">
                            <input className="btn btn-primary" type="submit" value="Update" />
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default UpdateAssignment;