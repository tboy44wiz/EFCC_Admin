import {useDispatch} from "react-redux";

import {
    handleIsAssetsTableOpenChange
} from "../../../redux/features/dashboard/Dashboard_Slice.js";

const CountersComp = ({ counterData }) => {
    const dispatch = useDispatch();

    return (
        <section className="h-[100px] md:h-[150px] w-full px-3 md:px-20 pt-5 md:pt-12 bg-[black] bg-opacity-[0.7] rounded-xl flex flex-col items-start">
            <div className="h-auto w-full 2xl:w-[1024px] flex flex-col mx-auto mt-5 md:mt-[5px] px-3 md:px-20">
                <p className="font-medium text-white">Assets Statistics</p>

                <div className="h-auto w-full grid grid-cols-1 md:grid-cols-2 gap-6 2xl:gap-16 mt-2">
                    {
                        counterData.map((eachItem) => (
                            <div key={ eachItem.title }
                                 onClick={ () => dispatch(handleIsAssetsTableOpenChange(true)) }
                                 className="flex items-center justify-between px-6 py-5 cursor-pointer rounded-lg shadow shadow-lg shadow-gray-300 bg-white">
                                <div>
                                    <p className="font-medium text-gray-500">{ eachItem.title }</p>
                                    <h3 className="font-bold text-gray-700 text-xl py-2">{ eachItem.count.toLocaleString() } Assets</h3>
                                    <div className={`flex items-center font-medium text-sm ${eachItem.color}`}>
                                        { eachItem.icon }
                                        { eachItem.percent }%
                                        <span className="ml-1 text-gray-500">since January 2023</span>
                                    </div>
                                </div>
                                <div className="p-3 bg-[red] bg-opacity-5 rounded-full">
                                    <img src={ eachItem.image } alt="Money Asset Icon" className="h-10 w-10"/>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default CountersComp;
