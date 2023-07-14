import {useDispatch, useSelector} from "react-redux";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

/*==== Import AppLayoutHOC ====*/
import AppLayoutHOC from "../components/layouts/AppLayout_HOC/AppLayout_HOC.jsx";

/*==== Import Component ====*/
import CountersComp from "../components/pages/dashboard/Counters_Widget.jsx";
import BarChartComp from "../components/pages/dashboard/BarChart_Widget.jsx";
import TabComp from "../components/pages/dashboard/Tab_Comp";
import AssetsTableComp from "../components/pages/dashboard/AssetsTable_Comp/AssetsTable_Comp.jsx";

import {
    useGetDisposedForfeitureStatsQuery,
    useGetFinalForfeitureStatsQuery,
    useGetInterimForfeitureStatsQuery,
    useGetPreInterimForfeitureStatsQuery
} from "../redux/services/api/Dashboard_API";
import { handleTabOneDateChange, handleTabTwoDateChange, handleTabThreeDateChange, handleTabFourDateChange } from "../redux/features/dashboard/Dashboard_Slice";

/*==== Import Component ====*/

const DashboardView = () => {
    const {
        selectedTab,
        isTabOneLoading, tabOneCounterData, tabOneChartData, tabOneSelectedDateRange,
        isTabTwoLoading, tabTwoCounterData, tabTwoChartData, tabTwoSelectedDateRange,
        isTabThreeLoading, tabThreeCounterData, tabThreeChartData, tabThreeSelectedDateRange,
        isTabFourLoading, tabFourCounterData, tabFourChartData, tabFourSelectedDateRange,
    } = useSelector((state) => state.dashboardState);
    const dispatch = useDispatch();

    const [tabOneStartDate, tabOneEndDate] = tabOneSelectedDateRange;
    const [tabTwoStartDate, tabTwoEndDate] = tabTwoSelectedDateRange;
    const [tabThreeStartDate, tabThreeEndDate] = tabThreeSelectedDateRange;
    const [tabFourStartDate, tabFourEndDate] = tabFourSelectedDateRange;

    useGetPreInterimForfeitureStatsQuery({
        startDate: (tabOneStartDate !== null && tabOneStartDate !== undefined) ? tabOneStartDate.toLocaleDateString() : "",
        endDate: (tabOneEndDate !== null && tabOneEndDate !== undefined) ? tabOneEndDate.toLocaleDateString() : ""
    });
    useGetInterimForfeitureStatsQuery({
        startDate: (tabTwoStartDate !== null && tabTwoStartDate !== undefined) ? tabTwoStartDate.toLocaleString() : "",
        endDate: (tabTwoEndDate !== null && tabTwoEndDate !== undefined) ? tabTwoEndDate.toLocaleString() : "",
    });
    useGetFinalForfeitureStatsQuery({
        startDate: (tabThreeStartDate !== null && tabThreeStartDate !== undefined) ? tabThreeStartDate.toLocaleString() : "",
        endDate: (tabThreeEndDate !== null && tabThreeEndDate !== undefined) ? tabThreeEndDate.toLocaleString() : "",
    });
    useGetDisposedForfeitureStatsQuery({
        startDate: (tabFourStartDate !== null && tabFourStartDate !== undefined) ? tabFourStartDate.toLocaleString() : "",
        endDate: (tabFourEndDate !== null && tabFourEndDate !== undefined) ? tabFourEndDate.toLocaleString() : "",
    });
    // console.log(preInterimStats, isPreInterimLoading, isPreInterimSuccess, preInterimError);
    // console.log(interimStats, isInterimLoading, isInterimSuccess, interimError);
    // console.log(finalStats, isFinalLoading, isFinalSuccess, finalError);
    // console.log(disposedStats, isDisposedLoading, isDisposedSuccess, disposedError);


    return (
        <AppLayoutHOC>

            {/*==== Tab Comp ====*/}
            <TabComp />
            {
                (selectedTab === "Pre Interim Forfeiture") ? (
                    <>
                        {/*==== Assets Stats ====*/}
                        <CountersComp counterData={tabOneCounterData}/>

                        {/*==== Charts ====*/}
                        <div className="mt-6 md:mt-28">
                            <div className="h-auto w-full flex items-center justify-between">
                                <p className="font-medium text-red-600">Assets Charts</p>
                                <div className="w-auto z-50 border-2 rounded-[4px] p-2">
                                    <DatePicker
                                        selectsRange={true}
                                        startDate={tabOneStartDate}
                                        endDate={tabOneEndDate}
                                        placeholderText="Start Date - End Date"
                                        onChange={ (date) => dispatch(handleTabOneDateChange(date)) }
                                        className="bg-transparent"
                                    />
                                </div>
                            </div>
                            <BarChartComp title="" chartData={tabOneChartData} color="#78D2FA" isLoading={ isTabOneLoading } />
                        </div>
                    </>
                ) : (selectedTab === "Interim Forfeiture") ? (
                    <>
                        {/*==== Assets Stats ====*/}
                        <CountersComp counterData={tabTwoCounterData}/>

                        {/*==== Charts ====*/}
                        <div className="mt-6 md:mt-28">
                            <div className="h-auto w-full flex items-center justify-between">
                                <p className="font-medium text-red-600">Assets Charts</p>
                                <div className="w-auto z-50 border-2 rounded-[4px] p-2">
                                    <DatePicker
                                        selectsRange={true}
                                        startDate={tabTwoStartDate}
                                        endDate={tabTwoEndDate}
                                        placeholderText="Start Date - End Date"
                                        onChange={ (date) => dispatch(handleTabTwoDateChange(date)) }
                                        className="bg-transparent"
                                    />
                                </div>
                            </div>
                            <BarChartComp title="" chartData={ tabTwoChartData } color="#78D2FA" isLoading={ isTabTwoLoading } />
                        </div>
                    </>
                ) : (selectedTab === "Final Forfeiture") ? (
                    <>
                        {/*==== Assets Stats ====*/}
                        <CountersComp counterData={tabThreeCounterData}/>

                        {/*==== Charts ====*/}
                        <div className="mt-6 md:mt-28">
                            <div className="h-auto w-full flex items-center justify-between">
                                <p className="font-medium text-red-600">Assets Charts</p>
                                <div className="w-auto z-50 border-2 rounded-[4px] p-2">
                                    <DatePicker
                                        selectsRange={true}
                                        startDate={tabThreeStartDate}
                                        endDate={tabThreeEndDate}
                                        placeholderText="Start Date - End Date"
                                        onChange={(date) => dispatch(handleTabThreeDateChange(date))}
                                        className="bg-transparent"
                                    />
                                </div>
                            </div>
                            <BarChartComp title="" chartData={ tabThreeChartData } color="#88C348" isLoading={ isTabThreeLoading } />
                        </div>
                    </>
                ) : (
                    <>
                        {/*==== Assets Stats ====*/}
                        <CountersComp counterData={tabFourCounterData}/>

                        {/*==== Charts ====*/}
                        <div className="mt-6 md:mt-28">
                            <div className="h-auto w-full flex items-center justify-between">
                                <p className="font-medium text-red-600">Assets Charts</p>
                                <div className="w-auto z-50 border-2 rounded-[4px] p-2">
                                    <DatePicker
                                        selectsRange={true}
                                        startDate={tabFourStartDate}
                                        endDate={tabFourEndDate}
                                        placeholderText="Start Date - End Date"
                                        onChange={ (date) => dispatch(handleTabFourDateChange(date)) }
                                        className="bg-transparent"
                                    />
                                </div>
                            </div>
                            <BarChartComp title="" chartData={tabFourChartData} color="#78D2FA" isLoading={ isTabFourLoading } />
                        </div>
                    </>
                )
            }

            <AssetsTableComp />
        </AppLayoutHOC>
    );
};

export default DashboardView;