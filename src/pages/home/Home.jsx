import Banner from "./Banner";
import Feature from "./Feature";
import FrequentlyAsked from "./FrequentlyAsked";
import RankedByMarks from "./RankedByMarks";


const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <RankedByMarks></RankedByMarks>
            <Feature></Feature>
            <FrequentlyAsked></FrequentlyAsked>
        </div>
    );
};

export default Home;