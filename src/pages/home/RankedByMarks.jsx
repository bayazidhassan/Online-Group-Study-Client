import axios from "axios";
import { useEffect, useState } from "react";
import RankedByMarksShow from "./RankedByMarksShow";


const RankedByMarks = () => {


    const [rank, setRank] = useState('High to Low');
    const [assignments, setAssignments] = useState([]);

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://online-group-study-server-three.vercel.app/completedAssignments/${rank}`)
            .then(data => {
                setAssignments(data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, [rank])



    const handleSelectRank = (e) => {
        setRank(e.target.value);
    }



    return (
        <div className="mt-20 md:mt-32 py-10 max-w-7xl mx-auto bg-teal-50 lg:rounded-lg">

            <h2 className="mb-4 text-2xl md:text-3xl text-zinc-500 font-bold text-center">Rankings By Obtained Marks</h2>


            <div className="flex justify-end mr-6 md:mr-16">
                <div>
                    <select
                        value={rank} onChange={handleSelectRank}
                        className="select border-1 border-black w-full max-w-xs"
                    >
                        <option>High to Low</option>
                        <option>Low to High</option>
                    </select>
                </div>
            </div>


            <div className="overflow-x-auto">
                <table className="table text-center">
                    <thead>
                        <tr className="text-lg text-black">
                            <th>Image</th>
                            <th>Title</th>
                            <th>Examinee</th>
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
                            )
                                :
                                (
                                    assignments.map(assignment => <RankedByMarksShow key={assignment._id} assignment={assignment} ></RankedByMarksShow>)

                                )
                        }
                    </tbody>
                </table>
            </div>

        </div >
    );
};

export default RankedByMarks;