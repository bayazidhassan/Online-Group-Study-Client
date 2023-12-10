import { FaFacebook, FaYoutube, FaTwitter } from 'react-icons/fa';

const Footer = () => {
    return (
        <div className='mt-20 md:mt-28 lg:mt-40 bg-black w-full flex flex-col md:flex-row gap-4 md:gap-0 justify-evenly items-center text-white py-6 md:py-10'>
            <div>
                <img className='w-12 h-12 mx-auto rounded-md' src="https://i.ibb.co/yndmSFS/footer-logo.png" alt="" />
                <p className="footer-title text-xs md:text-sm text-center mt-3">Connect, study, and succeed together with us.</p>
                <p className="footer-title text-xs md:text-sm text-center mt-3">Copyright © 2023 - All right reserved</p>
            </div>
            <div>
                <h2 className="footer-title text-xs md:text-sm text-center">Find us on</h2>
                <div className="flex justify-center gap-4 md:mt-4">
                    <a href="https://www.facebook.com/"><FaFacebook className='w-6 h-6'></FaFacebook></a>
                    <a href="https://www.youtube.com/"><FaYoutube className='w-6 h-6'></FaYoutube></a>
                    <a href="https://twitter.com/"><FaTwitter className='w-6 h-6'></FaTwitter></a>
                </div>
            </div>
        </div>
    );
};

export default Footer;