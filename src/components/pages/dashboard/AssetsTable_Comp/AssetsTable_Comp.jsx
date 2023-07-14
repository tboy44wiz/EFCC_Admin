import {useDispatch, useSelector} from "react-redux";
import {ArrowLeft} from "solar-icon-set";
import TableComp from "./Table_Comp.jsx";

import {
    handleAssetsTableTabChange,
    handleIsAssetsTableOpenChange
} from "../../../../redux/features/dashboard/Dashboard_Slice.js";

const AssetsTableComp = () => {
    const { isAssetsTableOpen, selectedAssetsTableTab, searchString } = useSelector(state => state.dashboardState);
    const dispatch = useDispatch();
    const tabItems = ["Tangible Assets", "Intangible Assets"];

    return (
        <main className={`h-[calc(100%-90px)] lg:h-[calc(100%-125px)] w-full lg:w-[calc(100%-325px)] pr-4 pt-6 fixed top-[100px] lg:top-[110px] right-[-13px] lg:right-0 bg-gray-100 text-white overflow-y-scroll transition-all ease-in-out duration-300 z-[999]
            [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-gray-500
            ${ (isAssetsTableOpen) ? "translate-x-0" : "translate-x-full" }
        `}>
            <button
                onClick={ () => dispatch(handleIsAssetsTableOpenChange(false)) }
                className="px-4 py-1.5 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full cursor-pointer">
                <ArrowLeft size="24" className="mr-4" />Back
            </button>

            <div className="mt-6 flex items-center gap-6">
                { tabItems.map((eachItem) => (
                    <div key={eachItem }>
                        <p onClick={ () => dispatch(handleAssetsTableTabChange(eachItem)) }
                           className={`cursor-pointer font-medium text-gray-500 ${ (selectedAssetsTableTab === eachItem) && "text-red-600 font-semibold" }`}>
                            { eachItem }
                        </p>
                        <div className={`h-[3px] w-[70px] mx-auto ${ (selectedAssetsTableTab === eachItem) && "h-1 w-[70px] mx-auto bg-red-600 rounded-tl-xl rounded-tr-xl" }`} />
                    </div>
                )) }
            </div>


            { (selectedAssetsTableTab === "Tangible Assets") ? (
                <div className="mt-8 ">
                    <h3 className="font-bold text-2xl text-black">Tangible Assets</h3>
                    <TableComp searchString={searchString} />
                </div>
            ) : (
                <div className="mt-8 ">
                    <h3 className="font-bold text-2xl text-black">Intangible Assets</h3>
                    <TableComp searchString={searchString} />
                </div>
            ) }
        </main>
    );
};

export default AssetsTableComp;
