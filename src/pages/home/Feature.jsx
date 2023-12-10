import axios from "axios";
import { useEffect, useState } from "react";
import ShowFeature from "./ShowFeature";

const Feature = () => {

    const [features, setFeatures] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios.get('https://online-group-study-server-three.vercel.app/feature')
            .then(data => {
                setFeatures(data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.log(error);
            })
    }, [])



    return (
        <div className="max-w-7xl mx-auto mt-16 md:mt-24 lg:mt-32">

            <h2 className="text-5xl text-center text-slate-400 font-bold mb-6">Feature</h2>

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
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:px-6 lg:px-28">
                                {
                                    features.map(feature => <ShowFeature key={feature._id} feature={feature}></ShowFeature>)
                                }
                            </div>
                        )
                }
            </div>

        </div>
    );
};

export default Feature;