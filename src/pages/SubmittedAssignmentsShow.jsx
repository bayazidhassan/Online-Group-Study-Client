import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const SubmittedAssignmentsShow = ({ assignment }) => {

    const navigate = useNavigate();

    const { _id, title, photoUrl, marks, submittedUser, pendingStatus } = assignment;

    const handleGiveMark = () => {
        navigate(`/markAssignment/${_id}`);
    }


    return (

        <tr className="hover text-lg text-center">
            <td>
                <img className='w-10 md:w-16 mx-auto h-10 md:h-16 rounded-md' src={photoUrl} alt="" />
            </td>
            <td>
                {title}
            </td>
            <td>
                {marks}
            </td>
            <td>
                {submittedUser}
            </td>
            <td>
                {
                    <h2 className='text-red-500 font-semibold'>
                        {pendingStatus}
                    </h2>
                }
            </td>
            <td>
                <button onClick={handleGiveMark} className="btn btn-accent">GIVE MARK</button>
            </td>
        </tr>

    );
};

SubmittedAssignmentsShow.propTypes = {
    assignment: PropTypes.object
};

export default SubmittedAssignmentsShow;