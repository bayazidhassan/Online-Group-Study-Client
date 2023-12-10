import axios from "axios";
import { useEffect, useState } from "react";
import SubmittedAssignmentsShow from "./SubmittedAssignmentsShow";


const SubmittedAssignments = () => {

    const [assignments, setAssignments] = useState([]);
    const pendingStatus = 'Pending';

    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://online-group-study-server-three.vercel.app/pendingAssignments/${pendingStatus}`, { withCredentials: true })
            .then(data => {
                setAssignments(data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])


    return (
        <div className="max-w-7xl py-10 mx-auto bg-teal-50 rounded-lg">

            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr className="text-lg text-black">
                            <th>Image</th>
                            <th>Title</th>
                            <th>Marks</th>
                            <th>Examinee</th>
                            <th>Status</th>
                            <th>Give Mark</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            isLoading ? (
                                <div className="mt-20 mb-60 text-center">
                                    <span className="text-red-500 loading loading-spinner loading-lg"></span>
                                    <span className="loading loading-spinner loading-lg"></span>
                                    <span className="text-blue-500 loading loading-spinner loading-lg"></span>
                                    <span className="text-purple-500 loading loading-spinner loading-lg"></span>
                                    <span className="text-green-500 loading loading-spinner loading-lg"></span>
                                </div>
                            )
                                :
                                (
                                    assignments.map(assignment => <SubmittedAssignmentsShow key={assignment._id} assignment={assignment}></SubmittedAssignmentsShow>)

                                )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default SubmittedAssignments;