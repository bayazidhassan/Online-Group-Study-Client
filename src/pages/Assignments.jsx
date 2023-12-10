import axios from "axios";
import { useEffect, useState } from "react";
import AssignmentsShow from "./AssignmentsShow";
import { useLoaderData } from "react-router-dom";


const Assignments = () => {


    const [assignments, setAssignments] = useState([]);
    const [difficulty, setDifficulty] = useState('All');
    const [isLoading, setIsLoading] = useState(false);

    const Count = useLoaderData();
    const [count, setCount] = useState(Count.count);

    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(i => i + 1);




    useEffect(() => {
        setIsLoading(true);
        axios.get(`https://online-group-study-server-three.vercel.app/assignmentsCnt/${difficulty}`)
            .then(data => {
                setCount(data.data.length);


                axios.get(`https://online-group-study-server-three.vercel.app/assignments/${difficulty}?page=${currentPage - 1}&size=${itemsPerPage}`)
                    .then(data => {
                        setAssignments(data.data);
                        setIsLoading(false);
                    })
                    .catch(error => {
                        console.log(error);
                    })
            })
            .catch(error => {
                console.log(error);
            })
    }, [difficulty, currentPage, itemsPerPage])




    const handleSelectChange = (event) => {
        setDifficulty(event.target.value);
        setCurrentPage(1);
    };


    const handleItemsPerPage = (e) => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(1);
    }
    const handlePrevious = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    }
    const handleNext = () => {
        if (currentPage < numberOfPages) {
            setCurrentPage(currentPage + 1);
        }
    }




    return (
        <div className="max-w-7xl mx-auto p-6 lg:p-0">

            <div className="flex justify-end">
                <div>
                    <label className="label">
                        <span className="label-text text-lg font-semibold">Difficulty Level?</span>
                    </label>
                    <select
                        value={difficulty} onChange={handleSelectChange}
                        className="select border-1 border-black w-full max-w-xs"
                    >
                        <option>All</option>
                        <option>Easy</option>
                        <option>Medium</option>
                        <option>Hard</option>
                    </select>
                </div>
            </div>


            <div>
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
                            <div style={{ overflow: 'hidden' }} className="mt-4 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                                {
                                    assignments.map(assignment => <AssignmentsShow key={assignment._id} assignments={assignments} setAssignments={setAssignments} assignment={assignment}></AssignmentsShow>)
                                }
                            </div>
                        )
                }
            </div>


            <div className='mt-10 space-y-4 md:space-y-0 text-lg font-bold text-center mb-14'>
                <button className={`btn btn-neutral mr-4 ${currentPage === 1 ? 'btn-disabled' : ''}`} onClick={handlePrevious}>Previous</button>
                {
                    pages.map(page => <button
                        className={currentPage === page ? 'btn btn-warning mr-2' : 'mr-2 btn btn-outline'}
                        onClick={() => setCurrentPage(page)}
                        key={page}>{page}</button>)
                }
                <button className={`btn btn-neutral ml-2 mr-4 ${numberOfPages === currentPage ? 'btn-disabled' : ''}`} onClick={handleNext}>Next</button>

                <select className="select border-1 border-black" value={itemsPerPage} onChange={handleItemsPerPage} name="" id="">
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                    <option value="16">16</option>
                    <option value="20">20</option>
                </select>
            </div>

        </div >
    );
};

export default Assignments;