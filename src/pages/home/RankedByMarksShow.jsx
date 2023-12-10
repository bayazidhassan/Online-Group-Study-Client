import PropTypes from 'prop-types';

const RankedByMarksShow = ({ assignment }) => {

    const { photoUrl, title, submittedUser, obtainedMark, feedback } = assignment;


    return (
        <tr className="hover text-lg text-center">
            <td>
                <img className='w-10 md:w-16 mx-auto h-10 md:h-16 rounded-md' src={photoUrl} alt="" />
            </td>
            <td>
                {title}
            </td>
            <td>
                {submittedUser}
            </td>
           
            <td>
                {obtainedMark}
            </td>

            <td>
                {feedback}
            </td>
        </tr>
    );
};

RankedByMarksShow.propTypes = {
    assignment: PropTypes.object
};

export default RankedByMarksShow;