import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import Swal from 'sweetalert2'


const AssignmentDetails = () => {

    const { user } = useContext(AuthContext);
    const submittedBy = user?.email;
    const submittedUser = user?.displayName;

    const assignment = useLoaderData();
    const { createdBy, title, photoUrl, difficulty, marks, dueDate, description } = assignment[0];
    const pendingStatus = 'Pending';



    const handleSubmit = (e) => {
        const form = e.target;
        const pdf = form.pdf.value;
        const note = form.note.value;

        const assignment = { createdBy, submittedBy, submittedUser, pdf, note, pendingStatus, title, photoUrl, difficulty, marks, dueDate, description };

        axios.post('https://online-group-study-server-three.vercel.app/submitAssignment', assignment)
            .then(data => {
                // console.log(data.data);
                if (data.data.insertedId) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Assignment submitted successfully.',
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

        <div className="max-w-7xl mx-auto">
            <div className="hero min-h-screen bg-base-200 lg:rounded-lg md:px-40 ">
                <div className="hero-content flex-col lg:flex-row gap-10 lg:gap-20">
                    <img src={photoUrl} className="md:max-w-sm rounded-lg shadow-2xl" />
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-center">{title}</h1>
                        <div className="card-body bg-base-100 shadow-2xl rounded-lg mt-4 space-y-1">
                            <h3 className="text-lg"><span className="font-bold">Difficulty Level</span> : {difficulty}</h3>
                            <h3 className="text-lg"><span className="font-bold">Marks</span> : {marks}</h3>
                            <h3 className="text-lg"><span className="font-bold">Due Date</span> : {dueDate}</h3>
                            <p className="text-lg"><span className="font-bold">Description</span> : {description}</p>
                            <button className="btn btn-accent" onClick={() => document.getElementById('my_modal_1').showModal()}>TAKE ASSIGNMENT</button>
                        </div>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_1" className="modal">
                <div className="modal-box">
                    <form onSubmit={handleSubmit} className="card-body" method="dialog">
                        <div className="form-control">
                            <label className="label hidden md:flex">
                                <span className="label-text">PDF (Google Drive)</span>
                            </label>
                            <input required type="text" name="pdf" placeholder="google drive pdf link" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label hidden md:flex">
                                <span className="label-text">Quick Note</span>
                            </label>
                            <textarea required className="border-2 rounded-lg p-2" name="note" placeholder="write a quick note"></textarea>
                        </div>
                        <div className="form-control mt-2">
                            <input className="btn btn-primary" type="submit" value="SUBMIT" />
                        </div>
                    </form>
                    <div className="modal-action flex justify-center -mt-4">
                        <form method="dialog">
                            <button className="btn btn-secondary">ClOSE</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default AssignmentDetails;