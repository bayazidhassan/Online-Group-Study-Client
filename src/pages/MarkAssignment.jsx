import axios from "axios";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const MarkAssignment = () => {


    const navigate = useNavigate();

    const assignment = useLoaderData();
    const { _id, title, pdf, note, photoUrl, marks } = assignment[0];


    const googleDrivePdfLink = pdf.substring(0, pdf.lastIndexOf('/')) + '/preview';


    const handleSubmit = (e) => {
        e.preventDefault();

        const form = e.target;
        const obtainedMark = form.obtainedMark.value;
        const feedback = form.feedback.value;
        const status = 'Completed';

        if (!/[0-9]/.test(obtainedMark)) {
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


        const updateMark = {
            obtainedMark,
            feedback,
            status
        }


        axios.patch(`https://online-group-study-server-three.vercel.app/markAssignment/${_id}`, updateMark)
            .then(data => {
                // console.log(data.data)
                if (data.data.modifiedCount > 0) {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Mark input successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK'
                    })
                    navigate('/submittedAssignments');
                }
            })
            .catch(error => {
                console.log(error);
            })
    }



    return (
        <div className="max-w-7xl mx-auto hero min-h-screen bg-base-200 lg:rounded-lg">

            <div className="hero-content flex-col lg:flex-row gap-10 md:px-28">

                <div className="text-center">
                    <img className="w-full md:w-3/5 mx-auto rounded-lg" src={photoUrl} alt="" />
                    <h1 className="mt-2 text-3xl font-medium text-center">{title}</h1>

                    <div className="mt-6 flex flex-col md:flex-row justify-center items-center gap-2">
                        <h2 className="text-xl">PDF: </h2>
                        <input readOnly id="pdf-view" className="w-full md:w-3/5 h-12 pl-2 bg-slate-200 border-2 border-black rounded-lg" type="text" defaultValue={pdf} name="pdf" />
                        <button onClick={() => document.getElementById('my_modal_2').showModal()} className="btn btn-accent">SHOW</button>
                    </div>
                    <h2 className="mt-4 text-xl">Examinee&apos;s Note:</h2>
                    <textarea readOnly className="w-full md:w-3/5 bg-slate-200 border-2 border-black" defaultValue={note} name="note" id="" cols="30" rows="3"></textarea>
                </div>

                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <form onSubmit={handleSubmit} className="card-body">
                        <h2 className="text-2xl font-bold text-center">Give Marks ( out of {marks} )</h2>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Marks</span>
                            </label>
                            <input required type="text" name="obtainedMark" placeholder="input marks" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Feedback</span>
                            </label>
                            <textarea required className="border-2 rounded-lg p-2" name="feedback" placeholder="write a feedback"></textarea>
                        </div>
                        <div className="form-control mt-4">
                            <input className="btn btn-primary" type="submit" value="Submit" />
                        </div>
                    </form>
                </div>
            </div>


            <dialog id="my_modal_2" className="modal">
                <div className="modal-box">
                    <div className="modal-action flex justify-center mb-4">
                        <form method="dialog">
                            <button className="btn btn-secondary">ClOSE</button>
                        </form>
                    </div>
                    <div>
                        <iframe
                            title="PDF Viewer"
                            width="640"
                            height="480"
                            src={googleDrivePdfLink}
                            allow="autoplay"
                        />
                    </div>
                </div>
            </dialog>

            <ToastContainer />
        </div>
    );
};

export default MarkAssignment;