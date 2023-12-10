import PropTypes from 'prop-types';
import { AiOutlineStar, AiFillStar } from 'react-icons/Ai';
import Rating from 'react-rating';

const ShowFeature = ({ feature }) => {

    const { title, image, ratings, description } = feature;

    return (
        <div className="max-w-7xl mx-auto px-6 md:px-0">
            <div className="card bg-base-100 shadow-lg">
                <figure><img className='border-2' src={image} alt="feature" /></figure>
                <div className="card-body rounded-b-xl bg-slate-100">
                    <h2 className="card-title font-bold">{title}</h2>
                    <div className='flex items-center gap-2 justify-center'>
                        <h2 className='text-lg'>Ratings: </h2>
                        <Rating className='text-yellow-500 text-xl mt-[5.5px]' readonly={true} initialRating={ratings} emptySymbol={<AiOutlineStar></AiOutlineStar>} fullSymbol={<AiFillStar></AiFillStar>}></Rating>
                    </div>
                    <div className="card-actions justify-end">
                        <button className="btn btn-neutral" onClick={() => document.getElementById('my_modal_3').showModal()}>Description</button>
                    </div>
                </div>
            </div>
            <dialog id="my_modal_3" className="modal">
                <div className="modal-box">
                    <div className="card-body" method="dialog">
                        <p className='text-justify'>{description}</p>
                    </div>
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

ShowFeature.propTypes = {
    feature: PropTypes.object
};

export default ShowFeature;