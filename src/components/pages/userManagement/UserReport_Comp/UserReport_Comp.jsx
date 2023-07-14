import { useDispatch, useSelector } from "react-redux";
import { ArrowLeft } from "solar-icon-set";

/*==== Import Components ====*/
import UserReportDetailsComp from "./UserReportDetails_Comp.jsx";
import UserActivityTableComp from "./UserActivityTable_Comp";

import {
    handleIsUserReportModalChange,
} from "../../../../redux/features/userManagement/UserManagement_Slice";

const UserReportComp = () => {
  const { isUserReportModalOpen } = useSelector((state) => state.userManagementState);
  const dispatch = useDispatch();

  return (
      <main className={`h-[calc(100%-90px)] lg:h-[calc(100%-125px)] w-full lg:w-[calc(100%-310px)] px-4 pt-4 pb-10 fixed top-[100px] lg:top-[110px] right-0 lg:right-0 bg-gray-100 text-gray-600 transition-all ease-in-out duration-300 z-[999]
            ${ (isUserReportModalOpen) ? "translate-x-0" : "translate-x-full" }
      `}>
          <button
              onClick={() => dispatch(handleIsUserReportModalChange(false))}
              className="px-4 py-1.5 flex items-center justify-center bg-green-100 text-green-600 rounded-full cursor-pointer">
              <ArrowLeft size="24" className="mr-4" />Back
          </button>

          <div className="h-full w-full pt-6 z-[1000]
                  overflow-y-auto [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-thumb]:rounded-md [&::-webkit-scrollbar-thumb]:bg-gray-300">

              <h1 className="text-2xl font-bold capitalize">User Profile</h1>

              <UserReportDetailsComp />

              <UserActivityTableComp />
          </div>
      </main>
  );
}

export default UserReportComp;
