import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import axios from "axios";
import MyAssignmentsShow from "./MyAssignmentsShow";



const MyAssignments = () => {

    const { user } = useContext(AuthContext);

    const [isLoading, setIsLoading] = useState(false);


    const [assignments, setAssignments] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://online-group-study-server-three.vercel.app/myAssignments?email=${user.email}`, { withCredentials: true })
            .then(data => {
                setAssignments(data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, [user])



    return (
        <div className="max-w-7xl py-10 mx-auto bg-teal-50 rounded-lg">

            <div className="overflow-x-auto ">
                <table className="table text-center">
                    <thead>
                        <tr className="text-lg text-black">
                            <th>Image</th>
                            <th>Title</th>
                            <th>Marks</th>
                            <th>Status</th>
                            <th>Obtained Marks</th>
                            <th>Feedback</th>
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
                            ) :
                                (
                                    assignments.map(assignment => <MyAssignmentsShow key={assignment._id} assignment={assignment}></MyAssignmentsShow>)

                                )
                        }
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default MyAssignments;