
import PropTypes from 'prop-types';

const MyAssignmentsShow = ({ assignment }) => {

    const { title, photoUrl, marks, pendingStatus, obtainedMark, feedback } = assignment;



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
                {
                    pendingStatus === 'Pending' ?
                        <h2 className='font-semibold text-red-500'>{pendingStatus}</h2> :
                        <h2 className='font-semibold text-green-500'>{pendingStatus}</h2>
                }
            </td>
            <td>
                {
                    obtainedMark ? obtainedMark : '------'
                }
            </td>
            <td>
                {
                    feedback ? feedback : '------'
                }
            </td>
        </tr>
    );
};

MyAssignmentsShow.propTypes = {
    assignment: PropTypes.object
};

export default MyAssignmentsShow;